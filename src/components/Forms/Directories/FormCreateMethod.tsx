import ModalForm, { ModalFormProps } from '../../ModalForm';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import styled from 'styled-components';
import InputLabel from '../../atoms/Inputs/InputLabel';
import { t } from '../../../lang';
import React, { useState } from 'react';
import { useAppForm } from '../../../hooks';
import FormAfterSubmitOptions, { useAfterSubmitOptions } from '../components/FormAfterSubmitOptions';
import { AppSubmitHandler } from '../../../hooks/useAppForm.hook';
import FlexBox from '../../atoms/FlexBox';
import { ServiceMethodBase } from '../../../types/integrations.types';
import ButtonSwitch from '../../atoms/ButtonSwitch';
import { AnyFn } from '../../../utils/types';

export interface FormCreateMethodProps extends Omit<ModalFormProps<IMethodFormData>, 'onSubmit'> {
  _id?: string;
  create?: boolean;
  edit?: boolean;
  onSubmit?: AppSubmitHandler<
    IMethodFormData,
    { logAfterSubmit?: boolean; onLoading: (l: boolean) => void; onSuccess?: AnyFn; onError?: AnyFn }
  >;
}

export interface IMethodFormData
  extends Omit<
    ServiceMethodBase,
    '_id' | 'createdAt' | 'deletedAt' | 'updatedAt' | 'service' | 'extService' | 'type'
  > {}

const validation = yup.object().shape({
  // label: yup.string().max(100),
  disabledForClient: yup.boolean().optional(),
  description: yup.string().max(250).optional(),
} as Record<keyof ServiceMethodBase | string, any>);

const FormCreateMethod: React.FC<FormCreateMethodProps> = ({ onSubmit, defaultState, ...props }) => {
  const submitOptions = useAfterSubmitOptions();
  const [isLoading, setIsLoading] = useState(false);

  const formMethods = useAppForm<IMethodFormData>({
    defaultValues: { ...defaultState },
    resolver: yupResolver(validation),
    reValidateMode: 'onSubmit',
  });
  const {
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = formMethods;

  const onValid = (fData: IMethodFormData) => {
    onSubmit &&
      onSubmit(fData, {
        ...submitOptions.state,
        onLoading: setIsLoading,
        onSuccess: () => {
          if (submitOptions.state.clear) {
            reset();
          }
        },
      });
  };

  return (
    <ModalForm
      {...props}
      isLoading={isLoading}
      onSubmit={handleSubmit(onValid)}
      isValid={isValid}
      extraFooter={<FormAfterSubmitOptions {...submitOptions} />}
    >
      <Inputs>
        {/*<InputLabel label={t('label')} direction={'vertical'} error={errors.label} required>*/}
        {/*  <InputText placeholder={t('insertLabel')} {...register('label')} required autoFocus />*/}
        {/*</InputLabel>*/}

        <InputLabel label={t('Disabled')} direction={'vertical'} error={errors?.disabledFor?.all}>
          <ButtonSwitch />
        </InputLabel>

        <InputLabel label={t('Disabled for client')} direction={'vertical'} error={errors.disabledFor?.customer}>
          <ButtonSwitch />
        </InputLabel>
      </Inputs>
    </ModalForm>
  );
};
const Inputs = styled(FlexBox)`
  padding: 0 8px 8px;

  background-color: inherit;
`;
export default FormCreateMethod;
