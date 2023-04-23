// @flow
import * as React from 'react';
import ModalForm, { ModalFormProps } from '../ModalForm/ModalForm';
import useTransactionsService from 'redux/transactions/useTransactionsService.hook';

export interface Props extends Omit<ModalFormProps, 'onSubmit'> {
  edit?: boolean;
  id?: string;
  onSubmit?: (args: any) => any;
};
const TransactionForm: React.FC<Props> = ({ edit, onSubmit }) => {
  const transactionsService = useTransactionsService();
  return (
    <ModalForm title={`${edit ? 'Редагувати' : 'Створити'} транзакцію`} onSubmit={onSubmit}>
      TransactionForm
    </ModalForm>
  );
};

export default TransactionForm;