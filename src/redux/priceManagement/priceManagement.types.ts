import { IBase, IBaseWithPeriod, IDataWithPeriod, IFormDataValueWithUUID, OnlyUUID } from '../global.types';
import { FilterOpt } from '../../components/ModalForm/ModalFilter';
import { IProduct } from '../products/products.types';
import { IVariation } from '../products/variations.types';
import { AppQueryParams } from '../../api';
import { ICompany } from '../companies/companies.types';
import { IUser } from '../auth/auth.types';

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

  label?: string;

  price?: number;
  cost?: number;
  discount?: number;
  markupPercentage?: number;
  markupAmount?: number;
  commissionPercentage?: number;
  commissionAmount?: number;
}

export interface IPriceListItem extends IBaseWithPeriod {
  owner?: ICompany;
  author?: IUser;
  editor?: IUser;

  product?: IProduct;
  variation?: IVariation;
  list?: IPriceList;

  label: string;
  price?: number;
  cost?: number;
  discount?: number;
  currency?: string;
  markupPercentage?: number;
  markupAmount?: number;
  commissionPercentage?: number;
  commissionAmount?: number;
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
