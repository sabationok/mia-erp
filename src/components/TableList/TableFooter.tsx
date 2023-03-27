import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useTable } from './TableList';

const TableFooter: React.FC = () => {
  const { selectedRows = [] } = useTable();
  const [rowsAmountSum, setRowsAmountSum] = useState<number>(0);

  useEffect(() => {
    const countedSum = selectedRows.reduce(
      (acc: number, { amount, type }: { amount: number; type: string }) =>
        type !== 'TRANSFER' ? acc + amount : acc + 0,
      0
    );

    setRowsAmountSum(countedSum);
  }, [selectedRows.length, selectedRows, rowsAmountSum]);

  return (
    <Footer>
      <Wrapper>
        <span>Обрано:</span>
        <span>{selectedRows?.length}</span>
      </Wrapper>

      <Wrapper>
        <span>Сума:</span>
        <span>{rowsAmountSum}</span>
      </Wrapper>
    </Footer>
  );
};

const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px 8px;
  width: 100%;
  height: 100%;

  background-color: ${({ theme }) => theme.tableBackgroundColor};
`;
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export default TableFooter;
