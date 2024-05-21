import FlexBox from '../../atoms/FlexBox';
import styled from 'styled-components';
import React, { useMemo, useState } from 'react';
import { useOverlayService } from '../../../Providers/Overlay/OverlayStackProvider';
import { useOrdersSelector } from '../../../redux/selectors.store';
import TabSelector from '../../atoms/TabSelector';
import { OverviewCells } from '../components';
import { orderOverviewCellsMap, orderOverviewInfoTabs, OrderOverviewInfoTabsEnum } from '../orderOverviewCellsMap';

export interface OrderOverviewInfoTabProps {}

const OrderOverviewInfoTab: React.FC<OrderOverviewInfoTabProps> = _p => {
  const overlayS = useOverlayService();
  const currentOrder = useOrdersSelector().currentOrder;
  const [currentTab, setCurrentTab] = useState<OrderOverviewInfoTabsEnum>(OrderOverviewInfoTabsEnum.General);

  const renderCells = useMemo(
    () =>
      orderOverviewCellsMap[currentTab].map(({ CellComponent, ...cell }) => {
        if (CellComponent) {
          return <CellComponent key={cell.title} overlayHandler={overlayS.open} cell={cell} data={currentOrder} />;
        }
        return <OverviewCells.Text key={cell.title} overlayHandler={overlayS.open} cell={cell} data={currentOrder} />;
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
