import { AnyAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createTransactionThunk, getAllTransactionsThunk } from 'redux/finances/transactions.thunks';
import { StateErrorType } from 'redux/reduxTypes.types';
import { ITransaction } from 'types/finances/transactions.types';
import { checks } from '../../utils';
import { FinAccountEntity } from '../../types/finances/fin-accounts.types';
import { BankAccountEntity } from '../../types/finances/bank-accounts.types';
import {
  createBankAccountThunk,
  getBankAccountsListThunk,
  updateBankAccountThunk,
} from './bank-accounts/bank-accounts.thunks';

export interface IFinTransactionsState {
  transactions: ITransaction[];
  filteredTransactions?: ITransaction[];
  bankAccounts: BankAccountEntity[];
  finCounts: FinAccountEntity[];
  isLoading: boolean;
  error: StateErrorType;
}

const initialState: IFinTransactionsState = {
  isLoading: false,
  error: null,
  transactions: [],
  filteredTransactions: [],
  bankAccounts: [],
  finCounts: [],
};

export const financesSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {},
  extraReducers: builder =>
    builder
      .addCase(getAllTransactionsThunk.fulfilled, (s, a) => {
        s.isLoading = false;
        if (Array.isArray(a.payload.data)) {
          if (a.payload.refresh) {
            s.transactions = a.payload.data;
            return;
          }
          s.transactions = [...a.payload.data, ...s.transactions];
        }
      })
      .addCase(createTransactionThunk.fulfilled, (s, a) => {
        s.isLoading = false;

        s.transactions = a.payload ? [a.payload, ...s.transactions] : s.transactions;
      })
      .addCase(createBankAccountThunk.fulfilled, (s, a) => {
        s.bankAccounts.push(a.payload.data);
      })
      .addCase(updateBankAccountThunk.fulfilled, (s, a) => {
        s.bankAccounts.map(item => {
          if (item._id === a.payload.data._id) {
            return { ...item, ...a.payload.data };
          } else {
            return item;
          }
        });
      })
      .addCase(getBankAccountsListThunk.fulfilled, (s, a) => {
        if (a.payload.update && a.payload.data) {
          s.bankAccounts = s.bankAccounts.concat(a.payload.data);
        } else {
          s.bankAccounts = a.payload.data ?? [];
        }
      })
      .addMatcher(inPending, s => {
        s.isLoading = true;
        s.error = null;
      })
      .addMatcher(inFulfilled, s => {
        s.isLoading = false;
        s.error = null;
      })
      .addMatcher(inError, (s, a: PayloadAction<StateErrorType>) => {
        s.isLoading = false;
        s.error = a.payload;
      }),
});
function isTransactionsCase(type: string) {
  return checks.isStr(type) && type.startsWith('transactions');
}
function inPending(a: AnyAction) {
  return isTransactionsCase(a.type) && a.type.endsWith('pending');
}
function inFulfilled(a: AnyAction) {
  return isTransactionsCase(a.type) && a.type.endsWith('fulfilled');
}
function inError(a: AnyAction) {
  return isTransactionsCase(a.type) && a.type.endsWith('rejected');
}

export const transactionsReducer = financesSlice.reducer;
