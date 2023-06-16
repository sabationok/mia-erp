import React from 'react';
import ButtonIcon from 'components/atoms/ButtonIcon/ButtonIcon';
import styled from 'styled-components';
import LogoSvg from 'components/Layout/LogoSvg';
import NavLinkIcon from 'components/atoms/LinkIcon/NavLinkIcon';
import { Link } from 'react-router-dom';
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
};
const validFormData = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().required(),
  fullName: yup.string().required(),
  phone: yup.string().required(),
});

export type CompanyFormProps = Props & Omit<ModalFormProps, 'onSubmit'>;
const CompanyForm: React.FC<CompanyFormProps> = ({ ...props }) => {
  const permissionsService = usePermissionsServiceHook();

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    watch,
  } = useForm<ICreateCompanyFormData>({
    defaultValues,
    reValidateMode: 'onSubmit',
    resolver: yupResolver(validFormData),
  });

  function onFormSubmit(data: ICreateCompanyFormData) {
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
    <Form fillHeight {...props} onSubmit={handleSubmit(onFormSubmit)}>
      <Inputs>
        <InputLabel label={'Назва'} direction={'vertical'} error={errors.name}>
          <InputText {...register('name')} />
        </InputLabel>
        <InputLabel label={'Повна назва'} direction={'vertical'} error={errors.fullName}>
          <InputText {...register('fullName')} />
        </InputLabel>
        <InputLabel label={'Електронна адреса'} direction={'vertical'} error={errors.email}>
          <InputText {...register('email')} type={'email'} />
        </InputLabel>
        <InputLabel label={'Телефон'} direction={'vertical'} error={errors.phone}>
          <InputText {...register('phone')} />
        </InputLabel>
        
        <InputLabel label={'Тип'} direction={'vertical'} error={errors.type} disabled>
          <InputText {...register('type')} disabled />
        </InputLabel>
        <InputLabel label={'Податковий номер'} direction={'vertical'} error={errors.taxCode} disabled>
          <InputText {...register('taxCode')} type={'number'} disabled />
        </InputLabel>
      </Inputs>
    </Form>
  );
};

const Form = styled(ModalForm)``;
const StLogo = styled(LogoSvg)`
  min-width: 150px;
  height: 64px;

  & .logoName {
    font-size: 18px;
    @media screen and (max-width: 480px) {
      display: block;
    }
  }
`;

const Title = styled.p`
  font-size: 16px;
  line-height: 1.4;
  text-align: center;

  margin-bottom: 20px;

  max-width: 280px;
`;

const Links = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;

  width: 100%;
  height: 36px;

  margin-bottom: 16px;
`;

const Inputs = styled.div`
  display: flex;
  flex-direction: column;

  margin-bottom: 12px;
  width: 100%;

  padding: 8px 16px;

  fill: ${({ theme }) => theme.accentColor.base};
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;

  width: 100%;
  max-width: 230px;
`;
const StButtonIcon = styled(ButtonIcon)`
  font-weight: 600;

  min-width: 165px;
  width: 100%;
`;
const StLink = styled(Link)`
  font-size: 11px;
  line-height: 1.45;

  text-decoration: underline;

  color: ${({ theme }) => theme.accentColor.base};

  &:hover {
    color: ${({ theme }) => theme.accentColor.hover};
  }

  &:active {
    color: ${({ theme }) => theme.accentColor.pressed};
  }
`;

const StNavLink = styled(NavLinkIcon)`
  position: relative;

  font-weight: 700;
  font-size: 12px;
  text-transform: uppercase;
  text-align: center;

  border-radius: 0;
  border-style: none;
  border-width: 0;

  &::before {
    display: block;
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background-color: ${({ theme }) => theme.trBorderClr};
  }

  &::after {
    display: block;
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    //height: 1px;
    //width: 100%;
    height: 3px;
    width: 0;
    transition: all ${({ theme }) => theme.globals.timingFnMui};
    transform: translate(-50%);
    background-color: ${({ theme }) => theme.accentColor.base};
  }

  &.active {
    &::after {
      width: 80%;
    }
  }

  &:hover,
  &:focus {
    outline-style: none;

    &::after {
      width: 100%;
    }
  }
`;

export default CompanyForm;
