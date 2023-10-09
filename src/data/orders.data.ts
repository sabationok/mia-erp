import { CellTittleProps } from '../components/TableList/TebleCells/CellTitle';
import { IOrder, IOrderSlot } from '../redux/orders/orders.types';
import t from '../lang';
import { SelectItem } from '../components/TableList/tableTypes.types';

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
    top: { name: t('date'), align: 'center', path: 'eventDate' },
    bottom: { name: t('time'), align: 'center' },
    width: '90px',
    action: 'dateSimple',
  },
  {
    top: { name: t('status'), path: 'status' },
    bottom: { name: t('type'), path: 'type' },
    width: '100px',
    action: 'status',
  },
  {
    top: { name: t('Priority') },
    // bottom: { name: t('type'), path: 'type' },
    width: '100px',
    action: 'status',
  },
  {
    top: { name: t('Total amount'), align: 'end', path: 'total' },
    bottom: { name: t('Total q-ty'), align: 'end' },
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
    top: { name: 'Замовник', path: 'customer.name' },
    bottom: { name: 'Телефон', path: 'customer.phone' },
    width: '180px',
    action: 'valueByPath',
  },
  {
    top: { name: 'Отримувач', path: 'receiver.name' },
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
    top: { name: t('Shipments') },
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

export const mockOrdersData: IOrder[] = [{ _id: '51651651', owner: { _id: '4515135135131' } as any }];
