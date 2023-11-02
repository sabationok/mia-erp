import { useProductsSelector, usePropertiesSelector } from '../redux/selectors.store';
import { useMemo } from 'react';
import { createTableTitlesFromTemplate } from '../utils';

export default function useVariationTableTitlesForCurrentProduct() {
  const currentProduct = useProductsSelector().currentProduct;
  const templates = usePropertiesSelector();

  return useMemo(() => {
    const template = templates.find(t => t._id === currentProduct?.template?._id);
    return createTableTitlesFromTemplate(template);
  }, [currentProduct?.template?._id, templates]);
}
