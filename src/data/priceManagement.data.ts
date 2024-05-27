import { CellTittleProps } from 'components/TableList/TebleCells/CellTitle';
import { t } from '../lang';
import {
  PriceAmountAndPercentageFieldsKey,
  PriceEntity,
  PriceListEntity,
} from '../types/price-management/price-management.types';
import { priceAmountAndPercentageFieldsLabels } from '../utils/tables';
import { toPrice } from '../utils/numbers';
import { enumToFilterOptions } from '../utils';
import {
  DiscountThresholdTypeEnum,
  DiscountValueTypeEnum,
  PriceBonusProviderEnum,
  PriceDiscountType,
  PriceDiscountVolumeType,
} from '../types/price-management/discounts';

export const PriceDiscountTypeOptions = enumToFilterOptions(PriceDiscountType, { labelPrefix: 'Discount' });
export const PriceDiscountProviderOptions = enumToFilterOptions(PriceBonusProviderEnum, { labelPrefix: 'Discount' });
export const PriceDiscountValueTypeOptions = enumToFilterOptions(DiscountValueTypeEnum, { labelPrefix: 'Discount' });
export const PriceDiscountVolumeTypeOptions = enumToFilterOptions(PriceDiscountVolumeType, { labelPrefix: 'Discount' });
export const PriceDiscountThresholdTypeOptions = enumToFilterOptions(DiscountThresholdTypeEnum, {
  labelPrefix: 'Discount_threshold_type',
});

export const DiscountFilters = {
  Type: PriceDiscountTypeOptions,
  BalanceProvider: PriceDiscountProviderOptions,
  ValueType: PriceDiscountValueTypeOptions,
  VolumeType: PriceDiscountVolumeTypeOptions,
  ThresholdType: PriceDiscountThresholdTypeOptions,
};

const dateColumn: CellTittleProps = {
  top: { name: t('Updated'), align: 'center', getData: d => d?.createdAt },
  bottom: { name: t('Created'), align: 'center', getData: d => d?.updatedAt },
  width: '170px',
  action: 'dateDbl',
};
export const priceListColumns: CellTittleProps<PriceListEntity>[] = [
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

export function createColumnForPriceEntity<Type extends PriceEntity = any>(
  name: PriceAmountAndPercentageFieldsKey,
  width?: string
): CellTittleProps<Type> {
  const topLabel = priceAmountAndPercentageFieldsLabels[name]?.amount;
  const countedWidth = width || `${topLabel?.length * 12}px`;

  return {
    top: {
      name: topLabel,
      align: 'end',
      getData: d => toPrice(d[name]?.amount),
    },
    bottom: {
      name: priceAmountAndPercentageFieldsLabels[name]?.percentage,
      align: 'end',
      getData: d => toPrice(d[name]?.percentage),
    },
    width: countedWidth,
    action: 'valueByPath',
  };
}
const keys: PriceAmountAndPercentageFieldsKey[] = [
  'commission',
  'markup',
  // 'bonus',
  // 'cashback',
  // 'discount',
  // 'tax',
  // 'vat',
];

export const basePriceColumns: CellTittleProps<PriceEntity>[] = [
  {
    top: {
      name: t('Price OUT'),
      align: 'end',
      getData: d => toPrice(d?.out),
    },
    bottom: { name: t('Price IN'), align: 'end', getData: d => toPrice(d?.in) },
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

export function getBasePriceColumns<Type extends PriceEntity = any>(): CellTittleProps<Type>[] {
  return [
    {
      top: {
        name: t('Price OUT'),
        align: 'end',
        getData: d => toPrice(d?.out),
      },
      bottom: { name: t('Price IN'), align: 'end', getData: d => toPrice(d?.in) },
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
}

export const pricesColumns: CellTittleProps<PriceEntity>[] = [
  {
    top: { name: t('Offer label'), getData: d => d?.offer?.label },
    bottom: { name: t('Variation label'), getData: d => d?.variation?.label },
    width: '270px',
    getImgPreview: row => (row?.offer?.images ? row?.offer?.images[0]?.img_preview : row?.variation?.imgPreview || ''),
    action: 'doubleDataWithAvatar',
  },

  ...basePriceColumns,
  {
    top: { name: t('SKU'), getData: d => d?.offer?.sku },
    bottom: { name: t('SKU'), getData: d => d?.variation?.sku },
    width: '150px',
    action: 'valueByPath',
  },
  {
    top: { name: t('barCode'), getData: d => d?.offer?.barCode },
    bottom: { name: t('barCode'), getData: d => d?.variation?.barCode },
    width: '150px',
    action: 'valueByPath',
  },

  {
    top: { name: t('Author'), path: 'author.name' },
    bottom: { name: t('email'), path: 'author.email' },
    width: '150px',
    action: 'valueByPath',
  },
  dateColumn,
];

export const pricesColumnsForProductReview: CellTittleProps<PriceEntity>[] = [
  {
    top: { name: t('Label'), getData: d => d?.variation?.label ?? d?.offer?.label },
    // bottom: { name: '',  getData: d => ''},
    getImgPreview: rd => (rd.offer?.images ? rd.offer?.images[0]?.img_preview : rd.variation?.imgPreview),
    width: '170px',
    action: 'doubleDataWithAvatar',
  },
  {
    top: { name: t('SKU'), getData: d => d?.variation?.sku ?? d?.offer?.sku },
    bottom: { name: t('barCode'), getData: d => d?.variation?.barCode ?? d?.offer?.barCode },
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
