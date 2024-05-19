import styled from 'styled-components';
import { takeFullGridArea } from '../pagesStyles';
import AppGridPage from '../AppGridPage';
import React, { useCallback, useEffect, useState } from 'react';
import { ServiceName, useAppServiceProvider } from '../../../hooks/useAppServices.hook';
import PageCurrentProductProvider from './PageCurrentProductProvider';
import PageProductOverviewRightSide from './PageProductOverviewRightSide';
import PageProductOverviewLeftSide from './PageProductOverviewLeftSide';
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

  const toggleRightSide = useCallback(() => {
    setIsRightSideVisible(p => !p);
  }, []);

  useEffect(() => {
    return () => {
      productsS.clearCurrent(undefined);
    };

    // eslint-disable-next-line
  }, []);

  return (
    <LoadersProvider value={loaders}>
      <PageCurrentProductProvider>
        <AppGridPage path={path}>
          <Page>
            <PageProductOverviewLeftSide toggleRightSideVisibility={toggleRightSide} />

            <PageProductOverviewRightSide isVisible={isRightSideVisible} toggleVisibility={toggleRightSide} />
          </Page>
        </AppGridPage>
      </PageCurrentProductProvider>
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

export default PageProductOverview;
