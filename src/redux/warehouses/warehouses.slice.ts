import { AnyAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { createTransactionThunk, getAllTransactionsThunk } from 'redux/transactions/transactions.thunks';
import { StateErrorType } from 'redux/reduxTypes.types';
import { IVariation, IWarehouse } from './warehouses.types';
import { createWarehouseThunk, getAllWarehousesThunk } from './warehouses.thunks';

export interface IWarehouseState {
  warehouses: IWarehouse[];
  filteredLists?: IVariation[];
  isLoading: boolean;
  error: StateErrorType;
}

const initialState: IWarehouseState = {
  warehouses: [],
  filteredLists: [],
  isLoading: false,
  error: null,
};

export const warehousesSlice = createSlice({
  name: 'warehouses',
  initialState,
  reducers: {},
  extraReducers: builder =>
    builder
      .addCase(getAllWarehousesThunk.fulfilled, (s, a) => {
        s.isLoading = false;
        const inputArr = a?.payload?.data && Array.isArray(a?.payload?.data) ? a?.payload?.data : [];

        if (a.payload?.refresh) {
          s.warehouses = [...inputArr];
          return;
        }
        s.warehouses = [...inputArr, ...s.warehouses];
      })
      .addCase(createWarehouseThunk.fulfilled, (s, a) => {
        s.isLoading = false;
        if (a.payload) {
          s.warehouses = [a.payload, ...s.warehouses];
        }
      })
      // .addCase(refreshPriceListByIdThunk.fulfilled, (s, { payload: p }) => {
      //   const idx = s.warehouses.findIndex(l => l._id === p?._id);
      //   if (idx >= 0 && p) {
      //     s.warehouses.splice(idx, 1, p);
      //     console.log('refreshPriceListById action', `idx-${idx}`, s.warehouses);
      //   }
      // })
      // .addCase(updatePriceListByIdThunk.fulfilled, (s, p) => {
      //   const idx = s.warehouses.findIndex(l => l._id === 'p?._id');
      //   if (idx >= 0 && p.payload) {
      //     s.warehouses.splice(idx, 1, p.payload);
      //     console.log('updateList action', `idx-${idx}`, s.warehouses);
      //   }
      // })
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
