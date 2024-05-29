import { useProductsSelector } from '../redux/selectors.store';
import { useAppParams } from './index';
import { VariationEntity } from '../types/offers/variations.types';
import { OfferEntity } from '../types/offers/offers.types';
import { useEffect, useMemo } from 'react';
import { useAppServiceProvider } from './useAppServices.hook';
import { AppModuleName } from '../redux/reduxTypes.types';

type CurrentOffer = OfferEntity & {
  getVariations(): VariationEntity[];
};
export const useCurrentOffer = ({ _id }: { _id?: string } = {}): CurrentOffer | undefined => {
  const param = useAppParams();
  const id = _id ?? param?.offerId;
  const state = useProductsSelector();
  const service = useAppServiceProvider().get(AppModuleName.offers);

  const offer = useMemo(() => {
    const _offer = id ? state.dataMap?.[id] : undefined;
    function getVariations(): VariationEntity[] {
      const _idsList = id ? state.variationsKeysMap?.[id] : undefined;

      if (!_idsList) {
        return [];
      }
      const _list = offer?.variations ?? [];

      if (!_list.length && _idsList?.length) {
        for (const idKey of _idsList) {
          const vr = state.variationsMap?.[idKey];

          if (vr) _list.push(vr);
        }
      }
      return _list;
    }

    if (!_offer) {
      return undefined;
    }
    return { ..._offer, getVariations };
  }, [id, state.dataMap, state.variationsKeysMap, state.variationsMap]);

  useEffect(() => {
    if (!offer) {
      service.getOne({
        data: { params: { _id: id } },
      });
    }
  }, [id, offer, service]);

  return offer;
};
