import ButtonIcon from 'components/atoms/ButtonIcon/ButtonIcon';
import React, { useState } from 'react';
import styled, { css } from 'styled-components';

export interface TablePaginationProps {}

const TablePagination: React.FC<TablePaginationProps> = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  function onOpen() {
    setIsOpen(prev => !prev);
  }

  return (
    <Box>
      <DropDownBox>
        <StButton isOpen={isOpen} variant="def" endIconSize="26px" endIconId="SmallArrowDown" onClick={onOpen}>
          15
        </StButton>

        <SelectList isOpen={isOpen}></SelectList>
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

  padding-left: 8px;

  fill: ${({ theme }) => theme.accentColor.base};
  color: ${({ theme }) => theme.fontColorHeader};
  background-color: ${({ theme }) => theme.backgroundColorSecondary};

  &:active,
  &:focus,
  &:hover {
    background-color: ${({ theme }) => theme.backgroundColorSecondary};
  }

  & .endIcon {
    transform: ${({ isOpen }) => `rotate(${isOpen ? 180 : 0}deg)`};
  }
`;
const SelectList = styled.div<{ isOpen: boolean }>`
  display: flex;
  flex-direction: column;

  position: absolute;
  top: 120%;
  right: 0;

  min-height: 150px;
  min-width: 100%;
  overflow: hidden;

  border-radius: 2px;
  border: 1px solid ${({ theme }) => theme.borderColor};

  background-color: ${({ theme }) => theme.backgroundColorSecondary};
  box-shadow: ${({ theme }) => theme.globals.shadowMain};
  transition: all ${({ theme }) => theme.globals.timingFunctionMain},
    transform ${({ theme }) => theme.globals.timingFnMui};
  transform-origin: top;

  ${({ isOpen }) =>
    isOpen
      ? css``
      : css`
          transform: scale(0.7, 0.8);
          opacity: 0;
          visibility: hidden;
          pointer-events: none;
        `}
`;
export default TablePagination;
