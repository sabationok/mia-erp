import { AppResponse } from '../redux/global.types';
import { isAxiosError } from 'axios';

export type GetResponseCallback<SD = any, RD = any, MD = any> = (arg?: SD) => Promise<AppResponse<RD, MD> | undefined>;

export interface ApiCallerPayload<SD = any, RD = any, E = any | unknown> {
  data?: SD;
  onSuccess?: (data: RD) => void;
  onError?: (error: E) => void;
  onLoading?: (loading: boolean) => void;
  logError?: boolean;
  logRes?: boolean;
  logResData?: boolean;
  throwError?: boolean;
}

export type ApiCaller<SD = any, RD = any, E = any, MD = any, CTX = any> = (
  payload: ApiCallerPayload<SD, RD, E>,
  getResponseCallback: GetResponseCallback<SD, RD, MD>,
  context?: CTX
) => Promise<AppResponse<RD, MD> | undefined>;

const createApiCall = async <SD = any, RD = any, E = any, MD = any, CTX = any>(
  { onLoading, onError, onSuccess, data, logError, logRes, logResData, throwError }: ApiCallerPayload<SD, RD, E>,
  getResponseCallback: GetResponseCallback<SD, RD, MD>,
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

const createThunkApiCall = async <SD = any, RD = any, E = any, MD = any, CTX = any>(
  { onLoading, onError, onSuccess, data, logError, logRes }: ApiCallerPayload<SD, RD, E>,
  getResponseCallback: GetResponseCallback<SD, RD, MD>,
  context?: CTX
): Promise<AppResponse<RD, MD> | undefined> => {
  onLoading && onLoading(true);

  const getResponse = context ? getResponseCallback.bind(context) : getResponseCallback;

  try {
    const res = await getResponse(data);
    if (res && res.data.data && onSuccess) {
      onSuccess(res.data.data);
    }
    logRes && console.log(res);
    return res;
  } catch (e) {
    onError && onError(e as unknown as E);
    logError && console.error(e);
    throw e;
  } finally {
    onLoading && onLoading(false);
  }
};

export const createThunkPayloadCreator =
  <SD = any, RD = any, MD = any, E = any, Context = any>(
    getResponseCallback: GetResponseCallback<SD, RD, MD>,
    context?: Context
  ) =>
  () => {
    return async (payload: ApiCallerPayload<SD, RD, E>, thunkApi: any) => {
      try {
        const res = await createThunkApiCall<SD, RD, E, MD, Context>(payload, getResponseCallback, context);

        if (res) return res.data.data;
      } catch (e) {
        return thunkApi?.rejectWithValue(isAxiosError(e));
      }
    };
  };

async function apiCaller<SD = any, RD = any, E = any, MD = any>(
  { onLoading, onError, onSuccess, data }: ApiCallerPayload<SD, RD, E>,
  getResponseCallback: GetResponseCallback<SD, RD, MD>
) {
  const callback = async (data?: SD) => getResponseCallback(data);
  onLoading && onLoading(true);
  try {
    const res = await callback(data);
    if (res && res.data.data && onSuccess) {
      onSuccess(res.data.data);
      return res.data.data;
    }
  } catch (e) {
    onError && onError(e as unknown as E);
  } finally {
    onLoading && onLoading(false);
  }
}

export { createApiCall };

export default apiCaller as ApiCaller;
