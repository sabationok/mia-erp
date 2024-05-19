import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  ICreatePriceReqData,
  IPriceList,
  IPriceListReqData,
  IUpdatePriceReqData,
  OfferPriceEntity,
} from '../../types/price-management/priceManagement.types';
import { ThunkPayload } from '../store.store';
import { AppQueryParams, createApiCall, PriceManagementApi } from '../../api';
import { axiosErrorCheck } from '../../utils';
import { OnlyUUID } from '../global.types';
import { isAxiosError } from 'axios';
import { GetAllPricesQuery } from '../../api/priceManagement.api';

enum PriceManagementThunkType {
  getAllPriceLists = 'priceLists/getAllPriceListsThunk',
  createPriceList = 'priceLists/createPriceListThunk',
  refreshPriceListById = 'priceLists/refreshPriceListByIdThunk',
  updatePriceListById = 'priceLists/updatePriceListByIdThunk',
  getPriceListById = 'priceLists/getPriceListByIdThunk',
  addPriceToList = 'priceLists/addPriceToListThunk',
  deletePriceFromList = 'priceLists/deletePriceFromListThunk',
  updatePriceInList = 'priceLists/updatePriceInListThunk',
  getAllPrices = 'priceLists/getAllPricesThunk',
}

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
>(PriceManagementThunkType.getAllPriceLists, async (payload, thunkAPI) => {
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
>(PriceManagementThunkType.createPriceList, async (arg, thunkAPI) => {
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
  PriceManagementThunkType.refreshPriceListById,
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
>(PriceManagementThunkType.updatePriceListById, async (arg, thunkAPI) => {
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
  { data: IPriceList; refreshCurrent?: boolean },
  ThunkPayload<{ list: OnlyUUID; query?: AppQueryParams; refreshCurrent?: boolean }, IPriceList>
>(PriceManagementThunkType.getPriceListById, async (args, thunkAPI) => {
  const { data, onLoading, onSuccess, onError } = args;

  onLoading && onLoading(true);
  try {
    const res = await PriceManagementApi.getPriceListById(data?.list, data?.query);
    if (res?.data.data) {
      onSuccess && onSuccess(res?.data.data);
    }
    onLoading && onLoading(false);
    return { data: res?.data.data, refreshCurrent: args.data?.refreshCurrent };
  } catch (e) {
    onLoading && onLoading(false);
    onError && onError(e);
    return thunkAPI.rejectWithValue(axiosErrorCheck(e));
  }
});

export interface IPricesThunksData<T> {
  refreshCurrent?: boolean;
  updateCurrent?: boolean;
  data?: T;
}

export const addPriceToListThunk = createAsyncThunk<
  IPricesThunksData<OfferPriceEntity>,
  ThunkPayload<IPricesThunksData<ICreatePriceReqData>, OfferPriceEntity>
>(PriceManagementThunkType.addPriceToList, async (arg, thunkAPI) => {
  const { data, onLoading, onSuccess, onError } = arg;

  onLoading && onLoading(true);

  try {
    const res = await PriceManagementApi.createPrice(data?.data);

    if (res?.data.data) {
      onSuccess && onSuccess(res?.data.data);
    }
    onLoading && onLoading(false);
    return { refreshCurrent: data?.refreshCurrent, data: res?.data.data };
  } catch (e) {
    onLoading && onLoading(false);
    onError && onError(e);
    return thunkAPI.rejectWithValue(axiosErrorCheck(e));
  }
});

export const updatePriceInListThunk = createAsyncThunk<
  IPricesThunksData<OfferPriceEntity>,
  ThunkPayload<IPricesThunksData<IUpdatePriceReqData>, OfferPriceEntity>
>(PriceManagementThunkType.updatePriceInList, async (arg, thunkAPI) => {
  const { data, onLoading, onSuccess, onError } = arg;

  onLoading && onLoading(true);

  try {
    const res = await PriceManagementApi.updatePriceById(data?.data);

    if (res?.data.data) {
      onSuccess && onSuccess(res?.data.data);
    }
    onLoading && onLoading(false);
    return { refreshCurrent: data?.refreshCurrent, data: res?.data.data };
  } catch (e) {
    onLoading && onLoading(false);
    onError && onError(e);
    return thunkAPI.rejectWithValue(axiosErrorCheck(e));
  }
});

export const getAllPricesThunk = buildGetAllPricesThunk();
export function buildGetAllPricesThunk(type: string = PriceManagementThunkType.getAllPrices) {
  return createAsyncThunk<
    { refreshCurrent?: boolean; data: OfferPriceEntity[]; params?: GetAllPricesQuery },
    ThunkPayload<
      {
        refreshCurrent?: boolean;
        params?: GetAllPricesQuery;
      },
      OfferPriceEntity[]
    >
  >(type, async (args, thunkApi) => {
    args?.onLoading && args?.onLoading(true);
    try {
      const res = await PriceManagementApi.getAllPrices(args?.data?.params);
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
  ThunkPayload<{ data: { priceId: string } }>
>(PriceManagementThunkType.deletePriceFromList, async (arg, thunkAPI) => {
  try {
    return { data: arg.data?.data };
  } catch (e) {
    return thunkAPI.rejectWithValue(isAxiosError(e));
  }
});
