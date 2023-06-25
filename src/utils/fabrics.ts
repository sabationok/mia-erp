import { ThunkPayload } from '../redux/store.store';
import { FieldValues } from 'react-hook-form';

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
    data: payloadData,
  };
}

export type DefaultThunkPayload<SD = any, RD = any, MD = any, E = any> = {
  data?: SD;
  onSuccess: (data: RD, meta?: MD) => void;
  onError: (error: E) => void;
  onLoading: (loading: boolean) => void;
};

export interface CreateThunkPayloadOptions<SD = any, RD = any, MD = any, E = any | unknown>
  extends Partial<Omit<DefaultThunkPayload<SD, RD, MD, E>, 'data'>> {
  logData?: boolean;
  logError?: boolean;
  logLoading?: boolean;
  logAll?: boolean;
  data?: SD;
}

function defaultThunkPayload<SD extends FieldValues = any, RD = any, MD = any, E = any>({
  logData,
  logError,
  logLoading,
  logAll,
  onError,
  onSuccess,
  onLoading,
  data,
}: CreateThunkPayloadOptions<SD, RD, MD, E> = {}): DefaultThunkPayload<SD, RD, MD, E> {
  return {
    onSuccess: (d: RD, m?: MD) => {
      (logAll || logData) && console.log('defaultThunkPayload onSuccess', { d, m });
      onSuccess && onSuccess(d, m);
    },
    onError: (e: E) => {
      (logAll || logError) && console.log('defaultThunkPayload onError', e);
      onError && onError(e);
    },
    onLoading(l) {
      (logAll || logLoading) && console.log('defaultThunkPayload onLoading', l);
      onLoading && onLoading(l);
    },
    data,
  };
}

function defaultApiCallPayload<SD = any, RD = any, E = any>({
  logData,
  logError,
  logLoading,
  logAll,
  onError,
  onSuccess,
  onLoading,
  data,
}: CreateThunkPayloadOptions<SD, RD, E> = {}): ThunkPayload<SD, RD, E> {
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
    data: data,
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

export { defaultThunkPayload, defaultApiCallPayload, createThunkPayload };
