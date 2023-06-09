import { ApiCaller } from '../redux/global.types';

const createApiCall: ApiCaller = async ({ onLoading, onError, onSuccess, data }, getResponseCallback) => {
  onLoading && onLoading(true);
  try {
    const res = await getResponseCallback(data);
    if (res.data.data && onSuccess) {
      onSuccess(res.data.data);
      return res.data.data;
    }
  } catch (e) {
    onError && onError(e);
  } finally {
    onLoading && onLoading(false);
  }
};

export { createApiCall };