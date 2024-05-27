import { AppResponse } from '../redux/app-redux.types';

export type GetResponseCallback<SD = any, PR = any, RD = any, MD = any> = (
  arg?: SD,
  params?: PR
) => Promise<AppResponse<RD, MD> | undefined>;

export interface ApiCallerPayload<SD = any, PR = any, RD = any, E = any | unknown> {
  data?: SD;
  params?: PR;
  onSuccess?: (data: RD) => void;
  onError?: (error: E) => void;
  onLoading?: (loading: boolean) => void;
  logError?: boolean;
  logRes?: boolean;
  logResData?: boolean;
  throwError?: boolean;
}

// export type ApiCaller<SD = any, PR = any, RD = any, E = any, MD = any, CTX = any> = (
//   payload: ApiCallerPayload<SD, PR, RD, E>,
//   getResponseCallback: GetResponseCallback<SD, RD, MD>,
//   context?: CTX
// ) => Promise<AppResponse<RD, MD> | undefined>;

const createApiCall = async <SD = any, PR = any, RD = any, E = any, MD = any, CTX = any>(
  { onLoading, onError, onSuccess, data, logError, logRes, logResData, throwError }: ApiCallerPayload<SD, PR, RD, E>,
  getResponseCallback: GetResponseCallback<SD, PR, RD, MD>,
  context?: CTX
): Promise<AppResponse<RD, MD> | undefined> => {
  onLoading && onLoading(true);

  const getResponse = context ? getResponseCallback.bind(context) : getResponseCallback;

  try {
    const res = await getResponse(data);
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

export const apiCall = async <SD = any, PR = any, RD = any, E = any, MD = any, CTX = any>(
  getResponseCallback: GetResponseCallback<SD, PR, RD, MD>,
  {
    onLoading,
    onError,
    onSuccess,
    data,
    params,
    logError,
    logRes,
    logResData,
    throwError,
  }: ApiCallerPayload<SD, PR, RD, E>,
  context?: CTX
): Promise<AppResponse<RD, MD> | undefined> => {
  onLoading && onLoading(true);

  const getResponse = context ? getResponseCallback.bind(context) : getResponseCallback;

  try {
    const res = await getResponse(data, params);
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
