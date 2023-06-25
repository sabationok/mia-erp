import React, { useMemo } from 'react';
import styled from 'styled-components';

export interface DateCompProps {
  dateInfo: Date | string | number;
  wraped?: boolean;
}

const useAppDate = (date: string | number | Date) =>
  useMemo(() => {
    let current,
      year = '00',
      month = '00',
      day = '00',
      hours = '00',
      minutes = '00',
      seconds = '00';
    if (date) {
      current = new Date(date);
      year = current.getFullYear().toString().padStart(2, '0');
      month = (current.getMonth() + 1).toString().padStart(2, '0');
      day = current.getDate().toString().padStart(2, '0');
      hours = current.getHours().toString().padStart(2, '0');
      minutes = current.getMinutes().toString().padStart(2, '0');
      seconds = current.getSeconds().toString().padStart(2, '0');
    }
    return { current, year, month, day, hours, minutes, seconds, date: current } as {
      year: string;
      month: string;
      day: string;
      hours: string;
      minutes: string;
      seconds: string;
      date: Date;
    };
  }, [date]);

const DateComp: React.FC<DateCompProps> = ({ dateInfo, wraped }) => {
  const { year, month, day, hours, minutes, seconds } = useAppDate(dateInfo);

  return (
    <Wrapper wraped={wraped}>
      <StDate>{`${day}.${month}.${year}`}</StDate>
      <StTime>{`(${hours}:${minutes}:${seconds})`}</StTime>
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
