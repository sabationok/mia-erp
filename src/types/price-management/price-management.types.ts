import { IBase, IFormDataValueWithID, OnlyUUID } from '../../redux/app-redux.types';
import { TabOption } from '../../components/atoms/TabSelector';
import { OfferEntity } from '../offers/offers.types';
import { VariationEntity } from '../offers/variations.types';
import { AppQueryParams } from '../../api';
import { ICompanyBase } from '../companies.types';
import { IUserBase } from '../auth.types';
import { EntityPath, HasDescription, HasLabel, HasStatus, HasType, MaybeNull, UUID, WithPeriod } from '../utils.types';
import { PriceDiscountEntity, PriceDiscountRecord } from './discounts';
import { Path } from 'react-hook-form';

export enum PriceListTypeEnum {
  PURCHASES = 'purchases',
  SALES = 'sales',
}

export interface HasPrice {
  price?: MaybeNull<PriceEntity>;
}

export type PriceListStatus = 'rejected' | 'approved' | 'pending' | 'error' | 'success' | 'warning' | 'info';

export type PriceListType = 'purchases' | 'sales';

export type PriceListFilterOption = TabOption<PriceListType>;

export enum OfferPriceTypeEnum {
  fixed = 'fixed',
  recommend = 'recommend',
  onContract = 'onContract',
}

export interface PriceListDto
  extends WithPeriod,
    HasLabel,
    HasDescription,
    HasStatus<PriceListStatus>,
    HasType<PriceListType> {
  customerTags?: string[];
  supplierTags?: string[];
}

export interface PriceListEntity extends IBase {
  label: string;
  status?: PriceListStatus;

  prices?: PriceEntity[];
  discounts?: PriceDiscountEntity[];

  timeFrom?: string;
  timeTo?: string;
  description?: string;
  type?: PriceListType;
}

export interface AmountAndPercentage {
  amount?: number | string;
  percentage?: number | string;
}
export enum PriceAmountAndPercentageFieldsEnum {
  commission = 'commission',
  markup = 'markup',
  // discount = 'discount',
  // cashback = 'cashback',
  // bonus = 'bonus',
  // tax = 'tax',
  // vat = 'vat',
}

export type PriceAmountAndPercentageFieldsKey = keyof typeof PriceAmountAndPercentageFieldsEnum;

export interface PriceAmountAndPercentageFields
  extends Record<PriceAmountAndPercentageFieldsKey, AmountAndPercentage> {}

export interface IPriceBase extends PriceAmountAndPercentageFields, HasLabel, HasType<OfferPriceTypeEnum> {
  in?: number | string;
  out?: number | string;
}

export type BasePriceInfoPath = EntityPath<IPriceBase>;

export interface CreatePriceDto extends IPriceBase, WithPeriod {
  list?: OnlyUUID;
  product?: OnlyUUID;
  variation?: OnlyUUID;

  listId?: UUID;
  productId?: UUID;
  variationId?: UUID;

  discounts?: (OnlyUUID | PriceDiscountRecord)[];
}

export type UpdatePriceDto = Partial<Omit<CreatePriceDto, 'list' | 'product' | 'variation'>> & {
  // discountsIds?: UUID[];
};

export interface PriceEntity extends IBase, IPriceBase {
  owner?: ICompanyBase;
  author?: IUserBase;
  editor?: IUserBase;

  list?: PriceListEntity;
  offer?: OfferEntity;
  variation?: VariationEntity;

  discounts?: PriceDiscountEntity[];
}

export interface IPriceFormData extends Omit<CreatePriceDto, 'product' | 'variation' | 'list'> {
  _id?: string;
  offer?: IFormDataValueWithID;
  variation?: IFormDataValueWithID;
  list?: IFormDataValueWithID;
  setAsDefault?: boolean;

  // discounts?: (PriceDiscountRecord | OnlyUUID)[];
}
export type PriceFormDataPath = Path<IPriceFormData>;
export interface IPriceListReqData {
  _id?: string;
  data: PriceListDto;
  params?: AppQueryParams;
}

export interface IPriceListItemReqData {
  _id?: string;
  data: CreatePriceDto;
  params?: AppQueryParams;
}

export interface ICreatePriceReqData {
  data: CreatePriceDto;
  params?: AppQueryParams;
}

export interface IUpdatePriceReqData {
  _id?: string;
  data: UpdatePriceDto;
  params?: AppQueryParams;
}
