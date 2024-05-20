import { IBase, OnlyUUID } from '../../redux/global.types';
import { WarehouseItemEntity } from '../warehouses.types';
import { OfferPriceEntity } from '../price-management/priceManagement.types';
import { AppQueryParams } from '../../api';
import { OfferEntity } from './offers.types';
import { IPropertyValue } from './properties.types';
import { HasCompany, HasDimensions, HasLabel, MaybeNull, WithPeriod } from '../utils.types';
import { HasBaseCmsConfigs, HasBaseCmsConfigsDto } from '../cms.types';

export interface IVariationBase extends HasDimensions, WithPeriod, HasLabel {
  sku?: string;
  barCode?: string;
  imgPreview?: string;
}

export interface VariationEntity extends IVariationBase, IBase, HasCompany, HasBaseCmsConfigs {
  offer?: OfferEntity;
  price?: OfferPriceEntity;
  inventories?: WarehouseItemEntity[];

  properties?: IPropertyValue[];
}

export type VariationPropertiesMapInTableData = Record<string, IPropertyValue>;

export type VariationPropertiesMapInFormData = Record<string, string>;
export interface IVariationTableData extends VariationEntity {
  propertiesMap: VariationPropertiesMapInTableData;
}
export interface IVariationFormData extends IVariationBase, HasBaseCmsConfigsDto {
  propertiesMap?: VariationPropertiesMapInFormData;
  offer?: OnlyUUID & { label?: string } & HasBaseCmsConfigsDto;
}

export interface HasVariation {
  variation?: MaybeNull<VariationEntity>;
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
