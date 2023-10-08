import { CellTittleProps } from '../components/TableList/TebleCells/CellTitle';
import { IVariationTemplate } from '../redux/products/properties.types';
import t from '../lang';
import { IVariation, IVariationTableData, VariationPropertiesMapInTableData } from '../redux/products/variations.types';

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
