import { CellTittleProps } from 'components/TableList/TebleCells/CellTitle';
import t from '../lang';
import { IPriceList, IPriceListItem } from '../redux/priceManagement/priceManagement.types';

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
  | 'availabilityInfo.customOrderTime'
  | 'product.label'
  | 'product.sku'
  | 'timeFrom'
  | 'timeTo';

export const priceListColumns: CellTittleProps<IPriceList, DataPath>[] = [
  {
    top: { name: t('label'), align: 'start', path: 'label' },
    bottom: { name: t('type'), align: 'start', path: 'type' },
    width: '210px',
    action: 'valueByPath',
  },
  {
    top: { name: 'Теги клієнтів', align: 'start', path: 'tags' },
    // bottom: { name: 'Емейл', align: 'start', path: 'author.email' },
    width: '230px',
    action: 'tags',
  },
  {
    top: { name: 'Теги постачальників', align: 'start', path: 'tags' },
    // bottom: { name: 'Емейл', align: 'start', path: 'author.email' },
    width: '230px',
    action: 'tags',
  },
  {
    top: { name: 'Автор', align: 'start', path: 'author.name' },
    bottom: { name: 'Емейл', align: 'start', path: 'author.email' },
    width: '170px',
    action: 'valueByPath',
  },
  {
    top: { name: 'Коментар', align: 'start', path: 'description' },
    width: '170px',
    action: 'valueByPath',
  },
  {
    top: { name: t('timeFrom'), align: 'center', path: 'timeFrom' },
    bottom: { name: t('timeTo'), align: 'center', path: 'timeTo' },
    width: '150px',
    action: 'dateDbl',
  },
  {
    top: { name: 'Створено', align: 'center', path: 'createdAt' },
    bottom: { name: 'Оновлено', align: 'center', path: 'updatedAt' },
    width: '150px',
    action: 'dateDbl',
  },
];
export const priceListContentColumns: CellTittleProps<IPriceListItem, DataPath>[] = [
  {
    top: { name: 'Продукт', align: 'start', path: 'product.label' },
    bottom: { name: t('sku'), align: 'start', path: 'product.sku' },
    width: '150px',
    action: 'valueByPath',
  },
  {
    top: { name: t('price'), align: 'start', path: 'price' },
    bottom: { name: t('currency'), align: 'start', path: 'currency' },
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
    top: { name: 'Коментар', align: 'start', path: 'description' },
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
