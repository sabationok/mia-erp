import { CellTittleProps } from '../components/TableList/TebleCells/CellTitle';
import { OrderEntity, OrderStatusEnum } from '../types/orders/orders.types';
import { IOrderTempSlot, OrderSlotEntity } from '../types/orders/order-slot.types';
import { t } from '../lang';
import { TableSearchParam, TableSortParam } from '../components/TableList/tableTypes.types';
import { FilterOption } from '../components/atoms/TabSelector';
import { getStatusesByEnum } from './statuses.data';
import { getBasePriceColumns } from './priceManagement.data';
import { toPrice } from '../utils/numbers';
import { Values } from '../types/utils.types';

const createdDateColumn: CellTittleProps = {
  top: { name: t('updated'), align: 'center', path: 'updatedAt' },
  bottom: { name: t('created'), align: 'center', path: 'createdAt' },
  width: '150px',
  action: 'dateDbl',
};

export const orderStatusesData = getStatusesByEnum(OrderStatusEnum);
export const orderStatuses: FilterOption<OrderStatusEnum>[] = [
  { _id: '1', value: OrderStatusEnum.new, label: t(OrderStatusEnum.new), color: 'rgb(136,222,255)' },
  { _id: '2', value: OrderStatusEnum.inWork, label: t(OrderStatusEnum.inWork), color: 'rgb(239,173,255)' },
  {
    _id: '3.1',
    value: OrderStatusEnum.rejectedByCustomer,
    label: t(OrderStatusEnum.rejectedByCustomer),
    color: 'rgb(255,145,2)',
  },
  {
    _id: '3.2',
    value: OrderStatusEnum.rejectedByManager,
    label: t(OrderStatusEnum.rejectedByManager),
    color: 'rgb(255,205,105)',
  },
  { _id: '4.1', value: OrderStatusEnum.active, label: t(OrderStatusEnum.active), color: 'rgb(255,236,84)' },
  { _id: '4.2', value: OrderStatusEnum.fulfilled, label: t(OrderStatusEnum.fulfilled), color: 'rgb(151,255,95)' },
  {
    _id: '4.3',
    value: OrderStatusEnum.fulfilledWithRefund,
    label: t(OrderStatusEnum.fulfilledWithRefund),
    color: 'rgb(255,53,53)',
  },
  { _id: '5.1', value: OrderStatusEnum.archived, label: t(OrderStatusEnum.archived), color: 'rgb(164,171,182)' },
  { _id: '5.2', value: OrderStatusEnum.expired, label: t(OrderStatusEnum.expired), color: 'rgb(164,171,182)' },
];

// export type DataPath =
//   | 'owner.label'
//   | 'owner.name'
//   | 'author.name'
//   | 'author.email'
//   | 'editor.name'
//   | 'editor.email'
//   | 'auditor.name'
//   | 'auditor.email'
//   | 'contractor.name'
//   | 'contractor.type'
//   | 'eventDate'
//   | 'type'
//   | 'status'
//   | 'amount'
//   | 'currency'
//   | 'comment'
//   | 'createdAt'
//   | 'updatedAt'
//   | 'mark.label'
//   | 'invoice.label'
//   | 'invoice.code'
//   | 'invoice.number'
//   | 'payment.label'
//   | 'payment.code'
//   | 'payment.number'
//   | 'order.code'
//   | 'total'
//   | 'manager.name'
//   | 'manager.code'
//   | 'manager.email'
//   | 'customer.name'
//   | 'customer.phone'
//   | 'receiver.name'
//   | 'receiver.phone'
//   | 'invoices'
//   | 'payments'
//   | 'transporters';

export const ordersTableColumns: CellTittleProps<OrderEntity>[] = [
  {
    top: {
      name: `${t('Status')}`,
      getData: rd => rd.status,
    },
    bottom: { name: t('Priority'), getData: _rd => t('undefined') },

    // bottom: {
    //   name: `${t('Status')}/${t('External')}`,
    //   getData: rd => rd.status?.external,
    // },
    width: '150px',
    action: 'status',
  },

  {
    top: {
      name: t('Total amount'),
      align: 'end',
      getData: rd => toPrice(rd.summary?.netto ?? 0),
    },
    bottom: { name: t('Slots count'), align: 'end', getData: rd => rd.slots?.length || rd.summary?.slotsCount },
    width: '120px',
    action: 'numberWithSpaces',
  },
  {
    top: { name: t('Reference / Internal'), getData: rd => rd?.reference?.internal },
    bottom: { name: t('Reference / External'), getData: rd => rd?.reference?.external },
    width: '190px',
    action: 'valueByPath',
  },
  {
    top: { name: t('Group'), getData: rd => rd?.group?.reference?.internal },
    bottom: { name: t('Strategy'), getData: rd => rd?.group?.strategy },
    width: '180px',
    action: 'valueByPath',
  },
  {
    top: {
      name: t('Customer'),
      getData: rd =>
        (rd.customer?.name && rd.customer?.name?.first + ' ' + rd.customer?.name?.second) ||
        (rd.customer?.label && rd.customer?.label.base) ||
        '--- ---',
    },
    bottom: { name: t('Phone'), path: 'customer.phone' },
    width: '180px',
    action: 'valueByPath',
  },
  {
    top: {
      name: t('Receiver'),
      getData: rd =>
        (rd.receiver?.name && rd.receiver?.name?.first + ' ' + rd.receiver?.name?.second) ||
        (rd.receiver?.label && rd.receiver?.label.base) ||
        '--- ---',
    },
    bottom: { name: t('Phone'), path: 'receiver.phone' },
    width: '180px',
    action: 'valueByPath',
  },
  {
    top: {
      name: t('Invoices'),

      // getData: () => ['5651651323213', '6546565165651', '546565165651', '565165132321', '54656516565'],
    },
    width: '200px',
    action: 'tags',
  },
  {
    top: { name: t('Payments') },
    width: '200px',
    action: 'valueByPath',
  },
  {
    top: { name: t('Deliveries') },
    width: '200px',
    action: 'valueByPath',
  },
  {
    top: { name: t('comment'), path: 'comment' },
    width: '170px',
    action: 'valueByPath',
  },
  {
    top: { name: t('Refunds') },
    width: '200px',
    action: 'valueByPath',
  },

  {
    top: { name: t('Manager'), path: 'manager.name' },
    bottom: { name: t('email'), path: 'manager.email' },
    width: '180px',
    action: 'valueByPath',
  },
  createdDateColumn,
];

const extraKeys: ('cashback' | 'bonus' | 'discount')[] = ['cashback', 'bonus', 'discount'];
function getTempOrderSlotColumns(): CellTittleProps<OrderSlotEntity>[] {
  return extraKeys.map(key => {
    return {
      top: { name: t(key), align: 'end', getData: rd => toPrice(rd?.[key]?.amount) },
      bottom: { name: t(key), align: 'end', getData: rd => toPrice(rd?.[key]?.percentage) },
      action: 'valueByPath',
      width: '90px',
    };
  });
}

export const orderSlotsTableColumns: CellTittleProps<OrderSlotEntity>[] = [
  {
    top: { name: t('Offer label'), getData: rd => rd.offer?.label },
    bottom: { name: t('Variation label'), getData: rd => rd.variation?.label },
    action: 'valueByPath',
    width: '210px',
  },
  {
    top: { name: t('Total amount'), getData: rd => rd.netto },
    bottom: { name: t('Total q-ty'), getData: rd => rd.quantity },
    action: 'valueByPath',
    width: '125px',
  },
  ...getBasePriceColumns(),
  ...getTempOrderSlotColumns(),
  {
    top: { name: t('Offer sku'), getData: rd => rd.offer?.sku },
    bottom: { name: t('Variation sku'), getData: rd => rd.variation?.sku },
    action: 'valueByPath',
    width: '150px',
  },
  {
    top: { name: t('Offer bar-code'), getData: rd => rd.offer?.barCode },
    bottom: { name: t('Variation bar-code'), getData: rd => rd.variation?.barCode },
    action: 'valueByPath',
    width: '150px',
  },
  createdDateColumn,
];

export const tempOrderSlotTableColumns: CellTittleProps<IOrderTempSlot>[] =
  orderSlotsTableColumns as CellTittleProps<IOrderTempSlot>[];

const OrdersAllowedPaths = [
  'manager.email',
  'manager.code',

  'managers.email',
  'managers.code',

  'customer.email',
  'customer.phone',
  'customer.name.first',
  'customer.name.second',
  'customer.reference',

  'receiver.email',
  'receiver.phone',
  'receiver.name.first',
  'receiver.name.second',
  'receiver.reference',

  'barCode',
  'reference.internal',
  'reference.external',

  'group.reference.internal',
  'group.reference.external',

  'status',
  'deletedAt',
  'updatedAt',
  'createdAt',

  'warehouse.label',
  'warehouse.code',

  // 'variations.label',
  // 'variations.barCode',
  // 'variations.sku',
  // 'variations.price.out',
  // 'variations.deletedAt',
  // 'variations.updatedAt',
  // 'variations.createdAt',
] as const;

export type SaleOrdersSortParam = TableSortParam<Values<typeof OrdersAllowedPaths>>;
export const ordersSortParams: SaleOrdersSortParam[] = [
  { dataPath: 'reference.internal', label: t('Reference / Internal') },
  { dataPath: 'reference.external', label: t('Reference / External') },

  { dataPath: 'group.reference.internal', label: t('Reference / Internal') + ` / ${t('Group').toLowerCase()}` },
  { dataPath: 'group.reference.external', label: t('Reference / External') + ` / ${t('Group').toLowerCase()}` },

  { dataPath: 'barCode', label: t('Bar-code') },
  { dataPath: 'status', label: t('Status') },

  { dataPath: 'manager.email', label: t('Manager email') },
  { dataPath: 'manager.code', label: t('Manager code') },
  { dataPath: 'managers.email', label: t('Any managers email') },
  { dataPath: 'managers.code', label: t('Any managers code') },

  { dataPath: 'customer.email', label: t('Customer email') },
  { dataPath: 'customer.phone', label: t('Customer phone') },
  { dataPath: 'customer.name.first', label: t('Customer first name') },
  { dataPath: 'customer.name.second', label: t('Customer second name') },
  { dataPath: 'customer.reference', label: t('Customer reference') },

  { dataPath: 'receiver.email', label: t('Customer email') },
  { dataPath: 'receiver.phone', label: t('Customer phone') },
  { dataPath: 'receiver.name.first', label: t('Customer first name') },
  { dataPath: 'receiver.name.second', label: t('Customer second name') },
  { dataPath: 'receiver.reference', label: t('Customer reference') },

  { dataPath: 'warehouse.code', label: t('Warehouse code') },
  { dataPath: 'warehouse.label', label: t('Warehouse label') },

  { dataPath: 'createdAt', label: t('Created at') },
  { dataPath: 'updatedAt', label: t('Updated at') },
  { dataPath: 'deletedAt', label: t('Deleted at') },
];

export type SaleOrdersSearchParam = TableSearchParam<Values<typeof OrdersAllowedPaths>>;
export const ordersSearchParams: SaleOrdersSearchParam[] = [
  { dataPath: 'reference.internal', label: t('Reference / Internal') },
  { dataPath: 'reference.external', label: t('Reference / External') },
  { dataPath: 'barCode', label: t('Bar-code') },
  { dataPath: 'warehouse.code', label: t('Warehouse code') },
  { dataPath: 'warehouse.label', label: t('Warehouse label') },
  { dataPath: 'manager.email', label: t('Manager email') },
  { dataPath: 'manager.code', label: t('Manager code') },
  { dataPath: 'managers.email', label: t('Any managers email') },
  { dataPath: 'managers.code', label: t('Any managers code') },
];
