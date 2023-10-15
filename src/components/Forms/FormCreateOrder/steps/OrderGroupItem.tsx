import { IOrderTempSlot } from '../../../../redux/orders/orders.types';
import { useMemo } from 'react';
import OrderSlotOverview from '../../../Overviews/OrderSlotOverview';
import FormAccordeonItem from '../../components/FormAccordeonItem';

const OrderGroupItem = ({
  renderHeader,
  slots,
  onRemove,
  onUpdate,
}: {
  slots: IOrderTempSlot[];
  renderHeader?: React.ReactNode;
  onRemove?: (id: string) => void;
  onUpdate?: (slot: IOrderTempSlot) => void;
}) => {
  const renderSlots = useMemo(() => {
    return slots.map(slot => (
      <OrderSlotOverview
        key={`slot_${slot?.tempId}`}
        slot={slot}
        onRemovePress={() => slot?.tempId && onRemove && onRemove(slot?.tempId)}
        onUpdate={onUpdate}
      />
    ));
  }, [onRemove, onUpdate, slots]);

  return (
    <FormAccordeonItem open renderHeader={renderHeader} contentContainerStyle={{ padding: '4px 0' }}>
      {renderSlots}
    </FormAccordeonItem>
  );
};
export default OrderGroupItem;
