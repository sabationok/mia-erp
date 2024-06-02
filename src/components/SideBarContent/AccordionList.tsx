import ButtonIcon from 'components/atoms/ButtonIcon';
import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import FlexBox from '../atoms/FlexBox';

export interface IAccordionOptionProps<Props = any, Opt = any> extends React.HTMLAttributes<HTMLLIElement> {
  title?: string;
  options?: Opt[];
  isActive?: boolean;
  disabled?: boolean;
  ChildrenComponent?: React.FC<Props>;
  childrenComponentProps?: Props;
  renderChildren?: React.ReactNode;
}

export interface IAccordionListProps extends React.HTMLAttributes<HTMLUListElement> {
  options: IAccordionOptionProps[];
}

const AccordionList: React.FC<IAccordionListProps> = ({ options, children }) => {
  const [current, setCurrent] = useState<number | null>(0);

  function onCurrentClick(idx: number) {
    return () => setCurrent(prev => (prev === idx ? null : idx));
  }

  const renderOptions = useMemo(
    () =>
      options?.length > 0 &&
      options.map(
        ({ title, options, isActive, renderChildren, ChildrenComponent, childrenComponentProps, disabled }, idx) => (
          <AccordeonItem key={`AccordionListItem-${title || idx}`} isOpen={current === idx}>
            <Header>
              <OpenButton
                variant="def"
                endIconId="SmallArrowDown"
                isOpen={current === idx}
                disabled={disabled}
                onClick={onCurrentClick(idx)}
                isActive={isActive}
              >
                {title}
              </OpenButton>
            </Header>

            <ChildrenBox isOpen={current === idx}>
              {renderChildren || (ChildrenComponent ? <ChildrenComponent options={options} /> : null)}
            </ChildrenBox>
          </AccordeonItem>
        )
      ),
    [current, options]
  );
  return <AccoredeonListBox>{renderOptions}</AccoredeonListBox>;
};
const AccoredeonListBox = styled.ul`
  display: flex;
  flex-direction: column;

  overflow: auto;
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
const Header = styled(FlexBox)`
  position: sticky;
  top: 0;
  left: 0;
  z-index: 20;

  background-color: ${p => p.theme.modalBackgroundColor};
  border-bottom: 1px solid ${({ theme }) => theme.sideBarBorderColor};
`;
const OpenButton = styled(ButtonIcon)<{ isOpen?: boolean }>`
  justify-content: space-between;

  padding: 4px 8px;

  height: 32px;

  font-size: 12px;
  font-weight: 600;

  border: 0;
  border-radius: 0;

  color: ${({ isOpen, isActive, theme }) => (isActive || isOpen ? theme.accentColor.base : '')};
  fill: ${({ isOpen, isActive, theme }) => (isActive || isOpen ? theme.accentColor.base : '')};

  & .endIcon {
    transform: ${({ isOpen }) => `rotate(${isOpen ? 180 : 0}deg)`};
  }

  &[disabled] {
    opacity: 60%;
  }
`;

export default AccordionList;
