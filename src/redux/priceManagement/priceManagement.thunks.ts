import { createAsyncThunk } from '@reduxjs/toolkit';
import { ICreatePriceListItemReqData, IPriceList, IPriceListReqData } from './priceManagement.types';
import { ThunkPayload } from '../store.store';
import { AppQueryParams, createApiCall, PriceManagementApi } from '../../api';
import { axiosErrorCheck } from '../../utils';
import { OnlyUUID } from '../global.types';

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

export const refreshPriceListByIdThunk = createAsyncThunk<IPriceList | undefined, ThunkPayload<OnlyUUID, IPriceList>>(
  'priceLists/refreshPriceListByIdThunk',
  async (arg, thunkAPI) => {
    const { data, onLoading, onSuccess, onError } = arg;

    onLoading && onLoading(true);

    try {
      const res = await createApiCall(
        {
          data,
          logRes: true,
          logError: true,
        },
        PriceManagementApi.getPriceListById,
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
  }
);
export const updatePriceListByIdThunk = createAsyncThunk<
  IPriceList | undefined,
  ThunkPayload<IPriceListReqData, IPriceList>
>('priceLists/updatePriceListByIdThunk', async (arg, thunkAPI) => {
  const { data, onLoading, onSuccess, onError } = arg;

  onLoading && onLoading(true);

  try {
    const res = await createApiCall(
      {
        data,
        logRes: true,
        logError: true,
      },
      PriceManagementApi.updatePriceList,
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
export const getPriceListByIdThunk = createAsyncThunk<
  IPriceList | undefined,
  ThunkPayload<{ list: OnlyUUID; query?: AppQueryParams }, IPriceList>
>('priceLists/getPriceListByIdThunk', async (args, thunkAPI) => {
  const { data, onLoading, onSuccess, onError } = args;

  onLoading && onLoading(true);
  try {
    const res = await PriceManagementApi.getPriceListById(data?.list, data?.query);
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

export const addPriceToListThunk = createAsyncThunk<
  IPriceList | undefined,
  ThunkPayload<ICreatePriceListItemReqData, IPriceList>
>('priceLists/addPriceToListThunk', async (arg, thunkAPI) => {
  const { data, onLoading, onSuccess, onError } = arg;

  onLoading && onLoading(true);

  try {
    const res = await createApiCall(
      {
        data,
        logRes: true,
        logError: true,
      },
      PriceManagementApi.addItemToList,
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

export const deletePriceFromListThunk = createAsyncThunk('priceLists/deletePriceFromListThunk', async () => {});
export const updatePriceInListThunk = createAsyncThunk('priceLists/updatePriceInListThunk', async () => {});
