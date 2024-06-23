import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosErrorCheck } from '../../utils';
import { DeliveriesApi } from '../../api';
import { ThunkArgs } from '../store.store';
import { IDeliveryMethod, IDeliveryMethodReqData } from '../../types/integrations.types';
import { createAppAsyncThunk } from '../createAppAsynkThunk';

enum DeliveriesThunkTypeEnum {
  getAll = 'deliveries/getAllDeliveriesThunk',
  getAllMethods = 'deliveries/getAllMethodsThunk',
  updateMethod = 'deliveries/updateMethodThunk',
}

export const getAllDeliveryMethodsThunk = createAsyncThunk<IDeliveryMethod[], ThunkArgs<unknown, IDeliveryMethod[]>>(
  DeliveriesThunkTypeEnum.getAllMethods,
  async (args, thunkAPI) => {
    args?.onLoading && args?.onLoading(true);
    try {
      const res = await DeliveriesApi.methods.getAll();
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
  ThunkArgs<IDeliveryMethodReqData, IDeliveryMethod>
>(DeliveriesThunkTypeEnum.updateMethod, async (args, thunkAPI) => {
  args?.onLoading && args?.onLoading(true);
  try {
    const res = await DeliveriesApi.methods.update(args?.data);
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
  return createAppAsyncThunk(type, DeliveriesApi.getAll);
}
