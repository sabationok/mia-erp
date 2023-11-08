import { StateErrorType } from '../reduxTypes.types';
import { createSlice } from '@reduxjs/toolkit';
import { ICheckoutPaymentMethod, IPayment } from './payments.types';
import { getAllPaymentMethodsThunk, updatePaymentMethodThunk } from './payments.thunks';

export interface PaymentsState {
  payments: IPayment[];
  methods: ICheckoutPaymentMethod[];
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
      }),
});
