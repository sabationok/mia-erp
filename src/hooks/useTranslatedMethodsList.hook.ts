import { useMemo } from 'react';
import { getTranslatedString, LangKey } from '../lang';
import { ExtServiceBase, ServiceMethodBase } from '../types/integrations.types';

interface UseTranslatedListDataOptions<M extends ServiceMethodBase = any> {
  langKey?: LangKey;
  withFullLabel?: boolean;
  getLabel?: (
    option: M & {
      parent?: ExtServiceBase;
      fullLabel?: string;
    }
  ) => React.ReactNode;
}

export type TranslatedMethod<M extends ServiceMethodBase = any> = M & {
  value: any;
};
export const useTranslatedMethodsList = <T extends ServiceMethodBase = any>(
  data: T[] = [],
  options?: UseTranslatedListDataOptions<T>
): TranslatedMethod<T>[] => {
  return useMemo((): TranslatedMethod<T>[] => {
    const trList = data.map(el => {
      const label = el.labels ? getTranslatedString(el.labels, options?.langKey) : el.label ?? el?.type;

      const parent = !el?.service
        ? undefined
        : {
            ...el?.service,
            label: el.service?.lang ? getTranslatedString(el.service?.lang, options?.langKey) : el.service?.label,
            labels: el.service?.lang ? getTranslatedString(el.service?.lang, options?.langKey) : el.service?.label,
          };

      const fullLabel = parent?.label ? `${parent?.label} | ${label}` : label;

      return {
        ...el,
        value: el._id,
        label: options?.getLabel
          ? options?.getLabel({ ...el, label, parent })
          : options?.withFullLabel
          ? fullLabel
          : label,
        parent,
      };
    });
    return trList;
  }, [data, options]);
};
