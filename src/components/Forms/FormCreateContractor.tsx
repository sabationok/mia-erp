import { DirectoriesFormProps } from '../Directories/dir.types';
import { ContractorsTypesEnum, IContractor, IContractorFormData } from 'redux/contractors/contractors.types';
import ModalForm from '../ModalForm';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler } from 'react-hook-form';
import styled from 'styled-components';
import InputLabel from '../atoms/Inputs/InputLabel';
import t from '../../lang';
import InputText from '../atoms/Inputs/InputText';
import TextareaPrimary from '../atoms/Inputs/TextareaPrimary';
import React from 'react';
import { useAppForm } from '../../hooks';
import CustomSelect from '../atoms/Inputs/CustomSelect';

export interface FormCreateContractorProps
  extends DirectoriesFormProps<ContractorsTypesEnum, IContractor, IContractorFormData> {}

const validation = yup.object().shape({
  label: yup.string().required().max(100).required(),
  type: yup.object().shape({}).required(),
  taxCode: yup.string().max(100).min(10).optional(),
  phone: yup.string().max(100).optional(),
  email: yup.string().max(100).optional(),
  description: yup.string().max(250).optional(),
});

const FormCreateContractor: React.FC<FormCreateContractorProps> = ({ onSubmit, type, parent, data, ...props }) => {
  const {
    formState: { errors },
    register,
    handleSubmit,
    registerSelect,
  } = useAppForm<IContractorFormData>({
    defaultValues: {
      ...data,
      type,
    },
    resolver: yupResolver(validation),
    reValidateMode: 'onSubmit',
  });

  function formEventWrapper(evHandler?: SubmitHandler<IContractorFormData>) {
    if (evHandler) {
      return handleSubmit(evHandler);
    }
  }

  return (
    <ModalForm {...props} onSubmit={formEventWrapper(onSubmit)}>
      <Inputs>
        <InputLabel label={t('label')} direction={'vertical'} error={errors.label} required>
          <InputText placeholder={t('insertLabel')} {...register('label')} required autoFocus />
        </InputLabel>

        <InputLabel label={t('taxCode')} direction={'vertical'} error={errors.taxCode}>
          <InputText placeholder={t('taxCode')} {...register('taxCode')} />
        </InputLabel>

        <CustomSelect
          {...registerSelect('type', {
            label: t('type'),
            placeholder: t('type'),
            required: true,
            error: errors.type,
            options: [
              {
                label: ContractorsTypesEnum.CUSTOMER,
                value: ContractorsTypesEnum.CUSTOMER,
              },
              {
                label: ContractorsTypesEnum.SUPPLIER,
                value: ContractorsTypesEnum.SUPPLIER,
              },
              {
                label: ContractorsTypesEnum.MANAGER,
                value: ContractorsTypesEnum.MANAGER,
              },
            ],
          })}
        />

        <InputLabel label={t('email')} direction={'vertical'} error={errors.email}>
          <InputText placeholder={t('email')} {...register('email')} />
        </InputLabel>

        <InputLabel label={t('phone')} direction={'vertical'} error={errors.phone}>
          <InputText placeholder={t('phone')} {...register('phone')} />
        </InputLabel>

        <InputLabel label={t('comment')} direction={'vertical'} error={errors.description}>
          <TextareaPrimary placeholder={t('insertComment')} {...register('description')} maxLength={250} />
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
export default FormCreateContractor;
