import { ArrayUUID, IBase, IFormDataValueWithUUID, OnlyUUID } from '../global.types';
import { IProductCategoryDirItem, ISupplierDirItem } from '../../components/Directories/dir.types';
import { FilterOption } from '../../components/ModalForm/ModalFilter';
import { IPriceListItem } from '../priceManagement/priceManagement.types';
import { ICompany } from '../companies/companies.types';
import { IProductInventory, IWarehouse } from '../warehouses/warehouses.types';
import { IBrand } from '../directories/brands.types';
import { IUser } from '../auth/auth.types';
import { AppQueryParams } from '../../api';
import { IVariation } from './variations.types';
import { IPropertyValue, IVariationTemplate } from './properties.types';

export enum ProductStatusEnum {
  pending = 'pending',
  rejected = 'rejected',
  success = 'success',
  approved = 'approved',
  error = 'error',
  warning = 'warning',
  info = 'info',
}
export type ProductStatus = keyof ProductStatusEnum | ProductStatusEnum;

export enum MeasurementUnit {
  Pc = 'Pc', // Штука (Piece)
  G = 'G', // Грам (Gram)
  Kg = 'Kg', // Кілограм (Kilogram)
  Ml = 'Ml', // Мілілітр (Milliliter)
  L = 'L', // Літр (Liter)
  Sm = 'Sm', // Сантиметр
  M = 'M', // Метр (Meter)
  SqSm = 'SqSm', // Квадратний метр (SquareSMeter)
  CuSm = 'CuSm,', // Кубічний метр (CubicSMeter)
  SqM = 'SqM', // Квадратний метр (SquareMeter)
  CuM = 'CuM', // Кубічний метр (CubicMeter)
  Other = 'Other', // Інше (Other)
}

export enum ProductTypeEnum {
  GOODS = 'GOODS',
  SERVICE = 'SERVICE',
}

export type ProductFilterOpt = FilterOption<ProductTypeEnum>;

export interface IProductBase extends IBase {
  label?: string;
  sku?: string;
  barCode?: string;
  qrCode?: string;
  measurement?: IProductMeasurement;
  dimensions?: IProductDimensions;
  hasVariations?: boolean;
  type?: ProductTypeEnum;
  status?: ProductStatus;
  approved?: ProductStatusEnum;
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
  categories?: IProductCategoryDirItem[];

  brand?: IBrand;
  recommends?: IProduct[];

  template?: IVariationTemplate;
  properties?: IPropertyValue[];

  variations?: IVariation[];
  prices?: IPriceListItem[];
  warehouses?: IWarehouse[];
  inventories?: IProductInventory[];
}

export interface IProductDefaults {
  variation?: IVariation;
  price?: IPriceListItem;
  warehouse?: IWarehouse;
  inventory?: IProductInventory;
  supplier?: ISupplierDirItem;
}

export interface IProductWithDefaults extends IProductAddsFields, IProductDefaults {
  defaults?: IProductDefaults;
}

export interface IProduct extends IProductWithDefaults {}

export interface IProductImage extends Partial<IBase> {
  img_preview?: string;
  img_1x: string;
  img_2x: string;
  webp: string;
  order: number;
}

export interface IProductMeasurement {
  min?: number;
  max?: number;
  step?: number;
  unit?: MeasurementUnit;
}
export interface IProductDimensions {
  width?: number;
  height?: number;
  length?: number;
  weight?: number;
}

// * >>>>>>> FORM DATA <<<<<<<
export interface IProductBaseFormData extends IProductBaseDto {}

export interface IProductDefaultsFormData extends Record<keyof IProductDefaults, IFormDataValueWithUUID> {}

export interface IProductWithAddsFieldsFormData extends IProductBaseFormData {}

export interface IProductFullFormData
  extends Omit<IProductFullDto, 'recommends' | 'properties' | 'images' | 'categories'> {
  categories?: string[];
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
  categories?: ArrayUUID;
  brand?: OnlyUUID;
  template?: OnlyUUID;
  recommends?: ArrayUUID;
  properties?: ArrayUUID;
}

export interface IProductDefaultsDto extends Partial<Record<keyof IProductDefaults, OnlyUUID>> {}

export interface IProductFullDto extends IProductWithAddsFieldsDto, IProductDefaultsDto {
  defaults?: IProductDefaultsDto;
}

export interface IProductDto extends IProductFullDto {}

export interface IProductReqData {
  _id?: string;
  data?: IProductDto;
  params?: AppQueryParams;
}

// ? PROPERTIES ================================================
