import { AppResponse } from '../redux/global.types';
import { ThunkPayload } from '../redux/store.store';

export type GetResponseCallback<SD = any, RD = any, MD = any> = (arg?: SD) => Promise<AppResponse<RD, MD>>;

export interface ApiCallerPayload<SD = any, RD = any, E = any | unknown> {
  data?: SD;
  onSuccess?: (data: RD) => void;
  onError?: (error: E) => void;
  onLoading?: (loading: boolean) => void;
  logError?: boolean;
  logRes?: boolean;
  logResData?: boolean;
}

export type ApiCaller<SD = any, RD = any, E = any, MD = any, CTX = any> = (
  payload: ApiCallerPayload<SD, RD, E>,
  getResponseCallback: GetResponseCallback<SD, RD, MD>,
  context?: CTX
) => Promise<AppResponse<RD, MD> | undefined>;

const createApiCall = async <SD = any, RD = any, E = any, MD = any, CTX = any>(
  { onLoading, onError, onSuccess, data, logError, logRes }: ApiCallerPayload<SD, RD, E>,
  getResponseCallback: GetResponseCallback<SD, RD, MD>,
  context?: CTX
): Promise<AppResponse<RD, MD> | undefined> => {
  onLoading && onLoading(true);

  const getResponse = context ? getResponseCallback.bind(context) : getResponseCallback;

  try {
    const res = await getResponse(data);
    if (res.data.data && onSuccess) {
      onSuccess(res.data.data);
    }
    logRes && console.log(res);
    return res;
  } catch (e) {
    onError && onError(e as unknown as E);
    logError && console.error(e);
  } finally {
    onLoading && onLoading(false);
  }
};

async function apiCaller<SD = any, RD = any, E = any, MD = any>(
  { onLoading, onError, onSuccess, data }: ThunkPayload<SD, RD, E>,
  getResponseCallback: GetResponseCallback<SD, RD, MD>
) {
  const callback = async (data?: SD) => getResponseCallback(data);
  onLoading && onLoading(true);
  try {
    const res = await callback(data);
    if (res.data.data && onSuccess) {
      onSuccess(res.data.data);
    }
    return res.data.data;
  } catch (e) {
    onError && onError(e as unknown as E);
  } finally {
    onLoading && onLoading(false);
  }
}

export { createApiCall };

export default apiCaller as ApiCaller;
