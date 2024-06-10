import { usePageCurrentOffer } from './PageOfferProvider';
import { useModalProvider } from '../../../Providers/ModalProvider/ModalProvider';
import { useAppServiceProvider } from '../../../hooks/useAppServices.hook';
import styled from 'styled-components';
import FlexBox from '../../atoms/FlexBox';
import React from 'react';
import { useOfferOverviewLoaders } from './PageOfferOverview';
import { OverlayStack } from '../../../Providers/Overlay/OverlayStack';
import OfferOverviewXL from 'components/Overviews/offer/OfferOverviewXL';
import { Modals } from '../../Modals/Modals';
import { t } from '../../../lang';

export interface OfferOverviewPageLeftSideProps {
  toggleRightSideVisibility?: () => void;
}

const OfferOverviewPageLeftSide: React.FC<OfferOverviewPageLeftSideProps> = ({ toggleRightSideVisibility }) => {
  const page = usePageCurrentOffer();
  const loaders = useOfferOverviewLoaders();

  const modalS = useModalProvider();

  const { offers: offersSrv } = useAppServiceProvider();

  return (
    <LeftSide>
      <OfferOverviewXL
        product={page?.currentOffer}
        onEdit={() => {
          if (!page.currentOffer) {
            return;
          }

          modalS.openModal({
            Modal: Modals.EditOffer,
            props: {
              offer: page?.currentOffer,
              title: t('Edit offer'),
            },
          });
        }}
        onRefresh={() => {
          if (!page.currentOffer?._id) return;

          offersSrv.getOne({
            data: { params: { _id: page.currentOffer?._id, getPrices: false, getVariations: false } },
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
