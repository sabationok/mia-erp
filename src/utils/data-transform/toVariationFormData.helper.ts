import { VariationEntity, IVariationFormData } from '../../types/offers/variations.types';
import { nanoid } from '@reduxjs/toolkit';
import { getIdRef } from './index';

export const toVariationFormData = (variation: Partial<VariationEntity>): IVariationFormData => {
  let propertiesMap: Record<string, string> = {};
  variation?.properties?.map(prop => {
    if (prop?._id && prop?.parent?._id) {
      propertiesMap = { ...propertiesMap, [prop.parent?._id]: prop._id };
    }
    return null;
  });

  return {
    timeFrom: variation?.timeFrom,
    timeTo: variation?.timeTo,
    label: variation.label ? variation.label : `${variation?.offer?.label}. {{VARIATION_LABEL}}`,
    sku: variation.sku ? variation.sku : `${variation?.offer?.sku ? variation?.offer?.sku + '-' : ''}${nanoid(8)}`,
    product: variation?.offer ? getIdRef(variation.offer) : undefined,
    propertiesMap,
  };
};
