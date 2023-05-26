import { FilterSelectorType } from 'components/Filter/AppFilter';
import { useCategoriesSelector, useCountsSelector } from 'redux/selectors.store';

const useTrFilterSelectors = (): FilterSelectorType[] => {
  const transactionTypes = [
    { _id: 'ds6d5vf6sd5f1v6sd', name: 'INCOME', label: 'ДОХІД' },
    { _id: 'ds6d5vf6sd6f1v61d', name: 'TRANSFER', label: 'ПЕРЕКАЗ' },
    { _id: 'ds6d5vf6dd6f1v68d', name: 'EXPENSE', label: 'ВИТРАТИ' },
  ];

  return [
    {
      label: 'Тип',
      data: transactionTypes,
      selectorName: 'type',
    },
    {
      label: 'Рахунки',
      data: useCountsSelector().counts,
      selectorName: 'counts',
    },
    {
      label: 'Категорії',
      data: useCategoriesSelector().categories,
      selectorName: 'categories',
    },
  ];
};
export default useTrFilterSelectors;
