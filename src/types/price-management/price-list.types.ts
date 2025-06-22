import { TabOption } from '../../components/atoms/TabSelector';
import { HasDescription, HasLabel, HasStatus, HasType, IBase, UUID, WithPeriod } from '../utils.types';
import { PriceDiscountEntity } from './discounts';
import { ApiQueryParams } from '../../api';
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

export interface PriceListApiReqConfig {
  _id?: string;
  data: PriceListDto;
  params?: Pick<ApiQueryParams, 'ids' | 'limit' | 'offset' | 'tagsIds'>;
}
