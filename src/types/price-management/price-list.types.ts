import { TabOption } from '../../components/atoms/TabSelector';
import { HasDescription, HasLabel, HasStatus, HasType, IBase, OnlyUUID, UUID, WithPeriod } from '../utils.types';
import { PriceDiscountEntity } from './discounts';
import { ApiQueryParams, ApiRequestConfig } from '../../api';
import { PriceEntity } from './price.types';

export enum PriceListTypeEnum {
  purchases = 'purchases',
  sells = 'sells',
  draft = 'draft',
}
export type PriceListStatus = 'queued' | 'rejected' | 'approved' | 'pending' | 'error' | 'success' | 'warning' | 'info';

export type PriceListType = PriceListTypeEnum;

export type PriceListFilterOption = TabOption<PriceListTypeEnum>;

export interface PriceListBase
  extends WithPeriod,
    HasLabel,
    HasDescription,
    HasStatus<PriceListStatus>,
    HasType<PriceListTypeEnum> {}

export interface PriceListEntity extends IBase, PriceListBase {
  prices?: PriceEntity[];
  discounts?: PriceDiscountEntity[];
}
export interface PriceListDto extends PriceListBase {
  customerTags?: UUID[];
  supplierTags?: UUID[];
}

export type PriceListApiReqConfig = ApiRequestConfig<
  PriceListDto & OnlyUUID,
  Pick<ApiQueryParams, 'ids' | 'limit' | 'offset' | 'tagsIds'>
>;
