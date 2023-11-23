import { IBase, OnlyUUID } from '../../global.types';
import { AppQueryParams } from '../../../api';
import { OfferTypeEnum } from '../products.types';
import { CmsBaseConfigsDto, ICmsBaseConfigs } from '../../cms/cms.types';

export interface IPropertyBase extends IBase {
  label?: string;
  type?: OfferTypeEnum;
  isSelectable?: boolean;

  parent?: IPropertyBase;
  childrenList?: IPropertyBase[];

  cmsConfigs?: ICmsPropertyConfigs;
}

export interface IVariationTemplate extends Omit<IPropertyBase, 'parent'> {
  childrenList?: IProperty[];
}
export interface IProperty extends IPropertyBase {
  parent?: IVariationTemplate;
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

export interface CmsPropertyConfigsDto extends CmsBaseConfigsDto {
  colors?: string[];
  type?: PropertyTypeEnum;
  description?: string;
}

export interface IPropertyDto {
  parent?: OnlyUUID;

  label?: string;
  type?: OfferTypeEnum;
  isSelectable?: boolean;

  cmsConfigs?: CmsPropertyConfigsDto;
}

export interface IPropertyReqData {
  _id?: string;
  data?: IPropertyDto;
  params?: AppQueryParams;
}
