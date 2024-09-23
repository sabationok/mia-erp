import { enumToFilterOptions } from '../utils';
import { FinTransactionTypeEnum, TagTypeEnum } from '../types/directories.types';
import { FinAccountsTypeEnum } from '../types/finances/fin-accounts.types';
import { OfferTypeEnum } from '../types/offers/offers.types';
import { ContractorsTypesEnum } from '../redux/directories/contractors.types';
import { PropertySelectableTypeEnum } from '../types/offers/properties.types';

export const categoriesFilterOptions = enumToFilterOptions(FinTransactionTypeEnum);
export const countsFilterOptions = enumToFilterOptions(FinAccountsTypeEnum);
export const offerTypeFilterOptions = enumToFilterOptions(OfferTypeEnum);

export const propertiesSelectableTypeFilterOptions = enumToFilterOptions(PropertySelectableTypeEnum);
export const tagsFilterOptions = enumToFilterOptions(TagTypeEnum);
export const counterpartyFilterOptions = enumToFilterOptions(ContractorsTypesEnum);
