import { AnyAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { createTransactionThunk, getAllTransactionsThunk } from 'redux/transactions/transactions.thunks';
import { StateErrorType } from 'redux/reduxTypes.types';
import { IProduct } from './products.types';
import { createProductThunk, getAllProductsThunk } from './products.thunks';

export interface IProductsState {
  products: IProduct[];
  currentProduct?: IProduct;
  filteredProducts?: IProduct[];
  isLoading: boolean;
  error: StateErrorType;
}

const initialState: IProductsState = {
  isLoading: false,
  error: null,
  products: [],
  filteredProducts: [],
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: builder =>
    builder
      .addCase(getAllProductsThunk.fulfilled, (s, a) => {
        s.isLoading = false;
        if (Array.isArray(a.payload.data)) {
          if (a.payload.refresh) {
            s.products = a.payload.data;
            return;
          }
          s.products = [...a.payload.data, ...s.products];
        }
      })
      .addCase(createProductThunk.fulfilled, (s, a) => {
        s.isLoading = false;

        s.products = a.payload ? [a.payload, ...s.products] : s.products;
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

export const productsReducer = productsSlice.reducer;

// [addTransactionThunk.fulfilled]: (s,a) => {
//   s.isloading = false;
//   s.products.unshift(action.payload.data);
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
//   const index = s.products.findIndex(el => el._id === payload.data._id);

//   s.products[index] = { ...payload.data };

//   console.log(index, s.products[index].isArchived);
// },
// [editTransactionThunk.pending]: (s,a) => {},
// [editTransactionThunk.rejected]: (s,a) => {},
