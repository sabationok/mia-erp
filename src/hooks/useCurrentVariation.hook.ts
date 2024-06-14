import { useOffersSelector } from '../redux/selectors.store';
import { useMemo } from 'react';
import { VariationEntity } from '../types/offers/variations.types';
import { PropertyValuesMap } from '../types/offers/offers.types';
import { UUID } from '../types/utils.types';

export interface UseCurrentVariationReturn extends Partial<VariationEntity> {
  origin?: VariationEntity;
  propValuesIdsMap?: Record<UUID, UUID>;
  propValuesIdsSet?: UUID[];
}
export const useCurrentVariation = ({ _id }: { _id?: string } = {}): UseCurrentVariationReturn => {
  const state = useOffersSelector();

  const res = useMemo((): Pick<UseCurrentVariationReturn, 'origin' | 'propValuesIdsMap' | 'propValuesIdsSet'> => {
    let _variation = _id ? state.variationsMap?.[_id] : undefined;

    const propertiesMap: PropertyValuesMap = {};
    const _propValuesIdsMap: Record<string, string> = {};

    if (_variation?.variations && !Object.values(_variation.variations)?.length) {
      _variation?.properties?.forEach(prop => {
        if (prop?._id && prop?.parent?._id) {
          const parentId = prop.parent?._id;
          if (parentId) {
            _propValuesIdsMap[parentId] = prop?._id;
            propertiesMap[parentId] = prop;
          }
        }
      });
      _variation.propertiesMap = propertiesMap;
    }

    return {
      origin: _variation,
      propValuesIdsMap: _propValuesIdsMap,
      propValuesIdsSet: Object.values(_propValuesIdsMap),
    };
  }, [_id, state.variationsMap]);

  return {
    ...res.origin,
    ...res,
  };
};
