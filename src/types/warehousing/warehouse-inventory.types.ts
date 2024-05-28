import { HasOwnerAsCompany, HasStatus, IBase, MaybeNull, WithPeriod } from '../utils.types';
import { OfferEntity } from '../offers/offers.types';
import { VariationEntity } from '../offers/variations.types';
import { PriceEntity } from '../price-management/price-management.types';
import { WarehouseEntity } from './warehouses.types';

export type WarehouseInventoryStatus = 'rejected' | 'approved' | 'pending' | 'error' | 'success' | 'warning' | 'info';

export interface WarehouseInventoryEntity extends IBase, WithPeriod, HasOwnerAsCompany {
  warehouse?: WarehouseEntity;
  offer?: OfferEntity;
  variation?: VariationEntity;
  price?: PriceEntity;
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
