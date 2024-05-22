import FlexBox from '../../../atoms/FlexBox';
import styled from 'styled-components';
import React, { useMemo, useState } from 'react';
import { useOverlayService } from '../../../../Providers/Overlay/OverlayStackProvider';
import { useOrdersSelector } from '../../../../redux/selectors.store';
import TabSelector from '../../../atoms/TabSelector';
import { getOrderOverviewCellsMap } from './orderOverviewCellsMap';
import { orderOverviewInfoTabs, OrderOverviewInfoTabsEnum } from '../OrderOverviewXL';
import { OverviewTextCell } from '../../components';

export interface OrderOverviewInfoTabProps {}
const cellsMap = getOrderOverviewCellsMap();

const OrderOverviewInfoTab: React.FC<OrderOverviewInfoTabProps> = _p => {
  const overlayS = useOverlayService();
  const currentOrder = useOrdersSelector().currentOrder;
  const [currentTab, setCurrentTab] = useState<OrderOverviewInfoTabsEnum>(OrderOverviewInfoTabsEnum.General);
  console.log('OrderOverviewInfoTab', cellsMap);
  const renderCells = useMemo(
    () =>
      cellsMap[currentTab].map(({ CellComponent, ...cell }) => {
        if (CellComponent) {
          return <CellComponent key={cell.title} overlayHandler={overlayS.open} cell={cell} data={currentOrder} />;
        }
        return <OverviewTextCell key={cell.title} overlayHandler={overlayS.open} cell={cell} data={currentOrder} />;
      }),
    [currentTab, overlayS.open, currentOrder]
  );

  return (
    <Box fillWidth flex={1} overflow={'auto'}>
      <TabSelector
        optionProps={{ fitContentH: true }}
        filterOptions={orderOverviewInfoTabs}
        onOptSelect={option => {
          setCurrentTab(option?.value);
        }}
      />

      {renderCells}
    </Box>
  );
};

const Box = styled(FlexBox)``;
export default OrderOverviewInfoTab;
