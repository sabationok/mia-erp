import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  ICreatePriceReqData,
  IPriceListReqData,
  IUpdatePriceReqData,
  PriceEntity,
  PriceListEntity,
} from '../../types/price-management/price-management.types';
import { ThunkArgs } from '../store.store';
import { apiCall, ApiQueryParams, GetOnePriceQuery, PriceManagementApi } from '../../api';
import { axiosErrorCheck } from '../../utils';
import { OnlyUUID } from '../app-redux.types';
import { isAxiosError } from 'axios';
import { GetAllPricesQuery } from '../../api/priceManagement.api';

export enum PriceManagementThunkType {
  getAllPriceLists = 'priceLists/getAllPriceListsThunk',
  createPriceList = 'priceLists/createPriceListThunk',
  refreshPriceListById = 'priceLists/refreshPriceListByIdThunk',
  updatePriceListById = 'priceLists/updatePriceListByIdThunk',
  getPriceListById = 'priceLists/getPriceListByIdThunk',

  createPrice = 'priceLists/addPriceThunk',
  getPrice = 'priceLists/getPriceThunk',
  deletePrice = 'priceLists/deletePriceThunk',
  updatePrice = 'priceLists/updatePriceThunk',
  getAllPrices = 'priceLists/getAllPricesThunk',
}

export const getPriceThunk = createAsyncThunk<
  { params?: GetOnePriceQuery; data: PriceEntity },
  ThunkArgs<{ params?: GetOnePriceQuery }, PriceEntity>
>(PriceManagementThunkType.getPrice, async (arg, thunkAPI) => {
  arg.onLoading && arg.onLoading(true);
  try {
    const res = await PriceManagementApi.prices.getOne(undefined, arg.data?.params);

    arg.onSuccess && arg.onSuccess(res.data?.data);

    return { ...arg.data, data: res.data?.data };
  } catch (e) {
    arg.onError && arg.onError(e);
    return thunkAPI.rejectWithValue(axiosErrorCheck(e));
  } finally {
    arg.onLoading && arg.onLoading(false);
  }
});

export const getAllPriceListsThunk = createAsyncThunk<
  | {
      refresh?: boolean;
      query?: ApiQueryParams;
      data: PriceListEntity[];
    }
  | undefined,
  ThunkArgs<
    {
      refresh?: boolean;
      query?: ApiQueryParams;
    },
    PriceListEntity[]
  >
>(PriceManagementThunkType.getAllPriceLists, async (payload, thunkAPI) => {
  const { data, onLoading, onSuccess, onError } = payload;

  onLoading && onLoading(true);

  try {
    const res = await apiCall(PriceManagementApi.priceLists.getAll, {
      data: data?.query,
      logError: true,
    });
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
  PriceListEntity | undefined,
  ThunkArgs<IPriceListReqData, PriceListEntity>
>(PriceManagementThunkType.createPriceList, async (arg, thunkAPI) => {
  const { data, onLoading, onSuccess, onError } = arg;

  onLoading && onLoading(true);

  try {
    const res = await PriceManagementApi.priceLists.create(data);

    if (res?.data.data) {
      onSuccess && onSuccess(res?.data.data);
    }

    return res?.data.data;
  } catch (e) {
    onError && onError(e);
    return thunkAPI.rejectWithValue(axiosErrorCheck(e));
  } finally {
    onLoading && onLoading(false);
  }
});

export const refreshPriceListByIdThunk = createAsyncThunk<
  PriceListEntity | undefined,
  ThunkArgs<OnlyUUID, PriceListEntity>
>(PriceManagementThunkType.refreshPriceListById, async (arg, thunkAPI) => {
  const { data, onLoading, onSuccess, onError } = arg;

  onLoading && onLoading(true);

  try {
    const res = await PriceManagementApi.priceLists.getById(data);
    if (res?.data.data) {
      onSuccess && onSuccess(res?.data.data);
    }
    return res?.data.data;
  } catch (e) {
    onError && onError(e);
    return thunkAPI.rejectWithValue(axiosErrorCheck(e));
  } finally {
    onLoading && onLoading(false);
  }
});
export const updatePriceListByIdThunk = createAsyncThunk<
  PriceListEntity | undefined,
  ThunkArgs<IPriceListReqData, PriceListEntity>
>(PriceManagementThunkType.updatePriceListById, async (arg, thunkAPI) => {
  const { data, onLoading, onSuccess, onError } = arg;

  onLoading && onLoading(true);

  try {
    const res = await PriceManagementApi.priceLists.update(data);
    if (res?.data.data) {
      onSuccess && onSuccess(res?.data.data);
    }
    return res?.data.data;
  } catch (e) {
    onError && onError(e);
    return thunkAPI.rejectWithValue(axiosErrorCheck(e));
  } finally {
    onLoading && onLoading(false);
  }
});
export const getPriceListByIdThunk = createAsyncThunk<
  { data: PriceListEntity; refreshCurrent?: boolean },
  ThunkArgs<{ list: OnlyUUID; query?: ApiQueryParams; refreshCurrent?: boolean }, PriceListEntity>
>(PriceManagementThunkType.getPriceListById, async (args, thunkAPI) => {
  const { data, onLoading, onSuccess, onError } = args;

  onLoading && onLoading(true);
  try {
    const res = await PriceManagementApi.priceLists.getById(data?.list, data?.query);
    if (res?.data.data) {
      onSuccess && onSuccess(res?.data.data);
    }
    return { data: res?.data.data, refreshCurrent: args.data?.refreshCurrent };
  } catch (e) {
    onError && onError(e);
    return thunkAPI.rejectWithValue(axiosErrorCheck(e));
  } finally {
    onLoading && onLoading(false);
  }
});

export interface IPricesThunksData<T> {
  refreshCurrent?: boolean;
  updateCurrent?: boolean;
  data?: T;
}

export const createPriceThunk = createAsyncThunk<
  IPricesThunksData<PriceEntity>,
  ThunkArgs<IPricesThunksData<ICreatePriceReqData>, PriceEntity>
>(PriceManagementThunkType.createPrice, async (arg, thunkAPI) => {
  const { data, onLoading, onSuccess, onError } = arg;

  onLoading && onLoading(true);

  try {
    const res = await PriceManagementApi.prices.create(data?.data);

    if (res?.data.data) {
      onSuccess && onSuccess(res?.data.data);
    }
    return { refreshCurrent: data?.refreshCurrent, data: res?.data.data };
  } catch (e) {
    onError && onError(e);
    return thunkAPI.rejectWithValue(axiosErrorCheck(e));
  } finally {
    onLoading && onLoading(false);
  }
});

export const updatePriceThunk = createAsyncThunk<
  IPricesThunksData<PriceEntity>,
  ThunkArgs<IPricesThunksData<IUpdatePriceReqData>, PriceEntity>
>(PriceManagementThunkType.updatePrice, async (arg, thunkAPI) => {
  const { data, onLoading, onSuccess, onError } = arg;
  onLoading && onLoading(true);
  try {
    const res = await PriceManagementApi.prices.updateById(data?.data);
    if (res?.data.data) {
      onSuccess && onSuccess(res?.data.data);
    }
    return { refreshCurrent: data?.refreshCurrent, data: res?.data.data };
  } catch (e) {
    onError && onError(e);
    return thunkAPI.rejectWithValue(axiosErrorCheck(e));
  } finally {
    onLoading && onLoading(false);
  }
});

export const getAllPricesThunk = buildGetAllPricesThunk();
export function buildGetAllPricesThunk(type: string = PriceManagementThunkType.getAllPrices) {
  return createAsyncThunk<
    { refreshCurrent?: boolean; data: PriceEntity[]; params?: GetAllPricesQuery },
    ThunkArgs<
      {
        refreshCurrent?: boolean;
        params?: GetAllPricesQuery;
      },
      PriceEntity[]
    >
  >(type, async (args, thunkApi) => {
    args?.onLoading && args?.onLoading(true);
    try {
      const res = await PriceManagementApi.prices.getAll(args?.data?.params);
      if (res) {
        args?.onSuccess && args?.onSuccess(res?.data.data);
      }

      return { ...args?.data, data: res?.data.data };
    } catch (error) {
      args?.onError && args?.onError(error);
      return thunkApi.rejectWithValue(isAxiosError(error));
    } finally {
      args?.onLoading && args?.onLoading(false);
    }
  });
}

export const deletePriceFromListThunk = createAsyncThunk<
  { data?: { priceId: string } },
  ThunkArgs<{ data: { priceId: string } }>
>(PriceManagementThunkType.deletePrice, async (arg, thunkAPI) => {
  try {
    return { data: arg.data?.data };
  } catch (e) {
    return thunkAPI.rejectWithValue(isAxiosError(e));
  }
});
