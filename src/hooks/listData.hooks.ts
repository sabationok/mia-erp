import { IFounderEntries } from '../utils/founder';
import { useMemo } from 'react';
import { founder } from '../utils';

const useFilteredLisData = <T = any>(options: IFounderEntries<T>, deps?: any[]) => {
  return useMemo(() => founder<T>(options), [options]);
};
const useEntryListData = <T = any>(list: T[], param: keyof T, deps?: any[]) =>
  useMemo((): T[] => list.filter(el => !el[param]), [list, param]);

export { useFilteredLisData, useEntryListData };
