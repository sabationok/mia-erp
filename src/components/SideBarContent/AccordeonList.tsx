import ButtonIcon from 'components/atoms/ButtonIcon/ButtonIcon';
import React, { useMemo, useState } from 'react';
import styled from 'styled-components';

export interface IAccordionOptionProps<Props = any, Opt = any> extends React.HTMLAttributes<HTMLLIElement> {
  title?: string;
  options?: Opt[];
  disabled?: boolean;
  ChildrenComponent?: React.FC<Props>;
  childrenComponentProps?: Props;
  renderChildren?: React.ReactNode;
}

export interface IAccordionListProps extends React.HTMLAttributes<HTMLUListElement> {
  options: IAccordionOptionProps[];
}

const AccordeonList: React.FC<IAccordionListProps> = ({ options, children }) => {
  const [current, setCurrent] = useState<number | null>(0);

  function onCurrentClick(idx: number) {
    return () => setCurrent(prev => (prev === idx ? null : idx));
  }

  const renderOptions = useMemo(
    () =>
      options?.length > 0 &&
      options.map(({ title, options, renderChildren, ChildrenComponent, childrenComponentProps, disabled }, idx) => (
        <AccordeonItem key={`AccordionListItem-${title || idx}`} isOpen={current === idx}>
          <OpenButton
            variant="def"
            endIconId="SmallArrowDown"
            isOpen={current === idx}
            disabled={disabled}
            onClick={onCurrentClick(idx)}
          >
            {title}
          </OpenButton>

          <ChildrenBox isOpen={current === idx}>
            {renderChildren || (ChildrenComponent ? <ChildrenComponent options={options} /> : null)}
          </ChildrenBox>
        </AccordeonItem>
      )),
    [current, options]
  );
  return <AccoredeonListBox>{renderOptions}</AccoredeonListBox>;
};
const AccoredeonListBox = styled.ul`
  display: flex;
  flex-direction: column;
`;
const AccordeonItem = styled.li<{ isOpen?: boolean }>`
  display: flex;
  flex-direction: column;
  border-bottom: ${({ isOpen }) => (isOpen ? '1px' : 0)} solid ${({ theme }) => theme.sideBarBorderColor};
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

  color: ${({ isOpen, theme }) => (isOpen ? theme.accentColor.base : '')};
  fill: ${({ isOpen, theme }) => (isOpen ? theme.accentColor.base : '')};

  & .endIcon {
    transform: ${({ isOpen }) => `rotate(${isOpen ? 180 : 0}deg)`};
  }

  &[disabled] {
    opacity: 60%;
  }
`;

export default AccordeonList;
