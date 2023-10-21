import { FormOrderStepBaseProps } from '../FormOrder.types';
import FlexBox from '../../../atoms/FlexBox';
import { useOrdersSelector } from 'redux/selectors.store';
import { useMemo } from 'react';
import styled from 'styled-components';
import { IOrder } from 'redux/orders/orders.types';

export interface OrderConfirmationStepProps extends FormOrderStepBaseProps {}

const OrderConfirmationStep: React.FC<OrderConfirmationStepProps> = ({ onFinish, name }) => {
  const ordersGroup = useOrdersSelector().ordersGroupFormData;

  return <SummaryTable orders={[]} />;
};

const SummaryTable = ({ orders }: { orders: IOrder[] }) => {
  const renderOrders = useMemo(() => {
    return null;
  }, []);

  return (
    <FlexBox flex={1} fillWidth>
      {renderOrders}
    </FlexBox>
  );
};
const Table = styled(FlexBox)``;
export default OrderConfirmationStep;
