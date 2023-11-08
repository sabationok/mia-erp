import { FormOrderStepBaseProps } from '../formOrder.types';
import FlexBox from '../../../atoms/FlexBox';
import { useOrdersSelector } from 'redux/selectors.store';
import { useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { IOrderTempSlot } from 'redux/orders/orders.types';
import { IWarehouse } from '../../../../redux/warehouses/warehouses.types';
import OrderGroupItem from '../components/OrderGroupItem';
import ButtonIcon from '../../../atoms/ButtonIcon/ButtonIcon';
import { t } from '../../../../lang';

export interface OrderConfirmationStepProps extends FormOrderStepBaseProps {}

const OrderConfirmationStep: React.FC<OrderConfirmationStepProps> = ({ onChangeValidStatus, name }) => {
  const { slots, orders } = useOrdersSelector().ordersGroupFormData;

  // const modalS = useModalService();
  // const dispatch = useDispatch();

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

      return (
        <OrderGroupItem
          key={`pre-order_${v.warehouse?._id || i}`}
          slots={v.slots}
          title={v?.warehouse?.label}
          renderFooter={
            <Footer fillWidth fxDirection={'row'} alignItems={'center'} padding={'4px 8px'}>
              <ButtonIcon variant={'outlinedSmall'}>{t('Invoice')}</ButtonIcon>
            </Footer>
          }
        />
      );
    });
  }, [groupedData]);

  useEffect(() => {
    if (onChangeValidStatus) onChangeValidStatus(orders?.length === slots?.length);
  }, [onChangeValidStatus, orders?.length, slots?.length]);

  return (
    <FlexBox fillWidth overflow={'auto'}>
      <FlexBox fillWidth>{renderGroupedData}</FlexBox>
    </FlexBox>
  );
};

export const SummaryTable: React.FC<any> = p => {
  const renderOrders = useMemo(() => {
    return null;
  }, []);

  return (
    <Table flex={1} fillWidth>
      {renderOrders}
    </Table>
  );
};
const Table = styled(FlexBox)``;

const Footer = styled(FlexBox)<{ isOpen?: boolean }>`
  min-height: 32px;

  position: sticky;
  bottom: 0;
  left: 0;
  z-index: 40;

  color: inherit;
  border: 1px solid ${({ theme }) => theme.modalBorderColor};
  background-color: ${({ theme }) => theme.modalBackgroundColor};
`;
export default OrderConfirmationStep;
