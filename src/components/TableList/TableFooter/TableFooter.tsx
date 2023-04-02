import styled from 'styled-components';
import { useTable } from '../TableList';
import FooterCounter from './FooterCounter';

const TableFooter: React.FC = () => {
  const { selectedRows } = useTable();

  return (
    <Footer>
      <FooterCounter selectedRows={selectedRows} includes={['INCOME', 'EXPENSE']} />
    </Footer>
  );
};

const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 28px;
  padding: 4px 8px;
  width: 100%;
  height: 100%;

  background-color: ${({ theme }) => theme.tableBackgroundColor};
`;

export default TableFooter;
