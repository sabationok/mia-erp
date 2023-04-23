import TableList from 'components/TableList/TableList';
import { takeFullGridArea } from './pagesStyles';
import { transactionsColumns, transactionsMockData, transactionsSearchParams } from 'data';
import styled from 'styled-components';
import useTransactionsServise from 'redux/transactions/useTransactionsService.hook';
import { useTransactionsActions } from '../../data/transactions.data';

const PageTransactions = () => {
  const { transactions, useFilterSelectors } = useTransactionsServise();
  // const { transactions, isLoading, error } = useTransactionsSelector();
  // const [selectedTr, setSelectedTr] = useState<any>(null);
  const trActions = useTransactionsActions();

  return (
    <Page>
      <TableList
        {...{

          tableData: transactionsMockData || transactions,
          tableTitles: transactionsColumns,
          tableActions: trActions,
          tableSearchParams: transactionsSearchParams.filter(el => el.search),
          tableSortParams: transactionsSearchParams.filter(el => el.sort),
          useFilterSelectors,
          isFilter: true,
          isSearch: true,
          footer: true,
        }}
      />
    </Page>
  );
};

const Page = styled.div`
  ${takeFullGridArea}
`;

export default PageTransactions;
