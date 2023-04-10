import ModalForm, { ModalFormProps } from 'components/ModalForm/ModalForm';
import styled from 'styled-components';
import { CountType, ICount } from 'data/counts.types';
import React, { useState } from 'react';
import InputTextPrimary from 'components/atoms/Inputs/InputTextPrimary';

export interface FormCreateCountProps extends Omit<ModalFormProps, 'onSubmit'> {
  _id?: string;
  owner?: Partial<ICount>;
  type: CountType;
  edit?: boolean;
  create?: boolean;
  count?: Partial<ICount>;
  onSubmit?: (data: CountFormData) => void;
}

export interface CountFormData extends Omit<ICount, '_id' | 'createdAt' | 'updatedAt' | 'owner'> {
  owner?: string | null;

}

const FormCreateCount: React.FC<FormCreateCountProps> = ({
                                                           owner,
                                                           create,
                                                           type,
                                                           count,
                                                           edit,
                                                           _id,
                                                           onSubmit,
                                                           ...props
                                                         }) => {
  const [formData, setFormData] = useState<CountFormData | undefined>({ ...count, type, owner: owner?._id || null });

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
    <ModalForm onSubmit={formEventWrapper(onSubmit, formData)} {...props} >
      <Inputs>
        <InputTextPrimary label='Тип' name='type' defaultValue={type} disabled />

        <InputTextPrimary
          label='Назва'
          name='name'
          placeholder='Введіть назву'
          onChange={onFormDataChange}
          value={formData?.label ? formData?.label : formData?.name ? formData?.name : ''}
        />

        <InputTextPrimary
          label='Баланс'
          name='amount'
          type='number'
          placeholder='Введіть початковий баланс'
          onChange={onFormDataChange}
          disabled={!create}
          value={formData?.balance ? formData?.balance : ''}
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

export default FormCreateCount;
