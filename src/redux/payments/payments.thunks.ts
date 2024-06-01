import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosErrorCheck } from '../../utils';
import { AppQueryParams, PaymentsApi } from '../../api';
import { IPayment } from '../../types/payments.types';
import { ThunkArgs } from '../store.store';
import { IPaymentMethod, IPaymentMethodReqData } from '../../types/integrations.types';

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
  ThunkArgs<IPaymentMethodReqData, IPaymentMethod>
>(PaymentsThunkTypeEnum.updateMethod, async (args, thunkAPI) => {
  args?.onLoading && args?.onLoading(true);
  try {
    const res = await PaymentsApi.updateMethod(args?.data);
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
  return createAsyncThunk<
    { refresh?: boolean; update?: boolean; data: IPayment[] },
    ThunkArgs<
      { refresh?: boolean; params?: Pick<AppQueryParams, 'group' | 'order' | 'manager' | 'customer'> },
      IPayment[]
    >
  >(type, async (args, thunkApi) => {
    try {
      const res = await PaymentsApi.getAllByQueries(args?.data?.params);
      if (res) {
        args?.onSuccess && args?.onSuccess(res?.data.data);
      }

      return { ...res?.data, ...args?.data };
    } catch (error) {
      args?.onError && args?.onError(error);
      return thunkApi.rejectWithValue(axiosErrorCheck(error));
    } finally {
      args?.onLoading && args?.onLoading(false);
    }
  });
}
