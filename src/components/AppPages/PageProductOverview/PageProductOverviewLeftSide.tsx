import { usePageCurrentProduct } from '../PageCurrentProductProvider';
import ProductOverviewXL from '../../Overviews/ProductOverviewXL';
import { useModalProvider } from '../../ModalProvider/ModalProvider';
import { useAppServiceProvider } from '../../../hooks/useAppServices.hook';
import styled from 'styled-components';
import FlexBox from '../../atoms/FlexBox';
import React, { useMemo } from 'react';
import { Modals } from '../../ModalProvider/Modals';
import { toast } from 'react-toastify';

export interface PageProductOverviewRightSideProps {
  toggleRightSideVisibility?: () => void;
}
const PageProductOverviewRightSide: React.FC<PageProductOverviewRightSideProps> = ({ toggleRightSideVisibility }) => {
  const page = usePageCurrentProduct();
  const modalS = useModalProvider();
  const { products: productsS } = useAppServiceProvider();

  const renderOverlayStack = useMemo(() => {
    const stack = page.getOverlayStack();

    return stack.map(({ RenderComponent, props, id }, index) => {
      return (
        <OverlayBox key={`overlay-${id}`} style={{ zIndex: 20 + index }} fillHeight fillWidth>
          <RenderComponent
            key={`overlay-${id}`}
            {...props}
            onClose={() => {
              page.handleRemoveStackItem(id);
            }}
            overlayId={id}
            index={index}
          />
        </OverlayBox>
      );
    });
  }, [page]);

  return (
    <LeftSide>
      <ProductOverviewXL
        product={page?.currentProduct}
        onEdit={() => {
          const m = modalS.handleOpenModal({
            Modal: Modals.FormCreateProduct,
            props: {
              edit: true,
              defaultState: page?.currentProduct,
              onSubmit: (d, o) => {
                productsS.updateById({
                  data: d,
                  onSuccess: () => {
                    o?.closeAfterSave && m?.onClose();
                    toast.success(`Updated product`);
                  },
                });
              },
            },
          });
        }}
        onDelete={() => {}}
        onArchive={() => {}}
        onHide={() => {}}
        onOpenRightSide={toggleRightSideVisibility}
      />

      <Backdrop fillWidth fillHeight isActive={renderOverlayStack.length > 0} overflow={'hidden'}>
        {renderOverlayStack}
      </Backdrop>
    </LeftSide>
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
  left: 0;
  z-index: 20;

  animation: 'OverlayFromRight';
`;

export default PageProductOverviewRightSide;
