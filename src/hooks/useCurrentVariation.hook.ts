import { useOffersSelector } from '../redux/selectors.store';
import { useMemo } from 'react';
import { VariationEntity } from '../types/offers/variations.types';
import { PropertyValuesMap } from '../types/offers/offers.types';

export interface UseCurrentVariationReturn extends Partial<VariationEntity> {
  origin?: VariationEntity;
}
export const useCurrentVariation = ({ _id }: { _id?: string } = {}): UseCurrentVariationReturn => {
  const state = useOffersSelector();

  const res = useMemo((): VariationEntity | undefined => {
    let _variation = _id ? state.variationsMap?.[_id] : undefined;

    if (_variation?.variations && !Object.values(_variation.variations)?.length) {
      const propertiesMap: PropertyValuesMap = {};
      _variation?.properties?.forEach(prop => {
        if (prop?._id && prop?.parent?._id) {
          const parentId = prop.parent?._id;
          if (parentId) {
            propertiesMap[parentId] = prop;
          }
        }
      });
      _variation.propertiesMap = propertiesMap;
    }

    return _variation;
  }, [_id, state.variationsMap]);

  return {
    ...res,
    origin: res,
  };
};
