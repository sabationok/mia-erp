import { OverviewCellProps } from './components/overview-types';
import { OrderEntity } from '../../types/orders/orders.types';
import { t } from '../../lang';
import { OverviewCells } from './components';

import { _enumToTabs } from '../../utils';

export enum OrderOverviewInfoTabsEnum {
  General = 'General',
  Customer = 'Customer',
  Invoicing = 'Invoicing',
  Delivery = 'Delivery',
  Additional = 'Additional',
}

export const orderOverviewInfoTabs = _enumToTabs(OrderOverviewInfoTabsEnum);

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
    CellComponent: OverviewCells.OrderTotals,
    tab: OrderOverviewInfoTabsEnum.General,
  },

  {
    title: t('Status'),
    getValue: data => data?.status,
    tab: OrderOverviewInfoTabsEnum.General,
  },
  {
    CellComponent: OverviewCells.OrderCustomerInfo,
    tab: OrderOverviewInfoTabsEnum.Customer,
  },
  {
    title: t('Invoicing'),
    CellComponent: OverviewCells.OrderInvoicing,
    tab: OrderOverviewInfoTabsEnum.Invoicing,
  },
  { title: t('Delivery'), CellComponent: OverviewCells.OrderDelivery, tab: OrderOverviewInfoTabsEnum.Delivery },
  {
    title: t('Receiver'),
    CellComponent: OverviewCells.OrderCustomerInfo,
    tab: OrderOverviewInfoTabsEnum.Delivery,
  },
  { title: t('Additional'), tab: OrderOverviewInfoTabsEnum.Additional },
];

export const orderOverviewCellsMap: Record<
  OrderOverviewInfoTabsEnum | string,
  OverviewCellProps<OrderEntity, OrderOverviewInfoTabsEnum>[]
> = {};
orderOverviewCells.forEach(item => {
  const tab = item.tab;
  if (tab) {
    if (orderOverviewCellsMap[tab]) {
      orderOverviewCellsMap[tab].push(item);
    } else {
      orderOverviewCellsMap[tab] = [item];
    }
  }
});
