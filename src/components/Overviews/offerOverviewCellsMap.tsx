import { OverviewCellProps } from './components/overview-types';
import { OfferEntity } from '../../types/offers/offers.types';
import { t } from '../../lang';
import { OverviewCells } from './components';
import { IMeasurement } from '../../types/utils.types';
import { enumToFilterOptions, toAppDateFormat } from '../../utils';
import { isString } from 'lodash';

export enum ProductOverviewTabsEnum {
  General = 'General',
  Properties = 'Properties',
  Defaults = 'Defaults',
  Images = 'Images',
  Futures = 'Futures',
  Cms = 'Cms',
}

console.log('OverviewCells', OverviewCells);

export const ProductOverviewTabsList = enumToFilterOptions(ProductOverviewTabsEnum);

const offerOverviewCells: OverviewCellProps<OfferEntity, ProductOverviewTabsEnum>[] = [
  {
    title: t('Label'),
    CellComponent: OverviewCells.Text,
    getValue: data => data?.label,
    gridArea: 'label',
    tab: ProductOverviewTabsEnum.General,
  },
  {
    title: t('status'),
    CellComponent: OverviewCells.Text,
    getValue: data => data?.approved as string | null | undefined,
    gridArea: 'approved',
    tab: ProductOverviewTabsEnum.General,
  },
  {
    title: t('Type'),
    CellComponent: OverviewCells.Text,
    getValue: data => data?.type,
    gridArea: 'type',
    tab: ProductOverviewTabsEnum.General,
  },
  {
    title: t('SKU'),
    CellComponent: OverviewCells.Text,
    getValue: data => data?.sku,
    gridArea: 'sku',
    tab: ProductOverviewTabsEnum.General,
  },
  {
    title: t('Bar-code'),
    CellComponent: OverviewCells.Text,
    getValue: data => data?.barCode,
    gridArea: 'barCode',
    tab: ProductOverviewTabsEnum.General,
  },

  {
    title: t('Categories'),
    CellComponent: OverviewCells.OfferCategories,
    gridArea: 'categories',
    tab: ProductOverviewTabsEnum.General,
  },

  {
    title: t('Brand'),
    CellComponent: OverviewCells.Text,
    getValue: data => data?.brand?.label,
    gridArea: 'brand',
    tab: ProductOverviewTabsEnum.General,
  },
  {
    title: t('Measurement'),
    CellComponent: OverviewCells.Text,
    gridArea: 'measurement',
    getValue: product => {
      try {
        const data: IMeasurement = product?.measurement ? JSON.parse(product?.measurement as string) : {};
        const arr = [
          `${t('unit')}: ${data?.unit || 0}`,
          `${t('min')}: ${data?.min || 0}`,
          `${t('max')}: ${data?.max || 0}`,
          `${t('step')}: ${data?.step || 0}`,
        ];

        return arr.join(' | ');
      } catch (e) {
        return '';
      }
    },
    tab: ProductOverviewTabsEnum.General,
  },
  {
    title: t('Description'),
    CellComponent: OverviewCells.Text,
    getValue: data => data?.description,
    gridArea: 'description',
    tab: ProductOverviewTabsEnum.General,
  },

  // * FUTURES

  {
    title: t('Negative sales'),
    CellComponent: OverviewCells.Text,
    getValue: product => (product?.futures?.negativeSale ? 'Yes' : 'No'),
    gridArea: 'reservation',
    tab: ProductOverviewTabsEnum.Futures,
  },

  {
    title: t('Reservation'),
    CellComponent: OverviewCells.Text,
    getValue: product => (product?.futures?.reservation?.isAvailable ? 'Yes' : 'No'),
    gridArea: 'reservation',
    tab: ProductOverviewTabsEnum.Futures,
  },

  {
    title: t('Custom production'),
    CellComponent: OverviewCells.Text,
    getValue: product => (product?.futures?.customProduction?.isAvailable ? 'Yes' : 'No'),
    gridArea: 'customProduction',
    tab: ProductOverviewTabsEnum.Futures,
  },

  {
    title: t('Custom order'),
    CellComponent: OverviewCells.Text,
    getValue: product => (product?.futures?.customOrder?.isAvailable ? 'Yes' : 'No'),
    gridArea: 'customOrder',
    tab: ProductOverviewTabsEnum.Futures,
  },

  {
    title: t('Pre-order'),
    CellComponent: OverviewCells.Text,
    getValue: product => (product?.futures?.preOrder?.isAvailable ? 'Yes' : 'No'),
    gridArea: 'preOrder',
    tab: ProductOverviewTabsEnum.Futures,
  },

  {
    title: t('Is promo'),
    CellComponent: OverviewCells.Text,
    getValue: data => data?.futures?.isPromo,
    gridArea: 'isPromo',
    tab: ProductOverviewTabsEnum.Futures,
  },

  // * PROPERTIES
  {
    title: t('Properties'),
    CellComponent: OverviewCells.OfferStaticProperties,
    gridArea: 'properties',
    tab: ProductOverviewTabsEnum.Properties,
  },

  // * DEFAULTS
  {
    title: t('Default values'),
    CellComponent: OverviewCells.OfferDefaults,
    gridArea: 'defaults',
    tab: ProductOverviewTabsEnum.Defaults,
  },

  {
    title: t('Created by / Date / Time'),
    CellComponent: OverviewCells.Text,
    getValue: product =>
      product?.author
        ? `${product?.author?.user?.email} / ${
            product?.createdAt && isString(product?.createdAt) ? toAppDateFormat(Date.parse(product?.createdAt)) : ''
          }`
        : null,
    gridArea: 'created',
    tab: ProductOverviewTabsEnum.General,
  },
  {
    title: t('Updated by / Date / Time'),
    CellComponent: OverviewCells.Text,
    getValue: product =>
      product?.editor
        ? `${product?.editor?.user?.email} / ${
            product?.updatedAt && isString(product?.updatedAt) ? toAppDateFormat(Date.parse(product?.updatedAt)) : ''
          }`
        : null,
    gridArea: 'updated',
    tab: ProductOverviewTabsEnum.General,
  },

  {
    title: t('Images'),
    CellComponent: OverviewCells.OfferImages,
    gridArea: 'images',
    tab: ProductOverviewTabsEnum.Images,
  },
];

export const offerOverviewCellsMap: Record<
  ProductOverviewTabsEnum | string,
  OverviewCellProps<OfferEntity, ProductOverviewTabsEnum>[]
> = {};
offerOverviewCells.forEach(item => {
  const tab = item.tab;
  if (tab) {
    if (offerOverviewCellsMap[tab]) {
      offerOverviewCellsMap[tab].push(item);
    } else {
      offerOverviewCellsMap[tab] = [item];
    }
  }
});
