import { ApiAxiosResponse, ApiRequestConfig } from './api.types';

export type GetResponseCallback<SD = any, PR = any, RD = any, MD = any> = (
  data?: SD,
  params?: PR
) => Promise<ApiAxiosResponse<RD, MD> | undefined>;

export type ApiCallerPayload<SD = any, PR = any, RD = any, E = any | unknown> = ApiRequestConfig<SD, PR> & {
  onSuccess?: (data: RD) => void;
  onError?: (error: E) => void;
  onLoading?: (loading: boolean) => void;
  logError?: boolean;
  logRes?: boolean;
  logResData?: boolean;
  throwError?: boolean;
};

// export type ApiCaller<SD = any, PR = any, RD = any, E = any, MD = any, CTX = any> = (
//   payload: ApiCallerPayload<SD, PR, RD, E>,
//   getResponseCallback: GetResponseCallback<SD, RD, MD>,
//   context?: CTX
// ) => Promise<AppResponse<RD, MD> | undefined>;

const createApiCall = async <SD = any, PR = any, RD = any, E = any, MD = any, CTX = any>(
  {
    onLoading,
    onError,
    onSuccess,
    logError,
    logRes,
    logResData,
    throwError,
    ...config
  }: ApiCallerPayload<SD, PR, RD, E>,
  getResponseCallback: GetResponseCallback<SD, PR, RD, MD>,
  context?: CTX
): Promise<ApiAxiosResponse<RD, MD> | undefined> => {
  onLoading && onLoading(true);

  const getResponse = context ? getResponseCallback.bind(context) : getResponseCallback;

  try {
    const res = await getResponse(config.data, config.params);
    if (res && res.data.data && onSuccess) {
      onSuccess(res.data.data);
    }
    if (logRes || logResData) {
      console.debug(`[${getResponseCallback.name}]`);
      logRes && console.log(res);
      logResData && console.log(res?.data);
    }
    onLoading && onLoading(false);
    return res;
  } catch (e) {
    onError && onError(e as unknown as E);
    if (logError) {
      console.debug(`[${getResponseCallback.name}]`);
      console.error(e);
    }
    onLoading && onLoading(false);

    if (throwError) {
      throw e;
    }
  }
};

export type GetResponseCallback2<SD = any, PR = any, RD = any, MD = any> = (
  arg: ApiRequestConfig<SD, PR>
) => Promise<ApiAxiosResponse<RD, MD> | undefined>;
export const apiCall = async <SD = any, PR = any, RD = any, E = any, MD = any, CTX = any>(
  getResponseCallback: GetResponseCallback2<SD, PR, RD, MD>,
  {
    onLoading,
    onError,
    onSuccess,
    logError,
    logRes,
    logResData,
    throwError,
    ...config
  }: ApiCallerPayload<SD, PR, RD, E>,
  context?: CTX
): Promise<ApiAxiosResponse<RD, MD> | undefined> => {
  onLoading && onLoading(true);

  const getResponse = context ? getResponseCallback.bind(context) : getResponseCallback;

  try {
    const res = await getResponse(config);
    if (res && res.data.data && onSuccess) {
      onSuccess(res.data.data);
    }
    if (logRes || logResData) {
      console.warn(`[${getResponseCallback.name}]`);
      logRes && console.log(res);
      logResData && console.log(res?.data);
    }
    onLoading && onLoading(false);
    return res;
  } catch (e) {
    onError && onError(e as unknown as E);
    if (logError) {
      console.warn(`[${getResponseCallback.name}]`);
      console.error(e);
    }
    onLoading && onLoading(false);

    if (throwError) {
      throw e;
    }
  }
};

// const createThunkApiCall = async <SD = any, PR = any, RD = any, E = any, MD = any, CTX = any>(
//   { onLoading, onError, onSuccess, data, logError, logRes }: ApiCallerPayload<SD, PR, RD, E>,
//   getResponseCallback: GetResponseCallback<SD, PR, RD, MD>,
//   context?: CTX
// ): Promise<AppResponse<RD, MD> | undefined> => {
//   onLoading && onLoading(true);
//
//   const getResponse = context ? getResponseCallback.bind(context) : getResponseCallback;
//
//   try {
//     const res = await getResponse(data);
//     if (res && res.data.data && onSuccess) {
//       onSuccess(res.data.data);
//     }
//     logRes && console.log(res);
//     return res;
//   } catch (e) {
//     onError && onError(e as unknown as E);
//     logError && console.error(e);
//     throw e;
//   } finally {
//     onLoading && onLoading(false);
//   }
// };
//
// export const createThunkPayloadCreator =
//   <SD = any,PR=any, RD = any, MD = any, E = any, Context = any>(
//     getResponseCallback: GetResponseCallback<SD, RD, MD>,
//     context?: Context
//   ) =>
//   () => {
//     return async (payload: ApiCallerPayload<SD, RD, E>, thunkApi: Getth) => {
//       try {
//         const res = await createThunkApiCall<SD, RD, E, MD, Context>(payload, getResponseCallback, context);
//
//         if (res) return res.data.data;
//       } catch (e) {
//         return thunkApi?.rejectWithValue(isAxiosError(e));
//       }
//     };
//   };

export { createApiCall };
