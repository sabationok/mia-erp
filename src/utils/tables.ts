import { CellTittleProps } from '../components/TableList/TebleCells/CellTitle';
import { IVariationTemplate } from '../redux/products/properties.types';
import { IVariation } from '../redux/products/variations.types';
import t from '../lang';

export function createTableTitlesFromTemplate(
  template?: IVariationTemplate
): CellTittleProps<IVariation>[] | undefined {
  if (template && template?.childrenList) {
    const titles = template?.childrenList?.map(p => {
      const title: CellTittleProps<IVariation> = {
        top: { name: p?.label || '---' },
        width: `${(p?.label && p?.label.length * 10 > 120 ? p?.label.length * 10 : 120) + 20}px`,
        action: 'valueByPath',
      };
      return title;
    });

    return [
      ...titles,
      {
        top: {
          name: 'Автор',
          align: 'start',
          path: 'author.name',
          // getData: d => d?.timeTo,
        },
        bottom: {
          name: 'Емейл',
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
        top: { name: 'Створено', getData: d => d?.createdAt },
        bottom: { name: 'Оновлено', getData: d => d?.updatedAt },
        width: '170px',
        action: 'dateDbl',
      },
    ];
  }
}
