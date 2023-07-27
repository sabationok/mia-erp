import { AppResponse, IBase, OnlyUUID } from '../global.types';
import { FilterOpt } from '../../components/ModalForm/ModalFilter';
import { IProduct } from '../products/products.types';

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

export interface PriceListItemDto {
  label?: string;
  price?: number;
  cost?: number;
  discount?: number;
  markupPercentage?: number;
  markupAmount?: number;
  commissionPercentage?: number;
  commissionAmount?: number;
  product?: OnlyUUID;
}

export interface IPriceListItem extends IBase {
  label: string;
  product: IProduct;
  list?: IPriceList;
  price?: number;
  cost?: number;
  discount?: number;
  markupPercentage?: number;
  markupAmount?: number;
  commissionPercentage?: number;
  commissionAmount?: number;
}

export interface IPriceListReqData {
  _id?: string;
  data: PriceListDto;
}

export interface IPriceListItemReqData {
  _id?: string;
  data: PriceListItemDto;
}

export interface ICreatePriceListItemReqData {
  list: OnlyUUID;
  data: PriceListItemDto;
}

export interface IAllPriceListsRes extends AppResponse<IPriceList[]> {}

export interface IPriceListRes extends AppResponse<IPriceList> {}

export interface IAllPriceListItemsRes extends AppResponse<IPriceListItem[]> {}

export interface IPriceListItemRes extends AppResponse<IPriceListItem> {}
