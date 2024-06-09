import { IBase, OnlyUUID } from '../../redux/app-redux.types';
import { WarehouseItemEntity } from '../warehousing/warehouses.types';
import { PriceEntity } from '../price-management/price-management.types';
import { AppQueryParams } from '../../api';
import { OfferEntity } from './offers.types';
import { ProperiesGroupEntity, PropertyValueEntity } from './properties.types';
import {
  HasBarCode,
  HasCompany,
  HasDimensions,
  HasImgPreview,
  HasLabel,
  HasSku,
  MaybeNull,
  UUID,
  WithPeriod,
} from '../utils.types';
import { HasBaseCmsConfigs, HasBaseCmsConfigsDto } from '../cms.types';

export interface IVariationBase extends HasDimensions, WithPeriod, HasImgPreview, HasLabel, HasSku, HasBarCode {}

export interface VariationEntity extends IVariationBase, IBase, HasCompany, HasBaseCmsConfigs {
  offer?: OfferEntity;
  price?: PriceEntity;
  inventories?: WarehouseItemEntity[];

  template?: ProperiesGroupEntity;
  properties?: PropertyValueEntity[];

  propsKey?: string;
}

export type VariationPropertiesMapInTableData = Record<string, PropertyValueEntity>;

export type VariationPropertiesMapInFormData = Record<string, string>;
export interface IVariationTableData extends VariationEntity {
  propertiesMap?: VariationPropertiesMapInTableData;
}
export interface IVariationFormData extends IVariationBase, HasBaseCmsConfigsDto {
  propertiesMap?: VariationPropertiesMapInFormData;

  template?: OnlyUUID;

  offer?: OnlyUUID & { label?: string } & HasBaseCmsConfigsDto;
}

export interface HasVariation {
  variation?: MaybeNull<VariationEntity>;
}

export interface VariationDto extends IVariationBase, HasBaseCmsConfigsDto {
  properties?: string[];
  offer?: OnlyUUID;
  template?: OnlyUUID;
  offerId?: UUID;
  templateId?: UUID;
}

export interface IVariationReqData {
  _id?: string;
  data?: VariationDto;
  params?: Pick<AppQueryParams, 'offerId' | 'withDeleted' | 'sku' | 'label' | 'barCode' | 'langKey' | 'search'>;
}
