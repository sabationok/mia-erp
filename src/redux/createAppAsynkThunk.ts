import { AppResponse } from './app-redux.types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ActionPayload, ThunkPayload } from './store.store';
import { isAxiosError } from 'axios';

export const createAppAsyncThunk = <
  SubmitData = any,
  ReturnData = any,
  Params = any,
  Extra = any
  // Error = any,
  // ThunkConfig extends AsyncThunkConfig = any
>(
  type: string,
  getResponse: (data?: SubmitData, params?: Params) => Promise<AppResponse<ReturnData>>
) => {
  return createAsyncThunk<
    ActionPayload<{ data: ReturnData; params?: Params; extra?: Extra }>,
    ThunkPayload<
      { data: SubmitData; params?: Params; extra?: Extra },
      ActionPayload<{ data: ReturnData; params?: Params; extra?: Extra }>
    >
  >(type, async (arg, thunkAPI) => {
    arg?.onLoading && arg?.onLoading(true);

    thunkAPI.getState();

    try {
      const res = await getResponse(arg?.data?.data, arg?.data?.params);
      const rData = { ...arg?.data, data: res?.data.data };

      if (res) {
        arg?.onSuccess && arg?.onSuccess(rData, res?.data?.meta);
      }

      return rData;
    } catch (error) {
      arg?.onError && arg?.onError(error);
      return thunkAPI.rejectWithValue(isAxiosError(error));
    } finally {
      arg?.onLoading && arg?.onLoading(false);
    }
  });
};
