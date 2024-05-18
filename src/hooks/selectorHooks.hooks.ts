import { ContractorsTypesEnum } from '../redux/directories/contractors.types';
import { useDirectorySelector } from '../redux/selectors.store';
import { ApiDirType } from '../redux/APP_CONFIGS';
import { useMemo } from 'react';

export const useCounterpartyDirectorySelectorByType = <T extends ContractorsTypesEnum = any>(type: T) => {
  const { directory: customers } = useDirectorySelector<ApiDirType.CONTRACTORS>(ApiDirType.CONTRACTORS);

  return useMemo(() => customers.filter(el => el.type === type), [type, customers]);
};
