import { ThunkPayload } from '../redux/store.store';
import { FieldValues } from 'react-hook-form';

export interface CreateThunkPayloadOptions<SD extends FieldValues = any, RD = any, E = any | unknown>
  extends Omit<ThunkPayload<SD, RD, E>, 'data' | 'submitData'> {
  logData?: boolean;
  logError?: boolean;
  logLoading?: boolean;
  logAll?: boolean;
}

function createThunkPayload<SD extends FieldValues = any, RD = any, E = any>(
  payloadData?: SD,
  options?: CreateThunkPayloadOptions<SD, RD, E>
): ThunkPayload<SD, RD, E> {
  const { logData, logError, logLoading, logAll, onError, onSuccess, onLoading } = options || {};
  return {
    onSuccess: (d: RD) => {
      (logAll || logData) && console.log('createSubmitHandlerWithPayload onSuccess', d);
      onSuccess && onSuccess(d);
    },
    onError: (e: E) => {
      (logAll || logError) && console.log('createSubmitHandlerWithPayload onError', e);
      onError && onError(e);
    },
    onLoading(l) {
      (logAll || logLoading) && console.log('createSubmitHandlerWithPayload onLoading', l);
      onLoading && onLoading(l);
    },
    submitData: payloadData,
    data: payloadData,
  };
}

// function createSubmitHandlerWithPayload<SD extends FieldValues = any, RD = any, E = any>(
//   options?: CreateThunkPayloadOptions<SD, RD, E>
// ): SubmitHandler<SD> {
//   return (formData: SD) => createThunkPayload<SD, RD, E>(formData, options);
// }
//
// function useCreateSubmitHandlerWithPayload<SD extends FieldValues = any, RD = any, E = any>(
//   options?: CreateThunkPayloadOptions<SD, RD, E>
// ): SubmitHandler<SD> {
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   return useCallback(createSubmitHandlerWithPayload<SD, RD, E>(options), []);
// }

export { createThunkPayload };
