import { AnyAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { createTransactionThunk, getAllTransactionsThunk } from 'redux/transactions/transactions.thunks';
import { StateErrorType } from 'redux/reduxTypes.types';
import { IWarehouse } from '../../types/warehousing/warehouses.types';
import { createWarehouseThunk, getAllWarehousesThunk, getWarehouseByIdThunk } from './warehouses.thunks';
import { checks } from '../../utils';

export interface IWarehouseState {
  warehouses: IWarehouse[];
  current?: IWarehouse;
  filteredLists?: IWarehouse[];
  isLoading: boolean;
  error: StateErrorType;
}

const initialState: IWarehouseState = {
  warehouses: [],
  current: {
    _id: '',
    label: '',
    inventories: [],
  },
  filteredLists: [],
  isLoading: false,
  error: null,
};

export const warehousesSlice = createSlice({
  name: 'warehouses',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getAllWarehousesThunk.fulfilled, (s, a) => {
        const inputArr = a?.payload?.data && Array.isArray(a?.payload?.data) ? a?.payload?.data : [];

        if (a.payload?.refresh) {
          s.warehouses = [...inputArr];
          return;
        }
        s.warehouses = [...inputArr, ...s.warehouses];
      })
      .addCase(createWarehouseThunk.fulfilled, (s, a) => {
        if (a.payload) {
          s.warehouses = [a.payload, ...s.warehouses];
        }
      })
      .addCase(getWarehouseByIdThunk.fulfilled, (s, a) => {
        if (a.payload) {
          s.current = a.payload;
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
      });
  },
});
function isWarehousingCase(type: string) {
  return checks.isStr(type) && type.startsWith('warehouses');
}
function inPending(a: AnyAction) {
  return isWarehousingCase(a.type) && a.type.endsWith('pending');
}
function inFulfilled(a: AnyAction) {
  return isWarehousingCase(a.type) && a.type.endsWith('fulfilled');
}
function inError(a: AnyAction) {
  return isWarehousingCase(a.type) && a.type.endsWith('rejected');
}
