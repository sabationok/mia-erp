import { IBase, OnlyUUID } from '../global.types';
import { ICompany } from '../companies/companies.types';
import { IProductInventory } from '../warehouses/warehouses.types';
import { IPriceListItem } from '../priceManagement/priceManagement.types';
import { AppQueryParams } from '../../api';
import { IProduct, IProductDimensions } from './products.types';
import { IPropertyValue } from './properties.types';
import { IUser } from '../auth/auth.types';

export interface IVariationBase {
  label?: string;
  sku?: string;
  barCode?: string;

  dimensions?: IProductDimensions;

  timeFrom?: string | number | Date;
  timeTo?: string | number | Date;
}

export interface IVariation extends IVariationBase, IBase {
  owner?: ICompany;
  author?: IUser;
  editor?: IUser;

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
export interface IVariationFormData extends IVariationBase {
  propertiesMap: VariationPropertiesMapInFormData;
  product?: OnlyUUID & { label?: string };

  timeFrom?: string | number | Date;
  timeTo?: string | number | Date;
}

export interface VariationDto extends IVariationBase {
  properties?: string[];
  product?: OnlyUUID;

  timeFrom?: string | number | Date;
  timeTo?: string | number | Date;
}

export interface IVariationReqData {
  _id?: string;
  data: VariationDto;
  params?: AppQueryParams;
}
