import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosErrorCheck } from '../../utils';
import { AppQueryParams, DeliveriesApi } from '../../api';
import { ThunkPayload } from '../store.store';
import { IDeliveryMethod, IDeliveryMethodReqData } from '../../types/integrations.types';
import { isAxiosError } from 'axios';
import { IDelivery } from '../../types/deliveries.types';

enum DeliveriesThunkTypeEnum {
  getAll = 'deliveries/getAllDeliveriesThunk',
  getAllMethods = 'deliveries/getAllMethodsThunk',
  updateMethod = 'deliveries/updateMethodThunk',
}

export const getAllDeliveryMethodsThunk = createAsyncThunk<IDeliveryMethod[], ThunkPayload<unknown, IDeliveryMethod[]>>(
  DeliveriesThunkTypeEnum.getAllMethods,
  async (args, thunkAPI) => {
    args?.onLoading && args?.onLoading(true);
    try {
      const res = await DeliveriesApi.getAllMethods();
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
export const updateDeliveryMethodThunk = createAsyncThunk<
  IDeliveryMethod,
  ThunkPayload<IDeliveryMethodReqData, IDeliveryMethod>
>(DeliveriesThunkTypeEnum.updateMethod, async (args, thunkAPI) => {
  args?.onLoading && args?.onLoading(true);
  try {
    const res = await DeliveriesApi.updateMethod(args?.data);
    res && args?.onSuccess && args?.onSuccess(res?.data?.data);

    args?.onLoading && args?.onLoading(false);
    return res?.data?.data;
  } catch (e) {
    args?.onLoading && args?.onLoading(false);
    args?.onError && args?.onError(e);

    return thunkAPI.rejectWithValue(axiosErrorCheck(e));
  }
});

export const getAllDeliveriesThunk = buildGetAllDeliveriesThunk(DeliveriesThunkTypeEnum.getAll);
export function buildGetAllDeliveriesThunk(type: string) {
  return createAsyncThunk<
    { refresh?: boolean; update?: boolean; data: IDelivery[] },
    ThunkPayload<
      { refreshCurrent?: boolean; params?: Pick<AppQueryParams, 'group' | 'order' | 'manager'> },
      IDelivery[]
    >
  >(type, async (args, thunkApi) => {
    try {
      const res = await DeliveriesApi.getAllByQueries(args?.data?.params);
      if (res) {
        args?.onSuccess && args?.onSuccess(res?.data.data);
      }

      return { data: res?.data.data, refresh: args?.data?.refreshCurrent };
    } catch (error) {
      args?.onError && args?.onError(error);
      return thunkApi.rejectWithValue(isAxiosError(error));
    } finally {
      args?.onLoading && args?.onLoading(false);
    }
  });
}
