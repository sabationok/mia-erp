import FlexBox from '../atoms/FlexBox';
import { IOrderSlot } from '../../redux/orders/orders.types';
import styled from 'styled-components';
import { useMemo } from 'react';
import { t } from '../../lang';

export interface OrderSlotProps {
  slot?: IOrderSlot;
  index: number;
}

const OrderSlot: React.FC<OrderSlotProps> = ({ index = 0, slot }) => {
  const renderCells = useMemo(() => {
    return slotCells.map(cell => {
      return (
        <FlexBox className={cell?.gridArea} style={{ gridArea: cell?.gridArea }}>
          {cell?.label}
        </FlexBox>
      );
    });
  }, []);

  return <Container>{renderCells}</Container>;
};

const Container = styled(FlexBox)``;

export default OrderSlot;

interface RenderOrderSlotCell {
  label?: string;
  gridArea?: keyof IOrderSlot | string;
  getData: (slot: IOrderSlot) => React.ReactNode;
}

const slotCells: RenderOrderSlotCell[] = [{ label: t(''), gridArea: '', getData: () => '' }];
