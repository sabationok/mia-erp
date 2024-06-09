import styled from 'styled-components';
import { useTable } from '../TableList';
import TablePagination from './TablePagination';
import TableSort from '../TableSortComp/TableSort';

const TableFooter: React.FC<any> = props => {
  const { sortParams, pagination, onTableSortChange } = useTable();
  // const [isCounterOn] = useState<boolean | undefined>(!counter && selectedRows && selectedRows?.length > 0);

  return (
    <Footer className="tableFooter" {...props}>
      <Top className="footerTop">
        {sortParams && sortParams.length > 0 && (
          <TableSort {...{ sortParams: sortParams, onSelect: onTableSortChange }} />
        )}

        {pagination && (
          <TablePagination
            onSelect={opt => {
              console.log('pagination', opt);
            }}
          />
        )}
      </Top>

      {/*{isCounterOn && <FooterCounter selectedRows={selectedRows} includes={['INCOME', 'EXPENSE']} />}*/}
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
  border-top: 1px solid ${({ theme }) => theme.borderColor};
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
