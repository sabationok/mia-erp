import { StateErrorType } from '../reduxTypes.types';
import { createSlice } from '@reduxjs/toolkit';
import { IInvoice } from './invoices.types';

export interface InvoicesState {
  invoices: IInvoice[];
  error: StateErrorType | null;
  isLoading: boolean;
}
const state: InvoicesState = {
  invoices: [],
  error: null,
  isLoading: false,
};
export const invoicesSlice = createSlice({
  name: 'invoices',
  initialState: state,
  reducers: {},
  extraReducers: builder => builder,
});
