import { AnyAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StateErrorType } from 'redux/reduxTypes.types';
import { IProduct } from './products.types';
import {
  createProductThunk,
  getAllProductsThunk,
  getProductFullInfoThunk,
  updateProductThunk,
} from './products.thunks';
import { createVariationThunk, getAllVariationsByProductIdThunk } from './variations.thunks';
import { IVariationTemplate } from './properties.types';
import { createPropertyThunk, getAllPropertiesThunk } from './properties.thunks';
import { clearCurrentProductAction } from './products.actions';

export interface IProductsState {
  products: IProduct[];
  currentProduct?: IProduct;
  filteredProducts?: IProduct[];
  properties: IVariationTemplate[];
  isLoading: boolean;
  error: StateErrorType;
}

const initialState: IProductsState = {
  isLoading: false,
  error: null,
  products: [],
  currentProduct: undefined,
  filteredProducts: [],
  properties: [],
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: builder =>
    builder
      .addCase(getAllProductsThunk.fulfilled, (s, a) => {
        if (Array.isArray(a.payload.data)) {
          if (a.payload.refresh) {
            s.products = a.payload.data;
            return;
          } else {
            s.products = [...a.payload.data, ...s.products];
          }
        }
      })
      .addCase(createProductThunk.fulfilled, (s, a) => {
        s.products = a.payload?.data ? [a.payload.data, ...s.products] : s.products;
      })
      .addCase(updateProductThunk.fulfilled, (s, a) => {
        if (a.payload?.refreshCurrent) {
          s.currentProduct = { ...(s.currentProduct as IProduct), ...a.payload.data };
        }
      })
      .addCase(getProductFullInfoThunk.fulfilled, (s, a) => {
        s.currentProduct = a.payload;
      })
      .addCase(getAllPropertiesThunk.fulfilled, (s, a) => {
        if (a.payload) {
          s.properties = a.payload;
        }
      })
      .addCase(createPropertyThunk.fulfilled, (s, a) => {
        if (a.payload) {
          s.properties = a.payload;
        }
      })
      .addCase(createVariationThunk.fulfilled, (s, a) => {
        if (!a.payload) {
          return;
        } else {
          console.log('createVariationThunk', a.payload);

          s?.currentProduct?.variations?.unshift(a.payload);
        }
      })
      .addCase(getAllVariationsByProductIdThunk.fulfilled, (s, a) => {
        if (a.payload?.refreshCurrent) {
          s.currentProduct = { ...(s.currentProduct as IProduct), variations: a.payload.data };
        }
      })
      .addCase(clearCurrentProductAction, s => {
        s.currentProduct = { _id: '' };
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

function inPending(a: AnyAction) {
  return a.type.endsWith('pending');
}
function inFulfilled(a: AnyAction) {
  return a.type.endsWith('fulfilled');
}
function inError(a: AnyAction) {
  return a.type.endsWith('rejected');
}

export const productsReducer = productsSlice.reducer;
