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
  background-color: ${({ theme }) => theme.tableBackgroundColor};
`;

export default TableHead;
