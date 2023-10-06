import { IBase, IBaseWithPeriod, IDataWithPeriod, IFormDataValueWithUUID, OnlyUUID } from '../global.types';
import { IProduct } from '../products/products.types';
import { ICompany } from '../companies/companies.types';
import { IPriceListItem } from '../priceManagement/priceManagement.types';
import { IVariation } from '../products/variations.types';
import { AppQueryParams } from '../../api';
import { IUser } from '../auth/auth.types';
import { GeolocationPoint } from '../../services/Geolocation.service';

export enum WarehouseTypeEnum {
  WAREHOUSE = 'warehouse',
  STORE = 'store',
}
export enum DeliverNameEnum {
  novaposhta = 'novaposhta',
  ukrposhta = 'ukrposhta',
}
export enum WarehouseDocumentType {
  addToStock = 'addToStock',
  reserveFromStock = 'reserveFromStock',
  removeFromStock = 'removeFromStock',
  returnFromReserve = 'returnFromReserve',
  removeFromReserve = 'removeFromReserve',
}
export interface IWarehouse extends IBase {
  owner?: ICompany;
  manager?: any;

  label: string;
  code?: string | number;
  type?: WarehouseTypeEnum;

  location?: GeolocationPoint;
  address?: string;

  inventories?: IProductInventory[];

  novaposhtaApiKey?: string;
  ukrposhtaApiKey?: string;
}

export interface IWarehouseDto {
  label: string;
  code?: string;
  email?: string;
  phone?: string;
  type?: WarehouseTypeEnum;
  manager?: IFormDataValueWithUUID;
  location?: GeolocationPoint;
}
export interface IWarehouseReqData {
  _id?: string;
  data: IWarehouseDto;
  params?: AppQueryParams;
}

// * INVENTORIES

export type ProductInventoryStatus = 'rejected' | 'approved' | 'pending' | 'error' | 'success' | 'warning' | 'info';

export interface IProductInventory extends IBaseWithPeriod {
  owner?: ICompany;
  warehouse?: IWarehouse;
  product?: IProduct;
  variation?: IVariation;
  price?: IPriceListItem;

  stock?: number;
  reserved?: number;
  awaiting?: number;
  lost?: number;
}

export interface IProductInventoryFormData {
  product?: Omit<IProduct, 'categories' | 'inventories' | 'category' | 'properties'>;
  variation?: Omit<IVariation, 'properties'>;
  price?: Omit<IPriceListItem, 'list' | 'product'>;
  warehouse?: IWarehouse;

  stock?: number;
  reserved?: number;
  awaiting?: number;
  lost?: number;
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
  awaiting?: number;
  lost?: number;

  reservation?: boolean;

  customerTags?: string[];
  supplierTags?: string[];
}
export interface IProductInventoryReqData {
  _id?: OnlyUUID;
  data: IProductInventoryDto;
  params?: AppQueryParams;
}

// * WAREHOUSE SETTINGS
export interface WarehouseSettingsDto {
  warehouse?: OnlyUUID;
  isReservationAvailable?: boolean;
}
export interface WarehousingSettingsFormData {
  warehouse?: IFormDataValueWithUUID;
  isReservationAvailable?: boolean;
}

// * WAREHOUSE DOCUMENTS

export interface IWarehouseDoc extends IBaseWithPeriod {
  owner?: ICompany;
  author?: IUser;
  warehouse?: IWarehouse;
  product?: IProduct;
  variation?: IVariation;
  price?: IPriceListItem;

  amount?: number;
  batch?: string;
  type?: WarehouseDocumentType;
}

export interface IWarehouseDocFormData {
  owner?: IFormDataValueWithUUID;
  author?: IFormDataValueWithUUID;
  warehouse?: IFormDataValueWithUUID;
  product?: IFormDataValueWithUUID;
  variation?: IFormDataValueWithUUID;
  price?: IFormDataValueWithUUID;

  batch?: string;
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

  batch?: string;
  amount?: number;
  type?: WarehouseDocumentType;
}
export interface IWarehouseDocReqData {
  _id?: string;
  data?: IWarehouseDocDto;
  params?: Omit<AppQueryParams, 'warehouse' | 'variation' | 'product' | 'price'>;
}
