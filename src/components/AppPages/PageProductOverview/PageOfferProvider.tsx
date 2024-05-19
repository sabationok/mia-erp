import React, { createContext, useContext, useEffect } from 'react';
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
  const loaders = useOfferOverviewLoaders();
  const params = useAppParams();
  const offerId = params?.offerId;

  const currentOffer = useCurrentOffer({ id: offerId });

  useEffect(() => {
    if (loaders?.isLoading?.offer) return;

    if (offerId) {
      service
        .getProductFullInfo({
          data: { _id: offerId },
          onLoading: loaders.onLoading('offer'),
        })
        .finally();
    }
    // eslint-disable-next-line
  }, [offerId]);

  // const { currentOffer } = useProductsSelector();

  const clearCurrent = () => {
    service.clearCurrent(undefined);
  };

  useEffect(() => {
    return () => {
      service.clearCurrent(undefined);
    };

    // eslint-disable-next-line
  }, []);

  return (
    <PageCurrentProductCTX.Provider
      value={{
        clearCurrent,
        currentOffer,
      }}
    >
      {children}
    </PageCurrentProductCTX.Provider>
  );
};
export default PageOfferProvider;
