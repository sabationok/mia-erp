import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosErrorCheck } from '../../utils';
import { ShipmentsApi } from '../../api';
import { ThunkPayload } from '../store.store';
import { IShipmentMethod, IShipmentMethodReqData } from './shipments.types';

enum ShipmentsThunkTypeEnum {
  getAll = 'shipments/getAllThunk',

  getAllMethods = 'shipments/getAllMethodsThunk',
  updateMethod = 'shipments/updateMethodThunk',
}

export const getAllShipmentMethodsThunk = createAsyncThunk<IShipmentMethod[], ThunkPayload<unknown, IShipmentMethod[]>>(
  ShipmentsThunkTypeEnum.getAllMethods,
  async (args, thunkAPI) => {
    args?.onLoading && args?.onLoading(true);
    try {
      const res = await ShipmentsApi.getAllMethods();
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
export const updateShipmentMethodThunk = createAsyncThunk<
  IShipmentMethod,
  ThunkPayload<IShipmentMethodReqData, IShipmentMethod>
>(ShipmentsThunkTypeEnum.updateMethod, async (args, thunkAPI) => {
  args?.onLoading && args?.onLoading(true);
  try {
    const res = await ShipmentsApi.updateMethod(args?.data || {});
    res && args?.onSuccess && args?.onSuccess(res?.data?.data);

    args?.onLoading && args?.onLoading(false);
    return res?.data?.data;
  } catch (e) {
    args?.onLoading && args?.onLoading(false);
    args?.onError && args?.onError(e);

    return thunkAPI.rejectWithValue(axiosErrorCheck(e));
  }
});
