import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosErrorCheck } from '../../utils';
import { InvoicesApi } from '../../api';
import { ThunkPayload } from '../store.store';
import { IInvoicingMethodReqData } from './invoices.types';
import { IInvoicingMethod } from '../integrations/integrations.types';

enum InvoicesThunkTypeEnum {
  getAllInvoices = 'invoicing/getAllInvoicesThunk',

  getAllMethods = 'invoicing/getAllMethodsThunk',
  updateMethod = 'invoicing/updateMethodThunk',
}

export const getAllInvoiceMethodsThunk = createAsyncThunk<
  IInvoicingMethod[],
  ThunkPayload<unknown, IInvoicingMethod[]>
>(InvoicesThunkTypeEnum.getAllMethods, async (args, thunkAPI) => {
  args?.onLoading && args?.onLoading(true);
  try {
    const res = await InvoicesApi.getAllMethods();
    res && args?.onSuccess && args?.onSuccess(res?.data?.data);

    args?.onLoading && args?.onLoading(false);
    return res?.data?.data;
  } catch (e) {
    args?.onLoading && args?.onLoading(false);
    args?.onError && args?.onError(e);

    return thunkAPI.rejectWithValue(axiosErrorCheck(e));
  }
});
export const updateInvoicingMethodThunk = createAsyncThunk<
  IInvoicingMethod,
  ThunkPayload<IInvoicingMethodReqData, IInvoicingMethod>
>(InvoicesThunkTypeEnum.updateMethod, async (args, thunkAPI) => {
  args?.onLoading && args?.onLoading(true);
  try {
    const res = await InvoicesApi.updateMethod(args?.data || {});
    res && args?.onSuccess && args?.onSuccess(res?.data?.data);

    args?.onLoading && args?.onLoading(false);
    return res?.data?.data;
  } catch (e) {
    args?.onLoading && args?.onLoading(false);
    args?.onError && args?.onError(e);

    return thunkAPI.rejectWithValue(axiosErrorCheck(e));
  }
});
