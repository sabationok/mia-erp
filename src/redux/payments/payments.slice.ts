import { StateErrorType } from '../reduxTypes.types';
import { createSlice } from '@reduxjs/toolkit';
import { IPayment } from '../../types/payments.types';
import { getAllPaymentMethodsThunk, getAllPaymentsThunk, updatePaymentMethodThunk } from './payments.thunks';
import { IPaymentMethod } from '../../types/integrations.types';

export interface PaymentsState {
  payments: IPayment[];
  methods: IPaymentMethod[];
  error: StateErrorType | null;
  isLoading: boolean;
}

const state: PaymentsState = {
  payments: [],
  methods: [],
  error: null,
  isLoading: false,
};
export const paymentsSlice = createSlice({
  name: 'payments',
  initialState: state,
  reducers: {},
  extraReducers: builder =>
    builder
      .addCase(getAllPaymentMethodsThunk.fulfilled, (s, a) => {
        s.methods = a.payload;
      })
      .addCase(updatePaymentMethodThunk.fulfilled, (s, a) => {
        s.methods = s.methods.map(mtd => (mtd._id === a.payload._id ? a.payload : mtd));
      })
      .addCase(getAllPaymentsThunk.fulfilled, (s, a) => {
        if (a.payload.update) {
          s.payments.concat(a.payload.data);
        } else {
          s.payments = a.payload.data;
        }
      }),
});
