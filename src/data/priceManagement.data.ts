import { CellTittleProps } from 'components/TableList/TebleCells/CellTitle';
import { t } from '../lang';
import { IPriceList, IPriceListItem } from '../redux/priceManagement/priceManagement.types';
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
export const priceListColumns: CellTittleProps<IPriceList>[] = [
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

const basePriceColumns: CellTittleProps<IPriceListItem>[] = [
  {
    top: { name: t('Price OUT'), align: 'end', getData: d => numberWithSpaces(Number(d?.price || 0)) },
    bottom: { name: t('Price IN'), align: 'end', getData: d => numberWithSpaces(Number(d?.cost || 0)) },
    width: '170px',
    action: 'valueByPath',
  },
  {
    top: {
      name: t('Commission, amount'),
      align: 'end',
      getData: d => numberWithSpaces(Number(d?.commissionAmount || 0)),
    },
    bottom: {
      name: t('Commission, %'),
      align: 'end',
      getData: d => numberWithSpaces(Number(d?.commissionPercentage || 0)),
    },
    width: '170px',
    action: 'valueByPath',
  },
  {
    top: { name: t('Markup, amount'), align: 'end', getData: d => numberWithSpaces(Number(d?.markupAmount || 0)) },
    bottom: { name: t('Markup, %'), align: 'end', getData: d => numberWithSpaces(Number(d?.markupPercentage || 0)) },
    width: '170px',
    action: 'valueByPath',
  },
  {
    top: { name: t('Discount, amount'), align: 'end', getData: d => numberWithSpaces(Number(d?.discountAmount || 0)) },
    bottom: {
      name: t('Discount, %'),
      align: 'end',
      getData: d => numberWithSpaces(Number(d?.discountPercentage || 0)),
    },
    width: '170px',
    action: 'valueByPath',
  },
  {
    top: { name: t('Bonus, amount'), align: 'end', getData: d => numberWithSpaces(Number(d?.cashbackAmount || 0)) },
    bottom: { name: t('Bonus, %'), align: 'end', getData: d => numberWithSpaces(Number(d?.cashbackPercentage || 0)) },
    width: '170px',
    action: 'valueByPath',
  },
  {
    top: { name: t('Cashback, amount'), align: 'end', getData: d => numberWithSpaces(Number(d?.cashbackAmount || 0)) },
    bottom: {
      name: t('Cashback, %'),
      align: 'end',
      getData: d => numberWithSpaces(Number(d?.cashbackPercentage || 0)),
    },
    width: '170px',
    action: 'valueByPath',
  },
  {
    top: { name: t('comment'), align: 'start', path: 'description' },
    width: '150px',
    action: 'valueByPath',
  },
];

export const priceListContentColumns: CellTittleProps<IPriceListItem>[] = [
  {
    top: { name: t('Product label'), getData: d => d?.product?.label },
    bottom: { name: t('Variation label'), getData: d => d?.variation?.label },
    width: '270px',
    getImgPreview: ({ product }, titleProps) => (product?.images ? product?.images[0]?.img_preview : ''),
    action: 'doubleDataWithAvatar',
  },
  {
    top: { name: t('SKU'), getData: d => d?.product?.sku },
    bottom: { name: t('SKU'), getData: d => d?.variation?.sku },
    width: '150px',
    action: 'valueByPath',
  },
  {
    top: { name: t('barCode'), getData: d => d?.product?.barCode },
    bottom: { name: t('barCode'), getData: d => d?.variation?.barCode },
    width: '150px',
    action: 'valueByPath',
  },

  ...basePriceColumns,
  {
    top: { name: t('Author'), align: 'start', path: 'author.name' },
    bottom: { name: t('email'), align: 'start', path: 'author.email' },
    width: '150px',
    action: 'valueByPath',
  },
  {
    top: { name: t('created'), getData: d => d?.createdAt },
    bottom: { name: t('updated'), getData: d => d?.updatedAt },
    width: '170px',
    action: 'dateDbl',
  },
];

export const pricesColumnsForProductReview: CellTittleProps<IPriceListItem>[] = [
  {
    top: { name: t('Variation label'), getData: d => d?.variation?.label },
    // bottom: { name: '',  getData: d => ''},
    width: '170px',
    action: 'doubleDataWithAvatar',
  },
  {
    top: { name: t('SKU'), getData: d => d?.variation?.sku },
    bottom: { name: t('barCode'), getData: d => d?.variation?.barCode },
    width: '170px',
    action: 'valueByPath',
  },
  {
    top: { name: t('Price list'), getData: d => d?.list?.label },
    bottom: { name: t('type'), getData: d => d?.list?.type },
    width: '170px',
    action: 'valueByPath',
  },
  ...basePriceColumns,
  // {
  //   top: {
  //     name: t('timeTo'),
  //     align: 'center',
  //     getData: d => `${d?.list?.timeTo}`,
  //   },
  //   bottom: {
  //     name: t('timeFrom'),
  //     align: 'center',
  //     getData: d => `${d?.list?.timeFrom}`,
  //   },
  //   width: '150px',
  //   action: 'dateDbl',
  // },
];
