import TableList from 'components/TableList/TableList';
import { takeFullGridArea } from './pagesStyles';
import { transactionsColumns, transactionsSearchParams } from 'data';
import styled from 'styled-components';
import useTransactionsService from 'redux/transactions/useTransactionsService.hook';
import { useEffect, useMemo, useState } from 'react';
import useTrFilterSelectors from 'redux/transactions/useTrFilterSelectors.hook';
import { ITransaction } from '../../redux/transactions/transactions.types';
import { useTrActionsCreator } from '../../redux/transactions/useTrActionsCreator.hook';
import { ITableListProps } from '../TableList/tableTypes.types';
import AppGridPage from './AppGridPage';
import useDirectoriesServiceHook from '../../redux/directories/useDirectoriesService.hook';
import { ApiDirType } from '../../redux/APP_CONFIGS';
import { useTransactionsSelector } from '../../redux/selectors.store';
import { ISortParams } from '../../api';

type Props = {
  path: string;
};
const PageTransactions: React.FC<any> = ({ path }: Props) => {
  const service = useTransactionsService();
  const state = useTransactionsSelector();
  const { getAll } = service;
  const filterSelectors = useTrFilterSelectors();
  const actionsCreator = useTrActionsCreator(service);
  const [isLoading, setIsLoading] = useState(false);
  const [sortParams, setSortParams] = useState<ISortParams>();

  // const [selectedTr, setSelectedTr] = useState<any>(null);

  const { getAllByDirType } = useDirectoriesServiceHook();

  const tableConfig = useMemo(
    (): ITableListProps<ITransaction> => ({
      tableData: state.transactions,
      tableTitles: transactionsColumns,
      tableSearchParams: transactionsSearchParams.filter(el => el.search),
      tableSortParams: transactionsSearchParams.filter(el => el.sort),
      filterSelectors,
      isFilter: true,
      isSearch: true,
      footer: true,
      checkBoxes: true,
      actionsCreator,
      onFilterSubmit: filterParams => {
        console.log(filterParams);
        getAll({ data: { query: { filterParams, sortParams } } });
      },
      handleTableSort: (param, sortOrder) => {
        setSortParams({ dataPath: param.dataPath, sortOrder });
        getAll({
          data: { refresh: true, query: { sortParams: { dataPath: param.dataPath, sortOrder } } },
          onLoading: setIsLoading,
        });
      },
      onRowClick: data => {
        console.log(data);
      },
    }),
    [actionsCreator, filterSelectors, getAll, sortParams, state.transactions]
  );
  useEffect(() => {
    getAllByDirType({ data: { dirType: ApiDirType.COUNTS, params: { isArchived: false, createTreeData: true } } });
  }, [getAllByDirType]);

  useEffect(() => {
    getAllByDirType({
      data: {
        dirType: ApiDirType.CATEGORIES_TR,
        params: { isArchived: false, createTreeData: true },
      },
    });
  }, [getAllByDirType]);

  useEffect(() => {
    console.log('onTableSortParamChange', sortParams);

    if (state.transactions.length === 0)
      getAll({
        data: { query: { sortParams }, refresh: true },
        onLoading: setIsLoading,
      });
  }, [getAll, sortParams, state.transactions.length]);
  return (
    <AppGridPage path={path}>
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
