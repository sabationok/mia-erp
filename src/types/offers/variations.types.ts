import { OnlyUUID } from '../../redux/app-redux.types';
import { AppQueryParams } from '../../api';
import { IOfferBase, OfferEntity } from './offers.types';
import { MaybeNull, UUID } from '../utils.types';
import { HasBaseCmsConfigsDto } from '../cms.types';

export interface IVariationBase extends IOfferBase {}

export interface VariationEntity extends OfferEntity {
  offer?: OfferEntity;
}

export interface IVariationFormData extends Partial<IVariationBase> {
  offer?: Partial<OfferEntity>;
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
