import { StateErrorType } from '../reduxTypes.types';
import { createSlice } from '@reduxjs/toolkit';
import { IPayment } from './payments.types';

export interface PaymentsState {
  payments: IPayment[];
  error: StateErrorType | null;
  isLoading: boolean;
}
const state: PaymentsState = {
  payments: [],
  error: null,
  isLoading: false,
};
export const paymentsSlice = createSlice({
  name: 'payments',
  initialState: state,
  reducers: {},
  extraReducers: builder => builder,
});
