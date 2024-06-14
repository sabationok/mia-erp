import { ArrayOfUUID, IBase, IFormDataValueWithID, OnlyUUID } from '../../redux/app-redux.types';
import { ISupplierDirItem, OfferCategoryEntity } from '../dir.types';
import { FilterOption } from '../../components/atoms/TabSelector';
import { PriceEntity } from '../price-management/price-management.types';
import { WarehouseEntity, WarehouseItemEntity } from '../warehousing/warehouses.types';
import { IBrand } from '../../redux/directories/brands.types';
import { AppQueries, AppQueryParams } from '../../api';
import { VariationEntity } from './variations.types';
import { PropertiesGroupEntity, PropertyValueEntity } from './properties.types';
import {
  AppDate,
  HasAuthor,
  HasBarCode,
  HasDescription,
  HasDimensions,
  HasEditor,
  HasImgPreview,
  HasLabel,
  HasMeasurement,
  HasOwnerAsCompany,
  HasSku,
  HasStatus,
  HasType,
  Keys,
  MaybeNull,
  PartialRecord,
  UUID,
  WithPeriod,
} from '../utils.types';
import { OfferImageSlotEntity } from './offer-images.types';
import { WarehouseInventoryEntity } from '../warehousing/warehouse-inventory.types';
import { HasBaseCmsConfigs } from '../cms.types';
import { HasTags } from '../tags.types';

export type { OfferImageSlotEntity } from './offer-images.types';

export enum OfferTypeEnum {
  GOODS = 'GOODS',
  SERVICE = 'SERVICE',
  SET = 'SET',
}
export enum OfferStatusEnum {
  pending = 'pending',
  rejected = 'rejected',
  // success = 'success',
  approved = 'approved',
  error = 'error',
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

export type ProductFilterOpt = FilterOption<OfferTypeEnum>;

export interface IOfferBase
  extends HasLabel,
    HasMeasurement,
    HasDimensions,
    HasDescription,
    HasType<OfferTypeEnum>,
    HasStatus<OfferStatusEnum>,
    HasBaseCmsConfigs,
    HasDimensions,
    WithPeriod,
    HasImgPreview,
    HasBarCode,
    HasSku {
  qrCode?: string;

  template?: PropertiesGroupEntity;
  propsKey?: string;

  approved?: OfferStatusEnum;
  archived?: boolean;
  visible?: boolean;

  futures?: MaybeNull<OfferFutures>;

  images?: OfferImageSlotEntity[];

  propertiesMap?: PropertyValuesMap;
}

export type PropertyValuesMap = Record<string, PropertyValueEntity>;

export interface IOfferRelatedDefaultFields {
  variation?: VariationEntity;
  price?: PriceEntity;
  warehouse?: WarehouseEntity;
  inventory?: WarehouseItemEntity;
  supplier?: ISupplierDirItem;
}
export interface OfferEntity
  extends IBase,
    IOfferBase,
    HasOwnerAsCompany,
    HasAuthor,
    HasEditor,
    IOfferRelatedDefaultFields,
    HasTags {
  categories?: OfferCategoryEntity[];

  brand?: IBrand;
  recommends?: OfferEntity[];

  template?: PropertiesGroupEntity;
  properties?: PropertyValueEntity[];

  variations?: VariationEntity[];
  prices?: PriceEntity[];
  warehouses?: WarehouseEntity[];
  inventories?: WarehouseInventoryEntity[];
}

// * >>>>>>> FORM DATA <<<<<<<
export interface IProductBaseFormData extends IProductBaseDto {}

export interface OfferDefaultsFormState extends Record<keyof IOfferRelatedDefaultFields, IFormDataValueWithID> {}

export interface IProductWithAddsFieldsFormData extends IProductBaseFormData {}

export interface IOfferFullFormData extends Omit<OfferDto, 'recommends' | 'properties' | 'images' | 'categories'> {
  categories?: ArrayOfUUID;
  recommends?: ArrayOfUUID;
  properties?: ArrayOfUUID;

  defaults?: OfferDefaultsFormState;
  images?: OfferImageSlotEntity[];
}

export interface IProductFormData extends IOfferFullFormData {}

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

export interface OfferReqData {
  _id?: string;
  data?: OfferDto;
  params?: AppQueryParams;
}

export interface HasOffer {
  offer?: MaybeNull<OfferEntity>;
}

export interface HasOffers {
  offers?: MaybeNull<OfferEntity[]>;
}
// ? PROPERTIES ================================================
