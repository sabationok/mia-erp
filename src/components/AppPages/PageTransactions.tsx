import TableList from 'components/TableList/TableList';
import { takeFullGridArea } from './pagesStyles';
import { transactionsColumns, transactionsSearchParams } from 'data';
import styled from 'styled-components';
import useTransactionsService from 'redux/transactions/useTransactionsService.hook';
import { useEffect, useMemo } from 'react';
import useTrFilterSelectors from 'redux/transactions/useTrFilterSelectors.hook';
import { ITransaction } from '../../redux/transactions/transactions.types';
import { useTrActionsCreator } from '../../redux/transactions/useTrActionsCreator.hook';
import { ITableListProps } from '../TableList/tableTypes.types';
import AppGridPage from './AppGridPage';
import { defaultThunkPayload } from '../../utils/fabrics';

type Props = {
  path: string;
};
const PageTransactions: React.FC<any> = ({ path }: Props) => {
  const service = useTransactionsService();
  const { state, getAll } = service;
  const filterSelectors = useTrFilterSelectors();
  const actionsCreator = useTrActionsCreator(service);
  // const [selectedTr, setSelectedTr] = useState<any>(null);

  useEffect(() => {
    getAll(defaultThunkPayload());
  }, [getAll]);

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
      onFilterSubmit: data => {
        // console.log(data);
      },
      onRowClick: data => {
        // console.log(data);
      },
    }),
    [actionsCreator, filterSelectors, state.transactions]
  );

  return (
    <AppGridPage path={path}>
      <Page>
        <TableList {...tableConfig} />
      </Page>
    </AppGridPage>
  );
};

const Page = styled.div`
  ${takeFullGridArea}
`;

export default PageTransactions;
