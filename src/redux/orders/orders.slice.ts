import { createSlice } from '@reduxjs/toolkit';

export interface IOrdersState {
  orders: any[];
  currentOrder?: any;
  filteredOrders?: [];
  isLoading: boolean;
  error: any;
}
const initialOrdersState: IOrdersState = {
  orders: [],
  isLoading: false,
  error: null,
};

export const ordersSlice = createSlice({
  name: 'orders',
  initialState: initialOrdersState,
  reducers: {},
  extraReducers: builder =>
    builder.addCase('getAllOrdersThunk.fulfilled', (s, a) => {
      // s.isLoading = false;
      // if (Array.isArray(a.payload.data)) {
      //   if (a.payload.refresh) {
      //     s.orders = a.payload.data;
      //     return;
      //   }
      //   s.orders = [...a.payload.data, ...s.orders];
      // }
    }),
});
