import { useMemo } from 'react';
import { getTranslatedString, LangKey } from '../lang';
import { ExtServiceBase, ExtServiceMethodBase } from '../redux/integrations/integrations.types';

interface UseTranslatedListDataOptions<M extends ExtServiceMethodBase = any> {
  langKey?: LangKey;
  withFullLabel?: boolean;
  getLabel?: (
    option: M & {
      parent?: ExtServiceBase;
      fullLabel?: string;
    }
  ) => React.ReactNode;
}

export type TranslatedMethod<M extends ExtServiceMethodBase = any> = M & {
  value: any;
};
export const useTranslatedMethodsList = <T extends ExtServiceMethodBase = any>(
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
