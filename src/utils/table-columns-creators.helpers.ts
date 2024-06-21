import { CellTittleProps } from '../components/TableList/TebleCells/CellTitle';
import { HasAuthor, HasEditor, IBase, WithPeriod } from '../types/utils.types';
import { t } from '../lang';

export const buildTableColumnCreator = <TData>(column: CellTittleProps<TData>) => {
  return () => column as never;
};
export const createDateColumn = buildTableColumnCreator<Partial<IBase>>({
  top: { name: t('Updated'), align: 'center', getData: d => d?.createdAt },
  bottom: { name: t('Created'), align: 'center', getData: d => d?.updatedAt },
  width: '170px',
  action: 'dateDbl',
});
export const createAuthorColumn = buildTableColumnCreator<Partial<HasAuthor>>({
  top: { name: t('Author'), getData: rd => rd.author?.user?.email || rd.author?.user?.email || rd.author?.user?.email },
  bottom: {
    name: t('Permission holder'),
    getData: rd =>
      (rd.author?.user && 'user') ||
      (rd.author?.customer && 'customer') ||
      (rd.author?.integration && 'integration') ||
      '---',
  },
  width: '150px',
  action: 'valueByPath',
});

export const createEditorColumn = buildTableColumnCreator<Partial<HasEditor>>({
  top: { name: t('Editor'), getData: rd => rd.editor?.user?.email || rd.editor?.user?.email || rd.editor?.user?.email },
  bottom: {
    name: t('Permission holder'),
    getData: rd =>
      (rd.editor?.user && 'user') ||
      (rd.editor?.customer && 'customer') ||
      (rd.editor?.integration && 'integration') ||
      '---',
  },
  width: '150px',
  action: 'valueByPath',
});

export const createTimePeriodColumn = buildTableColumnCreator<IBase & WithPeriod>({
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
});
