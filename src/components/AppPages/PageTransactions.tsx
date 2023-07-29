import TableList from 'components/TableList/TableList';
import { takeFullGridArea } from './pagesStyles';
import { transactionsColumns, transactionsSearchParams } from 'data';
import styled from 'styled-components';
import useTransactionsService from 'hooks/useTransactionsService.hook';
import { useEffect, useMemo, useState } from 'react';
import useTrFilterSelectors from 'hooks/useTrFilterSelectors.hook';
import { ITransaction } from '../../redux/transactions/transactions.types';
import { useTrActionsCreator } from '../../hooks/useTrActionsCreator.hook';
import { ITableListProps } from '../TableList/tableTypes.types';
import AppGridPage from './AppGridPage';
import { useTransactionsSelector } from '../../redux/selectors.store';
import { ISortParams } from '../../api';
import { FilterReturnDataType } from '../Filter/AppFilter';
import { PagePathType } from '../../data/pages.data';

type Props = {
  path: PagePathType;
};
const PageTransactions: React.FC<any> = (props: Props) => {
  const service = useTransactionsService();
  const state = useTransactionsSelector();
  const { getAll } = service;
  const filterSelectors = useTrFilterSelectors();
  const actionsCreator = useTrActionsCreator(service);
  const [isLoading, setIsLoading] = useState(false);
  const [sortParams, setSortParams] = useState<ISortParams>();
  const [filterParams, setFilterParams] = useState<FilterReturnDataType>();

  const tableConfig = useMemo(
    (): ITableListProps<ITransaction> => ({
      tableData: state.transactions,
      tableTitles: transactionsColumns,
      tableSortParams: transactionsSearchParams.filter(el => el.sort),
      filterSelectors,
      isFilter: true,
      isSearch: true,
      footer: true,
      checkBoxes: true,
      actionsCreator,
      onFilterSubmit: filterParams => {
        setFilterParams(filterParams);
        getAll({ data: { refresh: true, query: { filterParams, sortParams } }, onLoading: setIsLoading });
      },
      handleTableSort: (param, sortOrder) => {
        setSortParams({ dataPath: param.dataPath, sortOrder });
        getAll({
          data: { refresh: true, query: { sortParams: { dataPath: param.dataPath, sortOrder }, filterParams } },
          onLoading: setIsLoading,
        });
      },
    }),
    [actionsCreator, filterParams, filterSelectors, getAll, sortParams, state.transactions]
  );

  useEffect(() => {
    if (sortParams || filterParams) {
      return;
    }

    if (!sortParams && !filterParams) {
      if (state.transactions.length === 0) {
        getAll({
          data: { refresh: true },
          onLoading: setIsLoading,
        });
      }
    }
  }, [filterParams, getAll, sortParams, state.transactions.length]);
  return (
    <AppGridPage path={props.path}>
      <Page>
        <TableList {...tableConfig} isLoading={isLoading} />
      </Page>
    </AppGridPage>
  );
};

const Page = styled.div`
  ${takeFullGridArea}
`;

export default PageTransactions;
