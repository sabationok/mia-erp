import TableList from 'components/TableList/TableList';
import { takeFullGridArea } from './pagesStyles';
import styled from 'styled-components';
import { useEffect, useMemo, useState } from 'react';
import useTrFilterSelectors from 'hooks/useTrFilterSelectors.hook';
import { ITransaction } from '../../types/finances/transactions.types';
import { useTrActionsCreator } from '../../hooks/useTrActionsCreator.hook';
import { ITableListProps } from '../TableList/tableTypes.types';
import AppGridPage from './AppGridPage';
import { useTransactionsSelector } from '../../redux/selectors.store';
import { ISortParams } from '../../api';
import { FilterReturnDataType } from '../Filter/AppFilter';
import { BaseAppPageProps } from './index';
import { transactionsColumns, transactionsSearchParams } from '../../data/transactions.data';
import { useAppServiceProvider } from '../../hooks/useAppServices.hook';
import { AppModuleName } from '../../redux/reduxTypes.types';

interface Props extends BaseAppPageProps {}

const PageTransactions: React.FC<any> = (props: Props) => {
  const service = useAppServiceProvider()[AppModuleName.finances];
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
      sortParams: transactionsSearchParams.filter(el => el.sort),
      filterSelectors,
      hasFilter: true,
      hasSearch: true,
      showFooter: true,
      checkBoxes: true,
      actionsCreator,
      onFilterSubmit: filterParams => {
        setFilterParams(filterParams);
        getAll({ data: { refresh: true, query: { filterParams, sortParams } }, onLoading: setIsLoading });
      },
      onTableSortChange: (param, sortOrder) => {
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
