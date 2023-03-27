import React from 'react';
import styled from 'styled-components';

export interface DateCompProps {
  dateInfo: Date | string;
  wraped?: boolean;
}
const DateComp: React.FC<DateCompProps> = ({ dateInfo, wraped }) => {
  let date, year, month, day, hours, minutes, seconds;

  if (dateInfo) {
    date = new Date(dateInfo);
    year = date.getFullYear().toString().padStart(2, '0');
    month = (date.getMonth() + 1).toString().padStart(2, '0');
    day = date.getDate().toString().padStart(2, '0');
    hours = date.getHours().toString().padStart(2, '0');
    minutes = date.getMinutes().toString().padStart(2, '0');
    seconds = date.getSeconds().toString().padStart(2, '0');
  }

  return (
    <Wrapper wraped={wraped}>
      <StDate>{dateInfo ? `${day}.${month}.${year}` : `00.00.0000 `}</StDate>
      <StTime>{dateInfo ? `(${hours}:${minutes}:${seconds})` : `(00:00:00)`}</StTime>
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
  font-size: ${({ wrap }) => (wrap ? '10px' : '12px')}; ;
`;

export default DateComp;
