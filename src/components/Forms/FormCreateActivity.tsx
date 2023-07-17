import ModalForm from 'components/ModalForm';
import React from 'react';
import styled from 'styled-components';
import { IActivity, IActivityFormData } from 'redux/companyActivities/activities.types';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import InputLabel from '../atoms/Inputs/InputLabel';
import InputText from '../atoms/Inputs/InputText';
import TextareaPrimary from '../atoms/Inputs/TextareaPrimary';
import { DirectoriesFormProps } from '../Directories/dir.types';
import { ICategoryFormData } from '../../redux/directories/categories.types';

const validation = yup.object().shape({});

export interface FormCreateCompanyActivityProps extends DirectoriesFormProps<any, IActivity, IActivityFormData> {}

const FormCreateActivity: React.FC<FormCreateCompanyActivityProps> = ({ _id, edit, data, onSubmit, ...props }) => {
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<IActivityFormData>({
    defaultValues: {
      ...data,
    },
    resolver: yupResolver(validation),
    reValidateMode: 'onSubmit',
  });

  function formEventWrapper(evHandler?: SubmitHandler<ICategoryFormData>) {
    if (evHandler) {
      return handleSubmit(evHandler);
    }
  }

  return (
    <ModalForm onSubmit={formEventWrapper(onSubmit)} {...props}>
      <Inputs>
        <InputLabel label="Назва" error={errors.label}>
          <InputText placeholder="Введіть назву" {...register('label')} />
        </InputLabel>

        <InputLabel label="Коментар" error={errors.description}>
          <TextareaPrimary placeholder="Введіть коментар" {...register('description')} />
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

export default FormCreateActivity;
