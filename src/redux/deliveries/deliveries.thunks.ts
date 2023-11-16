import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosErrorCheck } from '../../utils';
import { DeliveriesApi } from '../../api';
import { ThunkPayload } from '../store.store';
import { IDeliveryMethodReqData } from './deliveries.types';
import { IDeliveryMethod } from '../integrations/integrations.types';

enum DeliveriesThunkTypeEnum {
  getAll = 'deliveries/getAllThunk',

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
    const res = await DeliveriesApi.updateMethod(args?.data || {});
    res && args?.onSuccess && args?.onSuccess(res?.data?.data);

    args?.onLoading && args?.onLoading(false);
    return res?.data?.data;
  } catch (e) {
    args?.onLoading && args?.onLoading(false);
    args?.onError && args?.onError(e);

    return thunkAPI.rejectWithValue(axiosErrorCheck(e));
  }
});
