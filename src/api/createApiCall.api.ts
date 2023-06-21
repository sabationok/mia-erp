import { AppResponse } from '../redux/global.types';
import { ThunkPayload } from '../redux/store.store';

export type GetResponseCallback<SD = any, RD = any, MD = any> = (args?: SD) => Promise<AppResponse<RD, MD>>;

export interface ApiCallerPayload<SD = any, RD = any, E = any | unknown> extends ThunkPayload<SD, RD, E> {}

export type ApiCaller<SD = any, RD = any, E = any, MD = any> = (
  payload: ApiCallerPayload<SD, RD, E>,
  getResponseCallback: GetResponseCallback<SD, RD, MD>
) => Promise<AppResponse<RD, MD>>;

const createApiCall: ApiCaller = async <SD = any, RD = any, E = any, MD = any>(
  { onLoading, onError, onSuccess, data }: ThunkPayload<SD, RD, E>,
  getResponseCallback: GetResponseCallback<SD, RD, MD>
) => {
  onLoading && onLoading(true);
  try {
    const res = await getResponseCallback(data);
    if (res.data.data && onSuccess) {
      onSuccess(res.data.data);
    }
    return res.data.data;
  } catch (e) {
    onError && onError(e as unknown as E);
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
