import TableList from 'components/TableList/TableList';
import { transactionsColumns, transactionsMockData, transactionsSearchParams, trTableActions } from 'data';

import styled from 'styled-components';
import { takeFullGridArea } from './pagesStyles';

const PageTransactions = () => {
  // const { transactions, isLoading, error } = useTransactionsSelector();
  // const [selectedTr, setSelectedTr] = useState<any>(null);

  return (
    <Page>
      {/* <TableList {...tableSettings} /> */}
      {/* <ModalContent> */}
      {/* <ModalDefault filterOptions={countTypes}><CreatingList /></ModalDefault> */}
      {/* </ModalContent> */}
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
