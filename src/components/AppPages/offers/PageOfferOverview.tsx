import styled from 'styled-components';
import { takeFullGridArea } from '../pagesStyles';
import AppGridPage from '../AppGridPage';
import React, { useCallback, useState } from 'react';
import PageOfferProvider from './PageOfferProvider';
import OfferOverviewPageRightSide from './OfferOverviewPageRightSide';
import OfferOverviewPageLeftSide from './OfferOverviewPageLeftSide';
import { BaseAppPageProps } from '../index';
import { OfferEntity } from '../../../types/offers/offers.types';
import { LoadersProvider, useLoadersProvider } from '../../../Providers/Loaders/LoaderProvider';
import { useLoaders } from '../../../Providers/Loaders/useLoaders.hook';
import { t } from '../../../i18e';
import OverlayStackProvider from '../../../Providers/Overlay/OverlayStackProvider';

interface Props extends BaseAppPageProps {}

export type OfferOverviewLoaderKey = 'offer' | 'update_offer' | 'refresh_offer' | keyof OfferEntity;

export const useOfferOverviewLoaders = () => useLoadersProvider<OfferOverviewLoaderKey>();

const PageOfferOverview: React.FC<Props> = ({ path }) => {
  const loaders = useLoaders<OfferOverviewLoaderKey>({
    offer: { content: t('Loading product info') },
    prices: { content: 'Loading prices' },
    variations: { content: 'Loading variations' },
  });
  const [isRightSideVisible, setIsRightSideVisible] = useState<boolean>(false);

  const toggleRightSide = useCallback(() => {
    setIsRightSideVisible(p => !p);
  }, []);

  return (
    <LoadersProvider value={loaders}>
      <PageOfferProvider>
        <OverlayStackProvider>
          <AppGridPage path={path}>
            <Page>
              <OfferOverviewPageLeftSide toggleRightSideVisibility={toggleRightSide} />

              <OfferOverviewPageRightSide isVisible={isRightSideVisible} toggleVisibility={toggleRightSide} />
            </Page>
          </AppGridPage>
        </OverlayStackProvider>
      </PageOfferProvider>
    </LoadersProvider>
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

export default PageOfferOverview;
