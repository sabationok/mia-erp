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
  PartialRecord,
  UUID,
} from '../utils.types';
import { HasBaseCmsConfigs } from '../cms.types';
import { OrderStatusEnum } from './orders.types';
import { OfferEntity } from '../offers/offers.types';
import { WarehouseEntity, WarehouseInventoryEntity } from '../warehousing';
import { IPriceBase, PriceEntity } from '../price-management';
import { VariationEntity } from '../offers/variations.types';
import { PriceDiscountRecord } from '../price-management/discounts';

export enum TempSlotTypeEnum {
  Cart = 'Cart',
  Ordering = 'Ordering',
}
export type AmountAndPercentageFieldsKey = 'discount' | 'bonus' | 'cashback' | 'tax';

export type AmountAndPercentageFields = PartialRecord<
  AmountAndPercentageFieldsKey,
  { amount?: string; percentage?: string }
>;
export interface IOrderSlotPrice extends Partial<Omit<IPriceBase, 'discounts' | 'type'>>, AmountAndPercentageFields {}

export interface IOrderSlotBase
  extends IOrderSlotPrice,
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
  tempId?: string;

  isSelected?: boolean;
  isInCart?: boolean;
  hasVariations?: boolean;
  hasInventories?: boolean;

  discounts?: PriceEntity['discounts'] | PriceDiscountRecord[];
}

export interface IOrderTempSlot extends Partial<IBase>, IOrderSlotBase, IOrderTempSlotMeta {}

export interface OrderSlotEntity extends IBase, IOrderSlotBase, HasOwnerAsCompany, IOrderSlotPrice {
  delivery?: OnlyUUID;
  invoice?: OnlyUUID;
  order?: OnlyUUID;
  group?: OnlyUUID;

  discounts?: PriceEntity['discounts'];
}

export interface OrderSlotDto extends HasSku, HasLabel, HasQuantity, HasCurrencyCode, HasImgPreview {
  fromRef?: string;

  offerId?: UUID;
  variationId?: UUID;
  originId?: UUID;
  inventoryId?: UUID;
  warehouseId?: UUID;

  isSelected?: boolean;

  discounts?: (PriceDiscountRecord | OnlyUUID)[];
}
export interface UpdateSaleOrderSlotDto extends OnlyUUID, OrderSlotDto {}
