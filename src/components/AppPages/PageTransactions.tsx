import TableList from 'components/TableList/TableList';
import { takeFullGridArea } from './pagesStyles';
import { transactionsColumns, transactionsMockData, transactionsSearchParams, trTableActions } from 'data';

import styled from 'styled-components';

const PageTransactions = () => {
  // const { transactions, isLoading, error } = useTransactionsSelector();
  // const [selectedTr, setSelectedTr] = useState<any>(null);

  return (
    <Page>
      <TableList
        {...{
          tableData: transactionsMockData,
          tableTitles: transactionsColumns,
          tableSearchParams: transactionsSearchParams,
          tableActions: trTableActions,
          filter: true,
          search: true,
        }}
      />
    </Page>
  );
};

const Page = styled.div`
  ${takeFullGridArea}
`;

export default PageTransactions;
