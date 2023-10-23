import { CellTittleProps } from 'components/TableList/TebleCells/CellTitle';
import { t } from '../lang';
import {
  IPriceList,
  IPriceListItem,
  PriceAmountAndPercentageFieldsKey,
} from '../redux/priceManagement/priceManagement.types';
import numberWithSpaces from '../utils/numbers';
import { priceAmountAndPercentageFieldsLabels } from '../utils/tables';

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

export function createColumnForPriceEntity(
  name: PriceAmountAndPercentageFieldsKey,
  width?: string
): CellTittleProps<IPriceListItem> {
  const topLabel = priceAmountAndPercentageFieldsLabels[name]?.amount;
  const countedWidth = width || `${topLabel?.length * 12}px`;

  return {
    top: {
      name: topLabel,
      align: 'end',
      getData: d => numberWithSpaces(d[name]?.amount),
    },
    bottom: {
      name: priceAmountAndPercentageFieldsLabels[name]?.percentage,
      align: 'end',
      getData: d => numberWithSpaces(d[name]?.percentage),
    },
    width: countedWidth,
    action: 'valueByPath',
  };
}
const keys: PriceAmountAndPercentageFieldsKey[] = [
  'commission',
  'markup',
  'bonus',
  'cashback',
  'discount',
  'tax',
  'vat',
];

const basePriceColumns: CellTittleProps<IPriceListItem>[] = [
  {
    top: {
      name: t('Price OUT'),
      align: 'end',
      getData: d => numberWithSpaces(d?.out),
    },
    bottom: { name: t('Price IN'), align: 'end', getData: d => numberWithSpaces(null) },
    width: '170px',
    action: 'valueByPath',
  },
  ...keys.map(k => createColumnForPriceEntity(k)),
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
    getImgPreview: ({ product }) => (product?.images ? product?.images[0]?.img_preview : ''),
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
