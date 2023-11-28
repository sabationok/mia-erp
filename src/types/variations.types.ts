import { IBase, OnlyUUID } from '../redux/global.types';
import { IProductInventory } from './warehouses.types';
import { IPriceListItem } from './priceManagement.types';
import { AppQueryParams } from '../api';
import { IProduct } from './products.types';
import { IPropertyValue } from './properties.types';
import { HasCompany, HasDimensions, MaybeNull, WithPeriod } from './utils.types';
import { HasBaseCmsConfigs, HasBaseCmsConfigsDto } from './cms.types';

export interface IVariationBase extends HasDimensions, WithPeriod {
  label?: string;
  sku?: string;
  barCode?: string;
}

export interface IVariation extends IVariationBase, IBase, HasCompany, HasBaseCmsConfigs {
  product?: IProduct;
  price?: IPriceListItem;
  inventories?: IProductInventory[];

  properties?: IPropertyValue[];
}

export type VariationPropertiesMapInTableData = Record<string, IPropertyValue>;

export type VariationPropertiesMapInFormData = Record<string, string>;
export interface IVariationTableData extends IVariation {
  propertiesMap: VariationPropertiesMapInTableData;
}
export interface IVariationFormData extends IVariationBase, HasBaseCmsConfigsDto {
  propertiesMap?: VariationPropertiesMapInFormData;
  product?: OnlyUUID & { label?: string } & HasBaseCmsConfigsDto;
}

export interface HasVariation {
  variation?: MaybeNull<IVariation>;
}

export interface VariationDto extends IVariationBase, HasBaseCmsConfigsDto {
  properties?: string[];
  product?: OnlyUUID;
}

export interface IVariationReqData {
  _id?: string;
  data: VariationDto;
  params?: AppQueryParams;
}
