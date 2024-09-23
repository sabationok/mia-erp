import { HasCompany, HasReference, HasType, OnlyUUID, UUID, WithPeriod } from '../utils.types';
import { IFormDataValueWithID } from '../../redux/app-redux.types';
import { WarehouseEntity } from './warehouses.types';
import { OfferEntity } from '../offers/offers.types';
import { PriceEntity } from '../price-management/price-management.types';
import { ApiQueryParams } from '../../api';

export enum WarehouseDocumentType {
  addToStock = 'addToStock',
  reserveFromStock = 'reserveFromStock',
  removeFromStock = 'removeFromStock',
  returnFromReserve = 'returnFromReserve',
  removeFromReserve = 'removeFromReserve',
}

export interface IWarehousingDocumentBase extends WithPeriod, HasType<WarehouseDocumentType> {
  quantity?: string;
  amount?: string;
  batch?: string;
}

export interface WarehousingDocumentEntity extends IWarehousingDocumentBase, HasCompany, HasReference {
  warehouse?: WarehouseEntity;
  offer?: OfferEntity;
  price?: PriceEntity;
}

export interface WarehouseDocFormData {
  warehouse?: IFormDataValueWithID;
  offer?: IFormDataValueWithID;
  price?: IFormDataValueWithID;

  batch?: string;
  amount?: number;
  type?: WarehouseDocumentType;
}

export interface IWarehouseDocDto {
  warehouse?: OnlyUUID;
  product?: OnlyUUID;
  price?: OnlyUUID;

  warehouseId?: UUID;
  offerId?: UUID;
  priceId?: UUID;

  batch?: string;
  amount?: number;
  type?: WarehouseDocumentType;
}

export interface IWarehouseDocReqData {
  _id?: UUID;
  data?: IWarehouseDocDto;
  params?: Omit<ApiQueryParams, 'warehouseId' | 'variationId' | 'offerId' | 'priceId' | 'list' | 'offset'>;
}
