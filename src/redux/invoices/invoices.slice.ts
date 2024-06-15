import { StateErrorType } from '../reduxTypes.types';
import { createSlice } from '@reduxjs/toolkit';
import { IInvoice } from '../../types/invoices.types';
import { getAllInvoiceMethodsThunk, getAllInvoicesThunk, updateInvoicingMethodThunk } from './invoicing.thunks';
import { IInvoicingMethod } from '../../types/integrations.types';
import { onUserLogout } from '../auth/auth.actions';
import { sliceCleaner } from '../../utils';

export interface InvoicesState {
  invoices: IInvoice[];
  error: StateErrorType | null;
  methods: IInvoicingMethod[];
  isLoading: boolean;
}

const initState: InvoicesState = {
  invoices: [],
  methods: [],
  error: null,
  isLoading: false,
};
export const invoicesSlice = createSlice({
  name: 'invoicing',
  initialState: initState,
  reducers: {},
  extraReducers: builder =>
    builder
      .addCase(getAllInvoiceMethodsThunk.fulfilled, (s, a) => {
        s.methods = a.payload;
      })
      .addCase(updateInvoicingMethodThunk.fulfilled, (s, a) => {
        s.methods = s.methods.map(mtd => (mtd._id === a.payload._id ? a.payload : mtd));
      })
      .addCase(getAllInvoicesThunk.fulfilled, (s, a) => {
        if (a.payload.update) {
          s.invoices.concat(a.payload.data);
        } else {
          s.invoices = a.payload.data;
        }
      })
      .addMatcher(onUserLogout, sliceCleaner(initState)),
});
