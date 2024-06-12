import { HasImgPreview, HasLabel, Keys } from './utils.types';
import { HasOffer } from './offers/offers.types';
import { AppQueryParams } from '../api';

export interface TagBaseEntity extends HasLabel, HasImgPreview {}

interface TagEntity extends TagBaseEntity, HasOffer {}

export type TagDtoIdsKey = Keys<Pick<AppQueryParams, 'offersIds' | 'ordersIds' | 'customerIds'>>;
export interface TagItemDto extends TagBaseEntity, Pick<AppQueryParams, TagDtoIdsKey> {}
