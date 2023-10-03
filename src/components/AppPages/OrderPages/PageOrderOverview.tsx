import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { takeFullGridArea } from '../pagesStyles';
import { AppGridPage } from '../pages';
import { PagePathType } from '../../../redux/APP_CONFIGS';
import { ToastService } from '../../../services';
import { useAppParams } from '../../../hooks';
import PageCurrentOrderProvider from './PageCurrentOrderProvider';
import PageOverlayProvider from '../../atoms/PageOverlayProvider';
import PageOrderOverviewLeftSide from './PageOrderOverviewLeftSide';
import PageOrderOverviewTabs from './PageOrderOverviewTabs';

export interface PageOrderOverviewProps {
  path: PagePathType;
}
const loader = ToastService.createLoader('Loading order info');

const PageOrderOverview: React.FC<PageOrderOverviewProps> = ({ path }) => {
  const [isTabsSideVisible, setIsTabsSideVisible] = useState<boolean>(false);
  const { orderId } = useAppParams();

  const toggleRightSide = useCallback(() => {
    setIsTabsSideVisible(p => !p);
  }, []);

  useEffect(() => {
    if (orderId) {
      console.log('PageOrderOverview', orderId);
    }
  }, [orderId]);

  return (
    <AppGridPage path={path}>
      <PageCurrentOrderProvider>
        <PageOverlayProvider>
          <Page>
            <PageOrderOverviewLeftSide />

            <PageOrderOverviewTabs />
          </Page>
        </PageOverlayProvider>
      </PageCurrentOrderProvider>
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
export default PageOrderOverview;
