import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkPayload } from '../store.store';
import PropertiesApi from '../../api/properties.api';
import { isAxiosError } from 'axios';
import { IProperty, IPropertyReqData } from './properties.types';

export const getAllPropertiesThunk = createAsyncThunk<
  IProperty[] | undefined,
  ThunkPayload<IPropertyReqData, IProperty[]>
>('products/getAllPropertiesThunk', async (args, thunkApi) => {
  args?.onLoading && args?.onLoading(true);

  try {
    const res = await PropertiesApi.getAll({ data: args.data });
    args?.onLoading && args?.onLoading(false);
    args?.onSuccess && args?.onSuccess(res?.data?.data);

    return res?.data.data;
  } catch (e) {
    args?.onLoading && args?.onLoading(false);
    args?.onError && args?.onError(e);
    return thunkApi.rejectWithValue(isAxiosError(e));
  }
});

export const createPropertyThunk = createAsyncThunk<
  IProperty[] | undefined,
  ThunkPayload<IPropertyReqData, IProperty[]>
>('products/createPropertyThunk', async (args, thunkApi) => {
  args?.onLoading && args?.onLoading(true);

  try {
    const res = await PropertiesApi.create(args.data);
    args?.onLoading && args?.onLoading(false);
    args?.onSuccess && args?.onSuccess(res?.data?.data);

    return res?.data.data;
  } catch (e) {
    args?.onLoading && args?.onLoading(false);
    args?.onError && args?.onError(e);
    return thunkApi.rejectWithValue(isAxiosError(e));
  }
});
