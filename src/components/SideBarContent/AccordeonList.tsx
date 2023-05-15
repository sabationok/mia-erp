import ButtonIcon from 'components/atoms/ButtonIcon/ButtonIcon';
import React, { useMemo, useState } from 'react';
import styled from 'styled-components';

export interface IAccordeonOptionProps<T = any, C = any[]> extends React.HTMLAttributes<HTMLLIElement> {
  title: string;
  options: C;
  ChildrenComponent?: React.FC<T>;
  childrenComponentProps?: T;
}

export interface IAccordeonListProps extends React.HTMLAttributes<HTMLUListElement> {
  options: IAccordeonOptionProps[];
}

const AccordeonList: React.FC<IAccordeonListProps> = ({ options, children }) => {
  const [current, setCurrent] = useState<number | null>(0);

  function onCurrentClick(idx: number) {
    return () => setCurrent(prev => (prev === idx ? null : idx));
  }

  const renderOptions = useMemo(() =>
    options?.length > 0 && options.map(({
                                          title,
                                          options,
                                          ChildrenComponent,
                                        }, idx) => (
      <AccordeonItem key={title || idx} isOpen={current === idx}>
        <OpenButton variant='def' endIconId='SmallArrowDown' isOpen={current === idx} onClick={onCurrentClick(idx)}>
          {title}
        </OpenButton>

        <ChildrenBox isOpen={current === idx}>
          {children || (ChildrenComponent ? <ChildrenComponent options={options} /> : null)}
        </ChildrenBox>
      </AccordeonItem>
    )), [children, current, options]);
  return (
    <AccoredeonListBox>
      {renderOptions}
    </AccoredeonListBox>
  );
};
const AccoredeonListBox = styled.ul`
  display: flex;
  flex-direction: column;


`;
const AccordeonItem = styled.li<{ isOpen?: boolean }>`
  display: flex;
  flex-direction: column;
  border-bottom: ${({ isOpen }) => isOpen ? '1px' : 0} solid ${({ theme }) => theme.sideBarBorderColor};

`;

const ChildrenBox = styled.div<{ isOpen?: boolean }>`
  padding: 0 8px;

  overflow: hidden;
  max-height: ${({ isOpen }) => (isOpen ? '' : '0')};

  transition: all ${({ theme }) => theme.globals.timingFnLong};
`;
const OpenButton = styled(ButtonIcon)<{ isOpen?: boolean }>`
  justify-content: space-between;

  padding: 4px 8px;

  height: 32px;

  font-size: 12px;
  font-weight: 600;

  border: 0;
  border-radius: 0;
  border-bottom: 1px solid ${({ theme }) => theme.sideBarBorderColor};

  color: ${({ isOpen, theme }) => isOpen ? theme.accentColor.base : ''};
  fill: ${({ isOpen, theme }) => isOpen ? theme.accentColor.base : ''};

  & .endIcon {
    transform: ${({ isOpen }) => `rotate(${isOpen ? 180 : 0}deg)`};
  }
`;

export default AccordeonList;
