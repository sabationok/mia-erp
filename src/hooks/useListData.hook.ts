import { founder, IFounderEntries } from '../utils';
import { useMemo } from 'react';

const useFilteredLisData = <T = any>({ searchParam, searchQuery, data }: IFounderEntries<T>) => {
  return useMemo(() => founder<T>({ searchParam, searchQuery, data }), [data, searchParam, searchQuery]);
};

export { useFilteredLisData };
