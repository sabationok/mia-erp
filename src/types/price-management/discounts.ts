import { HasType, IBase, OnlyUUID, UUID } from 'types/utils.types';
import { HasCmsParams, HasCreateCmsParamsDto } from '../cms/cms-params.types';

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
  index = 'index',
}

export enum DiscountThresholdTypeEnum {
  amount = 'amount',
  quantity = 'quantity',
}
export enum DiscountLimitTypeEnum {
  amount = 'amount',
  quantity = 'quantity',
}

export enum PriceDiscountSourceVolumeType {
  slot = 'slot',
  order = 'order',
  cart = 'cart',
}
export enum PriceDiscountTargetVolumeType {
  slot = 'slot',
  order = 'order',
  cart = 'cart',
}
export enum DiscountKeyEnum {
  dateFrom = 'dateFrom',
  dateTo = 'dateTo',

  timeFrom = 'timeFrom',
  timeTo = 'timeTo',

  balanceType = 'balanceType',
  sourceVolume = 'sourceVolume',
  targetVolume = 'targetVolume',
  threshold = 'threshold',
  thresholdType = 'thresholdType',
  valueType = 'valueType',
  value = 'value',
  category = 'category',
  cmsConfigs = 'cmsConfigs',
  type = 'type',
}
interface IDiscountBase extends HasType<PriceDiscountType> {
  dateFrom?: string;
  dateTo?: string;

  timeFrom?: string;
  timeTo?: string;

  promoCode?: string;

  balanceType?: PriceBonusProviderEnum;

  volumeType?: PriceDiscountSourceVolumeType;
  threshold?: number;
  thresholdType?: DiscountThresholdTypeEnum;

  limit?: number;
  limitType?: DiscountLimitTypeEnum;

  sourceVolume?: PriceDiscountSourceVolumeType;
  targetVolume?: PriceDiscountTargetVolumeType;

  valueType?: DiscountValueTypeEnum;
  value?: string;

  category?: string;

  label?: string;
}
export interface PriceDiscountRecord extends IDiscountBase {}
export interface PriceDiscountEntity extends IBase, IDiscountBase, HasCmsParams {
  offers?: OnlyUUID[];
  orders?: OnlyUUID[];
  slots?: OnlyUUID[];

  priceLists?: OnlyUUID[];
  prices?: OnlyUUID[];

  tempId?: string;
}

export interface PriceDiscountDto extends PriceDiscountRecord, HasCreateCmsParamsDto {
  priceId?: UUID;
  offerId?: UUID;
  listId?: UUID;
}
