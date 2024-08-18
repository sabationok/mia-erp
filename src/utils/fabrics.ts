import { ThunkArgs } from '../redux/store.store';
import { FieldValues } from 'react-hook-form';
import { FilterOption } from '../components/atoms/TabSelector';
import { t } from '../lang';
import { Values } from '../types/utils.types';

export function createThunkPayload<SD extends FieldValues = any, RD = any, E = any>(
  payloadData?: SD,
  options?: CreateThunkPayloadOptions<SD, RD, E>
): ThunkArgs<SD, RD, E> {
  const { logData, logError, logLoading, logAll, onError, onSuccess, onLoading } = options || {};
  return {
    onSuccess: (d: RD) => {
      (logAll || logData) && console.log('createThunkPayload onSuccess', d);
      onSuccess && onSuccess(d);
    },
    onError: (e: E) => {
      (logAll || logError) && console.log('createThunkPayload onError', e);
      onError && onError(e);
    },
    onLoading(l) {
      (logAll || logLoading) && console.log('createThunkPayload onLoading', l);
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

export function defaultThunkPayload<SD extends FieldValues = any, RD = any, MD = any, E = any>({
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

export function defaultApiCallPayload<SD = any, RD = any, E = any>({
  logData,
  logError,
  logLoading,
  logAll,
  onError,
  onSuccess,
  onLoading,
  data,
}: CreateThunkPayloadOptions<SD, RD, E> = {}): ThunkArgs<SD, RD, E> {
  return {
    onSuccess: (d: RD) => {
      (logAll || logData) && console.log('defaultApiCallPayload onSuccess', d);
      onSuccess && onSuccess(d);
    },
    onError: (e: E) => {
      (logAll || logError) && console.log('defaultApiCallPayload onError', e);
      onError && onError(e);
    },
    onLoading(l) {
      (logAll || logLoading) && console.log('defaultApiCallPayload onLoading', l);
      onLoading && onLoading(l);
    },
    data: data as never,
  };
}

// function defaultApiCallPayload<SD extends FieldValues = any, RD = any, E = any>(
//   options?: CreateThunkPayloadOptions<SD, RD, E>
// ): SubmitHandler<SD> {
//   return (formData: SD) => createThunkPayload<SD, RD, E>(formData, options);
// }
//
// function useCreateSubmitHandlerWithPayload<SD extends FieldValues = any, RD = any, E = any>(
//   options?: CreateThunkPayloadOptions<SD, RD, E>
// ): SubmitHandler<SD> {
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   return useCallback(defaultApiCallPayload<SD, RD, E>(options), []);
// }
// Функція, яка перетворює Enum на масив
export function enumToArray<T extends object = any>(enumObj: T): Array<T[keyof T]> {
  return Object.values(enumObj);
}
export function enumToFilterOptions<T extends Record<string, any> = any, DataKey extends string | number = any>(
  enumObj: T,
  {
    labelPrefix,
  }: {
    dataKey?: DataKey;
    labelPrefix?: string;
  } = {}
): (FilterOption<T[keyof T]> & { value: T[keyof T] })[] {
  return enumToArray(enumObj).map(el => ({ label: t(labelPrefix ? labelPrefix + '_' + el : el), value: el }));
}
export function arrayToFilterOptions<T extends string[] = string[]>(
  array: T,
  {
    labelPrefix,
  }: {
    labelPrefix?: string;
  } = {}
) {
  return array.map(item => ({
    label: t(labelPrefix ? labelPrefix + '_' + item : item),
    value: item,
  })) as (FilterOption<Values<T>> & { value: Values<T> })[];
}

export function _enumToTabs<T extends Record<string, any> = any>(
  enumObj: T,
  labels?: Record<T[keyof T], string>
): FilterOption<T[keyof T]>[] {
  return enumToArray(enumObj).map(el => ({ label: t(labels ? labels[el] : el), value: el }));
}

export function enumToTabs<T extends Record<string, any> = any>(
  enumObj: T,
  getLabel?: (item: keyof T) => T[keyof T] | string
): FilterOption<T[keyof T]>[] {
  return enumToArray(enumObj).map(el => ({
    _id: el,
    label: getLabel ? getLabel(el) : t(`Tab_${el}`),
    value: el,
  }));
}
