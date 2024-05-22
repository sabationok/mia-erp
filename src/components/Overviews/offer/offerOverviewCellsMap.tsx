import { OverviewCellProps } from '../components/overview-types';
import { OfferEntity } from '../../../types/offers/offers.types';
import { t } from '../../../lang';
import { IMeasurement } from '../../../types/utils.types';
import { enumToFilterOptions, toAppDateFormat } from '../../../utils';
import { isString } from 'lodash';
import {
  OfferOverviewCategoriesCell,
  OfferOverviewDefaultsCell,
  OfferOverviewImagesCell,
  OfferOverviewStaticProperties,
} from '../components';

export enum ProductOverviewTabsEnum {
  General = 'General',
  Properties = 'Properties',
  Defaults = 'Defaults',
  Images = 'Images',
  Futures = 'Futures',
  Cms = 'Cms',
}

export const ProductOverviewTabsList = enumToFilterOptions(ProductOverviewTabsEnum);

const offerOverviewCells: OverviewCellProps<OfferEntity, ProductOverviewTabsEnum>[] = [
  {
    title: t('Label'),
    getValue: data => data?.label,
    gridArea: 'label',
    tab: ProductOverviewTabsEnum.General,
  },
  {
    title: t('status'),
    getValue: data => data?.approved as string | null | undefined,
    gridArea: 'approved',
    tab: ProductOverviewTabsEnum.General,
  },
  {
    title: t('Type'),
    getValue: data => data?.type,
    gridArea: 'type',
    tab: ProductOverviewTabsEnum.General,
  },
  {
    title: t('SKU'),
    getValue: data => data?.sku,
    gridArea: 'sku',
    tab: ProductOverviewTabsEnum.General,
  },
  {
    title: t('Bar-code'),
    getValue: data => data?.barCode,
    gridArea: 'barCode',
    tab: ProductOverviewTabsEnum.General,
  },

  {
    title: t('Categories'),
    CellComponent: OfferOverviewCategoriesCell,
    gridArea: 'categories',
    tab: ProductOverviewTabsEnum.General,
  },

  {
    title: t('Brand'),
    getValue: data => data?.brand?.label,
    gridArea: 'brand',
    tab: ProductOverviewTabsEnum.General,
  },
  {
    title: t('Measurement'),
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
    getValue: data => data?.description,
    gridArea: 'description',
    tab: ProductOverviewTabsEnum.General,
  },

  // * FUTURES

  {
    title: t('Negative sales'),
    getValue: product => (product?.futures?.negativeSale ? 'Yes' : 'No'),
    gridArea: 'reservation',
    tab: ProductOverviewTabsEnum.Futures,
  },

  {
    title: t('Reservation'),
    getValue: product => (product?.futures?.reservation?.isAvailable ? 'Yes' : 'No'),
    gridArea: 'reservation',
    tab: ProductOverviewTabsEnum.Futures,
  },

  {
    title: t('Custom production'),
    getValue: product => (product?.futures?.customProduction?.isAvailable ? 'Yes' : 'No'),
    gridArea: 'customProduction',
    tab: ProductOverviewTabsEnum.Futures,
  },

  {
    title: t('Custom order'),
    getValue: product => (product?.futures?.customOrder?.isAvailable ? 'Yes' : 'No'),
    gridArea: 'customOrder',
    tab: ProductOverviewTabsEnum.Futures,
  },

  {
    title: t('Pre-order'),
    getValue: product => (product?.futures?.preOrder?.isAvailable ? 'Yes' : 'No'),
    gridArea: 'preOrder',
    tab: ProductOverviewTabsEnum.Futures,
  },

  {
    title: t('Is promo'),
    getValue: data => data?.futures?.isPromo,
    gridArea: 'isPromo',
    tab: ProductOverviewTabsEnum.Futures,
  },

  // * PROPERTIES
  {
    title: t('Properties'),
    CellComponent: OfferOverviewStaticProperties,
    gridArea: 'properties',
    tab: ProductOverviewTabsEnum.Properties,
  },

  // * DEFAULTS
  {
    title: t('Default values'),
    CellComponent: OfferOverviewDefaultsCell,
    gridArea: 'defaults',
    tab: ProductOverviewTabsEnum.Defaults,
  },

  {
    title: t('Created by / Date / Time'),
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
    CellComponent: OfferOverviewImagesCell,
    gridArea: 'images',
    tab: ProductOverviewTabsEnum.Images,
  },
];

export const getOfferOverviewCellsMap = (): Record<
  ProductOverviewTabsEnum | string,
  OverviewCellProps<OfferEntity, ProductOverviewTabsEnum>[]
> => {
  const offerOverviewCellsMap: Record<
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
  return offerOverviewCellsMap;
};
