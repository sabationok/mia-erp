import { SelectItem } from 'components/TableList/TableList';
import { CellTittleProps } from 'components/TableList/TebleCells/CellTitle';
import t from '../lang';
import { IProduct } from '../redux/products/products.types';

export type DataPath =
  | 'category.label'
  | 'subCategory.label'
  | 'brand.name'
  | 'brand.label'
  | 'owner.name'
  | 'owner.email'
  | 'author.name'
  | 'author.email'
  | 'editor.name'
  | 'editor.email'
  | 'auditor.name'
  | 'auditor.email'
  | 'manufacturer.name'
  | 'manufacturer.email'
  | 'mark.label'
  | 'tags'
  | 'type'
  | 'status'
  | 'sale'
  | 'cashback.sale'
  | 'cashback.level'
  | 'cashback.bonuses'
  | 'currency'
  | 'description'
  | 'createdAt'
  | 'updatedAt'
  | 'label'
  | 'sku'
  | 'price'
  | 'visibility'
  | 'availabilityInfo.status'
  | 'availabilityInfo.primaryOrder'
  | 'availabilityInfo.primaryOrderTime'
  | 'availabilityInfo.customOrder'
  | 'availabilityInfo.customOrderTime';

export const productsColumns: CellTittleProps<IProduct, DataPath>[] = [
  {
    top: { name: t('label'), align: 'start', path: 'label' },
    bottom: { name: t('sku'), align: 'start', path: 'sku' },
    width: '150px',
    action: 'valueByPath',
  },
  // {
  //   top: { name: t('price'), align: 'end', path: 'price' },
  //   bottom: { name: 'Валюта', align: 'end', path: 'currency' },
  //   width: '120px',
  //   action: 'numberWithSpaces',
  // },
  // {
  //   top: { name: t('sale'), align: 'end', path: 'cashback.sale' },
  //   bottom: { name: 'Рівень кешбеку', align: 'end', path: 'cashback.level' },
  //   width: '120px',
  //   action: 'numberWithSpaces',
  // },
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
    top: { name: t('type'), align: 'start', path: 'type' },
    bottom: { name: t('status'), align: 'start', path: 'status' },
    width: '100px',
    action: 'status',
  },
  {
    top: { name: 'Наявність', align: 'start', path: 'availabilityInfo.status' },
    bottom: { name: 'Видимість', align: 'start', path: 'visibility' },
    width: '150px',
    action: 'status',
  },
  {
    top: { name: 'Бренд', align: 'start', path: 'brand.label' },
    bottom: { name: 'Виробник', align: 'start', path: 'manufacturer.name' },
    width: '150px',
    action: 'valueByPath',
  },
  {
    top: { name: 'Автор', align: 'start', path: 'author.name' },
    bottom: { name: 'Емейл', align: 'start', path: 'author.email' },
    width: '150px',
    action: 'valueByPath',
  },
  {
    top: { name: 'Опис', align: 'start', path: 'description' },
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

export const productsSearchParams: SelectItem<DataPath>[] = [
  // {
  //   label: t('type'),
  //   dataPath: 'type',
  //   filter: false,
  //   search: true,
  //   sort: true,
  // },
  // {
  //   label: t('price'),
  //   dataPath: 'price',
  //   filter: false,
  //   search: true,
  //   sort: true,
  // },
  // {
  //   label: 'Оновлено',
  //   dataPath: 'createdAt',
  //   filter: false,
  //   search: false,
  //   sort: true,
  // },
  // {
  //   label: 'Створено',
  //   dataPath: 'updatedAt',
  //   filter: false,
  //   search: false,
  //   sort: true,
  // },
  // {
  //   label: t('countIn'),
  //   dataPath: 'countIn.label',
  //   filter: false,
  //   search: true,
  //   sort: true,
  // },
  // {
  //   label: t('subCountIn'),
  //   dataPath: 'subCountIn.label',
  //   filter: false,
  //   search: true,
  //   sort: true,
  // },
  // {
  //   label: t('countOut'),
  //   dataPath: 'countOut.label',
  //   filter: false,
  //   search: true,
  //   sort: true,
  // },
  // {
  //   label: t('subCountOut'),
  //   dataPath: 'subCountOut.label',
  //   filter: false,
  //   search: true,
  //   sort: true,
  // },
  // {
  //   label: t('category'),
  //   dataPath: 'category.label',
  //   filter: false,
  //   search: true,
  //   sort: true,
  // },
  // {
  //   label: t('subCategory'),
  //   dataPath: 'subCategory.label',
  //   filter: false,
  //   search: true,
  //   sort: true,
  // },
  //
  // {
  //   label: 'Контрагент',
  //   dataPath: 'contractor.name',
  //   filter: false,
  //   search: true,
  //   sort: true,
  // },
  // {
  //   label: 'Документ',
  //   dataPath: 'document',
  //   filter: false,
  //   search: true,
  //   sort: true,
  // },
  // {
  //   label: t('project'),
  //   dataPath: 'project.label',
  //   filter: false,
  //   search: true,
  //   sort: true,
  // },
  // { label: 'Мітка', dataPath: 'mark.label', filter: false, search: true, sort: true },
  // {
  //   label: 'Статус',
  //   dataPath: 'status',
  //   filter: false,
  //   search: true,
  //   sort: true,
  // },
];
