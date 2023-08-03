import { CellTittleProps } from '../components/TableList/TebleCells/CellTitle';
import { IOrder } from '../redux/orders/orders.types';
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
    top: { name: t('status'), align: 'start', path: 'status' },
    bottom: { name: t('type'), align: 'start', path: 'type' },
    width: '100px',
    action: 'status',
  },
  {
    top: { name: t('amount'), align: 'end', path: 'total' },
    bottom: { name: 'Валюта', align: 'end', path: 'currency' },
    width: '120px',
    action: 'numberWithSpaces',
  },
  {
    top: { name: 'Менеджер', align: 'start', path: 'manager.name' },
    bottom: { name: 'Код', align: 'start', path: 'manager.code' },
    width: '180px',
    action: 'valueByPath',
  },
  {
    top: { name: 'Замовник', align: 'start', path: 'customer.name' },
    bottom: { name: 'Телефон', align: 'start', path: 'customer.phone' },
    width: '180px',
    action: 'valueByPath',
  },
  {
    top: { name: 'Отримувач', align: 'start', path: 'receiver.name' },
    bottom: { name: 'Телефон', align: 'start', path: 'receiver.phone' },
    width: '180px',
    action: 'valueByPath',
  },
  {
    top: {
      name: 'Інвойси',
      align: 'start',
      path: 'invoices',
      getData: () => ['5651651323213', '6546565165651', '546565165651', '565165132321', '54656516565'],
    },
    width: '200px',
    action: 'tags',
  },
  {
    top: { name: 'Оплати', align: 'start', path: 'payments' },
    width: '200px',
    action: 'valueByPath',
  },
  {
    top: { name: 'Перевізники', align: 'start', path: 'transporters' },
    width: '200px',
    action: 'valueByPath',
  },
  {
    top: { name: 'Коментар', align: 'start', path: 'comment' },
    width: '170px',
    action: 'valueByPath',
  },
  {
    top: { name: 'Створено', align: 'center', path: 'createdAt' },
    bottom: { name: 'Оновлено', align: 'center', path: 'updatedAt' },
    width: '150px',
    action: 'dateDbl',
  },
];

export const ordersSearchParams: SelectItem<DataPath>[] = [
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

export const mockOrdersData: IOrder[] = [{ _id: '51651651', owner: { _id: '4515135135131' } as any }];
