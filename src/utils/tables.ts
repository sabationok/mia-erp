import { CellTittleProps } from '../components/TableList/TebleCells/CellTitle';
import { IVariationTemplate } from '../redux/products/properties.types';
import { t } from '../lang';
import { IVariation, IVariationTableData, VariationPropertiesMapInTableData } from '../redux/products/variations.types';
import { AmountAndPercentage, PriceAmountAndPercentageFields } from '../redux/priceManagement/priceManagement.types';
import { IProductInventory } from '../redux/warehouses/warehouses.types';
import numberWithSpaces from './numbers';

export const transformVariationTableData = (variation: IVariation): IVariationTableData => {
  let propertiesMap: VariationPropertiesMapInTableData = {};

  variation.properties?.map(value => {
    if (value.parent?._id) {
      propertiesMap = { ...propertiesMap, [value.parent?._id]: value };
    }
    return value;
  });

  return { ...variation, propertiesMap };
};

export function createTableTitlesFromTemplate(
  template?: IVariationTemplate
): CellTittleProps<IVariationTableData>[] | undefined {
  let titles: CellTittleProps<IVariationTableData>[] = [];
  if (template && template?.childrenList) {
    titles = template?.childrenList
      ?.filter(el => el?.isSelectable)
      ?.map(p => {
        const title: CellTittleProps<IVariationTableData> = {
          top: {
            name: p?.label || '---',
            dataKey: p?._id,
            getData: (rd, t) => {
              if (t?.top?.dataKey && rd.propertiesMap[t?.top?.dataKey]) {
                const value = rd.propertiesMap[t?.top?.dataKey];
                return value?.label;
              }
              return '---';
            },
          },
          width: `${(p?.label && p?.label.length * 10 > 120 ? p?.label.length * 10 : 120) + 20}px`,
          action: 'valueByPath',
        };
        return title;
      });
  }
  return [
    {
      top: {
        name: t('label'),
        align: 'start',
        getData: d => d?.label,
      },
      width: '200px',
      action: 'doubleDataWithAvatar',
    },
    {
      top: {
        name: t('SKU'),
        align: 'start',
        getData: d => d?.sku,
      },
      bottom: {
        name: t('barCode'),
        align: 'start',
        getData: d => d?.barCode,
      },
      width: '170px',
      action: 'valueByPath',
    },
    ...titles,
    {
      top: {
        name: t('author'),
        align: 'start',
        path: 'author.name',
        // getData: d => d?.timeTo,
      },
      bottom: {
        name: t('email'),
        align: 'start',
        path: 'author.email',
        // getData: d => d?.timeTo,
      },
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
      top: { name: t('created'), getData: d => d?.createdAt },
      bottom: { name: t('updated'), getData: d => d?.updatedAt },
      width: '170px',
      action: 'dateDbl',
    },
  ];
}

export const priceAmountAndPercentageFieldsLabels: Record<
  keyof PriceAmountAndPercentageFields,
  Record<keyof AmountAndPercentage, string>
> = {
  cashback: {
    amount: t('Commission, amount'),
    percentage: t('Commission, %'),
  },
  discount: {
    amount: t('Discount, amount'),
    percentage: t('Discount, %'),
  },
  markup: {
    amount: t('Markup, amount'),
    percentage: t('Markup, %'),
  },
  commission: {
    amount: t('Markup, amount'),
    percentage: t('Markup, %'),
  },
  bonus: {
    amount: t('Bonus, amount'),
    percentage: t('Bonus, %'),
  },
  vat: {
    amount: t('Vat, amount'),
    percentage: t('Vat, %'),
  },
  tax: {
    amount: t('Tax, amount'),
    percentage: t('Tax, %'),
  },
};

export function createPriceColumnForBatch(
  name: keyof PriceAmountAndPercentageFields,
  width?: string
): CellTittleProps<IProductInventory> {
  return {
    top: {
      name: priceAmountAndPercentageFieldsLabels[name]?.amount,
      align: 'end',
      getData: d => numberWithSpaces(Number(d?.price ? d?.price[name]?.amount : 0)),
    },
    bottom: {
      name: priceAmountAndPercentageFieldsLabels[name]?.percentage,
      align: 'end',
      getData: d => numberWithSpaces(Number(d?.price ? d?.price[name]?.percentage : 0)),
    },
    width: width || '170px',
    action: 'valueByPath',
  };
}
