import ModalForm, { ModalFormProps } from 'components/ModalForm';
import {
  CategoriesTypesMap,
  CategoryTypes,
  ICategory,
  ICategoryFormData,
} from 'redux/categories/categories.types';
import React, { useState } from 'react';
import styled from 'styled-components';
import InputTextPrimary from '../../atoms/Inputs/InputTextPrimary';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { FilterDataType } from '../../Filter/AppFilter';
import { ObjectShape } from 'yup';
import InputLabel from '../../atoms/Inputs/InputLabel';
import InputText from '../../atoms/Inputs/InputText';
import TextareaPrimary from '../../atoms/Inputs/TextareaPrimary';

export interface FormCreateCategoryProps
  extends Omit<ModalFormProps, 'onSubmit'> {
  _id?: string;
  type: CategoryTypes;
  category?: ICategory;
  owner?: Partial<ICategory>;
  edit?: boolean;
  onSubmit?: (data: ICategoryFormData) => void;
}

const validation = yup.object().shape({});

const FormCreateCategory: React.FC<FormCreateCategoryProps> = ({
  _id,
  type,
  owner,
  edit,
  category,
  onSubmit,
  ...props
}) => {
  const {
    formState: { errors },
    register,
    unregister,
    handleSubmit,
    setValue,
    getValues,
  } = useForm<ICategoryFormData>({
    defaultValues: {
      ...category,
      type,
      owner: owner?._id || null,
    },
    resolver: yupResolver(validation),
    reValidateMode: 'onSubmit',
  });

  function formEventWrapper(evHandler?: (args: any) => void, args?: any) {
    if (evHandler) {
      return handleSubmit(evHandler);
    }
  }

  return (
    <ModalForm onSubmit={formEventWrapper(onSubmit, getValues())} {...props}>
      <Inputs>
        <InputLabel label="Тип" disabled>
          <InputText
            {...register('type')}
            value={CategoriesTypesMap[type]}
            disabled
          />
        </InputLabel>

        <InputLabel label="Назва">
          <InputText placeholder="Введіть назву" {...register('label')} />
        </InputLabel>

        <InputLabel label="Коментар">
          <TextareaPrimary
            placeholder="Введіть коментар"
            {...register('description')}
          />
        </InputLabel>

        {/* <TextareaPrimary label="Опис" name="descr" onChange={onFormDataChange} placeholder="Введіть опис" /> */}
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
