import { FormOrderStepBaseProps } from '../formOrder.types';
import FlexBox from '../../../atoms/FlexBox';
import { useOrdersSelector } from 'redux/selectors.store';
import { useMemo } from 'react';
import styled from 'styled-components';
import { IOrderTempSlot } from 'redux/orders/orders.types';
import { useModalService } from '../../../ModalProvider/ModalProvider';
import { useDispatch } from 'react-redux';
import { IWarehouse } from '../../../../redux/warehouses/warehouses.types';
import OrderGroupItem from '../components/OrderGroupItem';

export interface OrderConfirmationStepProps extends FormOrderStepBaseProps {}

const OrderConfirmationStep: React.FC<OrderConfirmationStepProps> = ({ onFinish, name }) => {
  const { slots } = useOrdersSelector().ordersGroupFormData;

  const modalS = useModalService();
  const dispatch = useDispatch();

  const groupedData = useMemo(() => {
    let map: Record<string, { slots: (IOrderTempSlot & { tempId?: string })[]; warehouse?: IWarehouse }> = {};

    slots?.map(slot => {
      if (slot.warehouse?._id) {
        map[slot.warehouse._id] = {
          warehouse: slot.warehouse,
          slots: map[slot.warehouse._id]?.slots ? [...map[slot.warehouse._id]?.slots, slot] : [slot],
        };
      }

      return '';
    });

    return map;
  }, [slots]);

  const renderGroupedData = useMemo(() => {
    return Object.keys(groupedData).map((k, i) => {
      const v = groupedData[k];

      return <OrderGroupItem key={`pre-order_${v.warehouse?._id || i}`} slots={v.slots} title={v?.warehouse?.label} />;
    });
  }, [groupedData]);

  return <>{renderGroupedData}</>;
};

const SummaryTable = ({}: {}) => {
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
