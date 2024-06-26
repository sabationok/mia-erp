import styled from 'styled-components';
import FlexBox from '../../atoms/FlexBox';
import { useState } from 'react';
import { useOrdersSelector } from '../../../redux/selectors.store';
import { useAppServiceProvider } from '../../../hooks/useAppServices.hook';
import { OverlayStack } from '../../../Providers/Overlay/OverlayStack';
import OrderOverviewXL from 'components/Overviews/order/OrderOverviewXL';

export interface PageOrderOverviewLeftSideProps {
  toggleRightSideVisibility?: () => void;
}
const PageOrderOverviewLeftSide: React.FC<PageOrderOverviewLeftSideProps> = ({ toggleRightSideVisibility }) => {
  const { currentOrder } = useOrdersSelector();
  const setLoading = useState(false)[1];
  const { orders: ordersServ } = useAppServiceProvider();

  return (
    <LeftSide>
      <OrderOverviewXL
        order={currentOrder}
        onRefresh={() => {
          currentOrder?._id &&
            ordersServ.getById({
              data: { _id: currentOrder?._id, options: { refreshCurrent: true } },
              onLoading: setLoading,
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
export default PageOrderOverviewLeftSide;
