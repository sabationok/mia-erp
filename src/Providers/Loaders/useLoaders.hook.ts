import { useMemo, useRef, useState } from 'react';
import { Id, ToastContent, ToastOptions } from 'react-toastify';
import { PartialRecord } from 'types/utils.types';
import { ToastService } from '../../services';
import { t } from '../../lang';

export type LoadersRef<Name extends string> = PartialRecord<Name, boolean>;
export type UseLoaderConfig = {
  content: ToastContent;
  options?: ToastOptions;
};
export type UseLoaderItem = UseLoaderConfig & {
  id?: Id;
};
export type LoaderItems<Name extends string> = Record<Name | string, UseLoaderItem>;
export type UseLoadersConfigs<Name extends string> = PartialRecord<Name, UseLoaderConfig>;
type SetDataCallback<T extends any> = (...data: T[]) => void;

export interface LoadersMethods<
  Name extends string,
  Data extends PartialRecord<Name, any> = PartialRecord<Name, any>,
  _Errors extends PartialRecord<Name, any> = PartialRecord<Name, any>
> {
  setData: <N extends Name, D extends Data>(name: N, data: D[N] | ((prev?: D[N]) => D[N])) => void;
  setError: (name: Name, error: any) => void;
  setSuccess: (name: Name, value: boolean) => void;
  onLoading: (
    name: Name,
    callback?: SetDataCallback<boolean>,
    config?: Partial<UseLoaderConfig>
  ) => (l: boolean) => void;
  show: (name: Name, config?: Partial<UseLoaderConfig>) => () => void;
  hide: (name: Name) => void;

  onError: <Error extends any[] = any[]>(name: Name, callback?: SetDataCallback<Error>) => (error?: Error) => void;
  onSuccess: <Args extends any[] = any[]>(name: Name, callback?: (...args: Args) => void) => (...args: Args) => void;

  clearErrors: () => void;
  clearState: () => void;
  clearLoadings: () => void;
  clearFields: () => void;
}
export interface UseLoadersReturn<
  Name extends string = string,
  Data extends PartialRecord<Name, any> = PartialRecord<Name, any>,
  Errors extends PartialRecord<Name, any> = PartialRecord<Name, any>
> extends LoadersMethods<Name, Data, Errors> {
  isFullLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  isLoading: PartialRecord<Name, boolean>;
  loadings: PartialRecord<Name, boolean>;
  success: PartialRecord<Name, boolean>;
  errors: Partial<Errors>;
  state: Partial<Data>;
  hasLoading: boolean;
  hasError: boolean;
  hasSuccess: boolean;
}

export const useLoaders = <
  Name extends string,
  Data extends PartialRecord<Name, any> = PartialRecord<Name, any>,
  Errors extends PartialRecord<Name, any> = PartialRecord<Name, any>
>(
  configs?: UseLoadersConfigs<Name>
): UseLoadersReturn<Name, Data, Errors> => {
  const loadersRef = useRef<LoadersRef<Name>>({});
  const toastsRef = useRef((configs || {}) as LoaderItems<Name>);
  const [loading, setLoading] = useState<PartialRecord<Name, boolean>>({});
  const [state, setState] = useState<Partial<Data>>({});
  const [errors, setErrors] = useState<Partial<Errors>>({});
  const [success, setSuccess] = useState<PartialRecord<Name | string, boolean>>({});
  const namesSetRef = useRef<Set<Name>>(new Set([]));

  const loadersSet = Array.from(namesSetRef.current.values());

  const { isLoading, hasLoading } = useMemo(() => {
    return {
      isLoading: loadersSet.every(el => loading?.[el]),
      hasLoading: loadersSet.some(el => loading?.[el]),
    };
  }, [loadersSet, loading]);

  const { isSuccess, hasSuccess } = useMemo(() => {
    return {
      isSuccess: loadersSet.every(el => success?.[el]),
      hasSuccess: loadersSet.some(el => success?.[el]),
    };
  }, [loadersSet, success]);

  const { isError, hasError } = useMemo(() => {
    return {
      isError: loadersSet.every(el => errors?.[el]),
      hasError: loadersSet.some(el => errors?.[el]),
    };
  }, [errors, loadersSet]);

  const loaders = useMemo(() => {
    class Loaders implements LoadersMethods<Name, Data, Errors> {
      setData = <N extends Name, D extends Data>(name: N, data: D[N] | ((prev?: D[N]) => D[N])) => {
        namesSetRef.current.add(name);
        if (data instanceof Function) {
          setState(p => ({ ...p, [name]: data(p[name]) }));
        } else {
          setState(p => ({ ...p, [name]: data }));
        }
      };

      setError = (name: Name, error: any) => {
        namesSetRef.current.add(name);
        setErrors(p => ({ ...p, [name]: error }));
      };

      setSuccess = (name: Name, value: boolean) => {
        namesSetRef.current.add(name);
        setSuccess(p => ({ ...p, [name]: value }));
      };

      show = (name: Name, config?: Partial<UseLoaderConfig>) => {
        namesSetRef.current.add(name);
        if (toastsRef.current?.[name]?.id) return () => {};

        this.setError(name, null);
        // this.setSuccess(name, false);

        if (!config?.content && !toastsRef.current?.[name]?.content) return () => {};
        toastsRef.current[name] = {
          ...toastsRef.current?.[name],
          id: ToastService.loading(config?.content || toastsRef.current?.[name]?.content || t('Loading') + '...', {
            ...toastsRef.current?.[name]?.options,
            ...config?.options,
          }),
        };

        return () => this.hide(name);
      };

      hide = (name: Name) => {
        if (!toastsRef.current?.[name]?.id) return;
        if (toastsRef.current?.[name]?.id) {
          ToastService.remove(toastsRef.current?.[name]?.id);
          toastsRef.current[name] = {
            ...toastsRef.current?.[name],
            id: '',
          };
        }
      };

      onLoading = (
        name: Name,
        callback?: SetDataCallback<boolean>,
        config?: Partial<UseLoaderConfig>
      ): ((l: boolean) => void) => {
        return (l: boolean) => {
          namesSetRef.current.add(name);

          l && this.setError(name, null);
          // l && this.setSuccess(name, false);

          loadersRef.current = { ...loadersRef.current, [name]: l };

          setLoading(p => ({ ...p, [name]: l }));

          if (l) {
            this.show(name, config);
          } else {
            this.hide(name);
          }

          callback && callback(l);
        };
      };

      onError = <Error extends any[] = any[]>(
        name: Name,
        callback?: SetDataCallback<Error>
      ): ((error?: Error) => void) => {
        return (error?: Error) => {
          this.setError(name, error);

          error && callback && callback(error);
        };
      };

      onSuccess = <Args extends any[] = any[]>(
        name: Name,
        callback?: (...args: Args) => void
      ): ((...args: Args) => void) => {
        return (...args: Args) => {
          this.setSuccess(name, true);

          if (callback) {
            callback(...args);
          }
        };
      };

      clearErrors = () => {
        setErrors(p => {
          return Object.assign({}, ...Object.keys(p).map(key => ({ [key]: undefined })));
        });
      };

      clearState = () => {
        setState(p => {
          return Object.assign({}, ...Object.keys(p).map(key => ({ [key]: undefined })));
        });
      };

      clearLoadings = () => {
        loadersRef.current = Object.assign({}, ...Object.keys(loadersRef.current).map(key => ({ [key]: false })));
        setLoading(p => {
          return Object.assign({}, ...Object.keys(p).map(key => ({ [key]: false })));
        });
      };
      clearFields = () => {
        // namesSetRef.current.clear();

        this.clearErrors();
        this.clearState();
        this.clearLoadings();
      };
    }

    return new Loaders();
  }, [toastsRef]);

  return {
    ...loaders,
    isFullLoading: isLoading,
    isError,
    isSuccess,
    isLoading: loading,
    loadings: loadersRef.current,
    success,
    errors,
    state,
    hasLoading,
    hasError,
    hasSuccess,
  };
};
