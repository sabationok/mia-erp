import { AnyAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { createTransactionThunk, getAllTransactionsThunk } from 'redux/transactions/transactions.thunks';
import { StateErrorType } from 'redux/reduxTypes.types';
import { IPriceList } from './priceManagement.types';
import * as thunks from './priceManagement.thunks';

export interface IPriceListsState {
  lists: IPriceList[];
  filteredLists?: IPriceList[];
  current?: IPriceList | null;
  isLoading: boolean;
  error: StateErrorType;
}

const initialState: IPriceListsState = {
  isLoading: false,
  error: null,
  lists: [],
  current: null,
  filteredLists: [],
};

export const priceManagementSlice = createSlice({
  name: 'priceLists',
  initialState,
  reducers: {},
  extraReducers: builder =>
    builder
      .addCase(thunks.getAllPriceListsThunk.fulfilled, (s, a) => {
        s.isLoading = false;
        const inputArr = a?.payload?.data && Array.isArray(a?.payload?.data) ? a?.payload?.data : [];

        if (a.payload?.refresh) {
          s.lists = [...inputArr];
          return;
        }
        s.lists = [...inputArr, ...s.lists];
      })
      .addCase(thunks.createPriceListThunk.fulfilled, (s, a) => {
        s.isLoading = false;
        if (a.payload) {
          s.lists = [a.payload, ...s.lists];
        }
      })
      .addCase(thunks.refreshPriceListByIdThunk.fulfilled, (s, a) => {
        const idx = s.lists.findIndex(l => l._id === a.payload?._id);
        if (idx >= 0 && a.payload) {
          s.lists.splice(idx, 1, a.payload);
        }
      })
      .addCase(thunks.updatePriceListByIdThunk.fulfilled, (s, a) => {
        const idx = s.lists.findIndex(l => l._id === 'p?._id');
        if (idx >= 0 && a.payload) {
          s.lists.splice(idx, 1, a.payload);
          console.log('updateList action', `idx-${idx}`, s.lists);
        }
      })
      .addCase(thunks.getPriceListByIdThunk.fulfilled, (s, a) => {
        s.current = a.payload;
      })
      .addCase(thunks.addPriceToListThunk.fulfilled, (s, a) => {
        s.current = a.payload;

        const idx = s.lists.findIndex(l => l._id === 'p?._id');
        if (idx >= 0 && a.payload) {
          s.lists.splice(idx, 1, a.payload);
          console.log('updateList action', `idx-${idx}`, s.lists);
        }
      })
      .addCase(thunks.deletePriceFromListThunk.fulfilled, (s, a) => {})
      .addCase(thunks.updatePriceInListThunk.fulfilled, (s, a) => {})

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
