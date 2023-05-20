import ModalForm, { ModalFormProps } from 'components/ModalForm';
import React from 'react';
import styled from 'styled-components';
import {
  IActivity,
  IActivityFormData,
} from 'redux/companyActivities/activities.types';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import InputLabel from '../../atoms/Inputs/InputLabel';
import InputText from '../../atoms/Inputs/InputText';
import TextareaPrimary from '../../atoms/Inputs/TextareaPrimary';

const validation = yup.object().shape({});

export interface FormCreateCompanyActivityProps
  extends Omit<ModalFormProps, 'onSubmit'> {
  _id?: string;
  activity?: IActivity;
  owner?: Partial<IActivity>;
  edit?: boolean;
  onSubmit?: SubmitHandler<IActivityFormData>;
}

const FormCreateActivity: React.FC<FormCreateCompanyActivityProps> = ({
  owner,
  _id,
  edit,
  activity,
  onSubmit,
  ...props
}) => {
  const {
    formState: { errors },
    register,
    // unregister,
    // handleSubmit,
    // setValue,
    getValues,
  } = useForm<IActivityFormData>({
    defaultValues: {
      ...activity,
    },
    resolver: yupResolver(validation),
    reValidateMode: 'onSubmit',
  });
  console.log(getValues());
  return (
    <ModalForm
      onSubmit={() => {
        console.log(getValues());
      }}
      {...props}
    >
      <Inputs>
        <InputLabel label="Назва" error={errors.label}>
          <InputText placeholder="Введіть назву" {...register('label')} />
        </InputLabel>

        <InputLabel label="Коментар" error={errors.descr}>
          <TextareaPrimary
            placeholder="Введіть коментар"
            {...register('descr')}
          />
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
