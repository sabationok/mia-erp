import { IBase, IDataWithPeriod, IFormDataValueWithUUID, OnlyUUID } from '../global.types';
import { FilterOpt } from '../../components/ModalForm/ModalFilter';
import { IProduct } from '../products/products.types';
import { IVariation } from '../products/variations/variations.types';
import { AppQueryParams } from '../../api';
import { ICompanyBase } from '../companies/companies.types';
import { IUserBase } from '../auth/auth.types';
import { Path } from 'react-hook-form';

export enum PriceListTypeEnum {
  PURCHASES = 'purchases',
  SALES = 'sales',
}

export type PriceListStatus = 'rejected' | 'approved' | 'pending' | 'error' | 'success' | 'warning' | 'info';

export type PriceListType = 'purchases' | 'sales';

export type PriceListFilterOption = FilterOpt<PriceListType>;

export interface PriceListDto extends IDataWithPeriod {
  label: string;
  status?: PriceListStatus;
  type?: PriceListType;
  customerTags?: string[];
  supplierTags?: string[];
  description?: string;
}

export interface IPriceList extends IBase {
  label: string;
  status?: PriceListStatus;
  prices?: IPriceListItem[];
  products?: Partial<IProduct>[];
  timeFrom?: string;
  timeTo?: string;
  description?: string;
  type?: PriceListType;
}

export interface AmountAndPercentage {
  amount?: number;
  percentage?: number;
}
export enum PriceAmountAndPercentageFieldsEnum {
  commission = 'commission',
  markup = 'markup',
  discount = 'discount',
  cashback = 'cashback',
  bonus = 'bonus',
  tax = 'tax',
  vat = 'vat',
}

export type PriceAmountAndPercentageFieldsKey = keyof typeof PriceAmountAndPercentageFieldsEnum;

export interface PriceAmountAndPercentageFields
  extends Record<PriceAmountAndPercentageFieldsKey, AmountAndPercentage> {}

export interface IPriceBase extends PriceAmountAndPercentageFields {
  label?: string;

  in?: number;
  out?: number;

  discountLabel?: string;
  cashbackLabel?: string;
}

export type BasePriceInfoPath = Path<IPriceBase>;

export interface IPriceDto extends IPriceBase, IDataWithPeriod {
  list?: OnlyUUID;
  product?: OnlyUUID;
  variation?: OnlyUUID;
}

export type UpdatePriceDto = Partial<Omit<IPriceDto, 'list' | 'product' | 'variation'>>;

export interface IPriceListItem extends IBase, IPriceBase {
  owner?: ICompanyBase;
  author?: IUserBase;
  editor?: IUserBase;

  list?: IPriceList;
  product?: IProduct;
  variation?: IVariation;
}

export interface IPriceFormData extends Omit<IPriceDto, 'product' | 'variation' | 'list'> {
  product?: IFormDataValueWithUUID;
  variation?: IFormDataValueWithUUID;
  list?: IFormDataValueWithUUID;
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
