import { SelectItem } from 'components/TableList/TableList';
import { CellTittleProps } from 'components/TableList/TebleCells/CellTitle';
import { ITransaction } from '../types/finances/transactions.types';
import { t } from '../i18e';
import { TabOption } from '../components/atoms/TabSelector';
import { FinTransactionType, FinTransactionTypeEnum } from '../types/directories.types';
import { enumToFilterOptions } from '../utils';

export type TransactionsFilterOpt = TabOption<FinTransactionType>;
export type DataPath =
  | 'countIn.label'
  | 'subCountIn.label'
  | 'countOut.label'
  | 'subCountOut.label'
  | 'category.label'
  | 'subCategory.label'
  | 'owner.name'
  | 'project.name'
  | 'project.label'
  | 'contractor.name'
  | 'contractor.type'
  | 'meta.author.name'
  | 'author.name'
  | 'author.email'
  | 'meta.editor.name'
  | 'editor.name'
  | 'editor.email'
  | 'meta.auditor.name'
  | 'auditor.name'
  | 'auditor.email'
  | 'eventDate'
  | 'type'
  | 'status'
  | 'amount'
  | 'currency'
  | 'activity.label'
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
  | 'order.code';

export const transactionTypeFilterOptions: TransactionsFilterOpt[] = enumToFilterOptions(FinTransactionTypeEnum);

export const transactionsColumnsNew: CellTittleProps<ITransaction, DataPath>[] = [
  {
    top: { name: t('date'), align: 'center', path: 'eventDate' },
    bottom: { name: t('time'), align: 'center' },
    width: '90px',
    action: 'dateSimple',
  },
  {
    top: { name: t('type'), align: 'start', path: 'type' },
    bottom: { name: t('status'), align: 'start', path: 'status' },
    width: '100px',
    action: 'status',
  },
  {
    top: { name: t('amount'), align: 'end', path: 'amount' },
    bottom: { name: 'Валюта', align: 'end', path: 'currency' },
    width: '120px',
    action: 'numberWithSpaces',
  },
  {
    top: { name: t('countIn'), align: 'start', path: 'countIn.label' },
    bottom: {
      name: t('subCountIn'),
      align: 'start',
      path: 'subCountIn.label',
    },
    width: '150px',
    action: 'valueByPath',
  },
  {
    top: {
      name: t('countOut'),
      align: 'start',
      path: 'countOut.label',
    },
    bottom: {
      name: t('subCountOut'),
      align: 'start',
      path: 'subCountOut.label',
    },
    width: '150px',
    action: 'valueByPath',
  },
  {
    top: {
      name: t('category'),
      align: 'start',
      path: 'category.label',
    },
    bottom: {
      name: t('subCategory'),
      align: 'start',
      path: 'subCategory.label',
    },
    width: '150px',
    action: 'valueByPath',
  },
  {
    top: { name: 'Контрагент', align: 'start', path: 'contractor.name' },
    bottom: { name: 'Тип', align: 'start', path: 'contractor.type' },
    width: '150px',
    action: 'valueByPath',
  },
  {
    top: { name: 'Діяльність', align: 'start', path: 'activity.label' },
    width: '150px',
    action: 'valueByPath',
  },
  {
    top: { name: 'Проект', align: 'start', path: 'project.label' },
    width: '150px',
    action: 'valueByPath',
  },
  {
    top: { name: 'Коментар', align: 'start', path: 'comment' },
    width: '150px',
    action: 'valueByPath',
  },

  {
    top: { name: 'Створено', align: 'center', path: 'createdAt' },
    bottom: { name: 'Оновлено', align: 'center', path: 'updatedAt' },
    width: '150px',
    action: 'dateDbl',
  },
];
export const transactionsColumns: CellTittleProps<ITransaction, DataPath>[] = [
  {
    top: { name: 'Дата', align: 'center', path: 'eventDate' },
    bottom: { name: 'Час', align: 'center' },
    width: '90px',
    action: 'dateSimple',
  },
  {
    top: { name: 'Тип', align: 'start', path: 'type' },
    bottom: { name: 'Статус', align: 'start', path: 'status' },
    width: '100px',
    action: 'status',
  },
  {
    top: { name: t('amount'), align: 'end', path: 'amount' },
    bottom: { name: 'Валюта', align: 'end', path: 'currency' },
    width: '120px',
    action: 'numberWithSpaces',
  },
  {
    top: {
      name: t('countOut'),
      align: 'start',
      path: 'countOut.label',
    },
    bottom: {
      name: t('subCountOut'),
      align: 'start',
      path: 'subCountOut.label',
    },
    width: '190px',
    action: 'valueByPath',
  },
  {
    top: { name: t('countIn'), align: 'start', path: 'countIn.label' },
    bottom: {
      name: t('subCountIn'),
      align: 'start',
      path: 'subCountIn.label',
    },
    width: '190px',
    action: 'valueByPath',
  },
  {
    top: {
      name: t('category'),
      align: 'start',
      path: 'category.label',
    },
    bottom: {
      name: t('subCategory'),
      align: 'start',
      path: 'subCategory.label',
    },
    width: '190px',
    action: 'valueByPath',
  },
  {
    top: { name: 'Інвойс', align: 'start', path: 'invoice.label' },
    bottom: { name: 'Номер', align: 'start', path: 'invoice.number' },
    width: '150px',
    action: 'valueByPath',
  },
  {
    top: { name: 'Оплата', align: 'start', path: 'payment.label' },
    bottom: { name: 'Номер', align: 'start', path: 'payment.number' },
    width: '150px',
    action: 'valueByPath',
  },

  {
    top: { name: 'Контрагент', align: 'start', path: 'contractor.name' },
    bottom: { name: 'Тип', align: 'start', path: 'contractor.type' },
    width: '150px',
    action: 'valueByPath',
  },
  {
    top: { name: 'Діяльність', align: 'start', path: 'activity.label' },
    width: '150px',
    action: 'valueByPath',
  },
  {
    top: { name: 'Проект', align: 'start', path: 'project.label' },
    width: '150px',
    action: 'valueByPath',
  },
  {
    top: { name: 'Коментар', align: 'start', path: 'comment' },
    width: '150px',
    action: 'valueByPath',
  },
  {
    top: { name: 'Створив', align: 'start', path: 'author.email' },
    bottom: { name: 'Оновив', align: 'start', path: 'editor.email' },
    width: '150px',
    action: 'valueByPath',
  },
  {
    top: { name: 'Створено', align: 'center', path: 'createdAt' },
    bottom: { name: 'Оновлено', align: 'center', path: 'updatedAt' },
    width: '150px',
    action: 'dateDbl',
  },
];

export const transactionsSearchParams: SelectItem[] = [
  {
    label: 'Дата',
    dataPath: 'eventDate',
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
    dataPath: 'amount',
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
  {
    label: t('countIn'),
    dataPath: 'countIn.label',
    filter: false,
    search: true,
    sort: true,
  },
  {
    label: t('subCountIn'),
    dataPath: 'subCountIn.label',
    filter: false,
    search: true,
    sort: true,
  },
  {
    label: t('countOut'),
    dataPath: 'countOut.label',
    filter: false,
    search: true,
    sort: true,
  },
  {
    label: t('subCountOut'),
    dataPath: 'subCountOut.label',
    filter: false,
    search: true,
    sort: true,
  },
  {
    label: t('category'),
    dataPath: 'category.label',
    filter: false,
    search: true,
    sort: true,
  },
  {
    label: t('subCategory'),
    dataPath: 'subCategory.label',
    filter: false,
    search: true,
    sort: true,
  },

  {
    label: 'Контрагент',
    dataPath: 'contractor.name',
    filter: false,
    search: true,
    sort: true,
  },

  {
    label: t('project'),
    dataPath: 'project.label',
    filter: false,
    search: true,
    sort: true,
  },
  { label: 'Мітка', dataPath: 'mark.label', filter: false, search: true, sort: true },
  {
    label: 'Статус',
    dataPath: 'status',
    filter: false,
    search: true,
    sort: true,
  },
];
