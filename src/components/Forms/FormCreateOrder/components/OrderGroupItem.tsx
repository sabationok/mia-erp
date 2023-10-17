import { IOrderTempSlot } from '../../../../redux/orders/orders.types';
import { useMemo } from 'react';
import OrderSlotOverview from '../../../Overviews/OrderSlotOverview';
import FormAccordionItem from '../../components/FormAccordionItem';
import styled from 'styled-components';

const OrderGroupItem = ({
  slots,
  onRemove,
  onUpdate,
  renderHeader,
  title,
}: {
  slots: IOrderTempSlot[];
  renderHeader?: React.ReactNode;
  title?: React.ReactNode;
  onRemove?: (id: string) => void;
  onUpdate?: (slot: IOrderTempSlot) => void;
}) => {
  const renderSlots = useMemo(() => {
    return slots.map(slot => (
      <OrderSlotOverview
        key={`slot_${slot?.tempId}`}
        slot={slot}
        editable
        onRemovePress={() => slot?.tempId && onRemove && onRemove(slot?.tempId)}
        onUpdate={onUpdate}
      />
    ));
  }, [onRemove, onUpdate, slots]);

  return (
    <StAccordionItem open renderHeader={renderHeader} title={title}>
      {renderSlots}
    </StAccordionItem>
  );
};

const StAccordionItem = styled(FormAccordionItem)`
  & .header {
  }
  & .content {
    padding: 0;
  }
`;
export default OrderGroupItem;
