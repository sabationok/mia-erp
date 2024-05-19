import { usePageCurrentProduct } from './PageCurrentProductProvider';
import ProductOverviewXL from '../../Overviews/ProductOverviewXL';
import { useModalProvider } from '../../ModalProvider/ModalProvider';
import { useAppServiceProvider } from '../../../hooks/useAppServices.hook';
import styled from 'styled-components';
import FlexBox from '../../atoms/FlexBox';
import React, { MouseEventHandler, useCallback, useMemo } from 'react';
import { Modals } from '../../Modals';
import { ToastService } from '../../../services';
import { toOfferFormData } from '../../../utils/data-transform';
import { useOfferOverviewLoaders } from './PageProductOverview';
import { t } from '../../../lang';

export interface PageProductOverviewLeftSideProps {
  toggleRightSideVisibility?: () => void;
}
const PageProductOverviewLeftSide: React.FC<PageProductOverviewLeftSideProps> = ({ toggleRightSideVisibility }) => {
  const page = usePageCurrentProduct();
  const loaders = useOfferOverviewLoaders();

  const modalS = useModalProvider();

  const { products: productsS } = useAppServiceProvider();

  const onOverlayBackdropClick = useCallback(
    (id: string): MouseEventHandler<HTMLDivElement> =>
      ev => {
        if (ev.target === ev.currentTarget) {
          page.removeStackItem(id);
        }
      },
    [page]
  );

  const renderOverlayStack = useMemo(() => {
    const stack = page.getOverlayStack();

    return stack.map(({ RenderComponent, props, id }, index) => {
      return (
        <OverlayBox
          key={`overlay-${id}`}
          className={`overlay-${id}`}
          style={{ zIndex: 20 + index }}
          fillHeight
          fillWidth
          alignItems={'flex-end'}
          onClick={onOverlayBackdropClick(id)}
        >
          <RenderComponent
            key={`overlay-${id}`}
            {...props}
            onClose={() => {
              page.removeStackItem(id);
            }}
            overlayId={id}
            index={index}
          />
        </OverlayBox>
      );
    });
  }, [onOverlayBackdropClick, page]);

  return (
    <>
      <LeftSide>
        <ProductOverviewXL
          product={page?.currentOffer}
          onEdit={() => {
            if (!page.currentOffer) {
              return;
            }
            const formData = toOfferFormData(page?.currentOffer);

            console.log('PageProductOverviewLeftSide', formData);

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

        <Backdrop fillWidth fillHeight isActive={renderOverlayStack.length > 0} overflow={'hidden'}>
          {renderOverlayStack}
        </Backdrop>
      </LeftSide>
    </>
  );
};

const LeftSide = styled(FlexBox)`
  position: relative;

  overflow: hidden;

  border-right: 1px solid ${p => p.theme.modalBorderColor};
`;
const Backdrop = styled(FlexBox)`
  position: absolute;

  top: 0;
  left: ${p => (p.isActive ? 0 : '100%')};
  z-index: 20;

  background-color: ${p => p.theme.backdropColor};

  transition: all ${p => p.theme.globals.timingFunctionMain};
`;

const OverlayBox = styled(FlexBox)`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 20;

  animation: 'OverlayFromRight';
`;

export default PageProductOverviewLeftSide;
