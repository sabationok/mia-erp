import { createAsyncThunk } from '@reduxjs/toolkit';
import { ActionPayload, ThunkArgs } from '../../store.store';
import PropertiesApi from '../../../api/properties.api';
import { IPropertyReqData, PropertyEntity } from '../../../types/offers/properties.types';
import { axiosErrorCheck } from '../../../utils';

enum PropertiesThunkType {
  getAll = 'products/getAllPropertiesThunk',
  create = 'products/createPropertyThunk',
  update = 'products/updatePropertyThunk',
}

export const getAllPropertiesThunk = createAsyncThunk<
  ActionPayload<{ data: PropertyEntity[] }>,
  ThunkArgs<IPropertyReqData, PropertyEntity[]>
>(PropertiesThunkType.getAll, async (args, thunkApi) => {
  args?.onLoading && args?.onLoading(true);
  try {
    const res = await PropertiesApi.getAll({ data: args.data });
    args?.onSuccess && args?.onSuccess(res?.data?.data);
    return res?.data;
  } catch (e) {
    args?.onError && args?.onError(e);
    return thunkApi.rejectWithValue(axiosErrorCheck(e));
  } finally {
    args?.onLoading && args?.onLoading(false);
  }
});

export const createPropertyThunk = createAsyncThunk<
  ActionPayload<{ data: PropertyEntity }>,
  ThunkArgs<IPropertyReqData, PropertyEntity>
>(PropertiesThunkType.create, async (args, thunkApi) => {
  args?.onLoading && args?.onLoading(true);

  try {
    const res = await PropertiesApi.create(args.data);
    args?.onSuccess && args?.onSuccess(res?.data?.data);

    return res?.data;
  } catch (e) {
    args?.onError && args?.onError(e);
    return thunkApi.rejectWithValue(axiosErrorCheck(e));
  } finally {
    args?.onLoading && args?.onLoading(false);
  }
});

export const updatePropertyThunk = createAsyncThunk<
  ActionPayload<{ data: PropertyEntity }>,
  ThunkArgs<IPropertyReqData, PropertyEntity>
>(PropertiesThunkType.update, async (args, thunkApi) => {
  args?.onLoading && args?.onLoading(true);

  try {
    const res = await PropertiesApi.updateById(args.data);
    args?.onSuccess && args?.onSuccess(res?.data?.data);

    return res?.data;
  } catch (e) {
    args?.onError && args?.onError(e);
    return thunkApi.rejectWithValue(axiosErrorCheck(e));
  } finally {
    args?.onLoading && args?.onLoading(false);
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
