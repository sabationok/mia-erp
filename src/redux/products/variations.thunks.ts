import { createAsyncThunk } from '@reduxjs/toolkit';
import { IVariation, IVariationReqData } from './variations.types';
import { ThunkPayload } from '../store.store';
import VariationsApi from '../../api/variations.api';
import { isAxiosError } from 'axios';
import { OnlyUUID } from '../global.types';
import { AppQueryParams } from '../../api';

export const createVariationThunk = createAsyncThunk<
  IVariation | undefined,
  ThunkPayload<IVariationReqData, IVariation>
>('products/createVariationThunk', async (args, thunkApi) => {
  args?.onLoading && args?.onLoading(true);

  try {
    const res = await VariationsApi.create(args.data);
    if (res) {
      console.log('createVariationThunk res', res);
      args?.onSuccess && args?.onSuccess(res?.data?.data);
    }

    args?.onLoading && args?.onLoading(false);
    return res?.data.data;
  } catch (e) {
    args?.onLoading && args?.onLoading(false);
    args?.onError && args?.onError(e);
    return thunkApi.rejectWithValue(isAxiosError(e));
  }
});

export const getAllVariationsByProductIdThunk = createAsyncThunk<
  { data: IVariation[]; refreshCurrent?: boolean } | undefined,
  ThunkPayload<{ product: OnlyUUID; params?: AppQueryParams; refreshCurrent?: boolean }, IVariation[]>
>('products/getAllVariationsByProductIdThunk', async (args, thunkApi) => {
  args?.onLoading && args?.onLoading(true);

  try {
    const res = await VariationsApi.getAllByProductId(args?.data);
    if (res) {
      args?.onSuccess && args?.onSuccess(res?.data?.data);
    }
    args?.onLoading && args?.onLoading(false);
    return { data: res?.data.data, refreshCurrent: args.data?.refreshCurrent };
  } catch (e) {
    args?.onLoading && args?.onLoading(false);
    args?.onError && args?.onError(e);
    return thunkApi.rejectWithValue(isAxiosError(e));
  }
});
