import { useCallback, useMemo } from 'react';
import { IOrderTempSlot } from '../../../../redux/orders/orders.types';
import FlexBox from '../../../atoms/FlexBox';
import styled from 'styled-components';
import { IWarehouse } from '../../../../redux/warehouses/warehouses.types';
import { useOrdersSelector } from '../../../../redux/selectors.store';
import { useDispatch } from 'react-redux';
import {
  AddSlotToGroupAction,
  RemoveSlotFromGroupAction,
  UpdateSlotInGroupAction,
} from '../../../../redux/orders/orders.actions';
import { Text } from '../../../atoms/Text';
import ButtonIcon from '../../../atoms/ButtonIcon/ButtonIcon';
import { ToastService } from '../../../../services';
import { t } from '../../../../lang';
import { Modals } from '../../../Modals';
import { useModalService } from '../../../ModalProvider/ModalProvider';
import OrderGroupItem from '../components/OrderGroupItem';

export interface OrderGroupsStuffingStepProps {
  slots?: IOrderTempSlot[];
  onAddSlot?: (slot: IOrderTempSlot) => void;
  onRemoveSlot?: (id: string) => void;
  onFinish?: () => void;
}

const OrderGroupsStuffingStep: React.FC<OrderGroupsStuffingStepProps> = ({ onFinish }) => {
  const { slots } = useOrdersSelector().ordersGroupFormData;
  const modalS = useModalService();
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
        map[slot.warehouse._id] = {
          warehouse: slot.warehouse,
          slots: map[slot.warehouse._id]?.slots ? map[slot.warehouse._id]?.slots : [],
        };

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
          title={<Text $weight={500}>{v?.warehouse?.label}</Text>}
          onRemove={handelRemoveSlot}
          onUpdate={handelUpdateSlot}
        />
      );
    });
  }, [groupedData, handelRemoveSlot, handelUpdateSlot]);

  return (
    <Container flex={1} fillWidth overflow={'hidden'} style={{ position: 'relative' }}>
      <Content flex={1} overflow={'auto'}>
        <FlexBox flex={1} fillWidth>
          {renderGroupedData}
        </FlexBox>
      </Content>

      <Buttons fxDirection={'row'} gap={8} padding={'8px'}>
        <ButtonIcon
          variant={'defOutlinedSmall'}
          onClick={() => {
            const res = window.confirm('Remove all items?');
            if (res) {
              ToastService.info('All items will be remove');
            }
          }}
        >
          {t('Remove all')}
        </ButtonIcon>

        <ButtonIcon
          variant={'outlinedSmall'}
          flex={1}
          onClick={() => {
            const m = modalS.open({
              Modal: Modals.FormCreateOrderSlot,
              props: {
                onSubmit: d => {
                  handelAddSlot(d);

                  if (d && m?.onClose) {
                    m?.onClose();
                  }
                },
              },
            });
          }}
        >
          {t('Add position to group')}
        </ButtonIcon>
      </Buttons>
    </Container>
  );
};

const Container = styled(FlexBox)`
  color: ${p => p.theme.fontColorSidebar};
`;
const Content = styled(FlexBox)``;
const Buttons = styled(FlexBox)`
  border-top: 1px solid ${p => p.theme.modalBorderColor};
  border-bottom: 1px solid ${p => p.theme.modalBorderColor};
`;

export default OrderGroupsStuffingStep;
