import { useTransactionsSelector } from 'redux/selectors.store';
import { AppDispatch, useAppDispatch } from 'redux/store.store';
import { ITransaction, ITransactionReqData } from './transactions.types';
import { ITransactionsState } from './transactions.slice';
import { ServiceApiCaller, ServiceDispatcher } from 'redux/global.types';
import { createTransactionThunk, getAllTransactionsThunk } from './transactions.thunks';
import { FilterReturnDataType as FilterData } from 'components/Filter/AppFilter';
import { useMemo } from 'react';
import { defaultApiCallPayload, defaultThunkPayload } from 'utils/fabrics';
import { createApiCall, TransactionsApi } from 'api';

export interface TransactionsService {
  dispatch: AppDispatch;
  state: ITransactionsState;
  create: ServiceDispatcher<ITransactionReqData>;
  deleteById: ServiceApiCaller<string, ITransaction>; // !!!!! ===>>> ServiceDispatcher
  editById: ServiceApiCaller<Required<ITransactionReqData>, ITransaction>; // !!!!! ===>>> ServiceDispatcher
  getById: ServiceApiCaller<string, ITransaction>;
  getAll: ServiceDispatcher<FilterData, ITransaction[]>;
}

const useTransactionsService = (): TransactionsService => {
  const dispatch: AppDispatch = useAppDispatch();
  const state = useTransactionsSelector();

  const trService = useMemo((): Omit<TransactionsService, 'state' | 'dispatch'> => {
    return {
      create: async payload => dispatch(createTransactionThunk(defaultThunkPayload(payload))),
      deleteById: async payload => createApiCall(defaultApiCallPayload(payload), TransactionsApi.deleteById),
      editById: async payload => createApiCall(defaultApiCallPayload(payload), TransactionsApi.editById),
      getById: async payload => createApiCall(defaultApiCallPayload(payload), TransactionsApi.getById),
      getAll: async payload => dispatch(getAllTransactionsThunk(defaultThunkPayload(payload))),
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
