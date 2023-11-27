import FlexBox from '../../../atoms/FlexBox';
import { useCallback, useMemo, useState } from 'react';
import styled from 'styled-components';
import AddOrderSlot from './AddOrderSlot';
import { OnlyUUID } from '../../../../redux/global.types';
import { IOrderSlot, IOrderSlotBase, IOrderTempSlot } from '../../../../types/orders/orders.types';
import OrderSlotOverview from '../../../Overviews/OrderSlotOverview';
import { nanoid } from '@reduxjs/toolkit';
import ButtonIcon from '../../../atoms/ButtonIcon/ButtonIcon';
import { t } from '../../../../lang';
import { Modals } from '../../../Modals';
import { useModalService } from '../../../ModalProvider/ModalProvider';
import { ToastService } from '../../../../services';

export interface FormCreateOrderProductsListProps {
  onSelect: (item: IOrderSlot) => void;
  onRemove: (item: OnlyUUID) => void;
  list?: IOrderSlot[];
}
const OrderSlotsList: React.FC<FormCreateOrderProductsListProps> = ({ onSelect, onRemove, list }) => {
  const [data, setData] = useState<IOrderTempSlot[]>(list || []);
  const modalS = useModalService();
  const handleSelect = useCallback((item: IOrderSlotBase) => {
    // onSelect && onSelect(item);
    setData(prev => [...prev, { ...item, tempId: nanoid(8) }]);
  }, []);

  const handleRemove = useCallback((id?: string) => {
    // onRemove && onRemove();
    setData(prev => prev.filter(el => el.tempId !== id));
  }, []);

  const renderSlots = useMemo(() => {
    return data?.map((p, idx) => (
      <OrderSlotOverview key={idx.toString()} index={idx} slot={p} onRemove={() => handleRemove(p?.tempId)} />
    ));
  }, [data, handleRemove]);

  return (
    <Container flex={1}>
      <FlexBox flex={1} overflow={'auto'}>
        <FlexBox>{renderSlots}</FlexBox>
      </FlexBox>

      <AddOrderSlot onSelect={handleSelect} />

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
          onClick={() => {
            const m = modalS.open({
              Modal: Modals.FormCreateOrderSlot,
              props: {
                onSubmit: d => {
                  handleSelect(d);

                  if (d && m?.onClose) {
                    m?.onClose();
                  }
                },
              },
            });
          }}
        >
          {t('Add position to order')}
        </ButtonIcon>
      </Buttons>
    </Container>
  );
};

const Container = styled(FlexBox)`
  position: relative;
  overflow: hidden;
`;

const Buttons = styled(FlexBox)`
  border-top: 1px solid ${p => p.theme.modalBorderColor};
  border-bottom: 1px solid ${p => p.theme.modalBorderColor};
`;
export default OrderSlotsList;
