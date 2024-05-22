import FlexBox from '../../../atoms/FlexBox';
import styled from 'styled-components';
import React, { useMemo, useState } from 'react';
import { useOverlayService } from '../../../../Providers/Overlay/OverlayStackProvider';
import { useOrdersSelector } from '../../../../redux/selectors.store';
import TabSelector from '../../../atoms/TabSelector';
import { OverviewTextCell } from 'components/Overviews/components/OverviewTextCell';
import { OverviewCellProps } from '../../components/overview-types';
import { OrderEntity } from '../../../../types/orders/orders.types';
import { t } from '../../../../lang';
import { _enumToTabs } from '../../../../utils';
import { OrderOverviewTotals } from '../compnents/OrderOverviewTotals';
import { PartialRecord } from '../../../../types/utils.types';
import { OrderOverviewCustomerInfo } from '../compnents/OrderOverviewCustomerInfo';
import { OrderOverviewInvoicing } from '../compnents/OrderOverviewInvoicing';
import { OrderOverviewDelivery } from '../compnents/OrderOverviewDelivery';

export interface OrderOverviewInfoTabProps {}

enum OrderOverviewInfoTabsEnum {
  General = 'General',
  Customer = 'Customer',
  Invoicing = 'Invoicing',
  Delivery = 'Delivery',
  Additional = 'Additional',
}

const orderOverviewInfoTabs = _enumToTabs(OrderOverviewInfoTabsEnum);

const OrderOverviewInfoTab: React.FC<OrderOverviewInfoTabProps> = _p => {
  const overlayS = useOverlayService();
  const currentOrder = useOrdersSelector().currentOrder;
  const [currentTab, setCurrentTab] = useState<OrderOverviewInfoTabsEnum>(OrderOverviewInfoTabsEnum.General);
  const cellsMap = getOrderOverviewCellsMap();

  const renderCells = useMemo(
    () =>
      !cellsMap[currentTab]
        ? null
        : cellsMap[currentTab]?.map(({ CellComponent, ...cell }) => {
            if (CellComponent) {
              return <CellComponent key={cell.title} overlayHandler={overlayS.open} cell={cell} data={currentOrder} />;
            }
            return <OverviewTextCell key={cell.title} overlayHandler={overlayS.open} cell={cell} data={currentOrder} />;
          }),
    [cellsMap, currentTab, overlayS.open, currentOrder]
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

const orderOverviewCells: OverviewCellProps<OrderEntity>[] = [
  {
    title: t('Manager'),
    getValue: data => data?.manager?.user?.email,
    tab: OrderOverviewInfoTabsEnum.General,
  },
  {
    title: t('Reference'),
    getValue: data => data?.reference?.internal,
    tab: OrderOverviewInfoTabsEnum.General,
  },

  {
    title: t('Group reference'),
    getValue: data => data?.group?.reference?.internal,
    tab: OrderOverviewInfoTabsEnum.General,
  },
  {
    title: t('Group strategy'),
    getValue: data => data?.group?.strategy,
    tab: OrderOverviewInfoTabsEnum.General,
  },

  {
    title: t('Totals'),
    CellComponent: OrderOverviewTotals,
    tab: OrderOverviewInfoTabsEnum.General,
  },

  {
    title: t('Status'),
    getValue: data => data?.status,
    tab: OrderOverviewInfoTabsEnum.General,
  },
  {
    CellComponent: OrderOverviewCustomerInfo,
    tab: OrderOverviewInfoTabsEnum.Customer,
  },
  {
    title: t('Receiver'),
    CellComponent: OrderOverviewCustomerInfo,
    tab: OrderOverviewInfoTabsEnum.Delivery,
  },
  {
    title: t('Invoicing'),
    CellComponent: OrderOverviewInvoicing,
    tab: OrderOverviewInfoTabsEnum.Invoicing,
  },
  { title: t('Delivery'), CellComponent: OrderOverviewDelivery, tab: OrderOverviewInfoTabsEnum.Delivery },
  { title: t('Additional'), tab: OrderOverviewInfoTabsEnum.Additional },
];

function getOrderOverviewCellsMap(): PartialRecord<
  OrderOverviewInfoTabsEnum | string,
  OverviewCellProps<OrderEntity, OrderOverviewInfoTabsEnum>[]
> {
  const orderOverviewCellsMap: PartialRecord<
    OrderOverviewInfoTabsEnum | string,
    OverviewCellProps<OrderEntity, OrderOverviewInfoTabsEnum>[]
  > = {};
  orderOverviewCells.forEach(item => {
    const tab = item.tab;

    if (tab) {
      if (orderOverviewCellsMap[tab]) {
        orderOverviewCellsMap[tab]?.push(item);
      } else {
        orderOverviewCellsMap[tab] = [item];
      }
    }
  });
  return orderOverviewCellsMap;
}
