import { FilterSelectorType } from 'components/Filter/AppFilter';
import { ApiDirType } from '../APP_CONFIGS';
import { useDirectoriesSelector } from '../directories/useDirectoriesService.hook';

const useTrFilterSelectors = (): FilterSelectorType[] => {
  const dirCategories = useDirectoriesSelector(ApiDirType.CATEGORIES_TR);
  const dirCounts = useDirectoriesSelector(ApiDirType.CATEGORIES_TR);

  const transactionTypes = [
    { _id: 'ds6d5vf6sd5f1v6sd', name: 'INCOME', label: 'ДОХІД' },
    { _id: 'ds6d5vf6sd6f1v61d', name: 'TRANSFER', label: 'ПЕРЕКАЗ' },
    { _id: 'ds6d5vf6dd6f1v68d', name: 'EXPENSE', label: 'ВИТРАТИ' },
  ];

  return [
    {
      label: 'Тип',
      data: transactionTypes,
      queryName: 'type',
    },
    {
      label: 'Рахунки',
      data: dirCounts.directory,
      selectorName: ApiDirType.COUNTS,
    },
    {
      label: 'Категорії',
      data: dirCategories.directory,
      selectorName: ApiDirType.CATEGORIES_TR,
    },
  ];
};
export default useTrFilterSelectors;
