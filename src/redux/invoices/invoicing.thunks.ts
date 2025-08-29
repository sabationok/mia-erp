import { InvoicesApi } from '../../api';
import { createAppAsyncThunk2 } from '../createAppAsynkThunk2';

enum ThunkTypeEnum {
  invoices = 'invoices',
  getAll = `${invoices}/getAll/Thunk`,
  create = `${invoices}/create/Thunk`,
  update = `${invoices}/update/Thunk`,

  methods = `${invoices}/methods`,
  getAllMethods = `${methods}/getAll/Thunk`,
  updateMethod = `${methods}/update/Thunk`,
}

export const getAllInvoiceMethodsThunk = createAppAsyncThunk2(ThunkTypeEnum.getAllMethods, InvoicesApi.methods.getAll);
export const updateInvoicingMethodThunk = createAppAsyncThunk2(ThunkTypeEnum.updateMethod, InvoicesApi.methods.update);

export const getAllInvoicesThunk = createAppAsyncThunk2(ThunkTypeEnum.getAll, InvoicesApi.getAll);
