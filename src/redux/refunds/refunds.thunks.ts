import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkArgs } from '../store.store';
import { ApiQueryParams, createApiCall, RefundsApi } from '../../api';
import { axiosErrorCheck } from '../../utils';
import { isAxiosError } from 'axios';
import { OnlyUUID } from '../app-redux.types';
import { IRefund, IRefundReqData } from './refunds.types';

export const getAllRefundsThunk = createAsyncThunk<
  { refresh?: boolean; data?: IRefund[] },
  ThunkArgs<
    {
      refresh?: boolean;
      query?: ApiQueryParams;
    },
    IRefund[]
  >
>('refunds/getAllRefundsThunk', async ({ data, onSuccess, onError, onLoading }, thunkAPI) => {
  onLoading && onLoading(true);

  try {
    const response = await RefundsApi.getAll(data?.query);

    onSuccess && onSuccess(response.data.data);

    onLoading && onLoading(false);
    return { data: response.data.data, refresh: data?.refresh };
  } catch (error) {
    onError && onError(error);

    onLoading && onLoading(false);
    return thunkAPI.rejectWithValue(axiosErrorCheck(error));
  }
});

export const createRefundThunk = createAsyncThunk<IRefund | undefined, ThunkArgs<IRefundReqData, IRefund>>(
  'refunds/createRefundThunk',
  async (args, thunkApi) => {
    try {
      const res = await createApiCall(
        {
          ...args,
          logRes: true,
          throwError: true,
        },
        RefundsApi.createOne,
        RefundsApi
      );

      return res?.data.data;
    } catch (error) {
      return thunkApi.rejectWithValue(isAxiosError(error));
    }
  }
);
export const getRefundByIdThunk = createAsyncThunk<IRefund | undefined, ThunkArgs<OnlyUUID, IRefund>>(
  'refunds/getRefundByIdThunk',
  async (args, thunkApi) => {
    try {
      const res = await createApiCall(
        {
          ...args,
          logRes: true,
          throwError: true,
        },
        RefundsApi.getById,
        RefundsApi
      );

      return res?.data.data;
    } catch (error) {
      return thunkApi.rejectWithValue(isAxiosError(error));
    }
  }
);
export const getRefundSlotsById = createAsyncThunk<IRefund | undefined, ThunkArgs<OnlyUUID, IRefund>>(
  'refunds/getRefundSlotsById',
  async (args, thunkApi) => {
    try {
      const res = await createApiCall(
        {
          ...args,
          logRes: true,
          throwError: true,
        },
        RefundsApi.getById,
        RefundsApi
      );

      return res?.data.data;
    } catch (error) {
      return thunkApi.rejectWithValue(isAxiosError(error));
    }
  }
);
