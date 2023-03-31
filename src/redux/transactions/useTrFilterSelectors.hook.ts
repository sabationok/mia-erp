import { FilterSelectorType } from 'components/Filter/Filter';
import SelectsList from 'components/Filter/SelectorContent/SelectsList';
import { useCategoriesSelector } from 'redux/categories/useCategoriesService.hook';
import { useCountsSelector } from 'redux/selectors.store';

const useTrFilterSelectors = (): FilterSelectorType[] => {
  const transationTypes = [
    { _id: 'ds6d5vf6sd5f1v6sd', name: 'INCOME', label: 'ДОХІД' },
    { _id: 'ds6d5vf6sd6f1v61d', name: 'TRANSFER', label: 'ПЕРЕКАЗ' },
    { _id: 'ds6d5vf6dd6f1v68d', name: 'EXPENSE', label: 'ВИТРАТИ' },
  ];

  const selectors: FilterSelectorType[] = [
    {
      label: 'Тип',
      data: transationTypes,
      selectorName: 'type',
      ListComp: SelectsList,
    },
    {
      label: 'Рахунки',
      data: useCountsSelector().counts,
      selectorName: 'categories',
      ListComp: SelectsList,
    },
    {
      label: 'Категорії',
      data: useCategoriesSelector().categories,
      selectorName: 'counts',
      ListComp: SelectsList,
    },
  ];

  return selectors;
};
export default useTrFilterSelectors;
