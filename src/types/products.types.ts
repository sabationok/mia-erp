import { ArrayUUID, IBase, IFormDataValueWithID, OnlyUUID } from '../redux/global.types';
import { IProductCategoryDirItem, ISupplierDirItem } from './dir.types';
import { FilterOption } from '../components/ModalForm/ModalFilter';
import { IPriceListItem } from './priceManagement.types';
import { ICompany } from './companies.types';
import { IProductInventory, IWarehouse } from './warehouses.types';
import { IBrand } from '../redux/directories/brands.types';
import { IUser } from './auth.types';
import { AppQueryParams } from '../api';
import { IVariation } from './variations.types';
import { IPropertyValue, IVariationTemplate } from './properties.types';
import {
  AppDate,
  HasDescription,
  HasDimensions,
  HasLabel,
  HasMeasurement,
  HasStatus,
  HasType,
  MaybeNull,
} from './utils.types';

export enum ProductStatusEnum {
  pending = 'pending',
  rejected = 'rejected',
  success = 'success',
  approved = 'approved',
  // error = 'error',
  warning = 'warning',
  // info = 'info',
}

// export type ProductStatus = keyof ProductStatusEnum | ProductStatusEnum;
export interface OfferOrderingInfo {
  isAvailable?: MaybeNull<boolean>;
  time?: MaybeNull<AppDate>;
}
export type OfferFutures = {
  isPromo?: MaybeNull<boolean>;
  negativeSale?: MaybeNull<boolean>;
  // reservation?: MaybeNull<OfferOrderingInfo>;
  // availability?: MaybeNull<OfferOrderingInfo>;
  // customOrder?: MaybeNull<OfferOrderingInfo>;
  // preOrder?: MaybeNull<OfferOrderingInfo>;
  // customProduction?: MaybeNull<OfferOrderingInfo>;
  // rent?: MaybeNull<OfferOrderingInfo>;
} & HasStatus<string> &
  Partial<
    Record<
      'reservation' | 'availability' | 'customOrder' | 'preOrder' | 'customProduction' | 'rent',
      MaybeNull<OfferOrderingInfo>
    >
  >;

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

export enum OfferTypeEnum {
  GOODS = 'GOODS',
  SERVICE = 'SERVICE',
}

export type ProductFilterOpt = FilterOption<OfferTypeEnum>;

export interface IProductBase
  extends IBase,
    HasLabel,
    HasMeasurement,
    HasDimensions,
    HasDescription,
    HasType<OfferTypeEnum>,
    HasStatus<ProductStatusEnum> {
  sku?: string;
  barCode?: string;
  qrCode?: string;

  approved?: ProductStatusEnum;
  archived?: boolean;
  visible?: boolean;

  futures?: MaybeNull<OfferFutures>;

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
  img_1x?: string;
  img_2x?: string;
  webp?: string;
  order: number;
}

// * >>>>>>> FORM DATA <<<<<<<
export interface IProductBaseFormData extends IProductBaseDto {}

export interface IProductDefaultsFormData extends Record<keyof IProductDefaults, IFormDataValueWithID> {}

export interface IProductWithAddsFieldsFormData extends IProductBaseFormData {}

export interface IProductFullFormData
  extends Omit<IProductFullDto, 'recommends' | 'properties' | 'images' | 'categories'> {
  categories?: ArrayUUID;
  recommends?: ArrayUUID;
  properties?: ArrayUUID;

  defaults?: IProductDefaultsFormData;
  images?: IProductImage[];
}

export interface IProductFormData extends IProductFullFormData {}

// * >>>>>> PRODUCT DTO <<<<<<<
export interface IProductBaseDto extends Omit<IProductBase, '_id' | 'createdAt' | 'deletedAt' | 'updatedAt'> {}

export interface IProductWithAddsFieldsDto extends IProductBaseDto {
  category?: OnlyUUID;
  brand?: OnlyUUID;
  template?: OnlyUUID;

  categories?: ArrayUUID;
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

export interface HasProduct {
  product?: MaybeNull<IWarehouse>;
}
// ? PROPERTIES ================================================
