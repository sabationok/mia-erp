import { useCallback, useMemo } from 'react';
import { IOrderTempSlot } from '../../../../redux/orders/orders.types';
import FlexBox from '../../../atoms/FlexBox';
import styled from 'styled-components';
import FormAccordeonItem from '../../components/FormAccordeonItem';
import { IWarehouse } from '../../../../redux/warehouses/warehouses.types';
import OrderSlotOverview from '../../../Overviews/OrderSlotOverview';
import { useOrdersSelector } from '../../../../redux/selectors.store';
import { useDispatch } from 'react-redux';
import {
  AddSlotToGroupAction,
  RemoveSlotFromGroupAction,
  UpdateSlotInGroupAction,
} from '../../../../redux/orders/orders.sctions';
import { Text } from '../../../atoms/Text';
import AddOrderSlot from '../components/AddOrderSlot';

export interface OrderGroupsStuffingStepProps {
  slots?: IOrderTempSlot[];
  onAddSlot?: (slot: IOrderTempSlot) => void;
  onRemoveSlot?: (id: string) => void;
}

const OrderGroupsStuffingStep: React.FC<OrderGroupsStuffingStepProps> = _p => {
  const { slots } = useOrdersSelector().currentGroup;

  const dispatch = useDispatch();

  const handelAddSlot = useCallback(
    (slot: IOrderTempSlot) => {
      dispatch(AddSlotToGroupAction(slot));
    },
    [dispatch]
  );
  const handelRemoveSlot = useCallback(
    (id: string) => {
      dispatch(RemoveSlotFromGroupAction(id));
    },
    [dispatch]
  );
  const handelUpdateSlot = useCallback(
    (slot: IOrderTempSlot) => {
      dispatch(UpdateSlotInGroupAction(slot));
    },
    [dispatch]
  );

  const groupedData = useMemo(() => {
    const map: Record<string, { slots: (IOrderTempSlot & { tempId?: string })[]; warehouse?: IWarehouse }> = {};

    slots?.map(slot => {
      if (slot.warehouse?._id) {
        map[slot.warehouse._id] = { warehouse: slot?.warehouse, slots: [] };

        map[slot.warehouse?._id]?.slots.push(slot);
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
          renderHeader={<Text $weight={500}>{v?.warehouse?.label}</Text>}
          onRemove={handelRemoveSlot}
          onUpdate={handelUpdateSlot}
        />
      );
    });
  }, [groupedData, handelRemoveSlot, handelUpdateSlot]);

  return (
    <Container flex={1} fillWidth>
      <Content padding={'8px 4px'} flex={1} overflow={'auto'}>
        {renderGroupedData}
      </Content>

      <AddOrderSlot onSelect={handelAddSlot} />
    </Container>
  );
};

const Container = styled(FlexBox)``;
const Content = styled(FlexBox)``;
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
export default OrderGroupsStuffingStep;
