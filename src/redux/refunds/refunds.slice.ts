import { createSlice } from '@reduxjs/toolkit';
import { getAllRefundsThunk } from './refunds.thunks';

export interface IRefundsState {
  refunds: any[];
  currentRefund?: any;
  filteredRefunds?: [];
  isLoading: boolean;
  error: any;
}
const initialRefundsState: IRefundsState = {
  refunds: [],
  isLoading: false,
  error: null,
};

export const refundsSlice = createSlice({
  name: 'refunds',
  initialState: initialRefundsState,
  reducers: {},
  extraReducers: builder =>
    builder.addCase(getAllRefundsThunk.fulfilled, (s, a) => {
      // s.isLoading = false;
      // if (Array.isArray(a.payload.data)) {
      //   if (a.payload.refresh) {
      //     s.refunds = a.payload.data;
      //     return;
      //   }
      //   s.orders = [...a.payload.data, ...s.orders];
      // }
    }),
});
