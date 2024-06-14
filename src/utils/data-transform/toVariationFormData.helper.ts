import { VariationEntity, VariationFormData } from '../../types/offers/variations.types';
import { nanoid } from '@reduxjs/toolkit';
import { getIdRef } from './index';
import { OfferEntity } from '../../types/offers/offers.types';

export const toVariationFormData = (variation: Partial<VariationEntity>, offer?: OfferEntity): VariationFormData => {
  return {
    _id: variation?._id,
    timeFrom: variation?.timeFrom,
    timeTo: variation?.timeTo,
    imgPreview: variation?.imgPreview || (variation?.offer || offer)?.images?.[0]?.img_preview,
    label: variation.label ? variation.label : `${(variation?.offer || offer)?.label}. {{VARIATION_LABEL}}`,
    sku: variation.sku
      ? variation.sku
      : `${(variation?.offer || offer)?.sku ? (variation?.offer || offer)?.sku + '-' : ''}${nanoid(8)}`,
    offer: offer || (variation?.offer ? getIdRef(variation.offer) : undefined),
    template: variation?.template ? getIdRef(variation.template) : undefined,
    propertiesMap: variation?.propertiesMap,
  };
};
