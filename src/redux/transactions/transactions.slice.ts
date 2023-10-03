import { AnyAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createTransactionThunk, getAllTransactionsThunk } from 'redux/transactions/transactions.thunks';
import { StateErrorType } from 'redux/reduxTypes.types';
import { ITransaction } from 'redux/transactions/transactions.types';
import { checks } from '../../utils';

export interface ITransactionsState {
  transactions: ITransaction[];
  filteredTransactions?: ITransaction[];
  isLoading: boolean;
  error: StateErrorType;
}

const initialState: ITransactionsState = {
  isLoading: false,
  error: null,
  transactions: [],
  filteredTransactions: [],
};

export const transactionsSlice = createSlice({
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

export const transactionsReducer = transactionsSlice.reducer;
