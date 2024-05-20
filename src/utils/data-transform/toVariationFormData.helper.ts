import { IVariationFormData, VariationEntity } from '../../types/offers/variations.types';
import { nanoid } from '@reduxjs/toolkit';
import { getIdRef } from './index';

export const toVariationFormData = (variation: Partial<VariationEntity>): IVariationFormData => {
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
    label: variation.label ? variation.label : `${variation?.offer?.label}. {{VARIATION_LABEL}}`,
    sku: variation.sku ? variation.sku : `${variation?.offer?.sku ? variation?.offer?.sku + '-' : ''}${nanoid(8)}`,
    offer: variation?.offer ? getIdRef(variation.offer) : undefined,
    propertiesMap,
  };
};
