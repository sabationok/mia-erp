import ModalForm, { ModalFormProps } from 'components/ModalForm/ModalForm';
import { CategoryTypes, ICategory } from 'data/categories.types';
import React from 'react';
import styled from 'styled-components';

export interface FormCreateCategoryProps extends Omit<ModalFormProps, 'onSubmit'> {
  _id?: string;
  type: CategoryTypes;
  owner?: Partial<ICategory>;
  edit?: boolean;
  onSubmit?: (data: CategoryFormData) => void;
}

export interface CategoryFormData extends Omit<ICategory, '_id' | 'createdAt' | 'updatedAt' | 'owner'> {
  owner?: string | null;
}

const FormCreateCategory: React.FC<FormCreateCategoryProps> = ({ type, owner, _id }) => {
  return (
    <ModalForm title={`${_id ? 'Редагувати' : 'Створити'} ${owner ? 'під-категорію' : 'категорію'}`}>
      <Inputs>
        {'category form'}
      </Inputs>
    </ModalForm>
  );
};

const Inputs = styled.div`
  display: flex;
  flex-direction: column;

  background-color: inherit;
`;

export default FormCreateCategory;
