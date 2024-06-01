import { createAsyncThunk } from '@reduxjs/toolkit';
import { IVariationReqData, VariationEntity } from '../../../types/offers/variations.types';
import { ThunkArgs } from '../../store.store';
import VariationsApi from '../../../api/variations.api';
import { isAxiosError } from 'axios';
import { AppQueryParams } from '../../../api';

export const createVariationThunk = createAsyncThunk<
  VariationEntity | undefined,
  ThunkArgs<IVariationReqData, VariationEntity>
>('products/createVariationThunk', async (args, thunkApi) => {
  args?.onLoading && args?.onLoading(true);
  try {
    const res = await VariationsApi.create(args.data);
    if (res) {
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

export const updateVariationThunk = createAsyncThunk<
  VariationEntity | undefined,
  ThunkArgs<IVariationReqData, VariationEntity>
>('products/updateVariationThunk', async (args, thunkApi) => {
  args?.onLoading && args?.onLoading(true);
  try {
    const res = await VariationsApi.updateById(args.data);
    if (res) {
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
export const getAllVariationsByOfferIdThunk = createAsyncThunk<
  { data: VariationEntity[]; offerId?: string; refreshCurrent?: boolean } | undefined,
  ThunkArgs<{ offerId: string; params?: AppQueryParams; refreshCurrent?: boolean }, VariationEntity[]>
>('products/getAllVariationsByProductIdThunk', async (args, thunkApi) => {
  args?.onLoading && args?.onLoading(true);

  try {
    const res = await VariationsApi.getAllByProductId(args?.data);
    if (res) {
      args?.onSuccess && args?.onSuccess(res?.data?.data);
    }
    args?.onLoading && args?.onLoading(false);
    return { data: res?.data.data, refreshCurrent: args.data?.refreshCurrent, offerId: args.data?.offerId };
  } catch (e) {
    args?.onLoading && args?.onLoading(false);
    args?.onError && args?.onError(e);
    return thunkApi.rejectWithValue(isAxiosError(e));
  }
});
