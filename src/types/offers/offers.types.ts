import { ArrayOfUUID, IBase, IFormDataValueWithID, OnlyUUID } from '../../redux/app-redux.types';
import { ISupplierDirItem, OfferCategoryEntity } from '../dir.types';
import { FilterOption } from '../../components/atoms/TabSelector';
import { PriceEntity } from '../price-management/price-management.types';
import { IWarehouse, WarehouseItemEntity } from '../warehousing/warehouses.types';
import { IBrand } from '../../redux/directories/brands.types';
import { AppQueries, AppQueryParams } from '../../api';
import { VariationEntity } from './variations.types';
import { ProperiesGroupEntity, PropertyValueEntity } from './properties.types';
import {
  AppDate,
  HasAuthor,
  HasDescription,
  HasDimensions,
  HasEditor,
  HasLabel,
  HasMeasurement,
  HasOwnerAsCompany,
  HasStatus,
  HasType,
  Keys,
  MaybeNull,
  PartialRecord,
  UUID,
} from '../utils.types';
import { OfferImageSlotEntity } from './offer-images.types';
import { WarehouseInventoryEntity } from '../warehousing/warehouse-inventory.types';

export type { OfferImageSlotEntity } from './offer-images.types';

export enum OfferStatusEnum {
  pending = 'pending',
  rejected = 'rejected',
  success = 'success',
  approved = 'approved',
  // error = 'error',
  warning = 'warning',
  // info = 'info',
}

export interface OfferOrderingInfo {
  isAvailable?: MaybeNull<boolean>;
  time?: MaybeNull<AppDate>;
}
export type OfferFutures = {
  isPromo?: MaybeNull<boolean>;
  negativeSale?: MaybeNull<boolean>;
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

export interface IOfferBase
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

export interface IOfferRelatedDefaultFields {
  variation?: VariationEntity;
  price?: PriceEntity;
  warehouse?: IWarehouse;
  inventory?: WarehouseItemEntity;
  supplier?: ISupplierDirItem;
}
export interface IOfferWithRelatedFields
  extends IOfferBase,
    HasOwnerAsCompany,
    HasAuthor,
    HasEditor,
    IOfferRelatedDefaultFields {
  categories?: OfferCategoryEntity[];

  brand?: IBrand;
  recommends?: OfferEntity[];

  template?: ProperiesGroupEntity;
  properties?: PropertyValueEntity[];

  variations?: VariationEntity[];
  prices?: PriceEntity[];
  warehouses?: IWarehouse[];
  inventories?: WarehouseInventoryEntity[];
}

export interface OfferEntity extends IOfferWithRelatedFields {
  defaults?: IOfferRelatedDefaultFields;
}

// * >>>>>>> FORM DATA <<<<<<<
export interface IProductBaseFormData extends IProductBaseDto {}

export interface IProductDefaultsFormData extends Record<keyof IOfferRelatedDefaultFields, IFormDataValueWithID> {}

export interface IProductWithAddsFieldsFormData extends IProductBaseFormData {}

export interface IProductFullFormData extends Omit<OfferDto, 'recommends' | 'properties' | 'images' | 'categories'> {
  categories?: ArrayOfUUID;
  recommends?: ArrayOfUUID;
  properties?: ArrayOfUUID;

  defaults?: IProductDefaultsFormData;
  images?: OfferImageSlotEntity[];
}

export interface IProductFormData extends IProductFullFormData {}

// * >>>>>> PRODUCT DTO <<<<<<<
export interface IProductBaseDto extends Omit<IOfferBase, '_id' | 'createdAt' | 'deletedAt' | 'updatedAt'> {}

export interface IProductWithAddsFieldsDto extends IProductBaseDto {
  category?: OnlyUUID;
  brand?: OnlyUUID;
  template?: OnlyUUID;

  categories?: ArrayOfUUID;
  recommends?: ArrayOfUUID;
  properties?: ArrayOfUUID;
}

type OfferDefaultRefKey = Keys<IOfferRelatedDefaultFields>;
type OfferDefaultsIdKey = Keys<Pick<AppQueries, 'warehouseId' | 'variationId' | 'priceId' | 'inventoryId'>>;
export interface IOfferDefaultsDto
  extends PartialRecord<OfferDefaultRefKey, OnlyUUID>,
    PartialRecord<OfferDefaultsIdKey, UUID> {}

export interface OfferDto extends IProductWithAddsFieldsDto, IOfferDefaultsDto {}

export interface IProductReqData {
  _id?: string;
  data?: OfferDto;
  params?: AppQueryParams;
}

export interface HasOffer {
  offer?: MaybeNull<OfferEntity>;
}
// ? PROPERTIES ================================================
