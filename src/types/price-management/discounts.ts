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

export enum PriceDiscountVolumeType {
  cart = 'cart',
  slot = 'slot',
  order = 'order',
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

  valueType?: DiscountValueTypeEnum;
  value?: string;

  slotCategory?: string;
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
  price: OnlyUUID;
  priceId: UUID;
  offer?: OnlyUUID;

  cmsConfigs?: CmsBaseConfigsDto;
}
