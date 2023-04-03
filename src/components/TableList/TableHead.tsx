import styled from 'styled-components';
import TableHeadRow from './TableRows/TableHeadRow';

export interface TableHeadProps {}

const TableHead: React.FC<TableHeadProps> = () => {
  return (
    <THead>
      <TableHeadRow />
    </THead>
  );
};
const THead = styled.div`
  position: sticky;
  top: 0;
  left: 0;
  z-index: 20;

  background-color: ${({ theme }) => theme.tableBackgroundColor};
`;

export default TableHead;
