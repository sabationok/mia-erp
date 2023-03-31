import ButtonIcon from 'components/atoms/ButtonIcon/ButtonIcon';
import React, { useState } from 'react';
import styled, { css } from 'styled-components';

export interface TableSortProps {}

const TableSort: React.FC<TableSortProps> = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  function onOpen() {
    setIsOpen(prev => !prev);
  }

  return (
    <Box>
      <div>Сортувати за:</div>

      <DropDownBox>
        <StButton isOpen={isOpen} variant="def" endIconSize="26px" endIconId="SmallArrowDown" onClick={onOpen}>
          Датою
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
  &:focus {
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
  min-width: 150%;
  overflow: hidden;

  border-radius: 2px;
  border: 1px solid ${({ theme }) => theme.borderColor};

  background-color: ${({ theme }) => theme.backgroundColorSecondary};
  box-shadow: ${({ theme }) => theme.globals.shadowMain};
  transition: all ${({ theme }) => theme.globals.timingFunctionMain},
    transform ${({ theme }) => theme.globals.timingFnMui};
  transform-origin: top right;

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
export default TableSort;
