import { createSlice } from '@reduxjs/toolkit';
import { getAllRefundsThunk } from './refunds.thunks';
import { onUserLogout } from '../auth/auth.actions';
import { sliceCleaner } from '../../utils';

export interface IRefundsState {
  refunds: any[];
  currentRefund?: any;
  filteredRefunds?: [];
  isLoading: boolean;
  error: any;
}
const initState: IRefundsState = {
  refunds: [],
  isLoading: false,
  error: null,
};

export const refundsSlice = createSlice({
  name: 'refunds',
  initialState: initState,
  reducers: {},
  extraReducers: builder =>
    builder
      .addCase(getAllRefundsThunk.fulfilled, (s, a) => {
        // s.isLoading = false;
        // if (Array.isArray(a.payload.data)) {
        //   if (a.payload.refresh) {
        //     s.refunds = a.payload.data;
        //     return;
        //   }
        //   s.orders = [...a.payload.data, ...s.orders];
        // }
      })
      .addMatcher(onUserLogout, sliceCleaner(initState)),
});
