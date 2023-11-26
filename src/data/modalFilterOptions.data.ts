import { enumToFilterOptions } from '../utils/fabrics';
import { CategoryTrTypeEnum } from '../types/directories.types';
import { CountsTypesEnum } from '../redux/directories/counts.types';
import { OfferTypeEnum } from '../types/products.types';
import { ContractorsTypesEnum } from '../redux/directories/contractors.types';

export const categoriesFilterOptions = enumToFilterOptions(CategoryTrTypeEnum);
export const countsFilterOptions = enumToFilterOptions(CountsTypesEnum);
export const productsFilterOptions = enumToFilterOptions(OfferTypeEnum);
export const tagsFilterOptions = enumToFilterOptions(ContractorsTypesEnum);
export const counterpartyFilterOptions = enumToFilterOptions(ContractorsTypesEnum);
