import { SelectItem } from 'components/TableList/TableList';
import { CellTittleProps } from 'components/TableList/TebleCells/CellTitle';
import { selects } from './select.data';
import { ITransaction } from '../redux/transactions/transactions.types';
import { TransactionsFilterOpt } from '../components/Forms/TransactionForm';
import { CategoriesTypesMap } from '../redux/categories/categories.types';

export const transactionsColumns: CellTittleProps[] = [
  {
    top: { name: 'Дата', align: 'center', path: 'transactionDate' },
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
    top: { name: 'Сума', align: 'end', path: 'amount', def: ' 0.00' },
    bottom: { name: 'Валюта', align: 'end', path: 'currency' },
    width: '120px',
    action: 'numberWithSpaces',
  },
  {
    top: { name: selects.countIn.label, align: 'start', path: 'countIn.name' },
    bottom: {
      name: selects.subCountIn.label,
      align: 'start',
      path: 'subCountIn.name',
    },
    width: '150px',
    action: 'valueByPath',
  },
  {
    top: {
      name: selects.countOut.label,
      align: 'start',
      path: 'countOut.name',
    },
    bottom: {
      name: selects.subCountOut.label,
      align: 'start',
      path: 'subCountOut.name',
    },
    width: '150px',
    action: 'valueByPath',
  },
  {
    top: {
      name: selects.category.label,
      align: 'start',
      path: 'category.name',
    },
    bottom: {
      name: selects.subCategory.label,
      align: 'start',
      path: 'subCategory.name',
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
    top: { name: 'Проект', align: 'start', path: 'project.name' },
    width: '150px',
    action: 'valueByPath',
  },
  {
    top: { name: 'Коментар', align: 'start', path: 'comment' },
    width: '150px',
    action: 'valueByPath',
  },
  {
    top: { name: 'Створено', align: 'center', dataKey: 'createdAt' },
    bottom: { name: 'Оновлено', align: 'center', dataKey: 'updatedAt' },
    width: '150px',
    action: 'dateSimple',
  },
];

export const transactionsSearchParams: SelectItem[] = [
  {
    label: 'Дата',
    dataPath: 'transactionDate',
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
    label: selects.countIn.label,
    dataPath: 'countIn.label',
    filter: false,
    search: true,
    sort: true,
  },
  {
    label: selects.subCountIn.label,
    dataPath: 'subCountIn.label',
    filter: false,
    search: true,
    sort: true,
  },
  {
    label: selects.countOut.label,
    dataPath: 'countOut.label',
    filter: false,
    search: true,
    sort: true,
  },
  {
    label: selects.subCountOut.label,
    dataPath: 'subCountOut.label',
    filter: false,
    search: true,
    sort: true,
  },
  {
    label: selects.category.label,
    dataPath: 'category.label',
    filter: false,
    search: true,
    sort: true,
  },
  {
    label: selects.subCategory.label,
    dataPath: 'subCategory.label',
    filter: false,
    search: true,
    sort: true,
  },
  {
    label: 'Сума',
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
    label: 'Проєкт',
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
  { label: CategoriesTypesMap.INCOME, value: 'INCOME' },
  { label: CategoriesTypesMap.TRANSFER, value: 'TRANSFER' },
  { label: CategoriesTypesMap.EXPENSE, value: 'EXPENSE' },
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
      name: 'ЗАМОВНИКИ',
      code: '100',
    },
    subCountIn: {
      _id: '63d79be938b6a211dc6634c8',
      name: 'Замовники за контрактом',
      code: '101',
    },
    contractor: { _id: '63d79be938b6a211dc6634c8', name: 'Петренко І.В.' },
    project: { _id: '63d79be938b6a211dc6634c8', name: 'ЖК "Авалон"' },
    transactionDate: '2023-01-31T04:02:09.592Z',
    activity: { _id: '63d79be938b6a211dc6634c8', label: 'Буд. діяльність' },
    category: {
      _id: '63d79be938b6a211dc6634c8',
      name: 'Послуги',
      type: 'EXPENSE',
    },
    subCategory: {
      _id: '63d79be938b6a211dc6634c8',
      name: 'Покрівля даху',
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
      name: 'ЗАМОВНИКИ',
      code: '100',
    },
    subCountOut: {
      _id: '63d79be938b6a211dc6634c8',
      name: 'Замовники за контрактом',
      code: '101',
    },
    contractor: { _id: '63d79be938b6a211dc6634c8', name: 'Петренко І.В.' },
    transactionDate: '2023-01-31T04:02:09.592Z',
    category: {
      _id: '63d79be938b6a211dc6634c8',
      name: 'Матеріали',
      type: 'INCOME',
    },
    subCategory: {
      _id: '63d79be938b6a211dc6634c8',
      name: 'Основні матеріали',
      type: 'INCOME',
    },
    status: 'success',
    createdAt: '2023-01-31T04:02:25.788Z',
    updatedAt: '2023-01-31T04:02:25.788Z',
    project: { _id: '63d79be938b6a211dc6634c8', name: 'ЖК "Авалон' },
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
      name: 'ЗАМОВНИКИ',
      code: '100',
    },
    subCountOut: {
      _id: '63d79be938b6a211dc6634c8',
      name: 'Замовники за контрактом',
      code: '101',
    },
    category: {
      _id: '63d79be938b6a211dc6634c8',
      name: 'Послуги',
      type: 'EXPENSE',
    },
    subCategory: {
      _id: '63d79be938b6a211dc6634c8',
      name: 'Покрівля даху',
      type: 'EXPENSE',
    },
    activity: { _id: '63d79be938b6a211dc6634c8', label: 'Буд. діяльність' },
    transactionDate: '2023-01-31T04:02:09.592Z',
    tags: [],
    project: { _id: '63d79be938b6a211dc6634c8', name: 'ЖК "Авалон' },
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
      name: 'ЗАМОВНИКИ',
      code: '100',
    },
    subCountOut: {
      _id: '63d79be938b6a211dc6634c8',
      name: 'Замовники за контрактом',
      code: '101',
    },
    countIn: {
      _id: '63d5f51bdee30d0c1e11757f',
      name: 'ЗАМОВНИКИ',
      code: '100',
    },
    subCountIn: {
      _id: '63d79be938b6a211dc6634c8',
      name: 'Замовники за контрактом',
      code: '101',
    },
    category: {
      _id: '63d79be938b6a211dc6634c8',
      name: 'Послуги',
      type: 'EXPENSE',
    },
    subCategory: {
      _id: '63d79be938b6a211dc6634c8',
      name: 'Покрівля даху',
      type: 'EXPENSE',
    },
    activity: { _id: '63d79be938b6a211dc6634c8', label: 'Буд. діяльність' },
    transactionDate: '2023-01-31T04:02:09.592Z',
    tags: [],
    status: 'info',
    project: { _id: '63d79be938b6a211dc6634c8', name: 'ЖК "Авалон' },
    createdAt: '2023-01-31T04:02:25.788Z',
    updatedAt: '2023-01-31T04:02:25.788Z',
  },
];
