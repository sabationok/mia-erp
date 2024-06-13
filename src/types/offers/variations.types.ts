import { OnlyUUID } from '../../redux/app-redux.types';
import { AppQueryParams } from '../../api';
import { IOfferBase, OfferEntity, PropertyValuesMap } from './offers.types';
import { MaybeNull, UUID } from '../utils.types';
import { HasBaseCmsConfigsDto } from '../cms.types';

export interface IVariationBase extends IOfferBase {}

export interface VariationEntity extends OfferEntity {
  propertiesMap?: PropertyValuesMap;
  offer?: OfferEntity;
}

export interface IVariationFormData extends Partial<IVariationBase> {
  offer?: OfferEntity;
}

export interface HasVariation {
  variation?: MaybeNull<VariationEntity>;
}

export interface VariationDto extends Omit<IVariationBase, 'cmsConfigs'>, HasBaseCmsConfigsDto {
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
