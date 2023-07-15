import ModalForm from 'components/ModalForm';
import { CategoryTypes, ICategory, ICategoryFormData } from 'redux/directories/categories.types';
import React from 'react';
import styled from 'styled-components';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import InputLabel from '../atoms/Inputs/InputLabel';
import InputText from '../atoms/Inputs/InputText';
import TextareaPrimary from '../atoms/Inputs/TextareaPrimary';
import t from '../../lang';
import { DirectoriesFormProps } from '../Directories/dir.types';

export interface FormCreateCategoryProps extends DirectoriesFormProps<CategoryTypes, ICategory, ICategoryFormData> {}

const validation = yup.object().shape({
  label: yup.string().required(),
  description: yup.string().max(250).optional(),
});

const FormCreateCategory: React.FC<FormCreateCategoryProps> = ({
  _id,
  type,
  parent,
  edit,
  data,
  onSubmit,
  ...props
}) => {
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<ICategoryFormData>({
    defaultValues: parent?._id
      ? {
          ...data,
          type,
          parent: { _id: parent?._id },
        }
      : {
          ...data,
          type,
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
        <InputLabel label={t('type')} direction={'vertical'} error={errors.type} disabled>
          <InputText defaultValue={type ? t(`${type}S`).toUpperCase() : type} disabled />
        </InputLabel>

        {parent && (
          <InputLabel label={t('parentItem')} direction={'vertical'} error={errors.type} disabled>
            <InputText defaultValue={parent?.label} disabled />
          </InputLabel>
        )}

        <InputLabel label={t('label')} direction={'vertical'} error={errors.label}>
          <InputText placeholder={t('insertLabel')} {...register('label')} autoFocus />
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

export default FormCreateCategory;
