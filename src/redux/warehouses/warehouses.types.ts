import { IBase, OnlyUUID } from '../global.types';
import { IProduct } from '../products/products.types';
import { ICompany } from '../companies/companies.types';
import { IPriceListItem } from '../priceManagement/priceManagement.types';
import { IVariation } from '../products/variations.types';
import { AppQueryParams } from '../../api';

export enum WarehouseTypeEnum {
  WAREHOUSE = 'warehouse',
  STORE = 'store',
}
export interface IWarehouse extends IBase {
  owner?: ICompany;
  label: string;
  code?: string | number;
  type?: WarehouseTypeEnum;
  location?: string;
  items?: IProductInventory[];
}

export type ProductInventoryStatus = 'rejected' | 'approved' | 'pending' | 'error' | 'success' | 'warning' | 'info';

export interface IProductInventory extends IBase {
  owner?: ICompany;

  product?: Partial<IProduct>;
  variation?: IVariation;
  price?: IPriceListItem;

  stock?: number;
  reserved?: number;

  reservation?: boolean;

  timeFrom?: string;
  timeTo?: string;
}
export interface IProductInventoryFormData {
  product?: Omit<IProduct, 'category' | 'productInventory'>;
  variation?: IVariation;
  status?: ProductInventoryStatus;
  priceInfo?: Omit<IPriceListItem, 'list' | 'product'>;

  stock?: number;
  reserved?: number;

  reservation?: boolean;

  customerTags?: string[];
  supplierTags?: string[];
  timeFrom?: string;
  timeTo?: string;
}
export interface IProductInventoryDto {
  product?: OnlyUUID;
  variation?: OnlyUUID;
  status?: OnlyUUID;
  price?: OnlyUUID;

  warehouse?: OnlyUUID;

  stock?: number;
  reserved?: number;

  reservation?: boolean;

  customerTags?: string[];
  supplierTags?: string[];
  timeFrom?: string;
  timeTo?: string;
}
export interface IProductInventoryReqData {
  _id?: OnlyUUID;
  data: IProductInventoryDto;
  params?: AppQueryParams;
}
export interface IWarehouseDto {
  label: string;
  code?: string;
  type?: WarehouseTypeEnum;
  location?: string;
}
export interface IWarehouseReqData {
  _id?: string;
  data: IWarehouseDto;
}
