import { IBase, IBaseWithPeriod, IDataWithPeriod, IFormDataValueWithUUID, OnlyUUID } from '../global.types';
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

export enum WarehouseDocumentType {
  addToStock = 'addOnStock',
  reserveFromStock = 'reserveFromStock',
  removeFromStock = 'removeFromStock',
  returnFromReserve = 'returnFromReserve',
  removeFromReserve = 'removeFromReserve',
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
  warehouse?: IWarehouse;
  product?: IProduct;
  variation?: IVariation;
  price?: IPriceListItem;

  batch?: string;
  stock?: number;
  reserved?: number;
}

export interface IWarehouseDoc extends IBaseWithPeriod {
  owner?: ICompany;
  author?: IUser;
  warehouse?: IWarehouse;
  product?: IProduct;
  variation?: IVariation;
  price?: IPriceListItem;

  amount?: number;
  type?: WarehouseDocumentType;
}

export interface IWarehouseDocFormData {
  owner?: IFormDataValueWithUUID;
  author?: IFormDataValueWithUUID;
  warehouse?: IFormDataValueWithUUID;
  product?: IFormDataValueWithUUID;
  variation?: IFormDataValueWithUUID;
  price?: IFormDataValueWithUUID;

  amount?: number;
  type?: WarehouseDocumentType;
}

export interface IWarehouseDocDto {
  owner?: OnlyUUID;
  author?: OnlyUUID;
  warehouse?: OnlyUUID;
  product?: OnlyUUID;
  variation?: OnlyUUID;
  price?: OnlyUUID;

  amount?: number;
  type?: WarehouseDocumentType;
}
export interface IProductInventoryFormData {
  product?: Omit<IProduct, 'categories' | 'inventories' | 'category' | 'properties'>;
  variation?: Omit<IVariation, 'properties'>;
  price?: Omit<IPriceListItem, 'list' | 'product'>;
  warehouse?: IWarehouse;

  stock?: number;
  reserved?: number;
  reservation?: boolean;

  status?: ProductInventoryStatus;
  customerTags?: string[];
  supplierTags?: string[];
  timeFrom?: string;
  timeTo?: string;
}
export interface IProductInventoryDto extends IDataWithPeriod {
  warehouse?: OnlyUUID;
  product?: OnlyUUID;
  variation?: OnlyUUID;
  price?: OnlyUUID;

  status?: OnlyUUID;

  stock?: number;
  reserved?: number;

  reservation?: boolean;

  customerTags?: string[];
  supplierTags?: string[];
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
