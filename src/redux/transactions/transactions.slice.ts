import { AnyAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getAllTransactionsThunk } from 'redux/transactions/transactions.thunks';
import { StateErrorType } from 'redux/reduxTypes.types';
import { ITransaction } from 'redux/transactions/transactions.types';

export interface ITransactionsState {
  transactions: ITransaction[];
  filteredTransactions?: ITransaction[];
  isLoading: boolean;
  error: StateErrorType;
}

const initialState: ITransactionsState = {
  isLoading: false,
  error: null,
  transactions: [...[]],
  filteredTransactions: [...[]],
};

export const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {},
  extraReducers: builder =>
    builder
      .addCase(getAllTransactionsThunk.fulfilled, (s, a) => {
        s.isLoading = false;

        s.transactions = [...s.transactions, ...a.payload];
      })
      .addMatcher(inPending, s => {
        s.isLoading = true;
        s.error = null;
      })
      .addMatcher(inError, (s, a: PayloadAction<StateErrorType>) => {
        s.isLoading = false;
        s.error = a.payload;
      }),
});

function inPending(a: AnyAction) {
  return a.type.endsWith('pending');
}

function inError(a: AnyAction) {
  return a.type.endsWith('rejected');
}

export const transactionsReducer = transactionsSlice.reducer;

// [addTransactionThunk.fulfilled]: (s,a) => {
//   s.isloading = false;
//   s.transactions.unshift(action.payload.data);
// },
// [addTransactionThunk.pending]: (s,a) => {
//   s.isloading = true;
// },
// [addTransactionThunk.rejected]: (s,a) => {
//   s.isloading = false;
//   s.error =a.payload;
// },

// [deleteTransactionThunk.fulfilled]: (s,a) => {
//   s.isLoading = false;
// },
// [deleteTransactionThunk.pending]: (s,a) => {
//   s.isLoading = true;
// },
// [deleteTransactionThunk.rejected]: (s,a) => {
//   s.isLoading = false;
// },

// [editTransactionThunk.fulfilled]: (s, { payload }) => {
//   s.isLoading = false;
//   const index = s.transactions.findIndex(el => el._id === payload.data._id);

//   s.transactions[index] = { ...payload.data };

//   console.log(index, s.transactions[index].isArchived);
// },
// [editTransactionThunk.pending]: (s,a) => {},
// [editTransactionThunk.rejected]: (s,a) => {},
