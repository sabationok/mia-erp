import { AppResponse } from './app-redux.types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ActionPayload, ThunkArgs } from './store.store';
import { axiosErrorCheck } from '../utils';

export const createAppAsyncThunk = <
  Data = any,
  Params = any,
  Return = any,
  Meta = any,
  Extra = any
  // Error = any,
  // ThunkConfig extends AsyncThunkConfig = any
>(
  type: string,
  getResponse: (data?: Data, params?: Params) => Promise<AppResponse<Return, Meta>>
) => {
  return createAsyncThunk<
    ActionPayload<{ data: Return; params?: Params; extra?: Extra }>,
    ThunkArgs<
      { data?: Data; params?: Params; extra?: Extra },
      ActionPayload<{ data: Return; params?: Params; extra?: Extra }>,
      any,
      any,
      Params
    >
  >(type, async (arg, thunkAPI) => {
    arg?.onLoading && arg?.onLoading(true);

    try {
      const res = await getResponse(arg?.data?.data, arg?.params || arg?.data?.params);
      const rData = { ...arg?.data, ...arg, data: res?.data.data };

      if (res) {
        arg?.onSuccess && arg?.onSuccess(rData, res?.data?.meta);
      }

      return rData;
    } catch (error) {
      arg?.onError && arg?.onError(error);
      return thunkAPI.rejectWithValue(axiosErrorCheck(error));
    } finally {
      arg?.onLoading && arg?.onLoading(false);
    }
  });
};
