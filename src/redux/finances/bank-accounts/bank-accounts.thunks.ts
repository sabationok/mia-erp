import { FinanceApi } from '../../../api';
import { createAppAsyncThunk } from '../../createAppAsynkThunk';

enum BankAccountsThunkType {
  create = 'finances/createBankAccountThunk',
  update = 'finances/updateBankAccountThunk',
  getList = 'finances/getBankAccountsListThunk',
}

export const createBankAccountThunk = createAppAsyncThunk(BankAccountsThunkType.create, FinanceApi.bankAccounts.create);
export const updateBankAccountThunk = createAppAsyncThunk(BankAccountsThunkType.update, FinanceApi.bankAccounts.update);
export const getBankAccountsListThunk = createAppAsyncThunk(
  BankAccountsThunkType.getList,
  FinanceApi.bankAccounts.getAll
);
