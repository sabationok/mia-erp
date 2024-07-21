import {
  HasAuthor,
  HasDescription,
  HasEditor,
  HasIconUrl,
  HasIsDisabledFlag,
  HasIsVisibleFlag,
  HasLabel,
  HasOwnerAsCompany,
  HasType,
  IBase,
  Keys,
  OnlyUUID,
} from './utils.types';
import { HasOffers } from './offers/offers.types';
import { ApiQueryParams } from '../api';
import { HasBaseCmsConfigs } from './cms.types';
import { TagTypeEnum } from './directories.types';

export interface TagCmsConfigs
  extends HasBaseCmsConfigs<{
    colors?: {
      border?: string;
      font?: string;
      background?: string;
    };
  }> {}
export interface TagBaseEntity
  extends HasLabel,
    HasIconUrl,
    HasDescription,
    HasIsDisabledFlag,
    TagCmsConfigs,
    HasType<TagTypeEnum>,
    HasIsDisabledFlag,
    HasIsVisibleFlag {}

export interface TagEntity
  extends IBase,
    TagBaseEntity,
    HasOwnerAsCompany,
    HasAuthor,
    HasEditor,
    HasOffers,
    TagCmsConfigs {}

export interface HasTags {
  tags?: TagEntity[];
}

export type TagDtoIdsKey = Keys<Pick<ApiQueryParams, 'offersIds' | 'ordersIds' | 'customerIds'>>;
export interface TagItemDto extends Partial<OnlyUUID>, TagBaseEntity {}
