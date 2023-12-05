import FlexBox from '../../atoms/FlexBox';
import styled from 'styled-components';
import React, { useMemo, useState } from 'react';
import { IOrder } from '../../../types/orders/orders.types';
import { usePageOverlayService } from '../../atoms/PageOverlayProvider';
import { useOrdersSelector } from '../../../redux/selectors.store';
import { t } from '../../../lang';
import { OverviewCellProps } from '../components/overview-types';
import ModalFilter from '../../ModalForm/ModalFilter';
import { enumToTabs } from '../../../utils';
import { OverviewCells } from '../components/Cells';

export interface OrderOverviewInfoTabProps {}

enum OrderOverviewInfoTabsEnum {
  General = 'General',
  Invoicing = 'Invoicing',
  Delivery = 'Delivery',
  Additional = 'Additional',
}
const tabs = enumToTabs(OrderOverviewInfoTabsEnum);

const OrderOverviewInfoTab: React.FC<OrderOverviewInfoTabProps> = _p => {
  const overlayS = usePageOverlayService();
  const currentOrder = useOrdersSelector().currentOrder;
  const [currentTab, setCurrentTab] = useState<OrderOverviewInfoTabsEnum>(OrderOverviewInfoTabsEnum.General);

  const renderCells = useMemo(
    () =>
      orderOverviewCells
        .filter(cell => cell.tab === currentTab)
        .map(({ CellComponent, ...cell }) => {
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
            <OverviewCells.Text
              key={cell.title}
              setOverlayContent={overlayS.createOverlayComponent}
              cell={cell}
              data={currentOrder}
            />
          );
        }),
    [currentTab, overlayS.createOverlayComponent, currentOrder]
  );
  return (
    <Box fillWidth flex={1} overflow={'auto'}>
      <ModalFilter
        optionProps={{ fitContentH: true }}
        filterOptions={tabs}
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

const orderOverviewCells: OverviewCellProps<IOrder>[] = [
  {
    title: t('Manager'),
    CellComponent: OverviewCells.Text,
    getValue: data => data?.manager?.user?.email,
    tab: OrderOverviewInfoTabsEnum.General,
  },
  { title: t('Group'), tab: OrderOverviewInfoTabsEnum.General },
  { title: t('Status'), tab: OrderOverviewInfoTabsEnum.General },
  { title: t('Client'), tab: OrderOverviewInfoTabsEnum.General },
  { title: t('Receiver'), tab: OrderOverviewInfoTabsEnum.General },
  { title: t('Invoicing'), tab: OrderOverviewInfoTabsEnum.Invoicing },
  { title: t('Delivery'), tab: OrderOverviewInfoTabsEnum.Delivery },
  { title: t('Additional'), tab: OrderOverviewInfoTabsEnum.Additional },
  // { title: t('Code _') },
  // { title: t('Code __') },
];
