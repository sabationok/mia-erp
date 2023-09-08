import { IVariation, IVariationTemplate } from '../redux/products/products.types';
import { CellTittleProps } from '../components/TableList/TebleCells/CellTitle';

export function createTableTitlesFromTemplate(
  template?: IVariationTemplate
): CellTittleProps<IVariation>[] | undefined {
  if (template && template?.childrenList) {
    return template?.childrenList?.map(p => {
      const title: CellTittleProps<IVariation> = {
        top: { name: p?.label || '---' },
        width: `${(p?.label && p?.label.length * 10 > 120 ? p?.label.length * 10 : 120) + 20}px`,
        action: 'valueByPath',
      };
      return title;
    });
  }
}
