import ModalForm, { ModalFormProps } from 'components/ModalForm/ModalForm';
import { CategoriesTypesMap, CategoryTypes, ICategory, ICategoryFormData } from 'redux/categories/categories.types';
import React, { useState } from 'react';
import styled from 'styled-components';
import InputTextPrimary from '../../atoms/Inputs/InputTextPrimary';

export interface FormCreateCategoryProps extends Omit<ModalFormProps, 'onSubmit'> {
  _id?: string;
  type: CategoryTypes;
  category?: ICategory;
  owner?: Partial<ICategory>;
  edit?: boolean;
  onSubmit?: (data: ICategoryFormData) => void;
}


const FormCreateCategory: React.FC<FormCreateCategoryProps> = ({
                                                                 _id,
                                                                 type,
                                                                 owner,
                                                                 edit,
                                                                 category,
                                                                 onSubmit, ...props
                                                               }) => {
  const [formData, setFormData] = useState<ICategoryFormData | undefined>({
    ...category,
    type,
    owner: owner?._id || null,
  });

  function onFormDataChange(ev: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = ev.target;

    setFormData(prev => {
      console.log({ ...prev, [name]: value });
      return { ...prev, [name]: value };
    });
  }

  function formEventWrapper(evHandler?: (args: any) => void, args?: any) {
    if (evHandler) {
      return () => evHandler(args);
    }
  }


  return (
    <ModalForm onSubmit={formEventWrapper(onSubmit, formData)} {...props}>

      <Inputs>
        <InputTextPrimary label='Тип' name='type' placeholder={CategoriesTypesMap[type]} disabled />

        <InputTextPrimary
          label='Назва'
          name='label'
          placeholder='Введіть назву'
          onChange={onFormDataChange}
          value={formData?.label ? formData?.label : formData?.name ? formData?.name : ''}
        />

        <InputTextPrimary
          label='Коментар'
          name='descr'
          placeholder='Введіть коментар'
          onChange={onFormDataChange}
          value={formData?.descr ? formData?.descr : ''}
        />

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
