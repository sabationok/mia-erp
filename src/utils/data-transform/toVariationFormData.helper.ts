import { IVariation, IVariationFormData } from '../../redux/products/variations/variations.types';
import { nanoid } from '@reduxjs/toolkit';
import { getIdRef } from './index';

export const toVariationFormData = (variation: Partial<IVariation>): IVariationFormData => {
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
    label: variation.label ? variation.label : `${variation?.product?.label}. {{VARIATION_LABEL}}`,
    sku: variation.sku ? variation.sku : `${variation?.product?.sku ? variation?.product?.sku + '-' : ''}${nanoid(8)}`,
    product: variation?.product ? getIdRef(variation.product) : undefined,
    propertiesMap,
  };
};
