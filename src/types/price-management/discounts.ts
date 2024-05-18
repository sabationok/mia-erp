import { HasType, IBase } from 'types/utils.types';
import { HasBaseCmsConfigs, ICmsBaseConfigs } from '../cms.types';

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

export enum PriceDiscountVolumeType {
  cart = 'cart',
  slot = 'slot',
  order = 'order',
}
interface IDiscountBase extends HasType<PriceDiscountType>, HasBaseCmsConfigs {
  dateFrom?: string;

  dateTo?: string;

  balanceType?: PriceBonusProviderEnum;

  volumeType?: PriceDiscountVolumeType;
  threshold?: number;

  valueType?: DiscountValueTypeEnum;
  value?: string;

  slotCategory?: string;

  cmsConfigs?: ICmsBaseConfigs;
}
export interface PriceDiscountRecord extends IDiscountBase {}
export interface PriceDiscountEntity extends IBase, IDiscountBase {
  tempId?: string;
}
