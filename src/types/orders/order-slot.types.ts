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
import { IWarehouse } from '../warehousing/warehouses.types';
import { IPriceBase, OfferPriceEntity } from '../price-management/price-management.types';
import { VariationEntity } from '../offers/variations.types';
import { PriceDiscountRecord } from '../price-management/discounts';

export enum TempSlotTypeEnum {
  Cart = 'Cart',
  Ordering = 'Ordering',
}

export interface IOrderSlotPrice extends Partial<Omit<IPriceBase, 'discounts'>> {
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
  warehouse?: IWarehouse;
  origin?: OfferPriceEntity;
  // inventory?: IProductInventory;
  variation?: VariationEntity;
}

export interface IOrderTempSlotMeta extends HasType<TempSlotTypeEnum | string> {
  tempId?: string;
  isSelected?: boolean;
  isInCart?: boolean;
  hasVariations?: boolean;
  hasInventories?: boolean;

  discounts?: OfferPriceEntity['discounts'] | PriceDiscountRecord[];
}

export interface IOrderTempSlot extends IOrderSlotBase, IOrderTempSlotMeta {}

export interface OrderSlotEntity extends IOrderSlotBase, HasOwnerAsCompany, IOrderSlotPrice {
  delivery?: OnlyUUID;
  invoice?: OnlyUUID;
  order?: OnlyUUID;
  group?: OnlyUUID;

  discounts?: OfferPriceEntity['discounts'];
}

export interface IOrderSlotDto extends HasSku, HasLabel, HasQuantity, HasCurrencyCode, HasImgPreview {
  fromRef?: string;

  offer?: OnlyUUID;
  variation?: OnlyUUID;
  origin?: OnlyUUID;
  inventory?: OnlyUUID;
  warehouse?: OnlyUUID;

  discounts?: (PriceDiscountRecord | OnlyUUID)[];
}
