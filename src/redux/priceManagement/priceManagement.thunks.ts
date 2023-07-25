import { createAsyncThunk } from '@reduxjs/toolkit';
import { IPriceList, IPriceListReqData } from './priceManagement.types';
import { ThunkPayload } from '../store.store';
import { AppQueryParams, createApiCall } from '../../api';
import { PriceManagementApi } from '../../api/priceManagement.api';
import { axiosErrorCheck } from '../../utils';

export const getAllPriceListsThunk = createAsyncThunk<
  | {
      refresh?: boolean;
      query?: AppQueryParams;
      data: IPriceList[];
    }
  | undefined,
  ThunkPayload<
    {
      refresh?: boolean;
      query?: AppQueryParams;
    },
    IPriceList[]
  >
>('priceLists/getAllPriceListsThunk', async (payload, thunkAPI) => {
  const { data, onLoading, onSuccess, onError } = payload;

  onLoading && onLoading(true);

  try {
    const res = await createApiCall(
      {
        data: data?.query,
        logError: true,
      },
      PriceManagementApi.getAllPriceLists,
      PriceManagementApi
    );
    if (res?.data.data) {
      onSuccess && onSuccess(res?.data.data);
    }
    onLoading && onLoading(false);
    return { ...data, data: res?.data.data || [] };
  } catch (e) {
    onLoading && onLoading(false);
    onError && onError(e);
    return thunkAPI.rejectWithValue(axiosErrorCheck(e));
  }
});
export const createPriceListThunk = createAsyncThunk<
  IPriceList | undefined,
  ThunkPayload<IPriceListReqData, IPriceList>
>('priceLists/createPriceListThunk', async (arg, thunkAPI) => {
  const { data, onLoading, onSuccess, onError } = arg;

  onLoading && onLoading(true);

  try {
    const res = await createApiCall(
      {
        data: data,
        logRes: true,
        logError: true,
      },
      PriceManagementApi.createPriceList,
      PriceManagementApi
    );
    if (res?.data.data) {
      onSuccess && onSuccess(res?.data.data);
    }
    onLoading && onLoading(false);
    return res?.data.data;
  } catch (e) {
    onLoading && onLoading(false);
    onError && onError(e);
    return thunkAPI.rejectWithValue(axiosErrorCheck(e));
  }
});
export const addPricesToListThunk = createAsyncThunk('priceLists/addPricesToListThunk', async () => {});
