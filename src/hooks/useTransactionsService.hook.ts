import { AppDispatch, useAppDispatch } from 'redux/store.store';
import { ITransaction, ITransactionReqData } from '../types/finances/transactions.types';
import { ServiceApiCaller, ServiceDispatcherAsync } from 'redux/app-redux.types';
import { createTransactionThunk, getAllTransactionsThunk } from '../redux/finances/transactions.thunks';
import { useMemo } from 'react';
import { defaultApiCallPayload, defaultThunkPayload } from 'utils/fabrics';
import { ApiQueryParams, createApiCall, TransactionsApi } from 'api';
import { BankAccountReqData, IBankAccount } from '../types/finances/bank-accounts.types';
import { createBankAccountThunk, getBankAccountsListThunk } from '../redux/finances/bank-accounts/bank-accounts.thunks';

export interface UseBankAccountsService {
  create: ServiceDispatcherAsync<BankAccountReqData, IBankAccount>;
  // update: ServiceApiCaller<BankAccountReqData, IBankAccount>; // !!!!! ===>>> ServiceDispatcher
  getList: ServiceDispatcherAsync<{ update?: boolean; query?: ApiQueryParams }, IBankAccount[]>;
}
export interface UseFinancesService {
  create: ServiceDispatcherAsync<ITransactionReqData, ITransaction>;
  deleteById: ServiceApiCaller<string, ITransaction>; // !!!!! ===>>> ServiceDispatcher
  updateById: ServiceApiCaller<ITransactionReqData, ITransaction>; // !!!!! ===>>> ServiceDispatcher
  getById: ServiceApiCaller<string, ITransaction>;
  getAll: ServiceDispatcherAsync<{ refresh?: boolean; query?: ApiQueryParams }, ITransaction[]>;

  bankAccounts: UseBankAccountsService;
}

const useFinancesService = (): UseFinancesService => {
  const dispatch: AppDispatch = useAppDispatch();

  return useMemo((): Omit<UseFinancesService, 'state' | 'dispatch'> => {
    const { deleteById, updateById, getById } = TransactionsApi;
    return {
      create: payload => dispatch(createTransactionThunk(defaultThunkPayload(payload))),
      deleteById: payload => createApiCall(defaultApiCallPayload(payload), deleteById, TransactionsApi),
      updateById: payload => createApiCall(defaultApiCallPayload(payload), updateById, TransactionsApi),
      getById: payload => createApiCall(defaultApiCallPayload(payload), getById, TransactionsApi),
      getAll: payload => dispatch(getAllTransactionsThunk(defaultThunkPayload(payload))),

      bankAccounts: {
        create: args => dispatch(createBankAccountThunk(defaultThunkPayload(args))),
        getList: args => dispatch(getBankAccountsListThunk(defaultThunkPayload(args))),
      },
    };
  }, [dispatch]);
};

export default useFinancesService;
