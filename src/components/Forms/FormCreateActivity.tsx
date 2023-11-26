import ModalForm from 'components/ModalForm';
import React from 'react';
import styled from 'styled-components';
import { IActivity, IActivityFormData } from 'redux/directories/activities.types';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import InputLabel from '../atoms/Inputs/InputLabel';
import InputText from '../atoms/Inputs/InputText';
import TextareaPrimary from '../atoms/Inputs/TextareaPrimary';
import { DirectoriesFormProps } from '../../types/dir.types';
import { AppSubmitHandler } from '../../hooks/useAppForm.hook';
import FormAfterSubmitOptions, { useAfterSubmitOptions } from './components/FormAfterSubmitOptions';
import { useAppForm } from '../../hooks';
import { ApiDirType } from '../../redux/APP_CONFIGS';

const validation = yup.object().shape({});

export interface FormCreateCompanyActivityProps
  extends DirectoriesFormProps<ApiDirType.ACTIVITIES, IActivity, IActivityFormData> {}

const FormCreateActivity: React.FC<FormCreateCompanyActivityProps> = ({ _id, edit, data, onSubmit, ...props }) => {
  const submitOptions = useAfterSubmitOptions();

  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useAppForm<IActivityFormData>({
    defaultValues: {
      ...data,
    },
    resolver: yupResolver(validation),
    reValidateMode: 'onSubmit',
  });

  function formEventWrapper(evHandler?: AppSubmitHandler<IActivityFormData>) {
    if (evHandler) {
      return handleSubmit(data => evHandler(data, { ...submitOptions.state }));
    }
  }

  return (
    <ModalForm
      onSubmit={formEventWrapper(onSubmit)}
      {...props}
      extraFooter={<FormAfterSubmitOptions {...submitOptions} />}
    >
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
