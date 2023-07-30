import { DirectoriesFormProps, IBaseDirItem } from '../Directories/dir.types';
import ModalForm from '../ModalForm';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import styled from 'styled-components';
import InputLabel from '../atoms/Inputs/InputLabel';
import t from '../../lang';
import InputText from '../atoms/Inputs/InputText';
import React from 'react';
import { useAppForm } from '../../hooks';
import FormAfterSubmitOptions from './components/FormAfterSubmitOptions';
import { AppSubmitHandler } from '../../hooks/useAppForm.hook';
import { ApiDirType } from '../../redux/APP_CONFIGS';
import * as _ from 'lodash';

export interface FormCreatePaymentMethodProps
  extends DirectoriesFormProps<
    any,
    IBaseDirItem<any, ApiDirType.METHODS_PAYMENT>,
    IPaymentMethodFormData,
    ApiDirType.METHODS_PAYMENT
  > {}

export interface IPaymentMethodFormData
  extends Omit<
    IBaseDirItem<any, ApiDirType.METHODS_PAYMENT>,
    '_id' | 'createdAt' | 'deletedAt' | 'updatedAt' | 'type'
  > {}

const validation = yup.object().shape({
  // type: yup
  //   .object()
  //   .shape({
  //     value: yup.string(),
  //     label: yup.string(),
  //   })
  //   .required(),
  label: yup.string().max(100),
  email: yup.string().max(100).optional(),
  description: yup.string().max(250).optional(),
});

const FormCreatePaymentMethod: React.FC<FormCreatePaymentMethodProps> = ({ onSubmit, parent, data, ...props }) => {
  const {
    formState: { errors, isValid },
    register,
    handleSubmit,
    clearAfterSave,
    closeAfterSave,
    toggleAfterSubmitOption,
  } = useAppForm<IPaymentMethodFormData>({
    defaultValues: _.omit(data, ['type']),
    resolver: yupResolver(validation),
    reValidateMode: 'onSubmit',
  });

  // const filterOptions = useMemo(() => {
  //   return enumToArray(ContractorsTypesEnum).map(el => ({ label: translate(el), value: el }));
  // }, []);

  function formEventWrapper(evHandler?: AppSubmitHandler<IPaymentMethodFormData>) {
    if (evHandler) {
      return handleSubmit(data => {
        evHandler(data, { clearAfterSave, closeAfterSave });
      });
    }
  }

  return (
    <ModalForm
      {...props}
      onSubmit={formEventWrapper(onSubmit)}
      isValid={isValid}
      extraFooter={
        <FormAfterSubmitOptions
          clearAfterSave={clearAfterSave}
          closeAfterSave={closeAfterSave}
          toggleOption={toggleAfterSubmitOption}
        />
      }
    >
      <Inputs>
        {/*<CustomSelect*/}
        {/*  {...registerSelect('type', {*/}
        {/*    label: t('type'),*/}
        {/*    placeholder: t('type'),*/}
        {/*    required: true,*/}
        {/*    error: errors.type,*/}
        {/*    options: filterOptions,*/}
        {/*  })}*/}
        {/*/>*/}

        <InputLabel label={t('label')} direction={'vertical'} error={errors.label} required>
          <InputText placeholder={t('insertLabel')} {...register('label')} required autoFocus />
        </InputLabel>
      </Inputs>
    </ModalForm>
  );
};
const Inputs = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  padding: 16px;

  background-color: inherit;
`;
export default FormCreatePaymentMethod;
