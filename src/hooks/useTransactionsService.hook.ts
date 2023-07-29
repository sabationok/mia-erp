import { AppDispatch, useAppDispatch } from 'redux/store.store';
import { ITransaction, ITransactionReqData } from '../redux/transactions/transactions.types';
import { ServiceApiCaller, ServiceDispatcherAsync } from 'redux/global.types';
import { createTransactionThunk, getAllTransactionsThunk } from '../redux/transactions/transactions.thunks';
import { useMemo } from 'react';
import { defaultApiCallPayload, defaultThunkPayload } from 'utils/fabrics';
import { AppQueryParams, createApiCall, TransactionsApi } from 'api';

export interface TransactionsService {
  create: ServiceDispatcherAsync<ITransactionReqData, ITransaction>;
  deleteById: ServiceApiCaller<string, ITransaction>; // !!!!! ===>>> ServiceDispatcher
  updateById: ServiceApiCaller<ITransactionReqData, ITransaction>; // !!!!! ===>>> ServiceDispatcher
  getById: ServiceApiCaller<string, ITransaction>;
  getAll: ServiceDispatcherAsync<{ refresh?: boolean; query?: AppQueryParams }, ITransaction[]>;
}

const useTransactionsService = (): TransactionsService => {
  const dispatch: AppDispatch = useAppDispatch();

  return useMemo((): Omit<TransactionsService, 'state' | 'dispatch'> => {
    const { deleteById, updateById, getById } = TransactionsApi;
    return {
      create: async payload => dispatch(createTransactionThunk(defaultThunkPayload(payload))),
      deleteById: async payload => createApiCall(defaultApiCallPayload(payload), deleteById, TransactionsApi),
      updateById: async payload => createApiCall(defaultApiCallPayload(payload), updateById, TransactionsApi),
      getById: async payload => createApiCall(defaultApiCallPayload(payload), getById, TransactionsApi),
      getAll: async payload => dispatch(getAllTransactionsThunk(defaultThunkPayload(payload))),
    };
  }, [dispatch]);
};

export type useTrServiceHookType = typeof useTransactionsService;
export default useTransactionsService as useTrServiceHookType;
