import { useTransactionsSelector } from 'redux/selectors.store';
import { useAppDispatch } from 'redux/store.store';
import useTrFilterSelectors from './useTrFilterSelectors.hook';
import {
  ITransaction,
  ITransactionForReq,
  ITransactionReqData,
} from './transactions.types';
import { useTransactionsActions } from '../../data';
import { ITransactionsState } from './transactions.slice';

const useTransactionsService = () => {
  const dispatch = useAppDispatch();
  const state = useTransactionsSelector();

  function getById(id: string) {
    return state.transactions.find(el => el._id === id);
  }

  function create(data: ITransactionForReq) {
    console.log('create tr', data);
  }

  function deleteById(id: string) {
    console.log('deleteTrById', id);
  }

  function editById({ _id, data }: ITransactionReqData) {
    console.log('editTrById', { _id, data });
  }

  return {
    dispatch,
    state,
    create,
    deleteById,
    editById,
    getById,
  };
};

export type TransactionsService = ReturnType<useTrServiceHookType>;

export type useTrServiceHookType = typeof useTransactionsService;
export default useTransactionsService as useTrServiceHookType;
