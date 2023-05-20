import ModalForm, { ModalFormProps } from 'components/ModalForm';
import {
  CategoriesTypesMap,
  CategoryTypes,
  ICategory,
  ICategoryFormData,
} from 'redux/categories/categories.types';
import React from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
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
    handleSubmit,
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
        <InputLabel label="Тип" error={errors.type} disabled>
          <InputText
            {...register('type')}
            value={CategoriesTypesMap[type]}
            disabled
          />
        </InputLabel>

        <InputLabel label="Назва" error={errors.label}>
          <InputText placeholder="Введіть назву" {...register('label')} />
        </InputLabel>

        <InputLabel label="Коментар" error={errors.description}>
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
