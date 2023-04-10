import { useTransactionsSelector } from 'redux/selectors.store';
import { useAppDispatch } from 'redux/store.store';
import useTrFilterSelectors from './useTrFilterSelectors.hook';
import { ITransaction } from '../../data/transactions.types';

const useTransactionsService = () => {
  const dispatch = useAppDispatch();
  const state = useTransactionsSelector();

  function create(data: ITransaction) {
    console.log('create tr', data);
  }

  function deleteById(id: string) {
    console.log('deleteTrById', id);
  }

  function editById(id: string, newData: ITransaction) {
    console.log('editTrById', id, newData);
  }


  return { dispatch, ...state, create, deleteById, editById, useFilterSelectors: useTrFilterSelectors };
};
export type TransactionsService = typeof useTransactionsService;
export default useTransactionsService as TransactionsService;
