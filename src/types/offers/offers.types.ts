import { ArrayUUID, IBase, IFormDataValueWithID, OnlyUUID } from '../../redux/global.types';
import { IProductCategoryDirItem, ISupplierDirItem } from '../dir.types';
import { FilterOption } from '../../components/atoms/TabSelector';
import { OfferPriceEntity } from '../price-management/priceManagement.types';
import { CompanyEntity } from '../companies.types';
import { IWarehouse, WarehouseItemEntity } from '../warehouses.types';
import { IBrand } from '../../redux/directories/brands.types';
import { UserEntity } from '../auth.types';
import { AppQueryParams } from '../../api';
import { VariationEntity } from './variations.types';
import { IPropertyValue } from './properties.types';
import {
  AppDate,
  HasDescription,
  HasDimensions,
  HasLabel,
  HasMeasurement,
  HasStatus,
  HasType,
  MaybeNull,
} from '../utils.types';

export enum OfferStatusEnum {
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
    HasStatus<OfferStatusEnum> {
  sku?: string;
  barCode?: string;
  qrCode?: string;

  approved?: OfferStatusEnum;
  archived?: boolean;
  visible?: boolean;

  futures?: MaybeNull<OfferFutures>;

  tags?: string[];
  images?: OfferImageSlotEntity[];
}

export interface IProductAddsFields extends IProductBase {
  owner?: CompanyEntity;
  author?: UserEntity;
  editor?: UserEntity;

  category?: IProductCategoryDirItem;
  categories?: IProductCategoryDirItem[];

  brand?: IBrand;
  recommends?: OfferEntity[];

  // template?: IVariationTemplate;
  properties?: IPropertyValue[];

  variations?: VariationEntity[];
  prices?: OfferPriceEntity[];
  warehouses?: IWarehouse[];
  inventories?: WarehouseItemEntity[];
}

export interface IProductDefaults {
  variation?: VariationEntity;
  price?: OfferPriceEntity;
  warehouse?: IWarehouse;
  inventory?: WarehouseItemEntity;
  supplier?: ISupplierDirItem;
}

export interface IProductWithDefaults extends IProductAddsFields, IProductDefaults {
  defaults?: IProductDefaults;
}

export interface OfferEntity extends IProductWithDefaults {}

export interface OfferImageSlotEntity extends Partial<IBase> {
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
  images?: OfferImageSlotEntity[];
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
