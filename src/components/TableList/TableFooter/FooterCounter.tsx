import { useEffect, useState } from 'react';
import styled from 'styled-components';

export interface FooterCounterProps {
  includes?: string[];
  selectedRows?: any[];
}

const FooterCounter: React.FC<FooterCounterProps> = ({ includes = [''], selectedRows = [] }) => {
  const [rowsAmountSum, setRowsAmountSum] = useState<number>(0);

  useEffect(() => {
    const countedSum = selectedRows.reduce(
      (acc: number, { amount, type }: { amount: number; type: string }) =>
        includes.includes(type) ? acc + amount : acc + 0,
      0
    );

    setRowsAmountSum(countedSum);
  }, [includes, selectedRows]);

  return (
    <Box>
      <Wrapper>
        <span>Обрано:</span>
        <span>{selectedRows?.length}</span>
      </Wrapper>

      <Wrapper>
        <span>Сума:</span>
        <span>{rowsAmountSum}</span>
      </Wrapper>
    </Box>
  );
};
const Box = styled.div`
  display: flex;
  gap: 12px;
`;
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;
export default FooterCounter;
