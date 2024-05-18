import styled from 'styled-components';
import { takeFullGridArea } from '../pagesStyles';
import AppGridPage from '../AppGridPage';
import React, { useCallback, useEffect, useState } from 'react';
import { ServiceName, useAppServiceProvider } from '../../../hooks/useAppServices.hook';
import PageCurrentProductProvider from './PageCurrentProductProvider';
import PageProductOverviewRightSide from './PageProductOverviewRightSide';
import PageProductOverviewLeftSide from './PageProductOverviewLeftSide';
import { useAppParams } from '../../../hooks';
import { useProductsSelector } from '../../../redux/selectors.store';
import { BaseAppPageProps } from '../index';
import { OfferEntity } from '../../../types/offers/offers.types';
import { LoadersProvider, useLoadersProvider } from '../../../Providers/Loaders/LoaderProvider';
import { useLoaders } from '../../../Providers/Loaders/useLoaders.hook';
import { t } from '../../../lang';

interface Props extends BaseAppPageProps {}

export type OfferOverviewLoaderKey = 'offer' | keyof OfferEntity;

export const useOfferOverviewLoaders = () => useLoadersProvider<OfferOverviewLoaderKey>();

const PageProductOverview: React.FC<Props> = ({ path }) => {
  const loaders = useLoaders<OfferOverviewLoaderKey>({ offer: { content: t('Loading product info') } });
  const [isRightSideVisible, setIsRightSideVisible] = useState<boolean>(false);
  const productsS = useAppServiceProvider()[ServiceName.products];
  const { productId } = useAppParams();
  const { currentOffer } = useProductsSelector();

  const toggleRightSide = useCallback(() => {
    setIsRightSideVisible(p => !p);
  }, []);

  useEffect(() => {
    if (loaders?.isLoading?.offer) return;
    if (productId && productId !== currentOffer?._id) {
      const close = loaders.show('offer');

      productsS
        .getProductFullInfo({
          data: { _id: productId },
          onLoading: loaders.onLoading('offer'),
        })
        .finally(close);
    }
    // eslint-disable-next-line
  }, [productId]);

  useEffect(() => {
    return () => {
      productsS.clearCurrent(undefined);
    };

    // eslint-disable-next-line
  }, []);

  return (
    <AppGridPage path={path}>
      <PageCurrentProductProvider>
        <LoadersProvider value={loaders}>
          <Page>
            <PageProductOverviewLeftSide toggleRightSideVisibility={toggleRightSide} />

            <PageProductOverviewRightSide isVisible={isRightSideVisible} toggleVisibility={toggleRightSide} />
          </Page>
        </LoadersProvider>
      </PageCurrentProductProvider>
    </AppGridPage>
  );
};
const Page = styled.div`
  display: grid;
  grid-template-columns: minmax(220px, 1fr) 0;

  ${takeFullGridArea};

  //@media screen and (max-width: 768px) {
  //}
  @media screen and (min-width: 768px) {
    grid-template-columns: minmax(360px, 1fr) 2fr;
  }
  @media screen and (min-width: 1000px) {
    grid-template-columns: minmax(360px, 400px) 2fr;
  }
`;

export default PageProductOverview;
