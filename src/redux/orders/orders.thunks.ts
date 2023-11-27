import { createAsyncThunk } from '@reduxjs/toolkit';
import { IOrder, IOrderReqData } from '../../types/orders/orders.types';
import { ThunkPayload } from '../store.store';
import { AppQueryParams, createApiCall, OrdersApi } from '../../api';
import { axiosErrorCheck } from '../../utils';
import { isAxiosError } from 'axios';
import { OnlyUUID } from '../global.types';

export const getAllOrdersThunk = createAsyncThunk<
  { refresh?: boolean; data?: IOrder[] },
  ThunkPayload<
    {
      refresh?: boolean;
      query?: AppQueryParams;
    },
    IOrder[]
  >
>('orders/getAllOrdersThunk', async ({ data, onSuccess, onError, onLoading }, thunkAPI) => {
  onLoading && onLoading(true);

  try {
    const response = await OrdersApi.getAll(data?.query);

    onSuccess && onSuccess(response.data.data);

    onLoading && onLoading(false);
    return { data: response.data.data, refresh: data?.refresh };
  } catch (error) {
    onError && onError(error);

    onLoading && onLoading(false);
    return thunkAPI.rejectWithValue(axiosErrorCheck(error));
  }
});

export const createOrderThunk = createAsyncThunk<IOrder | undefined, ThunkPayload<IOrderReqData, IOrder>>(
  'orders/createOrderThunk',
  async (args, thunkApi) => {
    try {
      const res = await createApiCall(
        {
          ...args,
          logRes: true,
          throwError: true,
        },
        OrdersApi.createOne,
        OrdersApi
      );

      return res?.data.data;
    } catch (error) {
      return thunkApi.rejectWithValue(isAxiosError(error));
    }
  }
);
export const getOrderByIdThunk = createAsyncThunk<IOrder | undefined, ThunkPayload<OnlyUUID, IOrder>>(
  'orders/getOrderByIdThunk',
  async (args, thunkApi) => {
    try {
      const res = await createApiCall(
        {
          ...args,
          logRes: true,
          throwError: true,
        },
        OrdersApi.getById,
        OrdersApi
      );

      return res?.data.data;
    } catch (error) {
      return thunkApi.rejectWithValue(isAxiosError(error));
    }
  }
);
export const getOrderSlotsById = createAsyncThunk<IOrder | undefined, ThunkPayload<OnlyUUID, IOrder>>(
  'orders/getOrderSlotsById',
  async (args, thunkApi) => {
    try {
      const res = await createApiCall(
        {
          ...args,
          logRes: true,
          throwError: true,
        },
        OrdersApi.getById,
        OrdersApi
      );

      return res?.data.data;
    } catch (error) {
      return thunkApi.rejectWithValue(isAxiosError(error));
    }
  }
);
