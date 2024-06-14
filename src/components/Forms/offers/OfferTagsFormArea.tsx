import { OfferFormAreaProps } from './types';
import { OfferFullFormData } from '../../../types/offers/offers.types';

type OfferField = OfferFullFormData['tagsIds'];
export interface OfferTagsFormArea extends OfferFormAreaProps<OfferField> {}
