import { AnyAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StateErrorType } from 'redux/reduxTypes.types';
import { IProduct } from '../../types/products.types';
import {
  createProductThunk,
  getAllInventoriesByProductIdThunk,
  getAllPricesByProductIdThunk,
  getAllProductsThunk,
  getProductFullInfoThunk,
  updateProductDefaultsThunk,
  updateProductThunk,
} from './products.thunks';
import {
  createVariationThunk,
  getAllVariationsByProductIdThunk,
  updateVariationThunk,
} from './variations/variations.thunks';
import { IVariationTemplate } from '../../types/properties.types';
import { createPropertyThunk, getAllPropertiesThunk } from './properties/properties.thunks';
import {
  clearCurrentProductAction,
  setCurrentProductInventoriesAction,
  setCurrentProductPricesAction,
  setCurrentProductVariationsAction,
} from './products.actions';
import { checks } from '../../utils';

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
        if (a.payload.refreshCurrent) {
          s.currentProduct = a.payload?.data;
        } else {
          s.currentProduct = { ...(s.currentProduct as IProduct), ...a.payload?.data };
        }
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
          s?.currentProduct?.variations?.unshift(a.payload);
        }
      })
      .addCase(updateProductDefaultsThunk.fulfilled, (s, a) => {
        if (a.payload?.updateCurrent && s.currentProduct) {
          s.currentProduct.defaults = a.payload.data?.defaults;
        } else if (a.payload?.refreshCurrent && s.currentProduct) {
          s.currentProduct = { ...s.currentProduct, ...a.payload?.data };
        }
      })
      .addCase(updateVariationThunk.fulfilled, (s, a) => {
        if (!a.payload) {
          return;
        } else if (s.currentProduct) {
          s.currentProduct.variations = s?.currentProduct?.variations?.map(vrn =>
            vrn._id === a.payload?._id ? a.payload : vrn
          );
        }
      })
      .addCase(getAllVariationsByProductIdThunk.fulfilled, (s, a) => {
        if (a.payload?.refreshCurrent) {
          s.currentProduct = { ...(s.currentProduct as IProduct), variations: a.payload.data };
        }
      })
      .addCase(getAllPricesByProductIdThunk.fulfilled, (s, a) => {
        if (a.payload?.refreshCurrent) {
          s.currentProduct = { ...(s.currentProduct as IProduct), prices: a.payload.data };
        }
      })
      .addCase(getAllInventoriesByProductIdThunk.fulfilled, (s, a) => {
        if (a.payload?.refreshCurrent) {
          s.currentProduct = { ...(s.currentProduct as IProduct), inventories: a.payload.data };
        }
      })
      .addCase(clearCurrentProductAction, s => {
        s.currentProduct = { _id: '' };
      })
      .addCase(setCurrentProductPricesAction, (s, a) => {
        s.currentProduct = {
          ...(s.currentProduct as IProduct),
          prices: a.payload.refresh
            ? a.payload?.data
            : s.currentProduct?.prices
            ? [...a.payload.data, ...s.currentProduct?.prices]
            : a.payload.data,
        };
      })
      .addCase(setCurrentProductVariationsAction, (s, a) => {
        s.currentProduct = {
          ...(s.currentProduct as IProduct),
          variations: a.payload.refresh
            ? a.payload?.data
            : s.currentProduct?.variations
            ? [...a.payload.data, ...s.currentProduct?.variations]
            : a.payload.data,
        };
      })
      .addCase(setCurrentProductInventoriesAction, (s, a) => {
        s.currentProduct = {
          ...(s.currentProduct as IProduct),
          inventories: a.payload.refresh
            ? a.payload?.data
            : s.currentProduct?.inventories
            ? [...a.payload.data, ...s.currentProduct?.inventories]
            : a.payload.data,
        };
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

function isProductsCase(type: string) {
  return checks.isStr(type) && type.startsWith('products');
}
function inPending(a: AnyAction) {
  return isProductsCase(a.type) && a.type.endsWith('pending');
}
function inFulfilled(a: AnyAction) {
  return isProductsCase(a.type) && a.type.endsWith('fulfilled');
}
function inError(a: AnyAction) {
  return isProductsCase(a.type) && a.type.endsWith('rejected');
}

export const productsReducer = productsSlice.reducer;
