import { useOffersSelector } from '../redux/selectors.store';
import { useMemo } from 'react';

export const useCurrentVariation = ({ _id }: { _id?: string } = {}) => {
  const state = useOffersSelector();

  const res = useMemo(() => {
    let _variation = _id ? state.variationsMap?.[_id] : undefined;

    if (_variation && !Object.values(_variation.variations)?.length) {
      const propertiesMap: Record<string, string> = {};
      variation?.properties?.forEach(prop => {
        if (prop?._id && prop?.parent?._id) {
          const parentId = prop.parent?._id;
          if (parentId) {
            propertiesMap[parentId] = prop._id;
          }
        }

        _variation.propertiesMap = propertiesMap;
      });
    }

    return _variation;
  }, [_id, state.variationsMap]);

  return {
    variation: _id ? state.variationsMap?.[_id] : undefined,
  };
};
