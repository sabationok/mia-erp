import { IBase, IFormDataValueWithID, OnlyUUID } from '../../redux/global.types';
import { TabOption } from '../../components/atoms/TabSelector';
import { OfferEntity } from '../offers/offers.types';
import { VariationEntity } from '../offers/variations.types';
import { AppQueryParams } from '../../api';
import { ICompanyBase } from '../companies.types';
import { IUserBase } from '../auth.types';

import { EntityPath, HasDescription, HasLabel, HasStatus, HasType, MaybeNull, WithPeriod } from '../utils.types';
import { PriceDiscountEntity, PriceDiscountRecord } from './discounts';

export enum PriceListTypeEnum {
  PURCHASES = 'purchases',
  SALES = 'sales',
}

export interface HasPrice {
  price?: MaybeNull<OfferPriceEntity>;
}

export type PriceListStatus = 'rejected' | 'approved' | 'pending' | 'error' | 'success' | 'warning' | 'info';

export type PriceListType = 'purchases' | 'sales';

export type PriceListFilterOption = TabOption<PriceListType>;

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
  prices?: OfferPriceEntity[];
  // products?: Partial<OfferEntity>[];
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

export interface IPriceBase extends PriceAmountAndPercentageFields, HasLabel {
  in?: number | string;
  out?: number | string;
}

export type BasePriceInfoPath = EntityPath<IPriceBase>;

export interface IPriceDto extends IPriceBase, WithPeriod {
  list?: OnlyUUID;
  product?: OnlyUUID;
  variation?: OnlyUUID;
}

export type UpdatePriceDto = Partial<Omit<IPriceDto, 'list' | 'product' | 'variation'>>;

export interface OfferPriceEntity extends IBase, IPriceBase {
  owner?: ICompanyBase;
  author?: IUserBase;
  editor?: IUserBase;

  list?: PriceListEntity;
  offer?: OfferEntity;
  variation?: VariationEntity;

  discounts?: PriceDiscountEntity[];
}

export interface IPriceFormData extends Omit<IPriceDto, 'product' | 'variation' | 'list'> {
  offer?: IFormDataValueWithID;
  variation?: IFormDataValueWithID;
  list?: IFormDataValueWithID;

  discounts?: (PriceDiscountRecord | PriceDiscountEntity)[];
}

export interface IPriceListReqData {
  _id?: string;
  data: PriceListDto;
  params?: AppQueryParams;
}

export interface IPriceListItemReqData {
  _id?: string;
  data: IPriceDto;
  params?: AppQueryParams;
}

export interface ICreatePriceReqData {
  data: IPriceDto;
  params?: AppQueryParams;
}

export interface IUpdatePriceReqData {
  _id?: string;
  data: UpdatePriceDto;
  params?: AppQueryParams;
}
