import { IBase, IDataWithPeriod, IFormDataValueWithUUID, OnlyUUID } from '../global.types';
import { FilterOpt } from '../../components/ModalForm/ModalFilter';
import { IProduct } from '../products/products.types';
import { IVariation } from '../products/variations.types';
import { AppQueryParams } from '../../api';
import { ICompanyBase } from '../companies/companies.types';
import { IUserBase } from '../auth/auth.types';

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

export interface IPriceDto extends IDataWithPeriod {
  list?: OnlyUUID;
  product?: OnlyUUID;
  variation?: OnlyUUID;

  price?: number;
  cost?: number;

  discountAmount?: number;
  discountPercentage?: number;
  cashbackAmount?: number;
  cashbackPercentage?: number;
  markupPercentage?: number;
  markupAmount?: number;
  commissionPercentage?: number;
  commissionAmount?: number;

  discountLabel?: string;
  cashbackLabel?: string;
}
export interface IPriceBase {
  label?: string;

  price?: number;
  cost?: number;

  in?: number;
  out?: number;

  discountAmount?: number;
  discountPercentage?: number;

  cashbackAmount?: number;
  cashbackPercentage?: number;

  bonusAmount?: number;
  bonusPercentage?: number;

  markupPercentage?: number;
  markupAmount?: number;

  commissionPercentage?: number;
  commissionAmount?: number;

  discountLabel?: string;
  cashbackLabel?: string;
}
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
  data: Omit<IPriceDto, 'list' | 'product' | 'variation'>;
  params?: AppQueryParams;
}
