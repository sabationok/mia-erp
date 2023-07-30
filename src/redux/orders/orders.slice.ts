import { AnyAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { createTransactionThunk, getAllTransactionsThunk } from 'redux/transactions/transactions.thunks';
import { StateErrorType } from 'redux/reduxTypes.types';
import { IOrder } from './orders.types';
import { createOrderThunk, getAllOrdersThunk, getOrderByIdThunk } from './orders.thunks';

// import { createOrderThunk, getAllOrdersThunk } from './orders.thunks';

export interface IOrdersState {
  orders: IOrder[];
  currentOrder?: IOrder;
  filteredOrders?: IOrder[];
  isLoading: boolean;
  error: StateErrorType;
}

const initialState: IOrdersState = {
  isLoading: false,
  error: null,
  orders: [],
  filteredOrders: [],
};

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: builder =>
    builder
      .addCase(getAllOrdersThunk.fulfilled, (s, a) => {
        s.isLoading = false;
        if (Array.isArray(a.payload.data)) {
          if (a.payload.refresh) {
            s.orders = a.payload.data;
            return;
          }
          s.orders = [...a.payload.data, ...s.orders];
        }
      })
      .addCase(createOrderThunk.fulfilled, (s, a) => {
        s.isLoading = false;

        s.orders = a.payload ? [a.payload, ...s.orders] : s.orders;
      })
      .addCase(getOrderByIdThunk.fulfilled, (s, a) => {
        s.isLoading = false;

        s.currentOrder = a.payload;
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

export const ordersReducer = ordersSlice.reducer;
