import styled from 'styled-components';
import FlexBox from '../../atoms/FlexBox';
import { MouseEventHandler, useCallback, useMemo, useState } from 'react';
import { usePageOverlayService } from '../../atoms/PageOverlayProvider';
import OrderOverviewXL from '../../Overviews/OrderOverviewXL';
import { useOrdersSelector } from '../../../redux/selectors.store';
import { useAppServiceProvider } from '../../../hooks/useAppServices.hook';

export interface PageOrderOverviewLeftSideProps {
  toggleRightSideVisibility?: () => void;
}
const PageOrderOverviewLeftSide: React.FC<PageOrderOverviewLeftSideProps> = ({ toggleRightSideVisibility }) => {
  const { currentOrder } = useOrdersSelector();
  const overlayService = usePageOverlayService();
  const setLoading = useState(false)[1];
  const { orders: ordersServ } = useAppServiceProvider();

  const onOverlayBackdropClick = useCallback(
    (id: string): MouseEventHandler<HTMLDivElement> =>
      ev => {
        if (ev.target === ev.currentTarget) {
          overlayService.removeStackItem(id);
        }
      },
    [overlayService]
  );

  const renderOverlayStack = useMemo(() => {
    const stack = overlayService.getOverlayStack();

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
              overlayService.removeStackItem(id);
            }}
            overlayId={id}
            index={index}
          />
        </OverlayBox>
      );
    });
  }, [onOverlayBackdropClick, overlayService]);

  return (
    <LeftSide>
      <OrderOverviewXL
        order={currentOrder}
        onEdit={
          currentOrder
            ? () => {
                // const formData = createProductFormData(currentOrder);
                //
                // console.log('PageOrderOverviewLeftSide', formData);
                //
                // const m = modalS.handleOpenModal({
                //   Modal: Modals.FormCreateProduct,
                //   props: {
                //     edit: true,
                //     _id: currentOrder?._id,
                //     defaultState: formData,
                //     onSubmit: (d, o) => {
                //       productsS
                //         .updateById({
                //           data: { ...d, refreshCurrent: true },
                //           onSuccess: () => {
                //             o?.closeAfterSave && m?.onClose();
                //             ToastService.success(`Updated product`);
                //           },
                //         })
                //         .finally();
                //     },
                //   },
                // });
              }
            : undefined
        }
        onRefresh={() => {
          currentOrder?._id &&
            ordersServ.getById({
              data: { _id: currentOrder?._id, options: { refreshCurrent: true } },
              onLoading: setLoading,
            });
        }}
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
  right: 0;
  z-index: 20;

  animation: 'OverlayFromRight';
`;

export default PageOrderOverviewLeftSide;
