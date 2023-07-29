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
  // {
  //   top: { name: 'Теги клієнтів', align: 'start', path: 'tags', getData: () => initialCompany.customerTags },
  //   // bottom: { name: 'Емейл', align: 'start', path: 'author.email' },
  //   width: '230px',
  //   action: 'tags',
  // },
  // {
  //   top: { name: 'Теги постачальників', align: 'start', path: 'tags' },
  //   // bottom: { name: 'Емейл', align: 'start', path: 'author.email' },
  //   width: '230px',
  //   action: 'tags',
  // },

  {
    top: { name: 'Коментар', align: 'start', path: 'description' },
    width: '250px',
    action: 'valueByPath',
  },
  {
    top: {
      name: t('timeTo'),
      align: 'center',
      getData: d => d?.timeTo,
    },
    bottom: {
      name: t('timeFrom'),
      align: 'center',
      getData: d => d?.timeFrom,
    },
    width: '150px',
    action: 'dateDbl',
  },
  {
    top: { name: 'Автор', align: 'start', path: 'author.name' },
    bottom: { name: 'Емейл', align: 'start', path: 'author.email' },
    width: '170px',
    action: 'valueByPath',
  },
  {
    top: { name: 'Створено', getData: d => d?.createdAt },
    bottom: { name: 'Оновлено', getData: d => d?.updatedAt },
    width: '170px',
    action: 'dateDbl',
  },
];
export const priceListContentColumns: CellTittleProps<IPriceListItem, DataPath>[] = [
  {
    top: { name: 'Продукт', getData: d => d?.product?.label },
    bottom: { name: t('sku'), getData: d => d?.product?.sku },
    width: '270px',
    getImgPreview: ({ product }, titleProps) => (product?.images ? product?.images[0]?.img_preview : ''),
    action: 'doubleDataWithAvatar',
  },
  {
    bottom: { name: 'Вхідна ціна', getData: d => d?.cost },
    top: { name: 'Вихідна ціна', getData: d => d?.price },
    width: '170px',
    action: 'valueByPath',
  },
  {
    top: { name: 'Комісія, сума', getData: d => d?.commissionAmount },
    bottom: { name: 'Комісія, %', getData: d => d?.commissionPercentage },
    width: '170px',
    action: 'valueByPath',
  },

  {
    top: { name: 'Націнка, сума', getData: d => d?.markupAmount },
    bottom: { name: 'Націнка, %', getData: d => d?.markupPercentage },
    width: '170px',
    action: 'valueByPath',
  },
  {
    top: { name: 'Коментар', align: 'start', path: 'description' },
    width: '150px',
    action: 'valueByPath',
  },

  {
    top: {
      name: t('timeTo'),
      align: 'center',
      getData: d => d?.timeTo,
    },
    bottom: {
      name: t('timeFrom'),
      align: 'center',
      getData: d => d?.timeFrom,
    },
    width: '150px',
    action: 'dateDbl',
  },
  {
    top: { name: 'Автор', align: 'start', path: 'author.name' },
    bottom: { name: 'Емейл', align: 'start', path: 'author.email' },
    width: '150px',
    action: 'valueByPath',
  },
  {
    top: { name: 'Створено', getData: d => d?.createdAt },
    bottom: { name: 'Оновлено', getData: d => d?.updatedAt },
    width: '170px',
    action: 'dateDbl',
  },
];
const arr = [...priceListContentColumns];
arr.splice(0, 1);
export const pricesColumnsForProductReview = arr;
