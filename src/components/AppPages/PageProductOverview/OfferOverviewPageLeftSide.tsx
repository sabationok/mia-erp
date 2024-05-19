import { usePageCurrentProduct } from './PageOfferProvider';
import ProductOverviewXL from '../../Overviews/ProductOverviewXL';
import { useModalProvider } from '../../ModalProvider/ModalProvider';
import { useAppServiceProvider } from '../../../hooks/useAppServices.hook';
import styled from 'styled-components';
import FlexBox from '../../atoms/FlexBox';
import React from 'react';
import { Modals } from '../../Modals';
import { ToastService } from '../../../services';
import { toOfferFormData } from '../../../utils/data-transform';
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
          const formData = toOfferFormData(page?.currentOffer);

          const m = modalS.handleOpenModal({
            Modal: Modals.FormCreateOffer,
            props: {
              edit: true,
              _id: page?.currentOffer?._id,
              defaultState: formData,
              title: t('Edit offer'),
              onSubmit: (d, o) => {
                productsS
                  .updateById({
                    data: { ...d, refreshCurrent: true },
                    onSuccess: () => {
                      o?.closeAfterSave && m?.onClose();
                      ToastService.success(`Updated product`);
                    },
                    onLoading: loaders.onLoading('offer'),
                  })
                  .finally();
              },
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
