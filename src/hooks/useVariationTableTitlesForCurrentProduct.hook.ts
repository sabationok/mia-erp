import { useOffersSelector, usePropertiesSelector } from '../redux/selectors.store';
import { useMemo } from 'react';
import { createTableTitlesFromProperties } from '../utils';

export default function useVariationTableTitlesForCurrentProduct() {
  const currentProduct = useOffersSelector().currentOffer;
  const templates = usePropertiesSelector();

  return useMemo(() => {
    const template = templates.find(t => t._id === currentProduct?.template?._id);
    return createTableTitlesFromProperties(template);
  }, [currentProduct?.template?._id, templates]);
}
