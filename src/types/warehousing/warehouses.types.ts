import { IFormDataValueWithID } from '../../redux/app-redux.types';
import { OfferEntity } from '../offers/offers.types';
import { CompanyEntity } from '../companies/companies.types';
import { PriceEntity } from '../price-management/price-management.types';
import { VariationEntity } from '../offers/variations.types';
import { ApiQueryParams } from '../../api';
import {
  HasAuthor,
  HasOwnerAsCompany,
  HasStatus,
  HasStatusRef,
  HasType,
  IBase,
  MaybeNull,
  OnlyUUID,
  WithPeriod,
} from '../utils.types';
import { WarehouseInventoryEntity } from './warehouse-inventory.types';
import { InputIntegrationEntity } from '../integrations.types';
import { WarehousingDocumentEntity } from './warehousing-documents.types';
import { AddressDto, AddressEntity } from '../addresses/addresses.types';

export * from './warehouse-inventory.types';
export * from './warehousing-documents.types';

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
  manager?: OnlyUUID;

  label?: string;
  code?: string;

  type?: WarehouseTypeEnum;

  inventories?: WarehouseInventoryEntity[];
  documents?: WarehousingDocumentEntity[];

  integrations?: InputIntegrationEntity[];

  novaposhtaApiKey?: string;
  ukrposhtaApiKey?: string;

  address?: AddressEntity;
}

export interface IWarehouseDto {
  label: string;
  code?: string;
  email?: string;
  phone?: string;
  type?: WarehouseTypeEnum;
  manager?: IFormDataValueWithID;

  address?: AddressDto;
}
export interface IWarehouseReqData {
  _id?: string;
  data: IWarehouseDto;
  params?: ApiQueryParams;
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
  params?: ApiQueryParams;
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
  params?: Omit<ApiQueryParams, 'warehouse' | 'variation' | 'offer' | 'price'>;
}
