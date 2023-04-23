// @flow
import * as React from 'react';
import { useState } from 'react';
import ModalForm, { FilterOpt, ModalFormProps } from '../ModalForm/ModalForm';
import InputTextPrimary from '../atoms/Inputs/InputTextPrimary';
import styled from 'styled-components';
import { ITransactionForReq, ITransactionReqData } from '../../redux/transactions/transactions.types';
import { CategoryTypes } from '../../redux/categories/categories.types';

export type TransactionsFilterOpt = FilterOpt<CategoryTypes>;

export interface Props extends Omit<ModalFormProps, 'onSubmit'> {
  edit?: boolean;
  copy?: boolean;
  id?: string;
  onSubmit?: (args: ITransactionReqData) => any;
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
    const { name, value } = ev.target;
    onFormDataChange({ name, value });
  }

  function onSubmitWrapper() {
    onSubmit && onSubmit({ data: formData });
  }

//  title={`${edit ? 'Редагувати' : 'Створити'} транзакцію`}
  return (
    <ModalForm
      onSubmit={onSubmitWrapper}
      defaultFilterValue={formData?.type}
      onOptSelect={(value) => onFormDataChange({ name: 'type', value })}
      {...props}>
      <Inputs>
        <GridWrapper gridTemplateColumns={'1fr'}>
          <InputTextPrimary
            label='Дата і час'
            type={'datetime-local'}
            name='transactionDate'
            placeholder='Дата і час'
            onChange={onInputChange}
          />
        </GridWrapper>

        <GridWrapper>
          <InputTextPrimary label='Сума' name='amount' placeholder='Сума' onChange={onInputChange} />
          <InputTextPrimary label='Валюта' name='currency' placeholder='Валюта' onChange={onInputChange} />
        </GridWrapper>

        <InputTextPrimary label='Рахунок IN' name='countIn' placeholder='Рахунок IN' onChange={onInputChange} />
        <InputTextPrimary label='Суб-Рахунок IN' name='subCountIn' placeholder='Суб-Рахунок IN'
                          onChange={onInputChange} />

        <InputTextPrimary label='Рахунок OUT' name='countOut' placeholder='Рахунок' onChange={onInputChange} />
        <InputTextPrimary label='Суб-Рахунок OUT' name='subCountOut' placeholder='Рахунок' onChange={onInputChange} />

        <InputTextPrimary label='Категорія' name='category' placeholder='Категорія' onChange={onInputChange} />
        <InputTextPrimary label='Під-категорія' name='subCategory' placeholder='Під-категорія'
                          onChange={onInputChange} />

        <InputTextPrimary label='Контрагент' name='contractor' placeholder='Контрагент' onChange={onInputChange} />
        <InputTextPrimary label='Проєкт' name='project' placeholder='Проєкт' onChange={onInputChange} />
        <InputTextPrimary label='Документ' name='document' placeholder='Документ' onChange={onInputChange} />

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
const GridWrapper = styled.div<{ gridTemplateColumns?: string }>`
  display: grid;
  grid-template-columns:${({ gridTemplateColumns }) => gridTemplateColumns || '1fr 80px'};
  gap: 12px;
`;
export default TransactionForm;