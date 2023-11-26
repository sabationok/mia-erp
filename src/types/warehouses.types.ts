import { IBase, IFormDataValueWithID, OnlyUUID } from '../redux/global.types';
import { IProduct } from './products.types';
import { ICompany } from './companies.types';
import { IPriceListItem } from './priceManagement.types';
import { IVariation } from './variations.types';
import { AppQueryParams } from '../api';
import { GeolocationPoint } from '../services/Geolocation.service';
import { HasAuthor, HasOwnerAsCompany, HasStatus, HasStatusRef, HasType, MaybeNull, WithPeriod } from './utils.types';

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

  inventories?: OnlyUUID[];

  novaposhtaApiKey?: string;
  ukrposhtaApiKey?: string;
}

export interface IWarehouseDto {
  label: string;
  code?: string;
  email?: string;
  phone?: string;
  type?: WarehouseTypeEnum;
  manager?: IFormDataValueWithID;
  location?: GeolocationPoint;
}
export interface IWarehouseReqData {
  _id?: string;
  data: IWarehouseDto;
  params?: AppQueryParams;
}

// * INVENTORIES

export type ProductInventoryStatus = 'rejected' | 'approved' | 'pending' | 'error' | 'success' | 'warning' | 'info';

export interface IProductInventory extends IBase, WithPeriod {
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

export interface IProductInventoryFormData extends WithPeriod, HasStatus<ProductInventoryStatus> {
  product?: Omit<IProduct, 'categories' | 'inventories' | 'category' | 'properties'>;
  variation?: Omit<IVariation, 'properties'>;
  price?: Omit<IPriceListItem, 'list' | 'product'>;
  warehouse?: IWarehouse;

  stock?: number;
  reserved?: number;
  awaiting?: number;
  lost?: number;
  reservation?: boolean;

  customerTags?: string[];
  supplierTags?: string[];
}
export interface IProductInventoryDto extends WithPeriod, HasStatusRef {
  warehouse?: OnlyUUID;
  product?: OnlyUUID;
  variation?: OnlyUUID;
  price?: OnlyUUID;

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
export interface HasWarehouse {
  warehouse?: MaybeNull<IWarehouse>;
}
export interface HasWarehouseInventory {
  inventory?: MaybeNull<IProductInventory>;
}

// * WAREHOUSE SETTINGS
export interface WarehouseSettingsDto {
  warehouse?: OnlyUUID;
  isReservationAvailable?: boolean;
}
export interface WarehousingSettingsFormData {
  warehouse?: IFormDataValueWithID;
  isReservationAvailable?: boolean;
}

// * WAREHOUSE DOCUMENTS

export interface IWarehouseDoc extends WithPeriod, HasType<WarehouseDocumentType>, HasOwnerAsCompany, HasAuthor {
  warehouse?: IWarehouse;
  product?: IProduct;
  variation?: IVariation;
  price?: IPriceListItem;

  amount?: number;
  batch?: string;
}

export interface IWarehouseDocFormData {
  owner?: IFormDataValueWithID;
  author?: IFormDataValueWithID;
  warehouse?: IFormDataValueWithID;
  product?: IFormDataValueWithID;
  variation?: IFormDataValueWithID;
  price?: IFormDataValueWithID;

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
