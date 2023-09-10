import {
  DirectoriesFormProps,
  ICommunicationDirItem,
  IDirItemBase,
  IPaymentDirItem,
  IShipmentDirItem,
  MethodDirType,
} from '../Directories/dir.types';
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

export interface FormCreateMethodProps extends DirectoriesFormProps<MethodDirType, IDirItemBase, IMethodFormData> {}

export interface IMethodFormData
  extends Omit<
    IPaymentDirItem | IShipmentDirItem | ICommunicationDirItem,
    '_id' | 'createdAt' | 'deletedAt' | 'updatedAt'
  > {}

const validation = yup.object().shape({
  label: yup.string().max(100),
  email: yup.string().max(100).optional(),
  description: yup.string().max(250).optional(),
});

const FormCreateMethod: React.FC<FormCreateMethodProps> = ({ onSubmit, parent, data, ...props }) => {
  const {
    formState: { errors, isValid },
    register,
    handleSubmit,
    clearAfterSave,
    closeAfterSave,
    toggleAfterSubmitOption,
  } = useAppForm<IMethodFormData>({
    defaultValues: { ...data },
    resolver: yupResolver(validation),
    reValidateMode: 'onSubmit',
  });

  // const filterOptions = useMemo(() => {
  //   return enumToArray(ContractorsTypesEnum).map(el => ({ label: translate(el), value: el }));
  // }, []);

  function formEventWrapper(evHandler?: AppSubmitHandler<IMethodFormData>) {
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
export default FormCreateMethod;
