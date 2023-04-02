import ButtonIcon from 'components/atoms/ButtonIcon/ButtonIcon';
import React, { useState } from 'react';
import styled, { css } from 'styled-components';

export interface TablePaginationProps {
  onSelect?: (opt: PaginationOption) => void;
}
export interface PaginationOption {
  label: string;
  value: number | null;
}
const pagOptions: PaginationOption[] = [
  { label: '15', value: 15 },
  { label: '30', value: 30 },
  { label: '60', value: 60 },
  { label: 'Усі', value: null },
];

const TablePagination: React.FC<TablePaginationProps> = ({ onSelect }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [current, setCurrent] = useState<PaginationOption>(pagOptions[0]);

  function onOpen() {
    setIsOpen(prev => !prev);
  }
  function onSelectOpt(idx: number) {
    setCurrent(pagOptions[idx]);
    onSelect && onSelect(pagOptions[idx]);
    onOpen();
  }

  return (
    <Box>
      <DropDownBox>
        <StButton isOpen={isOpen} variant="def" endIconSize="26px" endIconId="SmallArrowUp" onClick={onOpen}>
          <span>{current?.label}</span>
        </StButton>

        <SelectList isOpen={isOpen}>
          {pagOptions.map((opt, idx) => (
            <SelectItem key={idx} onClick={() => onSelectOpt(idx)}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectList>
      </DropDownBox>
    </Box>
  );
};

const Box = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;
const DropDownBox = styled.div`
  position: relative;
`;
const StButton = styled(ButtonIcon)<{ isOpen: boolean }>`
  width: fit-content;
  height: 100%;
  gap: 0;

  min-width: 65px;

  fill: ${({ theme }) => theme.accentColor.base};
  color: ${({ theme }) => theme.fontColorHeader};
  background-color: ${({ theme }) => theme.backgroundColorLight};

  &:active,
  &:focus,
  &:hover {
    background-color: ${({ theme }) => theme.backgroundColorLight};
  }

  & .endIcon {
    transform: ${({ isOpen }) => `rotate(${isOpen ? 180 : 0}deg)`};
  }
  & span {
    padding: 0 8px;
  }
`;

const SelectList = styled.ul<{ isOpen: boolean }>`
  display: flex;
  flex-direction: column;

  position: absolute;
  bottom: 120%;
  right: 0;

  min-width: 100%;
  overflow: hidden;

  border-radius: 2px;

  color: ${({ theme }) => theme.fontColorHeader};
  background-color: ${({ theme }) => theme.backgroundColorSecondary};

  border: 1px solid ${({ theme }) => theme.trBorderClr};
  box-shadow: ${({ theme }) => theme.globals.shadowMain};
  transition: all ${({ theme }) => theme.globals.timingFunctionMain},
    transform ${({ theme }) => theme.globals.timingFnMui};
  transform-origin: bottom;

  ${({ isOpen }) =>
    isOpen
      ? css``
      : css`
          transform: scale(0.7, 0.5);
          opacity: 0;
          visibility: hidden;
          pointer-events: none;
        `}
`;
const SelectItem = styled.li`
  font-size: 16px;
  padding: 8px;

  cursor: default;
  &:hover {
    background-color: ${({ theme }) => theme.backgroundColorLight};
  }
`;
export default TablePagination;
