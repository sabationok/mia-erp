import { OnlyUUID } from '../../redux/app-redux.types';
import { ApiQueryParams } from '../../api';
import { IOfferBase, OfferEntity, OfferFullFormData } from './offers.types';
import { UUID } from '../utils.types';
import { HasBaseCmsConfigsDto } from '../cms.types';

export interface IVariationBase extends IOfferBase {}

export interface VariationEntity extends OfferEntity {}

export interface VariationFormData extends Partial<OnlyUUID>, OfferFullFormData {
  offerId?: UUID;
  offer?: OnlyUUID;
}

export interface VariationDto extends Omit<IVariationBase, 'cmsConfigs'>, HasBaseCmsConfigsDto {
  properties?: UUID[];
  propertiesIds?: UUID[];
  offer?: OnlyUUID;
  template?: OnlyUUID;
  offerId?: UUID;
  templateId?: UUID;
}
export interface IVariationReqData {
  _id?: string;
  data?: VariationDto;
  params?: Pick<ApiQueryParams, 'offerId' | 'withDeleted' | 'sku' | 'label' | 'barCode' | 'langKey' | 'search'>;
}
