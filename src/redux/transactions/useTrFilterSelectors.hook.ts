import { FilterSelectorType } from 'components/Filter/AppFilter';
import SelectsTreeList from 'components/Filter/SelectorContent/SelectsTreeList';
import { useCategoriesSelector } from 'redux//selectors.store';
import { useCountsSelector } from 'redux/selectors.store';

const useTrFilterSelectors = (): FilterSelectorType[] => {
  const transationTypes = [
    { _id: 'ds6d5vf6sd5f1v6sd', name: 'INCOME', label: 'ДОХІД' },
    { _id: 'ds6d5vf6sd6f1v61d', name: 'TRANSFER', label: 'ПЕРЕКАЗ' },
    { _id: 'ds6d5vf6dd6f1v68d', name: 'EXPENSE', label: 'ВИТРАТИ' },
  ];

  return [
    {
      label: 'Тип',
      data: transationTypes,
      selectorName: 'type',
      ListComp: SelectsTreeList,
    },
    {
      label: 'Рахунки',
      data: useCountsSelector().counts,
      selectorName: 'counts',
      ListComp: SelectsTreeList,
    },
    {
      label: 'Категорії',
      data: useCategoriesSelector().categories,
      selectorName: 'categories',
      ListComp: SelectsTreeList,
    },
  ];
};
export default useTrFilterSelectors;
