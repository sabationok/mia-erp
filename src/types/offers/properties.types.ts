import { OfferTypeEnum } from './offers.types';
import { OnlyUUID, PartialRecord, UUID, Values } from '../utils.types';
import { CmsParamsDto, HasCmsParams, HasCreateCmsParamsDto } from '../cms';
import { TreeEntityType } from '../tree-entity.types';

export enum PropertyLevelTypeEnum {
  group = 'group',
  prop = 'prop',
  value = 'value',
  col = 'col',
  row = 'row',
  cell = 'cell',
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
export type PropertyBaseEntity = TreeEntityType &
  PropertyTempData &
  HasCmsParams & {
    label?: string;
    type?: OfferTypeEnum;
    isSelectable?: boolean;
    level?: number;
    path?: string;

    levelType?: PropertyLevelTypeEnum;

    parent?: PropertyBaseEntity;
    childrenList?: PropertyBaseEntity[];
  };

export type PropertiesGroupEntity = Omit<PropertyBaseEntity, 'parent'> & {
  childrenList?: PropertyEntity[];
};
export type PropertyEntity = PropertyBaseEntity & {
  parent?: PropertiesGroupEntity;
  childrenList?: PropertyValueEntity[];
};
export interface PropertyValueEntity extends Omit<PropertyBaseEntity, 'childrenList'> {
  parent?: PropertyEntity;
}

export enum PropertyCmsTypeEnum {
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
export interface CreatePropertyDto extends HasCreateCmsParamsDto<string, PropertyCmsTypeEnum, CmsPropertyExtraDto> {
  parentId?: UUID;
  label?: string;
  type?: OfferTypeEnum;
  isSelectable?: boolean;
  levelType?: PropertyLevelTypeEnum;
}

export type UpdatePropertyDto = OnlyUUID & CreatePropertyDto & {};

export type PropertyFormData = CreatePropertyDto & UpdatePropertyDto;
