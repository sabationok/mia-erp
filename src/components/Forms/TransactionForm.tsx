// @flow
import * as React from 'react';
import { useState } from 'react';
import ModalForm, { FilterOpt, ModalFormProps } from '../ModalForm/ModalForm';
import InputTextPrimary from '../atoms/Inputs/InputTextPrimary';
import styled from 'styled-components';
import { ITransactionForReq } from '../../redux/transactions/transactions.types';
import { CategoryTypes } from '../../redux/categories/categories.types';

export type TransactionsFilterOpt = FilterOpt<CategoryTypes>;

export interface Props extends Omit<ModalFormProps, 'onSubmit'> {
  edit?: boolean;
  copy?: boolean;
  id?: string;
  onSubmit?: (args: any) => any;
  filterOptions?: TransactionsFilterOpt[];
  defaultState?: Partial<ITransactionForReq>;
};

const TransactionForm: React.FC<Props> = ({ edit, onSubmit, copy, defaultState, ...props }) => {
  const [formData, setFormData] = useState<ITransactionForReq>({ ...defaultState });

  function onFormDataChange({ name, value }: { name: string, value: string | number | Date }) {
    setFormData(prev => {
      console.log('onFormDataChange', { ...prev, [name]: value });
      return ({ ...prev, [name]: value });
    });
  }

  function onInputChange(ev: React.ChangeEvent<HTMLInputElement>) {
    onFormDataChange({ ...ev.target });
  }

  function onSubmitWrapper() {
    onSubmit && onSubmit(formData);
  }

//  title={`${edit ? 'Редагувати' : 'Створити'} транзакцію`}
  return (
    <ModalForm
      onSubmit={onSubmitWrapper}
      defaultFilterValue={formData?.type}
      onOptSelect={(value) => onFormDataChange({ name: 'type', value })}
      {...props}>
      <Inputs>
        <InputTextPrimary label='Сума' name='amount' placeholder='Сума' onChange={onInputChange} />

        <InputTextPrimary label='Рахунок IN' name='countIn' placeholder='Рахунок IN' onChange={onInputChange} />
        <InputTextPrimary label='Суб-Рахунок IN' name='subCountIn' placeholder='Суб-Рахунок IN'
                          onChange={onInputChange} />

        <InputTextPrimary label='Рахунок' name='countOut' placeholder='Рахунок' onChange={onInputChange} />
        <InputTextPrimary label='Рахунок' name='subCountOut' placeholder='Рахунок' onChange={onInputChange} />
        <InputTextPrimary label='Рахунок' name='' placeholder='Рахунок' onChange={onInputChange} />
        <InputTextPrimary label='Рахунок' name='' placeholder='Рахунок' onChange={onInputChange} />

        <InputTextPrimary label='Коментар' name='comment' placeholder='Коментар' onChange={onInputChange} />
      </Inputs>
    </ModalForm>
  );
};
const Inputs = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  padding: 12px;
`;
export default TransactionForm;