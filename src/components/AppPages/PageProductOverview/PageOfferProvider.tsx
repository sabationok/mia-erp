import React, { createContext, useCallback, useContext, useEffect, useMemo } from 'react';
import { OfferEntity } from '../../../types/offers/offers.types';
import { ServiceName, useAppServiceProvider } from '../../../hooks/useAppServices.hook';
import { useAppParams, useCurrentOffer } from '../../../hooks';
import { useOfferOverviewLoaders } from './PageOfferOverview';

export interface PageOfferProviderProps {
  children?: React.ReactNode;
}

export interface PageOfferProviderValue {
  currentOffer?: OfferEntity;
  clearCurrent: () => void;
  mainPagePath?: string;
}

export const PageCurrentProductCTX = createContext({});

export const usePageCurrentProduct = () => useContext(PageCurrentProductCTX) as PageOfferProviderValue;

const PageOfferProvider: React.FC<PageOfferProviderProps> = ({ children }) => {
  const service = useAppServiceProvider()[ServiceName.products];
  const offerId = useAppParams()?.productId;
  const currentOffer = useCurrentOffer({ id: offerId });
  const productsS = useAppServiceProvider()[ServiceName.products];

  const loaders = useOfferOverviewLoaders();

  useEffect(() => {
    if (loaders?.isLoading?.offer) return;

    if (offerId && offerId !== currentOffer?._id) {
      const close = loaders.show('offer');

      productsS
        .getProductFullInfo({
          data: { _id: offerId },
          onLoading: loaders.onLoading('offer'),
        })
        .finally(close);
    }
    // eslint-disable-next-line
  }, [offerId]);

  // const { currentOffer } = useProductsSelector();

  const clearCurrent = useCallback(() => {
    service.clearCurrent(undefined);
  }, [service]);

  const CTX = useMemo(
    (): PageOfferProviderValue => ({
      clearCurrent,
      currentOffer,
    }),
    [clearCurrent, currentOffer]
  );

  return <PageCurrentProductCTX.Provider value={CTX}>{children}</PageCurrentProductCTX.Provider>;
};
export default PageOfferProvider;
