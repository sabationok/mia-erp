import { HasOwnerAsCompany, HasStatus, IBase, MaybeNull, WithPeriod } from '../utils.types';
import { OfferEntity } from '../offers/offers.types';
import { VariationEntity } from '../offers/variations.types';
import { OfferPriceEntity } from '../price-management/price-management.types';
import { IWarehouse } from './warehouses.types';

export type WarehouseInventoryStatus = 'rejected' | 'approved' | 'pending' | 'error' | 'success' | 'warning' | 'info';

export interface WarehouseInventoryEntity extends IBase, WithPeriod, HasOwnerAsCompany {
  warehouse?: IWarehouse;
  offer?: OfferEntity;
  variation?: VariationEntity;
  price?: OfferPriceEntity;
  status?: WarehouseInventoryStatus;

  available?: number;
  reserved?: number;
  awaiting?: number;
  lost?: number;
}
// * INVENTORIES
export interface HasWarehouseInventory {
  inventory?: MaybeNull<WarehouseInventoryEntity>;
}
export interface IProductInventoryFormData extends WithPeriod, HasStatus<WarehouseInventoryStatus> {
  offer?: Omit<OfferEntity, 'categories' | 'inventories' | 'category' | 'properties'>;
  variation?: Omit<VariationEntity, 'properties'>;
  price?: Omit<OfferPriceEntity, 'list' | 'offer'>;
  warehouse?: IWarehouse;

  stock?: number;
  reserved?: number;
  awaiting?: number;
  lost?: number;
  reservation?: boolean;

  customerTags?: string[];
  supplierTags?: string[];
}
