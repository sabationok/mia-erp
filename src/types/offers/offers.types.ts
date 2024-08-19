import { ArrayOfUUID, IBase, IFormDataValueWithID, OnlyUUID } from '../../redux/app-redux.types';
import { OfferCategoryEntity } from '../dir.types';
import { PriceEntity } from '../price-management/price-management.types';
import { WarehouseEntity, WarehouseItemEntity } from '../warehousing/warehouses.types';
import { IBrand } from '../../redux/directories/brands.types';
import type { ApiQueryParams, AppQueries, FilesApi } from '../../api';
import { VariationEntity } from './variations.types';
import { PropertiesGroupEntity, PropertyValueEntity } from './properties.types';
import {
  AppDate,
  HasAuthor,
  HasBarCode,
  HasDescription,
  HasDimensions,
  HasEditor,
  HasFlags,
  HasImgPreview,
  HasIsVisibleFlag,
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
import { HasTags, TagEntity } from '../tags.types';
import { CounterpartyEntity } from '../counterparty/counterparty.types';

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
  negativeSale?: MaybeNull<boolean>;
  hasVariations?: MaybeNull<boolean>;
  hasInventories?: MaybeNull<boolean>;
  hasItems?: MaybeNull<boolean>;
} & HasStatus<string> &
  PartialRecord<
    'reservation' | 'availability' | 'customOrder' | 'preOrder' | 'customProduction' | 'rent',
    MaybeNull<OfferOrderingInfo>
  >;

export type PropertyValuesMap = Record<string, PropertyValueEntity>;

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
    HasSku,
    HasIsVisibleFlag,
    HasFlags<'hasVariations' | 'hasInventories'> {
  qrCode?: string;

  propsKey?: string;

  approved?: OfferStatusEnum;

  visible?: boolean;

  futures?: MaybeNull<OfferFutures>;

  images?: OfferImageSlotEntity[];

  propertiesMap?: PropertyValuesMap;
}

export interface IOfferRelatedDefaultFields {
  variation?: VariationEntity;
  price?: PriceEntity;
  warehouse?: WarehouseEntity;
  inventory?: WarehouseItemEntity;
  supplier?: CounterpartyEntity;
}
export interface OfferEntity
  extends IBase,
    IOfferBase,
    HasOwnerAsCompany,
    HasAuthor,
    HasEditor,
    IOfferRelatedDefaultFields,
    HasTags {
  offer?: OfferEntity;
  brand?: IBrand;
  categories?: OfferCategoryEntity[];

  recommends?: OfferEntity[];

  template?: PropertiesGroupEntity;
  properties?: PropertyValueEntity[];
  tags?: TagEntity[];
  files?: FilesApi.FileEntity[];

  variations?: VariationEntity[];
  prices?: PriceEntity[];
  warehouses?: WarehouseEntity[];
  inventories?: WarehouseInventoryEntity[];
}

// * >>>>>>> FORM DATA <<<<<<<

export interface OfferDefaultsFormData extends PartialRecord<keyof IOfferRelatedDefaultFields, IFormDataValueWithID> {}

export interface OfferFullFormData extends OfferDto {
  defaults?: OfferDefaultsFormData;

  images?: OfferImageSlotEntity[];
  files?: FilesApi.UploadFileByLinkDto;

  propValuesIdsMap?: Record<string, string>;
  propertiesMap?: PropertyValuesMap;
}

export interface OfferFormData extends OfferFullFormData {}

// * >>>>>> OFFER DTO <<<<<<<
export interface OfferBaseDto extends Omit<IOfferBase, '_id' | 'createdAt' | 'deletedAt' | 'updatedAt'> {}

export enum OfferFormRelatedFieldKeyEnum {
  categoriesIds = 'categoriesIds',
  recommendsIds = 'recommendsIds',
  propertiesIds = 'propertiesIds',
  tagsIds = 'tagsIds',
}

export interface OfferRelatedFieldsDto extends PartialRecord<OfferFormRelatedFieldKeyEnum, ArrayOfUUID> {
  brandId?: UUID;
  templateId?: UUID;
}

type OfferDefaultRefKey = Keys<IOfferRelatedDefaultFields>;

type OfferDefaultsIdKey = Keys<Pick<AppQueries, 'warehouseId' | 'variationId' | 'priceId' | 'inventoryId'>>;
export interface IOfferDefaultsDto
  extends PartialRecord<OfferDefaultRefKey, OnlyUUID>,
    PartialRecord<OfferDefaultsIdKey, UUID> {}

export interface OfferDto extends OfferBaseDto, OfferRelatedFieldsDto, IOfferDefaultsDto {
  id?: UUID;
}

export interface OfferReqData {
  _id?: string;
  data?: OfferDto;
  params?: Pick<
    ApiQueryParams,
    | 'offset'
    | 'limit'
    | 'ids'
    | 'withDeleted'
    | 'propertiesIds'
    | 'categoriesIds'
    | 'brandsIds'
    | 'warehousesIds'
    | 'search'
    | 'sortOrder'
  >;
}

export interface HasOffers {
  offers?: MaybeNull<OfferEntity[]>;
}
// ? PROPERTIES ================================================
