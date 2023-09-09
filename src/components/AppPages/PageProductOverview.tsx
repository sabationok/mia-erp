import { PagePathType } from '../../redux/APP_CONFIGS';
import styled from 'styled-components';
import { takeFullGridArea } from './pagesStyles';
import AppGridPage from './AppGridPage';
import { useCallback, useEffect, useState } from 'react';
import { useAppParams } from '../../hooks';
import { useAppServiceProvider } from '../../hooks/useAppServices.hook';
import { useAppSelector } from '../../redux/store.store';
import PageCurrentProductProvider from './PageCurrentProductProvider';
import { ToastService } from '../../services';
import PageProductOverviewRightSide from './PageProductOverview/PageProductOverviewRightSide';
import PageProductOverviewLeftSide from './PageProductOverview/PageProductOverviewLeftSide';

export interface PageProductOverviewProps {
  path: PagePathType;
}

const PageProductOverview: React.FC<PageProductOverviewProps> = ({ path }) => {
  const { productId } = useAppParams();
  const [isRightSideVisible, setIsRightSideVisible] = useState<boolean>(false);
  const { priceManagement: pricesS, products: productsS } = useAppServiceProvider();

  const {
    products: { currentProduct, properties },
  } = useAppSelector();

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

  return (
    <AppGridPage path={path}>
      <PageCurrentProductProvider>
        <Page>
          <PageProductOverviewLeftSide toggleRightSideVisibility={toggleRightSide} />

          <PageProductOverviewRightSide isVisible={isRightSideVisible} toggleVisibility={toggleRightSide} />
        </Page>
      </PageCurrentProductProvider>
    </AppGridPage>
  );
};
const Page = styled.div`
  display: grid;
  grid-template-columns: minmax(280px, 1fr) 2fr;

  ${takeFullGridArea};

  @media screen and (max-width: 768px) {
    grid-template-columns: minmax(280px, 1fr) 0;
  }
`;

export default PageProductOverview;
