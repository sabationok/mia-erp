import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosErrorCheck } from '../../utils';
import { PaymentsApi } from '../../api';
import { ThunkArgs } from '../store.store';
import { IPaymentMethod, IPaymentMethodReqData } from '../../types/integrations.types';
import { createAppAsyncThunk } from '../createAppAsynkThunk';

enum PaymentsThunkTypeEnum {
  getAll = 'payments/getAllPaymentsThunk',
  getAllMethods = 'payments/getAllMethodsThunk',
  updateMethod = 'payments/updateMethodThunk',
}

export const getAllPaymentMethodsThunk = createAsyncThunk<IPaymentMethod[], ThunkArgs<unknown, IPaymentMethod[]>>(
  PaymentsThunkTypeEnum.getAllMethods,
  async (args, thunkAPI) => {
    args?.onLoading && args?.onLoading(true);
    try {
      const res = await PaymentsApi.methods.getAll();
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
export const updatePaymentMethodThunk = createAsyncThunk<
  IPaymentMethod,
  ThunkArgs<IPaymentMethodReqData, IPaymentMethod>
>(PaymentsThunkTypeEnum.updateMethod, async (args, thunkAPI) => {
  args?.onLoading && args?.onLoading(true);
  try {
    const res = await PaymentsApi.methods.update(args?.data);
    res && args?.onSuccess && args?.onSuccess(res?.data?.data);

    args?.onLoading && args?.onLoading(false);
    return res?.data?.data;
  } catch (e) {
    args?.onLoading && args?.onLoading(false);
    args?.onError && args?.onError(e);

    return thunkAPI.rejectWithValue(axiosErrorCheck(e));
  }
});

export const getAllPaymentsThunk = buildGetAllPaymentsThunk(PaymentsThunkTypeEnum.getAll);
export function buildGetAllPaymentsThunk(type: string) {
  return createAppAsyncThunk(type, PaymentsApi.getAll);
}
