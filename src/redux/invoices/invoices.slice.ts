import { StateErrorType } from '../reduxTypes.types';
import { createSlice } from '@reduxjs/toolkit';
import { IInvoice } from '../../types/invoices.types';
import { getAllInvoiceMethodsThunk, getAllInvoicesThunk, updateInvoicingMethodThunk } from './invoicing.thunks';
import { IInvoicingMethod, InvoicingMethodCategoryEnum } from '../../types/integrations.types';

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
        s.methods = a.payload.map(md => ({
          ...md,
          category:
            (!!md.service && InvoicingMethodCategoryEnum.paymentService) ||
            (!!md.bankAccount && InvoicingMethodCategoryEnum.bankTransfer) ||
            (md.type?.includes(InvoicingMethodCategoryEnum.postTransfer) && InvoicingMethodCategoryEnum.postTransfer) ||
            null,
        }));
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
      }),
});
