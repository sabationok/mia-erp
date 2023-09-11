import { ContractorsTypesEnum } from '../redux/contractors/contractors.types';
import { useDirectoriesSelector } from '../redux/selectors.store';
import { ApiDirType } from '../redux/APP_CONFIGS';
import { useMemo } from 'react';

export const useCounterpartyDirectorySelectorByType = <T extends ContractorsTypesEnum = any>(type: T) => {
  const { directory: customers } = useDirectoriesSelector<ApiDirType.CONTRACTORS>(ApiDirType.CONTRACTORS);

  return useMemo(() => customers.filter(el => el.type === type), [type, customers]);
};
