import FlexBox from '../../atoms/FlexBox';
import styled from 'styled-components';
import React, { useMemo } from 'react';
import * as Cells from './Cells';
import { OverviewCellProps } from './Cells';
import { IOrder } from '../../../types/orders/orders.types';
import { usePageOverlayService } from '../../atoms/PageOverlayProvider';
import { useOrdersSelector } from '../../../redux/selectors.store';
import { t } from '../../../lang';

export interface OrderOverviewInfoTabProps {}

const OrderOverviewInfoTab: React.FC<OrderOverviewInfoTabProps> = _p => {
  const overlayS = usePageOverlayService();
  const currentOrder = useOrdersSelector().currentOrder;

  const renderCells = useMemo(
    () =>
      orderOverviewCells.map(({ CellComponent, ...cell }) => {
        if (CellComponent) {
          return (
            <CellComponent
              key={cell.title}
              setOverlayContent={overlayS.createOverlayComponent}
              cell={cell}
              data={currentOrder}
            />
          );
        }
        return (
          <Cells.OverviewTextCell
            key={cell.title}
            setOverlayContent={overlayS.createOverlayComponent}
            cell={cell}
            data={currentOrder}
          />
        );
      }),
    [overlayS.createOverlayComponent, currentOrder]
  );
  return (
    <Box fillWidth flex={1} overflow={'auto'}>
      {renderCells}
    </Box>
  );
};

const Box = styled(FlexBox)``;
export default OrderOverviewInfoTab;

const orderOverviewCells: OverviewCellProps<IOrder>[] = [
  { title: t('Manager') },
  { title: t('Group') },
  { title: t('Status') },
  { title: t('Client') },
  { title: t('Receiver') },
  { title: t('Delivery') },
  { title: t('Payment') },
  { title: t('Additional') },
  // { title: t('Code _') },
  // { title: t('Code __') },
];
