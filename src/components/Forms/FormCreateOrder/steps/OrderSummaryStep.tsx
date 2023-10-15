import { FormOrderStepBaseProps } from '../FormOrder.types';
import FlexBox from '../../../atoms/FlexBox';
import { useOrdersSelector } from 'redux/selectors.store';
import { useMemo } from 'react';
import styled from 'styled-components';
import { IOrder } from 'redux/orders/orders.types';
import { IShipmentDirItem } from '../../../Directories/dir.types';

export interface OrdersGroupSummaryStepProps extends FormOrderStepBaseProps {}

const OrdersGroupSummaryStep: React.FC<OrdersGroupSummaryStepProps> = ({ onFinish, name }) => {
  const ordersGroup = useOrdersSelector().ordersGroupFormData;

  return <SummaryTable orders={[]} shipments={[]} />;
};

const SummaryTable = ({ orders }: { orders: IOrder[]; shipments?: IShipmentDirItem[] }) => {
  const renderRows = useMemo(() => {
    return null;
  }, []);

  return (
    <FlexBox flex={1} fillWidth>
      {renderRows}
    </FlexBox>
  );
};
const Table = styled(FlexBox)``;
export default OrdersGroupSummaryStep;
