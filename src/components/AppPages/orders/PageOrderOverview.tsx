import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { takeFullGridArea } from '../pagesStyles';
import { AppGridPage } from '../pages';
import { useAppParams } from '../../../hooks';
import OverlayStackProvider from '../../../Providers/Overlay/OverlayStackProvider';
import PageOrderOverviewLeftSide from './PageOrderOverviewLeftSide';
import PageOrderOverviewTabs from './PageOrderOverviewTabs';
import { BaseAppPageProps } from '../index';
import { useAppServiceProvider } from '../../../hooks/useAppServices.hook';
import { AppModuleName } from '../../../redux/reduxTypes.types';
import CurrentOrderProvider from '../../../Providers/CurrentOrderProvider';

interface Props extends BaseAppPageProps {}

const PageOrderOverview: React.FC<Props> = ({ path }) => {
  const service = useAppServiceProvider()[AppModuleName.orders];

  const [isTabsSideVisible, setIsTabsSideVisible] = useState<boolean>(false);
  const { orderId } = useAppParams();

  const toggleRightSide = () => {
    setIsTabsSideVisible(p => !p);
  };

  useEffect(() => {
    if (orderId) {
      service.getById({
        data: { _id: orderId, options: { refreshCurrent: true } },
      });
    }
  }, [orderId, service]);

  return (
    <AppGridPage path={path}>
      <CurrentOrderProvider>
        <OverlayStackProvider>
          <Page>
            <PageOrderOverviewLeftSide toggleRightSideVisibility={toggleRightSide} />

            <PageOrderOverviewTabs toggleVisibility={toggleRightSide} isVisible={isTabsSideVisible} />
          </Page>
        </OverlayStackProvider>
      </CurrentOrderProvider>
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
