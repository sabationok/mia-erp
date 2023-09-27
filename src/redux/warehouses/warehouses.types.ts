import { IBase, IBaseWithPeriod, OnlyUUID } from '../global.types';
import { IProduct } from '../products/products.types';
import { ICompany } from '../companies/companies.types';
import { IPriceListItem } from '../priceManagement/priceManagement.types';
import { IVariation } from '../products/variations.types';
import { AppQueryParams } from '../../api';
import { IUser } from '../auth/auth.types';

export enum WarehouseTypeEnum {
  WAREHOUSE = 'warehouse',
  STORE = 'store',
}
export interface IWarehouse extends IBase {
  owner?: ICompany;
  manager?: IUser;

  label: string;
  code?: string | number;
  type?: WarehouseTypeEnum;

  location?: string;
  inventories?: IProductInventory[];
}

export type ProductInventoryStatus = 'rejected' | 'approved' | 'pending' | 'error' | 'success' | 'warning' | 'info';

export interface IProductInventory extends IBaseWithPeriod {
  owner?: ICompany;

  product?: IProduct;
  variation?: IVariation;
  price?: IPriceListItem;

  batch?: string;
  stock?: number;
  reserved?: number;

  reservation?: boolean;
}
export interface IProductInventoryFormData {
  product?: Omit<IProduct, 'categories' | 'inventories' | 'category' | 'properties'>;
  variation?: Omit<IVariation, 'properties'>;
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
