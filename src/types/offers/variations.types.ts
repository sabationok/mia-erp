import { OnlyUUID } from '../../redux/app-redux.types';
import { AppQueryParams } from '../../api';
import { OfferEntity } from './offers.types';
import { PropertyValueEntity } from './properties.types';
import { MaybeNull, UUID } from '../utils.types';
import { HasBaseCmsConfigsDto } from '../cms.types';

export interface IVariationBase {}

export interface VariationEntity extends IVariationBase, OfferEntity {}

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
