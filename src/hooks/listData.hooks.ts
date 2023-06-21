import { IFounderEntries } from '../utils/founder';
import { useMemo } from 'react';
import { founder } from '../utils';

const useFilteredLisData = <T = any>({ searchParam, searchQuery, data }: IFounderEntries<T>) => {
  return useMemo(() => founder<T>({ searchParam, searchQuery, data }), [data, searchParam, searchQuery]);
};
const useEntryListData = <T = any>(list: T[], path: keyof T) =>
  useMemo((): T[] => list.filter(el => !el[path]), [list, path]);

export { useFilteredLisData, useEntryListData };
