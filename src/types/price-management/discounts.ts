import { HasType, IBase, OnlyUUID, UUID } from 'types/utils.types';
import { CmsBaseConfigsDto, HasBaseCmsConfigs } from '../cms.types';

export enum PriceDiscountType {
  discount = 'discount',
  cashback = 'cashback',
  bonus = 'bonus',
}

export enum PriceBonusProviderEnum {
  default = 'default',
  refme = 'refme',
}

export enum DiscountValueTypeEnum {
  amount = 'amount',
  percentage = 'percentage',
}

export enum DiscountThresholdTypeEnum {
  amount = 'amount',
  quantity = 'quantity',
}
export enum DiscountLimitTypeEnum {
  amount = 'amount',
  quantity = 'quantity',
}

export enum PriceDiscountVolumeType {
  slot = 'slot',
  order = 'order',
  cart = 'cart',
}
export enum DiscountKeyEnum {
  dateFrom = 'dateFrom',
  dateTo = 'dateTo',
  balanceType = 'balanceType',
  volumeType = 'volumeType',
  threshold = 'threshold',
  valueType = 'valueType',
  value = 'value',
  slotCategory = 'slotCategory',
  cmsConfigs = 'cmsConfigs',
  type = 'type',
}
interface IDiscountBase extends HasType<PriceDiscountType>, HasBaseCmsConfigs {
  dateFrom?: string;

  dateTo?: string;

  balanceType?: PriceBonusProviderEnum;

  volumeType?: PriceDiscountVolumeType;
  threshold?: number;
  thresholdType?: DiscountThresholdTypeEnum;

  limit?: number;
  limitType?: DiscountLimitTypeEnum;

  valueType?: DiscountValueTypeEnum;
  value?: string;

  slotCategory?: string;

  label?: string;
}
export interface PriceDiscountRecord extends IDiscountBase {}
export interface PriceDiscountEntity extends IBase, IDiscountBase {
  offers?: OnlyUUID[];
  orders?: OnlyUUID[];
  slots?: OnlyUUID[];

  priceLists?: OnlyUUID[];
  prices?: OnlyUUID[];

  tempId?: string;
}

export interface PriceDiscountDto extends PriceDiscountRecord {
  pricesIds?: UUID[];
  priceId?: UUID[];
  offersIds?: UUID[];

  cmsConfigs?: CmsBaseConfigsDto;
}
