import styled from 'styled-components';
import { useTable } from '../TableList';
import FooterCounter from './FooterCounter';
import TableFilter from './TableFilter';
import TablePagination from './TablePagination';
import TableSort from './TableSortComp/TableSort';

const TableFooter: React.FC<any> = () => {
  const { useFilterSelectors, tableSortParams, selectedRows } = useTable();

  return (
    <Footer>
      {selectedRows && selectedRows?.length === 0 && (
        <FooterCounter selectedRows={selectedRows} includes={['INCOME', 'EXPENSE']} />
      )}

      <Bottom>
        {tableSortParams && <TableSort {...{ tableSortParams }} />}

        <TablePagination />

        <TableFilter
          {...{ title: 'Фільтрація транзакцій' }}
          useFilterSelectors={useFilterSelectors ? useFilterSelectors : () => []}
        />
      </Bottom>
    </Footer>
  );
};

const Footer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  position: relative;

  min-height: 28px;
  width: 100%;
  height: 100%;

  padding: 2px 4px;

  background-color: ${({ theme }) => theme.tableBackgroundColor};
  @media screen and (min-width: 480px) {
    flex-direction: row-reverse;
  }
`;
const Bottom = styled.div`
  display: flex;
  gap: 8px;
`;

export default TableFooter;
