import { IBase, OnlyUUID } from '../../redux/app-redux.types';
import { ApiQueryParams, ApiRequestConfig } from '../../api';
import { OfferTypeEnum } from './offers.types';
import { MaybeNull, PartialRecord, UUID, Values } from '../utils.types';
import { CmsParamsDto, HasCmsParams, HasCmsParamsDto } from '../cms/cms-params.types';

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
export interface PropertyBaseEntity extends IBase, PropertyTempData, HasCmsParams {
  label?: MaybeNull<string>;
  type?: OfferTypeEnum;
  isSelectable?: MaybeNull<boolean>;
  level?: number;
  path?: string;

  levelType?: PropertyLevelTypeEnum;

  parent?: PropertyBaseEntity;
  childrenList?: PropertyBaseEntity[];
}

export interface PropertiesGroupEntity extends Omit<PropertyBaseEntity, 'parent'> {
  childrenList?: PropertyEntity[];
}
export interface PropertyEntity extends PropertyBaseEntity {
  parent?: PropertiesGroupEntity;
  childrenList?: PropertyValueEntity[];
}
export interface PropertyValueEntity extends Omit<PropertyBaseEntity, 'childrenList'> {
  parent?: PropertyEntity;
}

export enum PropertyTypeEnum {
  size = 'size',
  color = 'color',
  care = 'care',
  weight = 'weight',
  condition = 'condition',
  material = 'material',
  gender = 'gender',
  tags = 'tags',
  composition = 'composition',
  collection = 'collection',
  style = 'style',
  specialFutures = 'specialFutures',
  trends = 'trends',
}

export interface CmsPropertyExtraDto extends CmsParamsDto {
  colors?: string[];
}
export interface PropertyFormData extends PropertyDto {}
export interface PropertyDto extends Partial<OnlyUUID>, HasCmsParamsDto<string, PropertyTypeEnum, CmsPropertyExtraDto> {
  parentId?: UUID;
  label?: string;
  type?: OfferTypeEnum;
  isSelectable?: boolean;
}

export type PropertyApiReqConfig = ApiRequestConfig<
  PropertyDto,
  Pick<ApiQueryParams, 'dataView' | 'getAll' | 'depth' | 'parentId' | 'withDeleted'>
>;
