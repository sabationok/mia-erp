import { MaybeNull } from '../../../types/utils.types';
import { AppSubmitHandler } from '../../../hooks/useAppForm.hook';
import { OfferEntity, OfferFullFormData } from '../../../types/offers/offers.types';

export interface OfferFormAreaProps<DefaultValues = any> {
  _id?: string;
  disabled?: boolean;
  defaultValues?: MaybeNull<DefaultValues>;
  title?: string;
  offer?: OfferEntity;
  onSubmit?: AppSubmitHandler<DefaultValues>;
  formData?: OfferFullFormData & { _id?: string };
  update?: string;
}

export type OfferLoadersKey =
  | 'offer'
  | 'offer_update'
  | 'offer_refresh'
  | 'offer_create'
  | 'formData'
  | keyof OfferEntity;

export type OfferLoadersData = {
  formData?: OfferFullFormData & { _id?: string };
  offer?: OfferEntity;
} & Partial<OfferEntity>;
