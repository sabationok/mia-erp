import { CellTittleProps } from 'components/TableList/TebleCells/CellTitle';
import t from '../lang';
import { IPriceList, IPriceListItem, PriceListTypeEnum } from '../redux/priceManagement/priceManagement.types';
import { enumToFilterOptions } from '../utils/fabrics';
import numberWithSpaces from '../utils/numbers';

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
export const priceListTypeFilterOptions = enumToFilterOptions(PriceListTypeEnum);

export const priceListColumns: CellTittleProps<IPriceList, DataPath>[] = [
  {
    top: { name: t('label'), align: 'start', path: 'label' },
    bottom: { name: t('type'), align: 'start', path: 'type' },
    width: '210px',
    action: 'valueByPath',
  },

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
    top: { name: 'Вихідна ціна', align: 'end', getData: d => numberWithSpaces(Number(d?.price || 0)) },
    bottom: { name: 'Вхідна ціна', align: 'end', getData: d => numberWithSpaces(Number(d?.cost || 0)) },
    width: '170px',
    action: 'valueByPath',
  },
  {
    top: { name: 'Комісія, сума', align: 'end', getData: d => d?.commissionAmount },
    bottom: { name: 'Комісія, %', align: 'end', getData: d => d?.commissionPercentage },
    width: '170px',
    action: 'valueByPath',
  },

  {
    top: { name: 'Націнка, сума', align: 'end', getData: d => d?.markupAmount },
    bottom: { name: 'Націнка, %', align: 'end', getData: d => d?.markupPercentage },
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

export const pricesColumnsForProductReview: CellTittleProps<IPriceListItem, DataPath>[] = [
  {
    top: { name: 'Вихідна ціна', align: 'end', getData: d => numberWithSpaces(Number(d?.price || 0)) },
    bottom: { name: 'Вхідна ціна', align: 'end', getData: d => numberWithSpaces(Number(d?.cost || 0)) },
    width: '170px',
    action: 'valueByPath',
  },
  {
    top: { name: 'Комісія, сума', align: 'end', getData: d => numberWithSpaces(Number(d?.commissionAmount || 0)) },
    bottom: { name: 'Комісія, %', align: 'end', getData: d => numberWithSpaces(Number(d?.commissionPercentage || 0)) },
    width: '170px',
    action: 'valueByPath',
  },
  {
    top: { name: 'Націнка, сума', align: 'end', getData: d => numberWithSpaces(Number(d?.markupAmount || 0)) },
    bottom: { name: 'Націнка, %', align: 'end', getData: d => numberWithSpaces(Number(d?.markupPercentage || 0)) },
    width: '170px',
    action: 'valueByPath',
  },
  {
    top: { name: 'Знижка, сума', align: 'end', getData: d => numberWithSpaces(Number(d?.discount || 0)) },
    bottom: { name: 'Знижка, %', align: 'end', getData: d => numberWithSpaces(Number(d?.discount || 0)) },
    width: '170px',
    action: 'valueByPath',
  },
  {
    top: { name: 'Бонуси, сума', align: 'end', getData: d => numberWithSpaces(Number(d?.discount || 0)) },
    bottom: { name: 'Бонуси, %', align: 'end', getData: d => numberWithSpaces(Number(d?.discount || 0)) },
    width: '170px',
    action: 'valueByPath',
  },
  {
    top: { name: 'Коментар', align: 'start', path: 'description' },
    width: '150px',
    action: 'valueByPath',
  },
  {
    top: { name: 'Прайс лист', getData: d => d?.list?.label },
    bottom: { name: 'Тип', getData: d => d?.list?.type },
    width: '170px',
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
];
