import ModalForm from 'components/ModalForm';
import React from 'react';
import styled from 'styled-components';
import { IActivity, IActivityFormData } from 'redux/companyActivities/activities.types';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import InputLabel from '../atoms/Inputs/InputLabel';
import InputText from '../atoms/Inputs/InputText';
import TextareaPrimary from '../atoms/Inputs/TextareaPrimary';
import { DirectoriesFormProps } from '../Directories/dir.types';
import { AppSubmitHandler } from '../../hooks/useAppForm.hook';
import FormAfterSubmitOptions from './components/FormAfterSubmitOptions';
import { useAppForm } from '../../hooks';

const validation = yup.object().shape({});

export interface FormCreateCompanyActivityProps extends DirectoriesFormProps<any, IActivity, IActivityFormData> {}

const FormCreateActivity: React.FC<FormCreateCompanyActivityProps> = ({ _id, edit, data, onSubmit, ...props }) => {
  const {
    formState: { errors },
    register,
    handleSubmit,
    closeAfterSave,
    clearAfterSave,
    toggleAfterSubmitOption,
  } = useAppForm<IActivityFormData>({
    defaultValues: {
      ...data,
    },
    resolver: yupResolver(validation),
    reValidateMode: 'onSubmit',
  });

  function formEventWrapper(evHandler?: AppSubmitHandler<IActivityFormData>) {
    if (evHandler) {
      return handleSubmit(data => evHandler(data, { clearAfterSave, closeAfterSave }));
    }
  }

  return (
    <ModalForm
      onSubmit={formEventWrapper(onSubmit)}
      {...props}
      extraFooter={
        <FormAfterSubmitOptions
          closeAfterSave={closeAfterSave}
          clearAfterSave={clearAfterSave}
          toggleOption={toggleAfterSubmitOption}
        />
      }
    >
      <Inputs>
        <InputLabel label="Назва" error={errors.label}>
          <InputText placeholder="Введіть назву" {...register('label')} />
        </InputLabel>
        <InputLabel label="Коментар" error={errors.description}>
          <TextareaPrimary placeholder="Введіть коментар" {...register('description')} />
        </InputLabel>
        ;
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
