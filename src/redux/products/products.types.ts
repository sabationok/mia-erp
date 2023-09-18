import { IBase, IFormDataValueWithUUID, OnlyUUID } from '../global.types';
import { IProductCategoryDirItem, ISupplierDirItem } from '../../components/Directories/dir.types';
import { FilterOpt } from '../../components/ModalForm/ModalFilter';
import { IPriceListItem } from '../priceManagement/priceManagement.types';
import { ICompany } from '../companies/companies.types';
import { IProductInventory, IWarehouse } from '../warehouses/warehouses.types';
import { IBrand } from '../directories/brands.types';
import { IUser } from '../auth/auth.types';
import { AppQueryParams } from '../../api';
import { IVariation } from './variations.types';
import { IPropertyValue, IVariationTemplate } from './properties.types';

export type ProductStatus = 'rejected' | 'approved' | 'pending' | 'error' | 'success' | 'warning' | 'info';

export enum ProductTypeEnum {
  GOODS = 'GOODS',
  SERVICE = 'SERVICE',
  SET = 'SET',
}

export type ProductFilterOpt = FilterOpt<ProductTypeEnum>;

export interface IProductBase extends IBase {
  label?: string;
  sku?: string;
  barCode?: string;
  qrCode?: string;
  measurement?: IProductMeasurement;
  hasVariations?: boolean;
  type?: ProductTypeEnum;
  status?: ProductStatus;
  approvedStatus?: ProductStatus;
  archived?: boolean;
  visible?: boolean;
  description?: string;
  tags?: string[];
  images?: IProductImage[];
}

export interface IProductAddsFields extends IProductBase {
  owner?: ICompany;
  author?: IUser;
  editor?: IUser;

  category?: IProductCategoryDirItem;

  recommends?: IProduct[];
  properties?: IPropertyValue[];
  brand?: IBrand;
  template?: IVariationTemplate;

  warehouses?: IWarehouse[];
  variations?: IVariation[];
  inventories?: IProductInventory[];
  prices?: IPriceListItem[];
}
export interface IProductDefaults {
  warehouse?: IWarehouse;
  price?: IPriceListItem;
  supplier?: ISupplierDirItem;
  inventory?: IProductInventory;
}
export interface IProductWithDefaults extends IProductAddsFields {
  defaults?: IProductDefaults;
}

export interface IProduct extends IProductWithDefaults {}

export interface IProductImage extends Partial<IBase> {
  img_preview?: string;
  img_1x: string;
  img_2x: string;
  webp: string;
}

export interface IProductMeasurement {
  min?: number;
  max?: number;
  step?: number;
  units?: string;
}
// * >>>>>>> FORM DATA <<<<<<<
export interface IProductBaseFormData extends IProductBaseDto {}
export interface IProductDefaultsFormData extends Record<keyof IProductDefaults, IFormDataValueWithUUID> {}
export interface IProductWithAddsFieldsFormData extends IProductBaseFormData {}
export interface IProductFullFormData extends Omit<IProductFullDto, 'recommends' | 'properties' | 'images'> {
  recommends?: IFormDataValueWithUUID[];
  properties?: string[];
  defaults?: IProductDefaultsFormData;
  images?: Partial<IProductImage>[];
}
export interface IProductFormData extends IProductFullFormData {}

// * >>>>>> PRODUCT DTO <<<<<<<
export interface IProductBaseDto extends Omit<IProductBase, '_id' | 'createdAt' | 'deletedAt' | 'updatedAt'> {}

export interface IProductWithAddsFieldsDto extends IProductBaseDto {
  category?: OnlyUUID;
  brand?: OnlyUUID;
  template?: OnlyUUID;
  recommends?: string[];
  properties?: string[];
}
export interface IProductDefaultsDto extends Record<keyof IProductDefaults, OnlyUUID> {}
export interface IProductFullDto extends IProductWithAddsFieldsDto {
  defaults?: IProductDefaultsDto;
}
export interface IProductDto extends IProductFullDto {}

export interface IProductReqData {
  _id?: string;
  data?: IProductDto;
  params?: AppQueryParams;
}

// ? PROPERTIES ================================================
