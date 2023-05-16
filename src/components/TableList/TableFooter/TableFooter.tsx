import styled from 'styled-components';
import { useTable } from '../TableList';
import FooterCounter from './FooterCounter';
import TableFilter from './TableFilter';
import TablePagination from './TablePagination';
import TableSort from './TableSortComp/TableSort';
import { useState } from 'react';

const TableFooter: React.FC<any> = props => {
  const { tableSortParams, selectedRows, counter, isFilter } = useTable();
  const [isCounterOn] = useState<boolean | undefined>(!counter && selectedRows && selectedRows?.length > 0);

  return (
    <Footer className='tFooter' {...props}>
      <Top className='footerTop'>
        {tableSortParams && tableSortParams.length > 0 && <TableSort {...{ tableSortParams }} />}

        <TablePagination />

        {isFilter && <TableFilter />}
      </Top>

      {isCounterOn && <FooterCounter selectedRows={selectedRows} includes={['INCOME', 'EXPENSE']} />}
    </Footer>
  );
};

const Footer = styled.div`
  display: flex;
  flex-direction: column-reverse;
  justify-content: space-between;

  position: relative;

  min-height: 28px;
  width: 100%;
  height: 100%;

  padding: 2px 4px;

  background-color: ${({ theme }) => theme.tableFooterBackground};
  border-top: 1px solid ${({ theme }) => theme.backgroundColorSecondary};
  @media screen and (min-width: 480px) {
    flex-direction: row;
  }
`;
const Top = styled.div`
  align-self: flex-start;
  display: flex;
  gap: 8px;
`;

export default TableFooter;
