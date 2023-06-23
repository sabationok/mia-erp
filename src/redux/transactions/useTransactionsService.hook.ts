import { useTransactionsSelector } from 'redux/selectors.store';
import { AppDispatch, useAppDispatch } from 'redux/store.store';
import { ITransaction, ITransactionReqData } from './transactions.types';
import { ITransactionsState } from './transactions.slice';
import { ServiceApiCaller, ServiceDispatcherAsync } from 'redux/global.types';
import { createTransactionThunk, getAllTransactionsThunk } from './transactions.thunks';
import { FilterReturnDataType as FilterData } from 'components/Filter/AppFilter';
import { useMemo } from 'react';
import { defaultApiCallPayload, defaultThunkPayload } from 'utils/fabrics';
import { createApiCall, TransactionsApi } from 'api';

export interface TransactionsService {
  dispatch: AppDispatch;
  state: ITransactionsState;
  create: ServiceDispatcherAsync<ITransactionReqData>;
  deleteById: ServiceApiCaller<string, ITransaction>; // !!!!! ===>>> ServiceDispatcher
  editById: ServiceApiCaller<Required<ITransactionReqData>, ITransaction>; // !!!!! ===>>> ServiceDispatcher
  getById: ServiceApiCaller<string, ITransaction>;
  getAll: ServiceDispatcherAsync<FilterData, ITransaction[]>;
}

const useTransactionsService = (): TransactionsService => {
  const dispatch: AppDispatch = useAppDispatch();
  const state = useTransactionsSelector();

  const dispatchers = useMemo((): Omit<TransactionsService, 'state' | 'dispatch'> => {
    const { deleteById, editById, getById } = TransactionsApi;
    return {
      create: async payload => dispatch(createTransactionThunk(defaultThunkPayload(payload))),
      deleteById: async payload => createApiCall(defaultApiCallPayload(payload), deleteById, TransactionsApi),
      editById: async payload => createApiCall(defaultApiCallPayload(payload), editById, TransactionsApi),
      getById: async payload => createApiCall(defaultApiCallPayload(payload), getById, TransactionsApi),
      getAll: async payload => dispatch(getAllTransactionsThunk(defaultThunkPayload(payload))),
    };
  }, [dispatch]);

  return {
    dispatch,
    state,
    ...dispatchers,
  };
};

export type useTrServiceHookType = typeof useTransactionsService;
export default useTransactionsService as useTrServiceHookType;
