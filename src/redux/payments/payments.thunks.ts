import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosErrorCheck } from '../../utils';
import { PaymentsApi } from '../../api';
import { IPaymentMethod, IPaymentMethodReqData } from './payments.types';
import { ThunkPayload } from '../store.store';

enum PaymentsThunkTypeEnum {
  getAllPayments = 'payments/getAllPaymentsThunk',

  getAllMethods = 'payments/getAllMethodsThunk',
  updateMethod = 'payments/updateMethodThunk',
}

export const getAllPaymentMethodsThunk = createAsyncThunk<IPaymentMethod[], ThunkPayload<unknown, IPaymentMethod[]>>(
  PaymentsThunkTypeEnum.getAllMethods,
  async (args, thunkAPI) => {
    args?.onLoading && args?.onLoading(true);
    try {
      const res = await PaymentsApi.getAllMethods();
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
  ThunkPayload<IPaymentMethodReqData, IPaymentMethod>
>(PaymentsThunkTypeEnum.updateMethod, async (args, thunkAPI) => {
  args?.onLoading && args?.onLoading(true);
  try {
    const res = await PaymentsApi.updateMethod(args?.data || {});
    res && args?.onSuccess && args?.onSuccess(res?.data?.data);

    args?.onLoading && args?.onLoading(false);
    return res?.data?.data;
  } catch (e) {
    args?.onLoading && args?.onLoading(false);
    args?.onError && args?.onError(e);

    return thunkAPI.rejectWithValue(axiosErrorCheck(e));
  }
});
