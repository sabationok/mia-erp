import { CellTittleProps } from '../components/TableList/TebleCells/CellTitle';
import { HasAuthor, IBase, WithPeriod } from '../types/utils.types';
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
  top: { name: t('Author'), getData: rd => rd.author?.user?.email },
  bottom: { name: t('email'), path: 'author.email' },
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
