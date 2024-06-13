import {
  HasAuthor,
  HasDescription,
  HasEditor,
  HasIconUrl,
  HasIsDisabledFlag,
  HasLabel,
  HasOwnerAsCompany,
  Keys,
  OnlyUUID,
} from './utils.types';
import { HasOffers } from './offers/offers.types';
import { AppQueryParams } from '../api';
import { HasBaseCmsConfigs } from './cms.types';

export interface TagCmsConfigs
  extends HasBaseCmsConfigs<{
    colors?: {
      border?: string;
      font?: string;
      background?: string;
    };
  }> {}
export interface TagBaseEntity extends HasLabel, HasIconUrl, HasDescription, HasIsDisabledFlag, TagCmsConfigs {}

export interface TagEntity extends TagBaseEntity, HasOwnerAsCompany, HasAuthor, HasEditor, HasOffers, TagCmsConfigs {}

export interface HasTags {
  tags?: TagEntity[];
}

export type TagDtoIdsKey = Keys<Pick<AppQueryParams, 'offersIds' | 'ordersIds' | 'customerIds'>>;
export interface TagItemDto extends Partial<OnlyUUID>, TagBaseEntity {}
