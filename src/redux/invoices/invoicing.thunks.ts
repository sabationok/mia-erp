import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosErrorCheck } from '../../utils';
import { AppQueryParams, InvoicesApi } from '../../api';
import { ThunkArgs } from '../store.store';
import { IInvoicingMethod, IInvoicingMethodReqData } from '../../types/integrations.types';
import { isAxiosError } from 'axios';
import { IInvoice } from '../../types/invoices.types';

enum InvoicesThunkTypeEnum {
  getAll = 'invoicing/getAllInvoicesThunk',

  getAllMethods = 'invoicing/getAllMethodsThunk',
  updateMethod = 'invoicing/updateMethodThunk',
}

export const getAllInvoiceMethodsThunk = createAsyncThunk<IInvoicingMethod[], ThunkArgs<unknown, IInvoicingMethod[]>>(
  InvoicesThunkTypeEnum.getAllMethods,
  async (args, thunkAPI) => {
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
  }
);
export const updateInvoicingMethodThunk = createAsyncThunk<
  IInvoicingMethod,
  ThunkArgs<IInvoicingMethodReqData, IInvoicingMethod>
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

export const getAllInvoicesThunk = buildGetAllInvoicesThunk(InvoicesThunkTypeEnum.getAll);
export function buildGetAllInvoicesThunk(type: string) {
  return createAsyncThunk<
    { refresh?: boolean; update?: boolean; data: IInvoice[] },
    ThunkArgs<
      { refresh?: boolean; params?: Pick<AppQueryParams, 'group' | 'order' | 'manager' | 'customer'> },
      IInvoice[]
    >
  >(type, async (args, thunkApi) => {
    try {
      const res = await InvoicesApi.getAllByQueries(args?.data?.params);
      if (res) {
        args?.onSuccess && args?.onSuccess(res?.data.data);
      }

      return { ...res?.data, ...args?.data };
    } catch (error) {
      args?.onError && args?.onError(error);
      return thunkApi.rejectWithValue(isAxiosError(error));
    } finally {
      args?.onLoading && args?.onLoading(false);
    }
  });
}
