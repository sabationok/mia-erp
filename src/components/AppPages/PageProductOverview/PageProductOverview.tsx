import styled from 'styled-components';
import { takeFullGridArea } from '../pagesStyles';
import AppGridPage from '../AppGridPage';
import { useCallback, useEffect, useState } from 'react';
import { ServiceName, useAppServiceProvider } from '../../../hooks/useAppServices.hook';
import PageCurrentProductProvider from './PageCurrentProductProvider';
import PageProductOverviewRightSide from './PageProductOverviewRightSide';
import PageProductOverviewLeftSide from './PageProductOverviewLeftSide';
import { useAppParams } from '../../../hooks';
import { useProductsSelector } from '../../../redux/selectors.store';
import { ToastService } from '../../../services';
import { BaseAppPageProps } from '../index';

interface Props extends BaseAppPageProps {}

const loader = ToastService.createLoader('Loading product info');

const PageProductOverview: React.FC<Props> = ({ path }) => {
  const [isRightSideVisible, setIsRightSideVisible] = useState<boolean>(false);
  const productsS = useAppServiceProvider()[ServiceName.products];
  const { productId } = useAppParams();
  const [loading, setLoading] = useState(false);

  const { currentProduct } = useProductsSelector();

  const toggleRightSide = useCallback(() => {
    setIsRightSideVisible(p => !p);
  }, []);

  useEffect(() => {
    if (loading) return;
    if (productId && productId !== currentProduct?._id) {
      const close = loader.open().close;
      console.log('==========>>>>>>>>>>>>');
      console.log('PageProductOverview get full info');
      productsS
        .getProductFullInfo({
          data: { _id: productId },
          onLoading: setLoading,
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
