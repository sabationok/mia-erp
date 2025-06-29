import { ApiAxiosResponse } from '../api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ActionPayload, ThunkArgs } from './store.store';
import { axiosErrorCheck } from '../utils';

type ThunkGetResponseConfig<Data = any, Params = any> = { data?: Data; params?: Params };

type ThunkGetAppResponseFn<Data = any, Params = any, Return = any, Meta = any> = (
  config: ThunkGetResponseConfig<Data, Params>
) => Promise<ApiAxiosResponse<Return, Meta>>;

type DataTransformer<D, P, T> = (data: D, params?: P) => T;
export const createAppAsyncThunk2 = <
  Data = any,
  Params = any,
  Return = any,
  Meta = any,
  Extra = any,
  Transformed = any,
  // Error = any,
  // ThunkConfig extends AsyncThunkConfig = any,
>(
  type: string,
  getResponse: ThunkGetAppResponseFn<Data, Params, Return, Meta>,
  transform?: DataTransformer<Return, Params, Transformed>
) => {
  return createAsyncThunk<
    ActionPayload<{ data: Return; params?: Params; extra?: Extra; transformed?: Transformed }>,
    ThunkArgs<
      { data?: Data; params?: Params; extra?: Extra },
      ActionPayload<{ data: Return; params?: Params; extra?: Extra; transformed?: Transformed }>,
      any,
      any,
      Params
    >
  >(type, async ({ onError, onLoading, onSuccess, ...arg } = {}, thunkAPI) => {
    onLoading && onLoading(true);

    try {
      const res = await getResponse({ ...(arg?.data ?? {}) });
      const rData = {
        ...arg?.data,
        ...arg,
        data: res?.data.data,
        transformed: transform ? transform(res?.data.data, arg?.params || arg?.data?.params) : undefined,
      };

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

//
// import { ApiAxiosResponse, ApiQueryParams } from '../api';
// import { createAsyncThunk } from '@reduxjs/toolkit';
// import { ActionPayload, ThunkArgs } from './store.store';
// import { axiosErrorCheck } from '../utils';
//
// export type ThunkGetResponseCbConfig = {
//   data?: any;
//   params?: ApiQueryParams;
// };
// export type AppThunkGetResponseCbReturn = {
//   data: any;
//   meta?: any;
// };
//
// type ThunkGetResponseCb<
//   Config extends ThunkGetResponseCbConfig = ThunkGetResponseCbConfig,
//   Return extends AppThunkGetResponseCbReturn = AppThunkGetResponseCbReturn,
// > = (config?: Config) => Promise<ApiAxiosResponse<Return['data'], Return['meta']>>;
//
// export const createAppAsyncThunk = <
//   Config extends ThunkGetResponseCbConfig = ThunkGetResponseCbConfig,
//   Return extends AppThunkGetResponseCbReturn = AppThunkGetResponseCbReturn,
// >(
//   type: string,
//   getResponse: ThunkGetResponseCb<Config, Return>
// ) => {
//   return createAsyncThunk<ActionPayload<Pick<Return, 'data'> & Pick<Config, 'params'>>, ThunkArgs<Config, Return>>(
//     type,
//     async ({ onError, onLoading, onSuccess, ...arg } = {}, thunkAPI) => {
//       onLoading && onLoading(true);
//
//       try {
//         const res = await getResponse(arg?.data);
//
//         const rData = { ...arg.data, ...arg, ...res?.data } as ActionPayload<
//           Pick<Return, 'data'> & Pick<Config, 'params'>
//         >;
//
//         if (res) {
//           onSuccess && onSuccess(rData.data, res.data?.meta);
//         }
//
//         return rData;
//       } catch (error) {
//         onError && onError(error);
//         return thunkAPI.rejectWithValue(axiosErrorCheck(error));
//       } finally {
//         onLoading && onLoading(false);
//       }
//     }
//   );
// };
//
