import { AppResponse } from './app-redux.types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ActionPayload, ThunkArgs } from './store.store';
import { axiosErrorCheck } from '../utils';

type ThunkGetAppResponseFn<Data = any, Params = any, Return = any, Meta = any> = (
  data?: Data,
  params?: Params
) => Promise<AppResponse<Return, Meta>>;

export const createAppAsyncThunk = <
  Data = any,
  Params = any,
  Return = any,
  Meta = any,
  Extra = any,
  // Error = any,
  // ThunkConfig extends AsyncThunkConfig = any
>(
  type: string,
  getResponse: ThunkGetAppResponseFn<Data, Params, Return, Meta>
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
  >(type, async ({ onError, onLoading, onSuccess, ...arg } = {}, thunkAPI) => {
    onLoading && onLoading(true);

    console.log([arg?.data?.data, arg?.params || arg?.data?.params]);

    try {
      const res = await getResponse(arg?.data?.data, arg?.params || arg?.data?.params);
      const rData = { ...arg?.data, ...arg, data: res?.data.data };

      if (res) {
        onSuccess && onSuccess(rData, res?.data?.meta);
      }

      return rData;
    } catch (error) {
      onError && onError(error);
      return thunkAPI.rejectWithValue(axiosErrorCheck(error));
    } finally {
      onLoading && onLoading(false);
    }
  });
};
