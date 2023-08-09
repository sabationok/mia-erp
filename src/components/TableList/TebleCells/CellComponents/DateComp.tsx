import React from 'react';
import styled from 'styled-components';
import { useAppDate } from '../../../../hooks';

export interface DateCompProps {
  dateInfo: Date | string | number;
  wraped?: boolean;
}

const DateComp: React.FC<DateCompProps> = ({ dateInfo, wraped }) => {
  const { formattedDate, formattedTime } = useAppDate(dateInfo);

  return (
    <Wrapper wraped={wraped}>
      <StDate>{formattedDate}</StDate>
      <StTime>{formattedTime}</StTime>
    </Wrapper>
  );
};

const Wrapper = styled.div<{ wraped?: boolean }>`
  display: flex;
  flex-direction: ${({ wraped }) => (wraped ? 'column' : 'row')};
  align-items: center;
  justify-content: center;

  width: 100%;
  gap: 4px;
`;
const StDate = styled.span``;
const StTime = styled.span<{ wrap?: boolean }>`
  font-size: ${({ wrap }) => (wrap ? '10px' : '12px')};
`;

export default DateComp;
