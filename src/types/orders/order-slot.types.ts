import {
  HasBarCode,
  HasBrutto,
  HasCurrencyCode,
  HasImgPreview,
  HasLabel,
  HasNetto,
  HasOwnerAsCompany,
  HasQuantity,
  HasSku,
  HasStatus,
  HasType,
  IBase,
  MaybeNull,
  OnlyUUID,
} from '../utils.types';
import { HasBaseCmsConfigs } from '../cms.types';
import { OrderStatusEnum } from './orders.types';
import { OfferEntity } from '../offers/offers.types';
import { WarehouseEntity, WarehouseInventoryEntity } from '../warehousing/warehouses.types';
import { IPriceBase, PriceEntity } from '../price-management/price-management.types';
import { VariationEntity } from '../offers/variations.types';
import { PriceDiscountRecord } from '../price-management/discounts';
import { CartId, CartOrderId, CartSlotId } from '../../redux/cart/cart.slice';

export enum TempSlotTypeEnum {
  Cart = 'Cart',
  Ordering = 'Ordering',
}

export interface IOrderSlotPrice extends Partial<Omit<IPriceBase, 'discounts' | 'type'>> {
  discount?: { amount?: string; percentage?: string };
  bonus?: { amount?: string; percentage?: string };
  cashback?: { amount?: string; percentage?: string };
  tax?: { amount?: string; percentage?: string };
}

export interface IOrderSlotBase
  extends Partial<IBase>,
    IOrderSlotPrice,
    HasStatus<OrderStatusEnum>,
    HasLabel,
    HasSku,
    HasQuantity,
    HasCurrencyCode,
    HasBrutto,
    HasNetto,
    HasBaseCmsConfigs,
    HasBarCode,
    HasImgPreview {
  fromRef?: MaybeNull<string>;

  offer?: OfferEntity;
  warehouse?: WarehouseEntity;
  origin?: PriceEntity;
  inventory?: WarehouseInventoryEntity;
  variation?: VariationEntity;
}

export interface IOrderTempSlotMeta extends HasType<TempSlotTypeEnum | string> {
  cartId?: CartId;
  cartOrderId?: CartOrderId;
  tempId?: CartSlotId;

  isSelected?: boolean;
  isInCart?: boolean;
  hasVariations?: boolean;
  hasInventories?: boolean;

  discounts?: PriceEntity['discounts'] | PriceDiscountRecord[];
}

export interface IOrderTempSlot extends IOrderSlotBase, IOrderTempSlotMeta {}

export interface OrderSlotEntity extends IOrderSlotBase, HasOwnerAsCompany, IOrderSlotPrice {
  delivery?: OnlyUUID;
  invoice?: OnlyUUID;
  order?: OnlyUUID;
  group?: OnlyUUID;

  discounts?: PriceEntity['discounts'];
}

export interface SaleOrderSlotDto extends HasSku, HasLabel, HasQuantity, HasCurrencyCode, HasImgPreview {
  fromRef?: string;

  offer?: OnlyUUID;
  variation?: OnlyUUID;
  origin?: OnlyUUID;
  inventory?: OnlyUUID;
  warehouse?: OnlyUUID;

  discounts?: (PriceDiscountRecord | OnlyUUID)[];
}
export interface UpdateSaleOrderSlotDto extends OnlyUUID, SaleOrderSlotDto {}
