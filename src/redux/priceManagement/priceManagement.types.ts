import { AppResponse, IBase, IFormDataValueWithUUID, OnlyUUID } from '../global.types';
import { FilterOpt } from '../../components/ModalForm/ModalFilter';
import { IProduct } from '../products/products.types';
import { IVariation } from '../products/variations.types';
import { AppQueryParams } from '../../api';

export enum PriceListTypeEnum {
  PURCHASES = 'purchases',
  SALES = 'sales',
}

export type PriceListStatus = 'rejected' | 'approved' | 'pending' | 'error' | 'success' | 'warning' | 'info';

export type PriceListType = 'purchases' | 'sales';

export type PriceListFilterOption = FilterOpt<PriceListType>;

export interface PriceListDto {
  label: string;
  status?: PriceListStatus;
  type?: PriceListType;
  customerTags?: string[];
  supplierTags?: string[];
  timeFrom?: string;
  timeTo?: string;
  description?: string;
  // prices?: OnlyUUID[];
  // products?: OnlyUUID[];
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

export interface IPriceDto {
  product?: OnlyUUID;
  variation?: OnlyUUID;
  list?: OnlyUUID;

  label?: string;
  price?: number;
  cost?: number;
  discount?: number;
  markupPercentage?: number;
  markupAmount?: number;
  commissionPercentage?: number;
  commissionAmount?: number;
}

export interface IPriceListItem extends IBase {
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
  // * OPTIONAL
  timeFrom?: string | number | Date;
  timeTo?: string | number | Date;
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

export interface ICreatePriceListItemReqData {
  list: OnlyUUID;
  data: IPriceDto;
  params?: AppQueryParams;
}

export interface IAllPriceListsRes extends AppResponse<IPriceList[]> {}

export interface IPriceListRes extends AppResponse<IPriceList> {}

export interface IAllPriceListItemsRes extends AppResponse<IPriceListItem[]> {}

export interface IPriceListItemRes extends AppResponse<IPriceListItem> {}
