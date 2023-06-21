import { FilterSelectorType } from 'components/Filter/AppFilter';
import { RootState, useAppSelector } from '../store.store';
import { ApiDirType } from '../APP_CONFIGS';

const useTrFilterSelectors = (): FilterSelectorType[] => {
  const { counts, categories }: RootState = useAppSelector();

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
      data: counts.counts,
      selectorName: ApiDirType.COUNTS,
    },
    {
      label: 'Категорії',
      data: categories.categories,
      selectorName: ApiDirType.CATEGORIES_TR,
    },
  ];
};
export default useTrFilterSelectors;
