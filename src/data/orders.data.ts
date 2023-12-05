import { CellTittleProps } from '../components/TableList/TebleCells/CellTitle';
import { IOrder, IOrderSlot, OrderStatusEnum } from '../types/orders/orders.types';
import { t } from '../lang';
import { SelectItem } from '../components/TableList/tableTypes.types';
import { FilterOption } from '../components/ModalForm/ModalFilter';
import { getStatusesByEnum } from './statuses.data';
import { numberWithSpaces } from '../utils';

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

export type DataPath =
  | 'owner.label'
  | 'owner.name'
  | 'author.name'
  | 'author.email'
  | 'editor.name'
  | 'editor.email'
  | 'auditor.name'
  | 'auditor.email'
  | 'contractor.name'
  | 'contractor.type'
  | 'eventDate'
  | 'type'
  | 'status'
  | 'amount'
  | 'currency'
  | 'comment'
  | 'createdAt'
  | 'updatedAt'
  | 'mark.label'
  | 'invoice.label'
  | 'invoice.code'
  | 'invoice.number'
  | 'payment.label'
  | 'payment.code'
  | 'payment.number'
  | 'order.code'
  | 'total'
  | 'manager.name'
  | 'manager.code'
  | 'manager.email'
  | 'customer.name'
  | 'customer.phone'
  | 'receiver.name'
  | 'receiver.phone'
  | 'invoices'
  | 'payments'
  | 'transporters';
export const ordersTableColumns: CellTittleProps<IOrder, DataPath>[] = [
  {
    top: {
      name: `${t('Status')}/${t('Internal')}`,
      getData: rd => rd.status?.internal,
    },
    bottom: {
      name: `${t('Status')}/${t('External')}`,
      getData: rd => rd.status?.external,
    },
    width: '150px',
    action: 'status',
  },

  {
    top: {
      name: t('Total amount'),
      align: 'end',
      getData: rd => numberWithSpaces(rd.total?.amount ?? 0),
    },
    bottom: { name: t('Slots q-ty'), align: 'end', getData: rd => rd.total?.items },
    width: '120px',
    action: 'numberWithSpaces',
  },
  {
    top: { name: t('Group') },
    bottom: { name: t('Number'), path: 'manager.email' },
    width: '180px',
    action: 'valueByPath',
  },
  {
    top: {
      name: 'Замовник',
      getData: rd =>
        (rd.receiver?.name && rd.receiver?.name?.first + ' ' + rd.receiver?.name?.second) ||
        (rd.receiver?.label && rd.receiver?.label.base) ||
        '--- ---',
    },
    bottom: { name: 'Телефон', path: 'customer.phone' },
    width: '180px',
    action: 'valueByPath',
  },
  {
    top: {
      name: 'Отримувач',
      getData: rd =>
        (rd.receiver?.name && rd.receiver?.name?.first + ' ' + rd.receiver?.name?.second) ||
        (rd.receiver?.label && rd.receiver?.label.base) ||
        '--- ---',
    },
    bottom: { name: 'Телефон', path: 'receiver.phone' },
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
    top: { name: t('Priority') },
    // bottom: { name: t('type'), path: 'type' },
    width: '100px',
    action: 'status',
  },
  {
    top: { name: t('manager'), path: 'manager.name' },
    bottom: { name: t('email'), path: 'manager.email' },
    width: '180px',
    action: 'valueByPath',
  },
  {
    top: { name: t('updated'), align: 'center', path: 'updatedAt' },
    bottom: { name: t('created'), align: 'center', path: 'createdAt' },
    width: '150px',
    action: 'dateDbl',
  },
];

export const ordersSearchParams: SelectItem[] = [
  {
    label: 'Дата',
    dataPath: 'eventDate',
    filter: false,
    search: false,
    sort: true,
  },
  { label: 'Мітка', dataPath: 'mark.label', filter: false, search: true, sort: true },
  {
    label: 'Статус',
    dataPath: 'status',
    filter: false,
    search: false,
    sort: true,
  },
  {
    label: t('type'),
    dataPath: 'type',
    filter: false,
    search: true,
    sort: true,
  },
  {
    label: t('amount'),
    dataPath: 'total',
    filter: false,
    search: true,
    sort: true,
  },
  {
    label: 'Оновлено',
    dataPath: 'createdAt',
    filter: false,
    search: false,
    sort: true,
  },
  {
    label: 'Створено',
    dataPath: 'updatedAt',
    filter: false,
    search: false,
    sort: true,
  },
];

export const orderSlotTableColumns: CellTittleProps<IOrderSlot>[] = [
  { top: { name: '' }, bottom: { name: '' }, action: 'valueByPath', width: '125px' },
  { top: { name: '' }, bottom: { name: '' }, action: 'valueByPath', width: '125px' },
  { top: { name: '' }, bottom: { name: '' }, action: 'valueByPath', width: '125px' },
  { top: { name: '' }, bottom: { name: '' }, action: 'valueByPath', width: '125px' },
  { top: { name: '' }, bottom: { name: '' }, action: 'valueByPath', width: '125px' },
  { top: { name: '' }, bottom: { name: '' }, action: 'valueByPath', width: '125px' },
  { top: { name: '' }, bottom: { name: '' }, action: 'valueByPath', width: '125px' },
];
