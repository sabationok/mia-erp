import { usePageCurrentProduct } from './PageOfferProvider';
import ProductOverviewXL from '../../Overviews/ProductOverviewXL';
import { useModalProvider } from '../../ModalProvider/ModalProvider';
import { useAppServiceProvider } from '../../../hooks/useAppServices.hook';
import styled from 'styled-components';
import FlexBox from '../../atoms/FlexBox';
import React from 'react';
import { Modals } from '../../Modals/Modals';
import { useOfferOverviewLoaders } from './PageOfferOverview';
import { t } from '../../../lang';
import { OverlayStack } from '../../../Providers/Overlay/OverlayStack';

export interface OfferOverviewPageLeftSideProps {
  toggleRightSideVisibility?: () => void;
}

const OfferOverviewPageLeftSide: React.FC<OfferOverviewPageLeftSideProps> = ({ toggleRightSideVisibility }) => {
  const page = usePageCurrentProduct();
  const loaders = useOfferOverviewLoaders();

  const modalS = useModalProvider();

  const { products: productsS } = useAppServiceProvider();

  return (
    <LeftSide>
      <ProductOverviewXL
        product={page?.currentOffer}
        onEdit={() => {
          if (!page.currentOffer) {
            return;
          }

          modalS.openModal({
            Modal: Modals.EditOffer,
            props: {
              _id: page?.currentOffer?._id,
              title: t('Edit offer'),
            },
          });
        }}
        onRefresh={() => {
          if (!page.currentOffer?._id) return;

          productsS.getProductFullInfo({
            data: { _id: page.currentOffer?._id },
            onLoading: loaders.onLoading('offer'),
          });
        }}
        onOpenRightSide={toggleRightSideVisibility}
      />

      <OverlayStack />
    </LeftSide>
  );
};

const LeftSide = styled(FlexBox)`
  position: relative;

  overflow: hidden;

  border-right: 1px solid ${p => p.theme.modalBorderColor};
`;

export default OfferOverviewPageLeftSide;
