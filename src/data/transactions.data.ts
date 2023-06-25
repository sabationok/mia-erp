import { SelectItem } from 'components/TableList/TableList';
import { CellTittleProps } from 'components/TableList/TebleCells/CellTitle';
import { ITransaction } from '../redux/transactions/transactions.types';
import t from '../lang';
import { FilterOpt } from '../components/ModalForm/ModalFilter';
import { CategoryTypes } from '../redux/directories/categories.types';

export type TransactionsFilterOpt = FilterOpt<CategoryTypes>;

export const transactionsColumnsNew: CellTittleProps[] = [
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
    top: { name: 'Контрагент', align: 'start', path: 'contractor.label' },
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
    top: { name: 'Автор', align: 'start', path: 'meta.author.name' },
    bottom: { name: 'Емейл', align: 'start', path: 'meta.author.email' },
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
export const transactionsColumns: CellTittleProps[] = [
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
    top: { name: 'Автор', align: 'start', path: 'meta.author.name' },
    bottom: { name: 'Емейл', align: 'start', path: 'meta.author.email' },
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

export const transactionsSearchParams: SelectItem[] = [
  {
    label: 'Дата',
    dataPath: 'eventDate',
    filter: false,
    search: false,
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
    dataPath: 'updateAt',
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
    label: t('amount'),
    dataPath: 'amount',
    filter: false,
    search: true,
    sort: true,
  },
  {
    label: 'Контрагент',
    dataPath: 'contractor',
    filter: false,
    search: true,
    sort: true,
  },
  {
    label: 'Документ',
    dataPath: 'document',
    filter: false,
    search: true,
    sort: true,
  },
  {
    label: t('project'),
    dataPath: 'project',
    filter: false,
    search: true,
    sort: true,
  },
  { label: 'Мітка', dataPath: 'mark', filter: false, search: true, sort: true },
  {
    label: 'Статус',
    dataPath: 'status',
    filter: false,
    search: true,
    sort: true,
  },
];

export const filterOptions: TransactionsFilterOpt[] = [
  { label: t('INCOME'), value: 'INCOME' },
  { label: t('TRANSFER'), value: 'TRANSFER' },
  { label: t('EXPENSE'), value: 'EXPENSE' },
];

export const transactionsMockData: ITransaction[] = [
  {
    _id: '63d892d156c42da6f5f95a5e',
    type: 'INCOME',
    status: 'error',
    amount: 562,
    currency: 'UAH',
    countIn: {
      _id: '63d5f51bdee30d0c1e11757f',
      label: 'ЗАМОВНИКИ',
      code: '100',
    },
    subCountIn: {
      _id: '63d79be938b6a211dc6634c8',
      label: 'Замовники за контрактом',
      code: '101',
    },
    contractor: { _id: '63d79be938b6a211dc6634c8', label: 'Петренко І.В.' },
    project: { _id: '63d79be938b6a211dc6634c8', label: 'ЖК "Авалон"' },
    eventDate: new Date('2023-01-31T04:02:09.592Z'),
    activity: { _id: '63d79be938b6a211dc6634c8', label: 'Буд. діяльність' },
    category: {
      _id: '63d79be938b6a211dc6634c8',
      label: 'Послуги',
      type: 'EXPENSE',
    },
    subCategory: {
      _id: '63d79be938b6a211dc6634c8',
      label: 'Покрівля даху',
      type: 'EXPENSE',
    },
    createdAt: '2023-01-31T04:02:25.788Z',
    updatedAt: '2023-01-31T04:02:25.788Z',
    tags: [],
  },
  {
    _id: '63d892d156c42da6f5f95a5d',
    type: 'EXPENSE',
    amount: 325,
    currency: 'UAH',
    countOut: {
      _id: '63d5f51bdee30d0c1e11757f',
      label: 'ЗАМОВНИКИ',
      code: '100',
    },
    subCountOut: {
      _id: '63d79be938b6a211dc6634c8',
      label: 'Замовники за контрактом',
      code: '101',
    },
    contractor: { _id: '63d79be938b6a211dc6634c8', label: 'Петренко І.В.' },
    eventDate: new Date('2023-01-31T04:02:09.592Z'),
    category: {
      _id: '63d79be938b6a211dc6634c8',
      label: 'Матеріали',
      type: 'INCOME',
    },
    subCategory: {
      _id: '63d79be938b6a211dc6634c8',
      label: 'Основні матеріали',
      type: 'INCOME',
    },
    status: 'success',
    createdAt: '2023-01-31T04:02:25.788Z',
    updatedAt: '2023-01-31T04:02:25.788Z',
    project: { _id: '63d79be938b6a211dc6634c8', label: 'ЖК "Авалон' },
    activity: { _id: '63d79be938b6a211dc6634c8', label: 'Буд. діяльність' },
    tags: [],
  },
  {
    _id: '63d892d156c42da6f5f95a54',
    type: 'INCOME',
    amount: 6162.56,
    currency: 'UAH',
    status: 'warning',
    countOut: {
      _id: '63d5f51bdee30d0c1e11757f',
      label: 'ЗАМОВНИКИ',
      code: '100',
    },
    subCountOut: {
      _id: '63d79be938b6a211dc6634c8',
      label: 'Замовники за контрактом',
      code: '101',
    },
    category: {
      _id: '63d79be938b6a211dc6634c8',
      label: 'Послуги',
      type: 'EXPENSE',
    },
    subCategory: {
      _id: '63d79be938b6a211dc6634c8',
      label: 'Покрівля даху',
      type: 'EXPENSE',
    },
    activity: { _id: '63d79be938b6a211dc6634c8', label: 'Буд. діяльність' },
    eventDate: new Date('2023-01-31T04:02:09.592Z'),
    tags: [],
    project: { _id: '63d79be938b6a211dc6634c8', label: 'ЖК "Авалон' },
    createdAt: '2023-01-31T04:02:25.788Z',
    updatedAt: '2023-01-31T04:02:25.788Z',
  },
  {
    _id: '63d892d156c42da6f5s95a54',
    type: 'TRANSFER',
    amount: 216.23,
    currency: 'UAH',
    countOut: {
      _id: '63d5f51bdee30d0c1e11757f',
      label: 'ЗАМОВНИКИ',
      code: '100',
    },
    subCountOut: {
      _id: '63d79be938b6a211dc6634c8',
      label: 'Замовники за контрактом',
      code: '101',
    },
    countIn: {
      _id: '63d5f51bdee30d0c1e11757f',
      label: 'ЗАМОВНИКИ',
      code: '100',
    },
    subCountIn: {
      _id: '63d79be938b6a211dc6634c8',
      label: 'Замовники за контрактом',
      code: '101',
    },
    category: {
      _id: '63d79be938b6a211dc6634c8',
      label: 'Послуги',
      type: 'EXPENSE',
    },
    subCategory: {
      _id: '63d79be938b6a211dc6634c8',
      label: 'Покрівля даху',
      type: 'EXPENSE',
    },
    activity: { _id: '63d79be938b6a211dc6634c8', label: 'Буд. діяльність' },
    eventDate: new Date('2023-01-31T04:02:09.592Z'),
    tags: [],
    status: 'info',
    project: { _id: '63d79be938b6a211dc6634c8', label: 'ЖК "Авалон' },
    createdAt: '2023-01-31T04:02:25.788Z',
    updatedAt: '2023-01-31T04:02:25.788Z',
  },
];
