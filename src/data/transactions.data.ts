import { SelectItem, TableActionsProps, useTable } from 'components/TableList/TableList';
import { CellTittleProps } from 'components/TableList/TebleCells/CellTitle';
import { iconId } from '../img/sprite/iconId.data';
import { selects } from './select.data';
import { ITransaction } from './transactions.types';
import useTransactionsService from '../redux/transactions/useTransactionsService.hook';

export const transactionsColumns: CellTittleProps[] = [
  {
    top: { name: 'Дата', align: 'center', dataKey: 'transactionDate', sort: false },
    bottom: { name: 'Час', align: 'center' },
    width: '90px',
    action: 'dateSimple',
  },
  {
    top: { name: 'Тип', align: 'start', dataKey: 'type', sort: false },
    width: '100px',
    action: 'status',
  },
  {
    top: { name: 'Сума', align: 'end', dataKey: 'amount', def: ' 0.00', sort: false },
    bottom: { name: 'Валюта', align: 'end', dataKey: 'currency', sort: false },
    width: '120px',
    action: 'cellDbl',
  },
  {
    top: {
      name: selects.countIn.label,
      align: 'start',
      dataKey: 'countIn',
      nestedDataKey: 'name',
      def: 'Не зазначено',
      sort: false,
    },
    bottom: {
      name: selects.subCountIn.label,
      align: 'start',
      dataKey: 'subCountIn',
      nestedDataKey: 'name',
      def: 'Не зазначено',
      sort: false,
    },
    width: '150px',
    action: 'cellDbl',
  },
  {
    top: {
      name: selects.countOut.label,
      align: 'start',
      dataKey: 'countOut',
      nestedDataKey: 'name',
      def: 'Не зазначено',
      sort: false,
    },
    bottom: {
      name: selects.subCountOut.label,
      align: 'start',
      dataKey: 'subCountOut',
      nestedDataKey: 'name',
      def: 'Не зазначено',
      sort: false,
    },
    width: '150px',
    action: 'cellDbl',
  },
  {
    top: { name: selects.category.label, align: 'start', dataKey: 'category', nestedDataKey: 'name', sort: false },
    bottom: {
      name: selects.subCategory.label,
      align: 'start',
      dataKey: 'subCategory',
      nestedDataKey: 'name',
      def: 'Не зазначено',
      sort: false,
    },
    width: '150px',
    action: 'cellDbl',
  },
  {
    top: {
      name: 'Контрагент',
      align: 'start',
      dataKey: 'contractor',
      nestedDataKey: 'name',
      def: 'Не зазначено',
      sort: false,
    },
    bottom: {
      name: 'Тип',
      align: 'start',
      dataKey: 'contractor',
      nestedDataKey: 'type',
      def: 'Не зазначено',
      sort: false,
    },
    width: '150px',
    action: 'cellDbl',
  },
  {
    top: {
      name: 'Діяльність',
      align: 'start',
      dataKey: 'companyActivity',
      nestedDataKey: 'label',
      def: 'Не зазначено',
      sort: false,
    },
    width: '150px',
    action: 'cellDbl',
  },
  {
    top: {
      name: 'Проект',
      align: 'start',
      dataKey: 'project',
      nestedDataKey: 'name',
      def: 'Не зазначено',
      sort: false,
    },
    width: '150px',
    action: 'cellDbl',
  },
  {
    top: {
      name: 'Коментар',
      align: 'start',
      dataKey: 'comment',
      nestedDataKey: 'name',
      def: 'Не зазначено',
      sort: false,
    },
    width: '150px',
    action: 'cellDbl',
  },
  {
    top: { name: 'Створено', align: 'center', dataKey: 'createdAt', sort: false },
    bottom: { name: 'Оновлено', align: 'center', dataKey: 'updatedAt', sort: false },
    width: '150px',
    action: 'dateSimple',
  },
];

export const transactionsColumns_old = [
  { id: 1, title: 'Дата', subTitle: 'Час', dataKey: 'transactionDate', action: 'date', width: '90px' },
  { id: 2, title: 'Тип', dataKey: 'type', action: 'status', width: '95px' },
  {
    id: 8,
    title: 'Сума',
    subTitle: 'Валюта',
    action: 'cellDbl',
    width: '120px',
    top: { name: 'Сума', dataKey: 'amount' },
    bottom: { name: 'Валюта', dataKey: 'currency' },
  },
  {
    id: 6,
    title: selects.countOut.label,
    subTitle: selects.subCountOut.label,
    action: 'nestedDbl',
    width: '200px',
    titles: {
      top: { dataKey: selects.countOut.name, nestedKey: 'name' },
      bottom: { dataKey: selects.subCountOut.name, nestedKey: 'name' },
    },
  },
  {
    id: 5,
    title: selects.countIn.label,
    subTitle: selects.subCountIn.label,
    action: 'nestedDbl',
    width: '200px',
    titles: {
      top: { dataKey: selects.countIn.name, nestedKey: 'name' },
      bottom: { dataKey: selects.subCountIn.name, nestedKey: 'name' },
    },
  },
  {
    id: 7,
    title: selects.category.label,
    subTitle: selects.subCategory.label,
    action: 'nestedDbl',
    width: '200px',
    titles: {
      top: { dataKey: selects.category.name, nestedKey: 'name' },
      bottom: { dataKey: selects.subCategory.name, nestedKey: 'name' },
    },
  },
  {
    id: 9,
    title: 'Контрагент',
    subTitle: 'Тип',
    action: 'nestedDbl',
    width: '200px',
    titles: {
      top: { dataKey: 'contractor', nestedKey: 'name' },
    },
  },
  {
    id: 10,
    title: 'Проект',
    subTitle: 'Тип',
    action: 'nestedDbl',
    width: '100px',
    titles: {
      top: { dataKey: 'project', nestedKey: 'name' },
    },
  },
  {
    id: 11,
    title: 'Документ',
    subTitle: 'Номер',
    action: 'nestedDbl',
    width: '100px',
    titles: {
      top: { dataKey: 'document', nestedKey: 'name' },
      bottom: { dataKey: 'document', nestedKey: 'number' },
    },
  },
  { id: 12, title: 'Мітка', dataKey: 'mark', action: 'string', width: '100px' },
  { id: 13, title: 'Коментар', dataKey: 'comment', action: 'string', width: '100px' },
  { id: 14, title: 'Статус', dataKey: 'status', action: 'string', width: '100px' },
  {
    id: 20,
    title: 'Створено',
    subTitle: 'Оновлено',
    dataKey: 'documentData',
    action: 'dateSimple',
    width: '180px',
  },
];

export const transactionsSearchParams: SelectItem[] = [
  { label: 'Дата', dataKey: 'transactionDate', filter: false, search: false, sort: true },
  { label: 'Оновлено', dataKey: 'createdAt', filter: false, search: false, sort: true },
  { label: 'Створено', dataKey: 'updateAt', filter: false, search: false, sort: true },

  { label: selects.countIn.label, dataKey: selects.countIn.name, filter: false, search: true, sort: true },
  { label: selects.subCountIn.label, dataKey: selects.subCountIn.name, filter: false, search: true, sort: true },
  { label: selects.countOut.label, dataKey: selects.countOut.name, filter: false, search: true, sort: true },
  { label: selects.subCountOut.label, dataKey: selects.subCountOut.name, filter: false, search: true, sort: true },
  { label: selects.category.label, dataKey: selects.category.name, filter: false, search: true, sort: true },
  { label: selects.subCategory.label, dataKey: selects.subCategory.name, filter: false, search: true, sort: true },
  { label: 'Сума', dataKey: 'amount', filter: false, search: true, sort: true },
  { label: 'Контрагент', dataKey: 'contractor', filter: false, search: true, sort: true },
  { label: 'Документ', dataKey: 'document', filter: false, search: true, sort: true },
  { label: 'Проєкт', dataKey: 'project', filter: false, search: true, sort: true },
  { label: 'Мітка', dataKey: 'mark', filter: false, search: true, sort: true },
  { label: 'Статус', dataKey: 'status', filter: false, search: true, sort: true },
];


export const useTransactionsActions = () => {
  const { editById, create, deleteById } = useTransactionsService();
  const table = useTable();


  return {
    top: [
      {
        name: 'editTr',
        title: 'Редагування транзакції',
        iconId: iconId.edit,
        onClick: () => {
          console.log(table);
        },
        disableChek: () => false,
      },
      {
        name: 'copyTr',
        title: 'Копіювання транзакції',
        iconId: iconId.copy,
        onClick: () => {
        },
        disableChek: () => false,
      },
      {
        name: 'deleteTr',
        title: 'Видалення транзакції',
        iconId: iconId.delete,
        iconSize: '90%',
        onClick: () => {
        },
        disableChek: () => false,
      },
    ],
    bottom: [
      {
        name: 'deleteTr',
        title: 'Дохід',
        iconId: iconId.INCOME,
        iconSize: '90%',
        onClick: () => {
        },
        disableChek: () => false,
      },
      {
        name: 'deleteTr',
        title: 'Переказ між рахунками',
        iconId: iconId.TRANSFER,
        iconSize: '90%',
        onClick: () => {
        },
        disableChek: () => false,
      },
      {
        name: 'deleteTr',
        title: 'Витрата',
        iconId: iconId.EXPENSE,
        iconSize: '90%',
        onClick: () => {
        },
        disableChek: () => false,
      },
    ],
  };
};


export const trTableActions: TableActionsProps = {
  top: [
    {
      name: 'editTr',
      title: 'Редагування транзакції',
      iconId: iconId.edit,
      onClick: () => {
      },
      disableChek: () => false,
    },
    {
      name: 'copyTr',
      title: 'Копіювання транзакції',
      iconId: iconId.copy,
      onClick: () => {
      },
      disableChek: () => false,
    },
    {
      name: 'deleteTr',
      title: 'Видалення транзакції',
      iconId: iconId.delete,
      iconSize: '90%',
      onClick: () => {
      },
      disableChek: () => false,
    },
  ],
  bottom: [
    {
      name: 'deleteTr',
      title: 'Дохід',
      iconId: iconId.INCOME,
      iconSize: '90%',
      onClick: () => {
      },
      disableChek: () => false,
    },
    {
      name: 'deleteTr',
      title: 'Переказ між рахунками',
      iconId: iconId.TRANSFER,
      iconSize: '90%',
      onClick: () => {
      },
      disableChek: () => false,
    },
    {
      name: 'deleteTr',
      title: 'Витрата',
      iconId: iconId.EXPENSE,
      iconSize: '90%',
      onClick: () => {
      },
      disableChek: () => false,
    },
  ],
};

export const transactionsMockData: ITransaction[] = [
  {
    _id: '63d892d156c42da6f5f95a5e',
    type: 'INCOME',
    amount: 562,
    currency: 'UAH',
    countIn: { _id: '63d5f51bdee30d0c1e11757f', name: 'ЗАМОВНИКИ', code: '100' },
    subCountIn: { _id: '63d79be938b6a211dc6634c8', name: 'Замовники за котрактом', code: '101' },
    contractor: { _id: '63d79be938b6a211dc6634c8', name: 'Петренко І.В.' },
    project: { _id: '63d79be938b6a211dc6634c8', name: 'ЖК "Авалон"' },
    transactionDate: '2023-01-31T04:02:09.592Z',
    companyActivity: { _id: '63d79be938b6a211dc6634c8', label: 'Буд. діяльність' },
    category: { _id: '63d79be938b6a211dc6634c8', name: 'Послуги', type: 'EXPENSE' },
    subCategory: { _id: '63d79be938b6a211dc6634c8', name: 'Покрівля даху', type: 'EXPENSE' },
    createdAt: '2023-01-31T04:02:25.788Z',
    updatedAt: '2023-01-31T04:02:25.788Z',
    tags: [],
  },
  {
    _id: '63d892d156c42da6f5f95a5d',
    type: 'EXPENSE',
    amount: 325,
    currency: 'UAH',
    countOut: { _id: '63d5f51bdee30d0c1e11757f', name: 'ЗАМОВНИКИ', code: '100' },
    subCountOut: { _id: '63d79be938b6a211dc6634c8', name: 'Замовники за котрактом', code: '101' },
    contractor: { _id: '63d79be938b6a211dc6634c8', name: 'Петренко І.В.' },
    transactionDate: '2023-01-31T04:02:09.592Z',
    category: { _id: '63d79be938b6a211dc6634c8', name: 'Матеріали', type: 'INCOME' },
    subCategory: { _id: '63d79be938b6a211dc6634c8', name: 'Основні матеріали', type: 'INCOME' },
    createdAt: '2023-01-31T04:02:25.788Z',
    updatedAt: '2023-01-31T04:02:25.788Z',
    project: { _id: '63d79be938b6a211dc6634c8', name: 'ЖК "Авалон' },
    companyActivity: { _id: '63d79be938b6a211dc6634c8', label: 'Буд. діяльність' },
    tags: [],
  },
  {
    _id: '63d892d156c42da6f5f95a54',
    type: 'INCOME',
    amount: 6162,
    currency: 'UAH',
    countOut: { _id: '63d5f51bdee30d0c1e11757f', name: 'ЗАМОВНИКИ', code: '100' },
    subCountOut: { _id: '63d79be938b6a211dc6634c8', name: 'Замовники за котрактом', code: '101' },
    category: { _id: '63d79be938b6a211dc6634c8', name: 'Послуги', type: 'EXPENSE' },
    subCategory: { _id: '63d79be938b6a211dc6634c8', name: 'Покрівля даху', type: 'EXPENSE' },
    companyActivity: { _id: '63d79be938b6a211dc6634c8', label: 'Буд. діяльність' },
    transactionDate: '2023-01-31T04:02:09.592Z',
    tags: [],
    project: { _id: '63d79be938b6a211dc6634c8', name: 'ЖК "Авалон' },
    createdAt: '2023-01-31T04:02:25.788Z',
    updatedAt: '2023-01-31T04:02:25.788Z',
  },
];