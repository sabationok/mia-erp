import { CellTittleProps } from '../components/TableList/TebleCells/CellTitle';
import { PropertyEntity } from '../types/offers/properties.types';
import { t } from '../i18e';
import { VariationEntity } from '../types/offers/variations.types';
import { AmountAndPercentage, PriceAmountAndPercentageFields } from '../types/price-management/price-management.types';
import { WarehouseInventoryEntity } from '../types/warehousing';
import { numberWithSpaces } from './numbers';
import { ITableAction, ITableListContext } from '../components/TableList/tableTypes.types';
import { NavigateFunction } from 'react-router/dist/lib/hooks';
import { IModalProviderContext } from '../Providers/ModalProvider/ModalProvider';

export interface TableActionsBuilderControls<Service = any, Extra = any> {
  // ctx: ITableListContext<TData>;
  navigate?: NavigateFunction;
  service: Service;
  modalService: IModalProviderContext;
  extra?: Extra;
}
export type TableActionCreator<Service = any, TData = any, Extra = any, Name extends string = any> = (
  params: TableActionsBuilderControls<Service, Extra> & { ctx: ITableListContext<TData> }
) => ITableAction<Name>;
export class TableActionsBuilder<Service = any, TData = any, Extra = any, Name extends string = any> {
  private map: Map<Name, TableActionCreator<Service, TData, Extra, Name>> = new Map([]);

  // constructor(private readonly controls: TableActionsBuilderControls<Service, TData, Extra>) {}
  add(name: Name, creator: TableActionCreator<Service, TData, Extra, Name>) {
    this.map.set(name, creator);
    return this;
  }
  activate(controls: TableActionsBuilderControls<Service, Extra>) {
    return (ctx: ITableListContext<TData>) => this.build(ctx, controls);
  }
  private build(ctx: ITableListContext<TData>, controls: TableActionsBuilderControls<Service, Extra>) {
    return Array.from(this.map.values()).map(creator => creator({ ctx, ...controls }));
  }
}

export const transformVariationTableData = (variation: VariationEntity): VariationEntity => {
  let propertiesMap: Record<string, any> = {};

  variation.properties?.map(value => {
    if (value.parent?._id) {
      propertiesMap = { ...propertiesMap, [value.parent?._id]: value };
    }
    return value;
  });

  return { ...variation, propertiesMap };
};

export function createTableTitlesFromProperties(
  properties?: PropertyEntity[]
): CellTittleProps<VariationEntity>[] | undefined {
  let titles: CellTittleProps<VariationEntity>[] = [];
  if (properties?.length) {
    titles = properties
      ?.filter(el => el?.isSelectable)
      ?.map(p => {
        const title: CellTittleProps<VariationEntity> = {
          top: {
            name: p?.label || '---',
            dataKey: p?._id,
            getData: (rd, t) => {
              if (t?.top?.dataKey && rd.propertiesMap?.[t?.top?.dataKey]) {
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
      getImgPreview: rd => (rd.offer?.images ? rd.offer?.images[0]?.img_preview : ''),
      width: '270px',
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
  // cashback: {
  //   amount: t('Commission, amount'),
  //   percentage: t('Commission, %'),
  // },
  // discount: {
  //   amount: t('Discount, amount'),
  //   percentage: t('Discount, %'),
  // },
  markup: {
    amount: t('Markup, amount'),
    percentage: t('Markup, %'),
  },
  commission: {
    amount: t('Commission, amount'),
    percentage: t('Commission, %'),
  },
  // bonus: {
  //   amount: t('Bonus, amount'),
  //   percentage: t('Bonus, %'),
  // },
  // vat: {
  //   amount: t('Vat, amount'),
  //   percentage: t('Vat, %'),
  // },
  // tax: {
  //   amount: t('Tax, amount'),
  //   percentage: t('Tax, %'),
  // },
};

export function createPriceColumnForBatch(
  name: keyof PriceAmountAndPercentageFields,
  width?: string
): CellTittleProps<WarehouseInventoryEntity> {
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
