import { HasOwnerAsCompany, IBase, MaybeNull, UUID, WithPeriod } from '../utils.types';
import { OfferEntity } from '../offers/offers.types';
import { VariationEntity } from '../offers/variations.types';
import { PriceEntity } from '../price-management/price-management.types';
import { WarehouseEntity } from './index';
import { ApiQueryParams } from '../../api';
import { TagEntity } from '../tags.types';

// type WarehouseInventoryStatus = 'rejected' | 'approved' | 'pending' | 'error' | 'success' | 'warning' | 'info';

export interface WarehouseInventoryBase extends WithPeriod {
  available?: number;
  reserved?: number;
  awaiting?: number;
  lost?: number;
  stock?: number;
  reservation?: boolean;
}
export interface WarehouseInventoryEntity extends IBase, WarehouseInventoryBase, HasOwnerAsCompany {
  warehouse?: WarehouseEntity;
  offer?: OfferEntity;
  variation?: VariationEntity;
  price?: PriceEntity;

  customerTags?: TagEntity[];
  supplierTags?: TagEntity[];
}

export interface WarehouseInventoryDto extends WarehouseInventoryBase {
  warehouseId?: UUID;
  offerId?: UUID;
  priceId?: UUID;

  customerTags?: UUID[];
  supplierTags?: UUID[];
}
export interface WarehouseInventoryReqData {
  _id?: UUID;
  data: WarehouseInventoryDto;
  params?: Pick<ApiQueryParams, 'limit' | 'offset' | 'offerId' | 'warehouseId' | 'price'>;
}
export interface HasWarehouseInventory {
  inventory?: MaybeNull<WarehouseInventoryEntity>;
}

export interface WarehouseInventoryFormData extends WarehouseInventoryDto {
  offer?: Omit<OfferEntity, 'categories' | 'inventories' | 'category' | 'properties'>;
  price?: Omit<PriceEntity, 'list' | 'offer'>;
  warehouse?: WarehouseEntity;
}
