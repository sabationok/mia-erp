import { useCallback, useEffect, useMemo } from 'react';
import { IOrderTempSlot } from 'types/orders/orders.types';
import FlexBox from '../../../atoms/FlexBox';
import styled from 'styled-components';
import { WarehouseEntity } from '../../../../types/warehousing/warehouses.types';
import { useOrdersSelector } from '../../../../redux/selectors.store';
import ButtonIcon from '../../../atoms/ButtonIcon';
import { ToastService } from 'services';
import { t } from 'i18e';
import { Modals } from '../../../Modals/Modals';
import { useModalService } from '../../../../Providers/ModalProvider/ModalProvider';
import OrderGroupItem from '../components/OrderGroupItem';
import { getIdRef } from 'utils/data-transform';
import { FormOrderStepBaseProps } from '../formOrder.types';
import { useMediaQuery } from 'react-responsive';
import { useAppServiceProvider } from '../../../../hooks/useAppServices.hook';
import { AppModuleName } from '../../../../redux/reduxTypes.types';

export interface OrderGroupsStuffingStepProps extends FormOrderStepBaseProps {
  slots?: IOrderTempSlot[];
  onAddSlot?: (slot: IOrderTempSlot) => void;
  onRemoveSlot?: (id: string) => void;
}

const OrderGroupsStuffingStep: React.FC<OrderGroupsStuffingStepProps> = ({ onChangeValidStatus }) => {
  const modalS = useModalService();
  const service = useAppServiceProvider()[AppModuleName.orders];
  const { slots } = useOrdersSelector().ordersGroupFormData;
  const isMobile = useMediaQuery({ maxWidth: 480 });

  const handelAddSlot = useCallback(
    (slot: IOrderTempSlot) => {
      service.addTempSlot(slot);
    },
    [service]
  );
  const handelRemoveSlot = useCallback(
    (id: string) => {
      service.removeTempSlot(id);
    },
    [service]
  );
  const handelUpdateSlot = useCallback(
    (slot: IOrderTempSlot) => {
      service.updateTempSlot(slot);
    },
    [service]
  );

  const groupedData = useMemo(() => {
    let map: Record<string, { slots: (IOrderTempSlot & { tempId?: string })[]; warehouse?: WarehouseEntity }> = {};

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

  useEffect(() => {
    onChangeValidStatus && onChangeValidStatus(!!slots?.length && slots?.length > 0);
  }, [onChangeValidStatus, slots?.length]);

  const renderGroupedData = useMemo(() => {
    return Object.keys(groupedData).map((k, i) => {
      const v = groupedData[k];
      return (
        <OrderGroupItem
          key={`pre-order_${v.warehouse?._id || i}`}
          slots={v.slots}
          title={v?.warehouse?.label}
          onRemove={handelRemoveSlot}
          onUpdate={handelUpdateSlot}
          onAddSlotPress={() => {
            const m = modalS.open({
              Modal: Modals.FormCreateOrderSlot,
              props: {
                params: v?.warehouse ? { warehouse: getIdRef(v?.warehouse) } : undefined,
                onSubmit: d => {
                  handelAddSlot(d);

                  if (d && m?.onClose) {
                    m?.onClose();
                  }
                },
              },
            });
          }}
        />
      );
    });
  }, [groupedData, handelAddSlot, handelRemoveSlot, handelUpdateSlot, modalS]);

  return (
    <Container flex={1} fillWidth overflow={'hidden'} style={{ position: 'relative' }}>
      <Content flex={1} overflow={'auto'}>
        <FlexBox flex={1} fillWidth>
          {renderGroupedData}
        </FlexBox>
      </Content>

      <Buttons fxDirection={'row'} gap={8} padding={'8px'}>
        <ButtonIcon
          variant={'defaultSmall'}
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
          {t(isMobile ? 'Add' : 'Add position to group')}
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
