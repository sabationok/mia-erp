import { IVariationFormData, VariationEntity } from '../../types/offers/variations.types';
import { nanoid } from '@reduxjs/toolkit';
import { getIdRef } from './index';
import { OfferEntity } from '../../types/offers/offers.types';

export const toVariationFormData = (variation: Partial<VariationEntity>, offer?: OfferEntity): IVariationFormData => {
  const propertiesMap: Record<string, string> = {};

  variation?.properties?.forEach(prop => {
    if (prop?._id && prop?.parent?._id) {
      const parentId = prop.parent?._id;
      if (parentId) {
        propertiesMap[parentId] = prop._id;
      }
    }
  });

  return {
    timeFrom: variation?.timeFrom,
    timeTo: variation?.timeTo,
    imgPreview: variation?.imgPreview || (variation?.offer || offer)?.images?.[0]?.img_preview,
    label: variation.label ? variation.label : `${(variation?.offer || offer)?.label}. {{VARIATION_LABEL}}`,
    sku: variation.sku
      ? variation.sku
      : `${(variation?.offer || offer)?.sku ? (variation?.offer || offer)?.sku + '-' : ''}${nanoid(8)}`,
    offer: offer || (variation?.offer ? getIdRef(variation.offer) : undefined),
    propertiesMap,
  };
};
