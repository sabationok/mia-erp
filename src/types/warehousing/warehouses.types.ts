import { IBase, IFormDataValueWithID, OnlyUUID } from '../../redux/app-redux.types';
import { OfferEntity } from '../offers/offers.types';
import { CompanyEntity } from '../companies.types';
import { PriceEntity } from '../price-management/price-management.types';
import { VariationEntity } from '../offers/variations.types';
import { AppQueryParams } from '../../api';
import { GeolocationPoint } from '../../services/Geolocation.service';
import { HasAuthor, HasOwnerAsCompany, HasStatus, HasStatusRef, HasType, MaybeNull, WithPeriod } from '../utils.types';
import { WarehouseInventoryEntity } from './warehouse-inventory.types';

export * from './warehouse-inventory.types';

export enum WarehouseTypeEnum {
  WAREHOUSE = 'warehouse',
  STORE = 'store',
}

export enum WarehouseDocumentType {
  addToStock = 'addToStock',
  reserveFromStock = 'reserveFromStock',
  removeFromStock = 'removeFromStock',
  returnFromReserve = 'returnFromReserve',
  removeFromReserve = 'removeFromReserve',
}
export interface WarehouseEntity extends IBase {
  owner?: CompanyEntity;
  manager?: any;

  label?: string;
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

export interface WarehouseItemEntity extends WarehouseInventoryEntity {}

export interface IProductInventoryFormData extends WithPeriod, HasStatus<ProductInventoryStatus> {
  product?: Omit<OfferEntity, 'categories' | 'inventories' | 'category' | 'properties'>;
  variation?: Omit<VariationEntity, 'properties'>;
  price?: Omit<PriceEntity, 'list' | 'offer'>;
  warehouse?: WarehouseEntity;

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
  warehouse?: MaybeNull<WarehouseEntity>;
}
export interface HasWarehouseInventory {
  inventory?: MaybeNull<WarehouseItemEntity>;
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
  warehouse?: WarehouseEntity;
  product?: OfferEntity;
  variation?: VariationEntity;
  price?: PriceEntity;

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
  params?: Omit<AppQueryParams, 'warehouse' | 'variation' | 'offer' | 'price'>;
}
