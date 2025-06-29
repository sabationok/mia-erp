import { OfferEntity, VariationEntity } from '../offers';
import { ApiQueryParams, ApiRequestConfig } from '../../api';
import { ICompanyBase } from '../companies/companies.types';
import { IUserBase } from '../auth/auth.types';
import {
  EntityPath,
  HasLabel,
  HasOwnerAsCompany,
  HasType,
  IBase,
  OnlyUUID,
  PartialRecord,
  UUID,
  WithPeriod,
} from '../utils.types';
import { PriceDiscountEntity, PriceDiscountRecord } from './discounts';
import { Path } from 'react-hook-form';
import { PriceListEntity } from './price-list.types';
import { IFormDataValueWithID } from '../../redux/app-redux.types';

export enum OfferPriceTypeEnum {
  fixed = 'fixed',
  recommend = 'recommend',
  onContract = 'onContract',
}

export interface AmountAndPercentageFields {
  amount?: number | string;
  percentage?: number | string;
}
export enum PriceAmountFieldsKeyEnum {
  commission = 'commission',
  markup = 'markup',

  // discount = 'discount',
  // cashback = 'cashback',
  // bonus = 'bonus',
  // tax = 'tax',
  // vat = 'vat',
}

export type PriceAmountFieldsKey = keyof typeof PriceAmountFieldsKeyEnum;

export interface PriceAmountAndPercentageFields
  extends PartialRecord<PriceAmountFieldsKey, AmountAndPercentageFields> {}

export interface IPriceBase extends PriceAmountAndPercentageFields, HasLabel, HasType<OfferPriceTypeEnum> {
  in?: number | string;
  out?: number | string;
}

export type BasePriceInfoPath = EntityPath<IPriceBase>;

export interface CreatePriceDto extends IPriceBase, WithPeriod {
  listId?: UUID;
  offerId?: UUID;

  discounts?: (OnlyUUID | PriceDiscountRecord)[];
}

export type UpdatePriceDto = OnlyUUID & Partial<Omit<CreatePriceDto, 'list' | 'product' | 'variation'>> & {};

export interface PriceEntity extends IBase, IPriceBase, HasOwnerAsCompany {
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
}

export type PriceFormDataPath = Path<IPriceFormData>;

export interface ICreatePriceReqData extends ApiRequestConfig<CreatePriceDto, ApiQueryParams> {}

export interface IUpdatePriceReqData {
  data?: UpdatePriceDto;
  params?: ApiQueryParams;
}
export interface HasPrice {
  price?: PriceEntity;
}
export interface HasPrices {
  prices?: PriceEntity[];
}
