import { ApiCaller, GetResponseCallback } from '../redux/global.types';
import { ThunkPayload } from '../redux/store.store';

const createApiCall: ApiCaller = async <SD = any, RD = any, E = any, MD = any>(
  { onLoading, onError, onSuccess, data }: ThunkPayload<SD, RD, E>,
  getResponseCallback: GetResponseCallback<SD, RD, MD>
) => {
  onLoading && onLoading(true);
  try {
    const res = await getResponseCallback(data);
    if (res.data.data && onSuccess) {
      onSuccess(res.data.data);
      return res.data.data;
    }
  } catch (e) {
    onError && onError(e as unknown as E);
  } finally {
    onLoading && onLoading(false);
  }
};

export { createApiCall };
