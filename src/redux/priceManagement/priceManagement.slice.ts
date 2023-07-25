import { AnyAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { createTransactionThunk, getAllTransactionsThunk } from 'redux/transactions/transactions.thunks';
import { StateErrorType } from 'redux/reduxTypes.types';
import { IPriceList } from './priceManagement.types';
import { createPriceListThunk, getAllPriceListsThunk } from './priceManagement.thunks';

export interface IPriceListsState {
  lists: IPriceList[];
  filteredLists?: IPriceList[];
  isLoading: boolean;
  error: StateErrorType;
}

const initialState: IPriceListsState = {
  isLoading: false,
  error: null,
  lists: [],
  filteredLists: [],
};

export const priceManagementSlice = createSlice({
  name: 'priceLists',
  initialState,
  reducers: {},
  extraReducers: builder =>
    builder
      .addCase(getAllPriceListsThunk.fulfilled, (s, a) => {
        s.isLoading = false;
        const inputArr = a?.payload?.data && Array.isArray(a?.payload?.data) ? a?.payload?.data : [];

        if (a.payload?.refresh) {
          s.lists = [...inputArr];
          return;
        }
        s.lists = [...inputArr, ...s.lists];
      })
      .addCase(createPriceListThunk.fulfilled, (s, a) => {
        s.isLoading = false;
        console.log(a);

        s.lists = a.payload ? [a.payload, ...s.lists] : s.lists;
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

export const productsReducer = priceManagementSlice.reducer;

// [addTransactionThunk.fulfilled]: (s,a) => {
//   s.isloading = false;
//   s.lists.unshift(action.payload.data);
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
//   const index = s.lists.findIndex(el => el._id === payload.data._id);

//   s.lists[index] = { ...payload.data };

//   console.log(index, s.lists[index].isArchived);
// },
// [editTransactionThunk.pending]: (s,a) => {},
// [editTransactionThunk.rejected]: (s,a) => {},
