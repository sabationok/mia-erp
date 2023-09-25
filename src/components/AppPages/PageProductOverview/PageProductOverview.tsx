import { PagePathType } from '../../../redux/APP_CONFIGS';
import styled from 'styled-components';
import { takeFullGridArea } from '../pagesStyles';
import AppGridPage from '../AppGridPage';
import { useCallback, useEffect, useState } from 'react';
import { useAppParams } from '../../../hooks';
import { ServiceName, useAppServiceProvider } from '../../../hooks/useAppServices.hook';
import PageCurrentProductProvider from './PageCurrentProductProvider';
import { ToastService } from '../../../services';
import PageProductOverviewRightSide from './PageProductOverviewRightSide';
import PageProductOverviewLeftSide from './PageProductOverviewLeftSide';
import AppLoader from '../../atoms/AppLoader';

export interface PageProductOverviewProps {
  path: PagePathType;
}

const PageProductOverview: React.FC<PageProductOverviewProps> = ({ path }) => {
  const { productId } = useAppParams();
  const [isRightSideVisible, setIsRightSideVisible] = useState<boolean>(false);
  const productsS = useAppServiceProvider()[ServiceName.products];

  const toggleRightSide = useCallback(() => {
    setIsRightSideVisible(p => !p);
  }, []);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const rt = ToastService.createToastLoader('Loading product');
    if (productId) {
      productsS
        .getProductFullInfo({
          data: { _id: productId },
          onLoading: setLoading,
          onError: e => {
            console.warn('PageProductOverview', e);
          },
        })
        .finally(rt);
    }
  }, [productId, productsS]);

  useEffect(() => {
    return () => {
      productsS.clearCurrent({});
    };

    // eslint-disable-next-line
  }, []);

  return (
    <AppGridPage path={path}>
      <PageCurrentProductProvider>
        <Page>
          <PageProductOverviewLeftSide toggleRightSideVisibility={toggleRightSide} />

          <PageProductOverviewRightSide isVisible={isRightSideVisible} toggleVisibility={toggleRightSide} />
        </Page>
      </PageCurrentProductProvider>

      <AppLoader isLoading={loading} />
    </AppGridPage>
  );
};
const Page = styled.div`
  display: grid;
  grid-template-columns: minmax(360px, 1fr) 2fr;

  ${takeFullGridArea};

  @media screen and (max-width: 768px) {
    grid-template-columns: minmax(280px, 1fr) 0;
  }
`;

export default PageProductOverview;
