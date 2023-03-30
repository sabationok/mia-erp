import ButtonIcon from 'components/atoms/ButtonIcon/ButtonIcon';
import React, { useState } from 'react';
import styled from 'styled-components';

export interface IAccordeonOptionProps extends React.HTMLAttributes<HTMLLIElement> {
  title: string;
  options: any[];
  ChildrenComponent?: React.FC<any>;
  childrenComponentProps?: any;
}

export interface IAccordeonListProps extends React.HTMLAttributes<HTMLUListElement> {
  options: IAccordeonOptionProps[];
}

const AccordeonList: React.FC<IAccordeonListProps> = ({ options, children }) => {
  const [current, setCurrent] = useState<number | null>(0);

  function onCurrentClick(idx: number) {
    setCurrent(prev => (prev === idx ? null : idx));
  }

  return (
    <AccoredeonListBox>
      {options?.length > 0 &&
        options.map(({ title, options, ChildrenComponent }, idx) => (
          <AccordeonItem key={title || idx}>
            <OpenButton variant="def" endIconId="SmallArrowDown" onClick={() => onCurrentClick(idx)}>
              {title}
            </OpenButton>

            <ChildrenBox isOpen={current === idx}>
              {children || (ChildrenComponent ? <ChildrenComponent options={options} /> : null)}
            </ChildrenBox>
          </AccordeonItem>
        ))}
    </AccoredeonListBox>
  );
};
const AccoredeonListBox = styled.ul`
  display: flex;
  flex-direction: column;
`;
const AccordeonItem = styled.li`
  display: flex;
  flex-direction: column;
`;

const ChildrenBox = styled.div<{ isOpen?: boolean }>`
  overflow: hidden;
  max-height: ${({ isOpen }) => (isOpen ? '' : '0')};

  transition: ${({ theme }) => theme.globals.timingFnLong};
`;
const OpenButton = styled(ButtonIcon)`
  justify-content: space-between;

  padding: 4px 8px;

  height: 32px;

  & .endIcon {
  }
`;

export default AccordeonList;
