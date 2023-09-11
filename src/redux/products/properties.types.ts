import { IBase, OnlyUUID } from '../global.types';
import { AppQueryParams } from '../../api';
import { ProductTypeEnum } from './products.types';

export interface IPropertyBase extends IBase {
  label?: string;
  type?: ProductTypeEnum;
  isSelectable?: boolean;

  parent?: IPropertyBase;
  childrenList?: IPropertyBase[];
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

export interface IPropertyDto {
  label?: string;
  type?: ProductTypeEnum;
  isSelectable?: boolean;
  parent?: OnlyUUID;
  description?: string;
}

export interface IPropertyReqData {
  _id?: string;
  data?: IPropertyDto;
  params?: AppQueryParams;
}
