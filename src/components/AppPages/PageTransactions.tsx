import TableList from 'components/TableList/TableList';
import { takeFullGridArea } from './pagesStyles';
import { transactionsColumns, transactionsMockData, transactionsSearchParams, trTableActions } from 'data';

import styled from 'styled-components';
import useTransactionsServise from 'redux/transactions/useTransactionsServise.hook';

const PageTransactions = () => {
  const { transactions, useFilterSelectors } = useTransactionsServise();
  // const { transactions, isLoading, error } = useTransactionsSelector();
  // const [selectedTr, setSelectedTr] = useState<any>(null);

  return (
    <Page>
      <TableList
        {...{
          tableData: transactionsMockData || transactions,
          tableTitles: transactionsColumns,
          tableSearchParams: transactionsSearchParams,
          tableSortParams: transactionsSearchParams,
          tableActions: trTableActions,
          filter: true,
          footer: true,
          search: true,
          useFilterSelectors,
        }}
      />
    </Page>
  );
};

const Page = styled.div`
  ${takeFullGridArea}
`;

export default PageTransactions;
