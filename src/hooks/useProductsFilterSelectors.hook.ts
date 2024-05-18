import { FilterSelectorType } from 'components/Filter/AppFilter';
import { OfferEntity } from '../types/offers/offers.types';

const useStorageFilterSelectors = (): FilterSelectorType<keyof OfferEntity>[] => {
  return [
    // {
    //   label: 'Рахунок OUT',
    //   data: dirCounts.directory,
    //   selectorName: 'countOut',
    //   dirType: ApiDirType.COUNTS,
    // },
    // {
    //   label: 'Суб-рахунок OUT',
    //   data: dirCounts.directory,
    //   selectorName: 'subCountOut',
    //   dirType: ApiDirType.COUNTS,
    // },
    // {
    //   label: 'Рахунок IN',
    //   data: dirCounts.directory,
    //   selectorName: 'countIn',
    //   dirType: ApiDirType.COUNTS,
    // },
    // {
    //   label: 'Суб-рахунок IN',
    //   data: dirCounts.directory,
    //   selectorName: 'subCountIn',
    //   dirType: ApiDirType.COUNTS,
    // },
    // {
    //   label: 'Категорії',
    //   data: dirCategories.directory,
    //   selectorName: 'category',
    //   dirType: ApiDirType.CATEGORIES_TR,
    // },
    // {
    //   label: 'Під-категорії',
    //   data: dirCategories.directory,
    //   selectorName: 'subCategory',
    //   dirType: ApiDirType.CATEGORIES_TR,
    // },
  ];
};
export default useStorageFilterSelectors;
