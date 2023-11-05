import ModalForm, { ModalFormProps } from '../ModalForm';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import styled from 'styled-components';
import InputLabel from '../atoms/Inputs/InputLabel';
import { t } from '../../lang';
import React from 'react';
import { useAppForm } from '../../hooks';
import FormAfterSubmitOptions, { useAfterSubmitOptions } from './components/FormAfterSubmitOptions';
import { AppSubmitHandler } from '../../hooks/useAppForm.hook';
import FlexBox from '../atoms/FlexBox';
import { ExtServiceMethodBase } from '../../redux/integrations/integrations.types';
import ButtonSwitch from '../atoms/ButtonSwitch';

export interface FormCreateMethodProps extends Omit<ModalFormProps<IMethodFormData>, 'onSubmit'> {
  _id?: string;
  create?: boolean;
  edit?: boolean;
  onSubmit?: AppSubmitHandler<IMethodFormData, { logAfterSubmit?: boolean }>;
}

export interface IMethodFormData
  extends Omit<
    ExtServiceMethodBase,
    '_id' | 'createdAt' | 'deletedAt' | 'updatedAt' | 'service' | 'extService' | 'type'
  > {}

const validation = yup.object().shape({
  // label: yup.string().max(100),
  disabledForClient: yup.boolean().optional(),
  description: yup.string().max(250).optional(),
} as Record<keyof ExtServiceMethodBase | string, any>);

const FormCreateMethod: React.FC<FormCreateMethodProps> = ({ onSubmit, defaultState, ...props }) => {
  const submitOptions = useAfterSubmitOptions();
  const {
    formState: { errors, isValid },
    register,
    handleSubmit,
  } = useAppForm<IMethodFormData>({
    defaultValues: { ...defaultState },
    resolver: yupResolver(validation),
    reValidateMode: 'onChange',
  });

  function formEventWrapper(evHandler?: AppSubmitHandler<IMethodFormData>) {
    if (evHandler) {
      return handleSubmit(data => {
        evHandler(data, { ...submitOptions.state });
      });
    }
  }

  return (
    <ModalForm
      {...props}
      onSubmit={formEventWrapper(onSubmit)}
      isValid={isValid}
      extraFooter={<FormAfterSubmitOptions {...submitOptions} />}
    >
      <Inputs>
        {/*<InputLabel label={t('label')} direction={'vertical'} error={errors.label} required>*/}
        {/*  <InputText placeholder={t('insertLabel')} {...register('label')} required autoFocus />*/}
        {/*</InputLabel>*/}
        <InputLabel label={t('Disabled')} direction={'vertical'} error={errors.disabled}>
          <ButtonSwitch />
        </InputLabel>

        <InputLabel label={t('Disabled for client')} direction={'vertical'} error={errors.disabledForClient}>
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
