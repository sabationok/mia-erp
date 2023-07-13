import React from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import { ICompany } from '../../redux/companies/companies.types';
import ModalForm, { ModalFormProps } from '../ModalForm';
import usePermissionsServiceHook from '../../redux/permissions/usePermissionsService.hook';
import InputLabel from '../atoms/Inputs/InputLabel';
import InputText from '../atoms/Inputs/InputText';

export interface Props {}

export interface ICreateCompanyFormData
  extends Omit<ICompany, '_id' | 'createdAt' | 'updatedAt' | 'company_token' | 'configs' | 'owner' | 'permissions'> {}

const defaultValues: ICreateCompanyFormData = {
  name: '',
  fullName: '',
  email: '',
  phone: '',
  taxCode: '',
};
const validFormData = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().required(),
  fullName: yup.string().required(),
  phone: yup.string(),
  taxCode: yup.string().required(),
});

export type CompanyFormProps = Props & Omit<ModalFormProps, 'onSubmit'>;
const CompanyForm: React.FC<CompanyFormProps> = ({ ...props }) => {
  const permissionsService = usePermissionsServiceHook();

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<ICreateCompanyFormData>({
    defaultValues,
    reValidateMode: 'onSubmit',
    resolver: yupResolver(validFormData),
  });

  function onFormSubmit(data: ICreateCompanyFormData) {
    if (data) console.log(data);

    permissionsService.createCompany({
      data,
      onSuccess(data) {
        console.log('Registered company', data);
        toast.success(`Company created: ${data?.name}`);
      },
      onError() {
        toast.error('Error');
      },
      onLoading() {},
    });
  }

  return (
    <Form fillHeight {...props} onSubmit={handleSubmit(onFormSubmit)} isValid={isValid}>
      <Inputs>
        <InputLabel label={'Назва'} direction={'vertical'} error={errors.name} required>
          <InputText {...register('name')} required />
        </InputLabel>
        <InputLabel label={'Повна назва'} direction={'vertical'} error={errors.fullName} required>
          <InputText {...register('fullName')} required />
        </InputLabel>
        <InputLabel label={'Електронна адреса'} direction={'vertical'} error={errors.email} required>
          <InputText {...register('email')} type={'email'} required />
        </InputLabel>
        <InputLabel label={'Телефон'} direction={'vertical'} error={errors.phone}>
          <InputText {...register('phone')} />
        </InputLabel>

        <InputLabel label={'Тип'} direction={'vertical'} error={errors.type}>
          <InputText {...register('type')} />
        </InputLabel>
        <InputLabel label={'Податковий номер'} direction={'vertical'} error={errors.taxCode} required>
          <InputText {...register('taxCode')} required />
        </InputLabel>
      </Inputs>
    </Form>
  );
};

const Form = styled(ModalForm)``;

const Inputs = styled.div`
  display: flex;
  flex-direction: column;

  margin-bottom: 12px;
  width: 100%;

  padding: 8px 16px;

  fill: ${({ theme }) => theme.accentColor.base};
`;

export default CompanyForm;
