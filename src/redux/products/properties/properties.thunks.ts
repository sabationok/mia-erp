import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkPayload } from '../../store.store';
import PropertiesApi from '../../../api/properties.api';
import { isAxiosError } from 'axios';
import { IProperty, IPropertyReqData } from '../../../types/properties.types';

enum PropertiesThunkType {
  getAll = 'products/getAllPropertiesThunk',
  create = 'products/createPropertyThunk',
}

export const getAllPropertiesThunk = createAsyncThunk<
  IProperty[] | undefined,
  ThunkPayload<IPropertyReqData, IProperty[]>
>(PropertiesThunkType.getAll, async (args, thunkApi) => {
  args?.onLoading && args?.onLoading(true);

  try {
    const res = await PropertiesApi.getAll({ data: args.data });
    args?.onLoading && args?.onLoading(false);
    args?.onSuccess && args?.onSuccess(res?.data?.data);

    return res?.data.data;
  } catch (e) {
    args?.onLoading && args?.onLoading(false);
    args?.onError && args?.onError(e);
    return thunkApi.rejectWithValue(isAxiosError(e));
  }
});

export const createPropertyThunk = createAsyncThunk<
  IProperty[] | undefined,
  ThunkPayload<IPropertyReqData, IProperty[]>
>(PropertiesThunkType.create, async (args, thunkApi) => {
  args?.onLoading && args?.onLoading(true);

  try {
    const res = await PropertiesApi.create(args.data);
    args?.onLoading && args?.onLoading(false);
    args?.onSuccess && args?.onSuccess(res?.data?.data);

    return res?.data.data;
  } catch (e) {
    args?.onLoading && args?.onLoading(false);
    args?.onError && args?.onError(e);
    return thunkApi.rejectWithValue(isAxiosError(e));
  }
});

// export const asyncThunkPayloadBuilder =
//   <
//     Data,
//     Returned,
//     ThunkArg extends ThunkPayload<Data, Returned>,
//     ThunkApiConfig extends AsyncThunkConfig,
//     GetResFn extends (data?: Data) => Promise<AppResponse>,
//     Res = any
//   >(
//     getRes: GetResFn
//   ): AsyncThunkPayloadCreator<Returned, ThunkArg, ThunkApiConfig> =>
//     async (args, thunkApi) => {
//       args?.onLoading && args?.onLoading(true);
//
//       try {
//         const res = await getRes(args.data);
//         args?.onSuccess && args?.onSuccess(res?.data?.data);
//
//         return res?.data.data;
//       } catch (e) {
//         args?.onLoading && args?.onLoading(false);
//         args?.onError && args?.onError(e);
//         return thunkApi.rejectWithValue(axiosErrorCheck(e) as never, {} as never);
//       }
//     };
