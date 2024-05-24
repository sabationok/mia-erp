import { IBase, IFormDataValueWithID, OnlyUUID } from '../../redux/global.types';
import { AppQueryParams } from '../../api';
import { OfferTypeEnum } from './offers.types';
import { ICmsBaseConfigs } from '../cms.types';
import { MaybeNull } from '../utils.types';

export interface IPropertyBase extends IBase {
  label?: MaybeNull<string>;
  type?: OfferTypeEnum;
  isSelectable?: MaybeNull<boolean>;

  parent?: IPropertyBase;
  childrenList?: IPropertyBase[];

  cmsConfigs?: MaybeNull<ICmsPropertyConfigs>;
}

export interface IProperiesGroup extends Omit<IPropertyBase, 'parent'> {
  childrenList?: IProperty[];
}
export interface IProperty extends IPropertyBase {
  parent?: IProperiesGroup;
  childrenList?: IPropertyValue[];
}

export interface IPropertyValue extends Omit<IPropertyBase, 'childrenList'> {
  parent?: IProperty;
}

export enum PropertyTypeEnum {
  size = 'size',
  color = 'color',
  weight = 'weight',
  condition = 'condition',
  material = 'material',
  sex = 'sex',
  tags = 'tags',
  composition = 'composition',
  collection = 'collection',
  style = 'style',
  specialFutures = 'specialFutures',
  trends = 'trends',

  // countryOfOrigin = 'countryOfOrigin',
  // brand = 'brand',
}
export interface ICmsPropertyConfigs extends ICmsBaseConfigs {
  colors?: string[];
  type?: PropertyTypeEnum;
  description?: string;
}

export interface CmsPropertyConfigsDto extends ICmsBaseConfigs {
  colors?: string[];
  type?: PropertyTypeEnum;
  description?: string;
}
export interface PropertyFormData {
  _id?: string;
  parent?: IFormDataValueWithID;
  label?: string;
  type?: OfferTypeEnum;
  isSelectable?: boolean;

  cmsConfigs?: MaybeNull<CmsPropertyConfigsDto>;
}
export interface IPropertyDto {
  parent?: MaybeNull<OnlyUUID>;

  label?: string;
  type?: OfferTypeEnum;
  isSelectable?: boolean;

  cmsConfigs?: MaybeNull<CmsPropertyConfigsDto>;
}

export interface IPropertyReqData {
  _id?: string;
  data?: IPropertyDto;
  params?: AppQueryParams;
}
