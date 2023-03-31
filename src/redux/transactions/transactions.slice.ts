import { AnyAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  getAllTransactionsThunk,
  // addManyTransactionsThunk,
  // addTransactionThunk,
  // deleteTransactionThunk,
  // editTransactionThunk,
} from 'redux/transactions/transactions.thunks';
import { transactionsMockData } from 'data';
import { StateErrorType } from 'redux/reduxTypes.types';
import { ITransaction } from 'data/transactions.types';

export interface ITransactionsState {
  transactions: ITransaction[];
  filteredTransactions?: ITransaction[];
  isLoading: boolean;
  error: StateErrorType;
}

const initialState: ITransactionsState = {
  isLoading: false,
  error: null,
  transactions: [...transactionsMockData],
  filteredTransactions: [...transactionsMockData],
};

export const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {},
  extraReducers: builder =>
    builder
      .addCase(getAllTransactionsThunk.fulfilled, (state, action) => {
        state.isLoading = false;

        state.transactions = action.payload;
      })
      .addMatcher(inPending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addMatcher(inError, (state, action: PayloadAction<StateErrorType>) => {
        state.isLoading = false;
        state.error = action.payload;
      }),
});

function inPending(action: AnyAction) {
  return action.type.endsWith('pending');
}
function inError(action: AnyAction) {
  return action.type.endsWith('rejected');
}

export const transactionsReducer = transactionsSlice.reducer;

// [addTransactionThunk.fulfilled]: (state, action) => {
//   state.isloading = false;
//   state.transactions.unshift(action.payload.data);
// },
// [addTransactionThunk.pending]: (state, action) => {
//   state.isloading = true;
// },
// [addTransactionThunk.rejected]: (state, action) => {
//   state.isloading = false;
//   state.error = action.payload;
// },

// [deleteTransactionThunk.fulfilled]: (state, action) => {
//   state.isLoading = false;
// },
// [deleteTransactionThunk.pending]: (state, action) => {
//   state.isLoading = true;
// },
// [deleteTransactionThunk.rejected]: (state, action) => {
//   state.isLoading = false;
// },

// [editTransactionThunk.fulfilled]: (state, { payload }) => {
//   state.isLoading = false;
//   const index = state.transactions.findIndex(el => el._id === payload.data._id);

//   state.transactions[index] = { ...payload.data };

//   console.log(index, state.transactions[index].isArchived);
// },
// [editTransactionThunk.pending]: (state, action) => {},
// [editTransactionThunk.rejected]: (state, action) => {},
