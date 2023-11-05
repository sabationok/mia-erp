import { StateErrorType } from '../reduxTypes.types';
import { createSlice } from '@reduxjs/toolkit';
import { IInvoice } from './invoices.types';
import { getAllInvoiceMethodsThunk, updateInvoicingMethodThunk } from './invoicing.thunks';
import { IInvoicingMethod } from '../integrations/integrations.types';

export interface InvoicesState {
  invoices: IInvoice[];
  error: StateErrorType | null;
  methods: IInvoicingMethod[];
  isLoading: boolean;
}

const state: InvoicesState = {
  invoices: [],
  methods: [],
  error: null,
  isLoading: false,
};
export const invoicesSlice = createSlice({
  name: 'invoicing',
  initialState: state,
  reducers: {},
  extraReducers: builder =>
    builder
      .addCase(getAllInvoiceMethodsThunk.fulfilled, (s, a) => {
        s.methods = a.payload;
      })
      .addCase(updateInvoicingMethodThunk.fulfilled, (s, a) => {
        s.methods = s.methods.map(mtd => (mtd._id === a.payload._id ? a.payload : mtd));
      }),
});
