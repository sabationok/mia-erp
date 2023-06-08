import { useTransactionsSelector } from 'redux/selectors.store';
import { AppDispatch, useAppDispatch } from 'redux/store.store';
import { ITransactionReqData } from './transactions.types';
import { ITransactionsState } from './transactions.slice';
import { ServiceDispatcher } from 'redux/global.types';
import { createTransactionThunk, getAllTransactionsThunk } from './transactions.thunks';
import { FilterReturnDataType } from '../../components/Filter/AppFilter';
import { useMemo } from 'react';
import { defaultThunkPayload } from '../../utils/fabrics';

export interface TransactionsService {
  dispatch: AppDispatch;
  state: ITransactionsState;
  create: ServiceDispatcher<ITransactionReqData>;
  deleteById: ServiceDispatcher<{ id: string }, { id: string }>;
  editById: ServiceDispatcher<ITransactionReqData>;
  getById: ServiceDispatcher<{ id: string }>;
  getAll: ServiceDispatcher<FilterReturnDataType>;
}

const useTransactionsService = (): TransactionsService => {
  const dispatch: AppDispatch = useAppDispatch();
  const state = useTransactionsSelector();

  const trService = useMemo((): Omit<TransactionsService, 'state' | 'dispatch'> => {
    return {
      create: payload => dispatch(createTransactionThunk(defaultThunkPayload(payload))),
      deleteById: payload => dispatch(() => {}),
      editById: payload => dispatch(() => {}),
      getById: payload => dispatch(() => {}),
      getAll: payload => dispatch(getAllTransactionsThunk(defaultThunkPayload(payload))),
    };
  }, [dispatch]);

  return {
    dispatch,
    state,
    ...trService,
  };
};

export type useTrServiceHookType = typeof useTransactionsService;
export default useTransactionsService as useTrServiceHookType;
