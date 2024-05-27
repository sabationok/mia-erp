import { IBase, IFormDataValueWithID, OnlyUUID } from '../../redux/app-redux.types';
import { AppQueryParams } from '../../api';
import { OfferTypeEnum } from './offers.types';
import { ICmsBaseConfigs } from '../cms.types';
import { MaybeNull, PartialRecord, UUID, Values } from '../utils.types';

export enum PropertyLevelTypeEnum {
  group = 'group',
  prop = 'prop',
  value = 'value',
}
export enum PropertySelectableTypeEnum {
  static = 'static',
  dynamic = 'dynamic',
}
export type PropertyLevelIsType = PartialRecord<Values<typeof PropertyLevelTypeEnum>, boolean>;
interface PropertyTempData {
  levelIs?: PropertyLevelIsType;
  selectableType?: PropertySelectableTypeEnum;
}
export interface PropertyBaseEntity extends IBase, PropertyTempData {
  label?: MaybeNull<string>;
  type?: OfferTypeEnum;
  isSelectable?: MaybeNull<boolean>;
  level?: number;
  levelType?: PropertyLevelTypeEnum;

  parent?: PropertyBaseEntity;
  childrenList?: PropertyBaseEntity[];

  cmsConfigs?: MaybeNull<ICmsPropertyConfigs>;
}

export interface ProperiesGroupEntity extends Omit<PropertyBaseEntity, 'parent'> {
  childrenList?: PropertyEntity[];
}
export interface PropertyEntity extends PropertyBaseEntity {
  parent?: ProperiesGroupEntity;
  childrenList?: PropertyValueEntity[];
}
export interface PropertyValueEntity extends Omit<PropertyBaseEntity, 'childrenList'> {
  parent?: PropertyEntity;
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
  _id?: UUID;
  parent?: IFormDataValueWithID;
  parentId?: UUID;
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
  params?: Pick<AppQueryParams, 'dataView' | 'getAll'>;
}
