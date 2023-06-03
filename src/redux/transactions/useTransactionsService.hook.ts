import { useTransactionsSelector } from 'redux/selectors.store';
import { AppDispatch, useAppDispatch } from 'redux/store.store';
import { ITransactionReqData } from './transactions.types';
import { ITransactionsState } from './transactions.slice';
import { ServiceDispatcher } from 'redux/global.types';
import { createTransactionThunk, getAllTransactionsThunk } from './transactions.thunks';

export interface TransactionsService {
  dispatch: AppDispatch;
  state: ITransactionsState;
  create: ServiceDispatcher<ITransactionReqData>;
  deleteById: ServiceDispatcher<{ id: string }>;
  editById: ServiceDispatcher<ITransactionReqData>;
  getById: ServiceDispatcher<{ id: string }>;
  getAll: ServiceDispatcher;
}

const useTransactionsService = (): TransactionsService => {
  const dispatch = useAppDispatch();
  const state = useTransactionsSelector();

  return {
    create: payload => dispatch(createTransactionThunk(payload)),
    deleteById: payload => dispatch(() => {}),
    editById: payload => dispatch(() => {}),
    getById: payload => dispatch(() => {}),
    getAll: () => dispatch(getAllTransactionsThunk({})),
    dispatch,
    state,
  };
};

export type useTrServiceHookType = typeof useTransactionsService;
export default useTransactionsService as useTrServiceHookType;
