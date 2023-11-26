import { CellTittleProps } from 'components/TableList/TebleCells/CellTitle';
import { t } from '../lang';
import { IPriceList, IPriceListItem, PriceAmountAndPercentageFieldsKey } from '../types/priceManagement.types';
import { numberWithSpaces } from '../utils/numbers';
import { priceAmountAndPercentageFieldsLabels } from '../utils/tables';

const dateColumn: CellTittleProps = {
  top: { name: t('Updated'), align: 'center', getData: d => d?.createdAt },
  bottom: { name: t('Created'), align: 'center', getData: d => d?.updatedAt },
  width: '170px',
  action: 'dateDbl',
};
export const priceListColumns: CellTittleProps<IPriceList>[] = [
  {
    top: { name: t('label'), path: 'label' },
    bottom: { name: t('type'), path: 'type' },
    width: '210px',
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
    top: { name: 'Теги клієнтів', path: 'tags' },
    // bottom: { name: 'Емейл', path: 'author.email' },
    width: '230px',
    action: 'tags',
  },
  {
    top: { name: 'Теги постачальників', path: 'tags' },
    // bottom: { name: 'Емейл', path: 'author.email' },
    width: '230px',
    action: 'tags',
  },
  {
    top: { name: 'Автор', path: 'author.name' },
    bottom: { name: 'Емейл', path: 'author.email' },
    width: '170px',
    action: 'valueByPath',
  },
  {
    top: { name: 'Коментар', path: 'description' },
    width: '250px',
    action: 'valueByPath',
  },
  dateColumn,
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
    top: { name: t('description'), path: 'description' },
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
    top: { name: t('Author'), path: 'author.name' },
    bottom: { name: t('email'), path: 'author.email' },
    width: '150px',
    action: 'valueByPath',
  },

  dateColumn,
];

export const pricesColumnsForProductReview: CellTittleProps<IPriceListItem>[] = [
  {
    top: { name: t('Variation label'), getData: d => d?.variation?.label },
    // bottom: { name: '',  getData: d => ''},
    getImgPreview: rd => (rd.product?.images ? rd.product?.images[0]?.img_preview : ''),
    width: '170px',
    action: 'doubleDataWithAvatar',
  },
  {
    top: { name: t('SKU'), getData: d => d?.variation?.sku },
    bottom: { name: t('barCode'), getData: d => d?.variation?.barCode },
    width: '170px',
    action: 'valueByPath',
  },

  ...basePriceColumns,
  {
    top: { name: t('Price list'), getData: d => d?.list?.label },
    bottom: { name: t('type'), getData: d => d?.list?.type },
    width: '170px',
    action: 'valueByPath',
  },
  {
    top: {
      name: t('timeTo'),
      align: 'center',
      getData: d => d?.list?.timeTo,
    },
    bottom: {
      name: t('timeFrom'),
      align: 'center',
      getData: d => d?.list?.timeFrom,
    },
    width: '150px',
    action: 'dateDbl',
  },

  dateColumn,
];
