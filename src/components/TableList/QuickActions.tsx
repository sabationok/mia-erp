import React, { useEffect, useState } from 'react';
import ButtonIcon from 'components/atoms/ButtonIcon/ButtonIcon';

import styled, { css } from 'styled-components';
import { useTable } from './TableList';
import TActions from './TableActions';
import TableFilter from './TableFilter';
import { useCloseByEscapeOrClickOnBackdrop } from '../../hooks';
import FlexBox from '../atoms/FlexBox';

const QuickActions: React.FC<{ closeOnClickOut?: boolean }> = ({ closeOnClickOut = false }) => {
  const { quickActionsDirection, actionsCreator, isFilter, footer, selectedRow, selectedRows } = useTable();
  const [isShown, setIsShown] = useState(false);

  function onMenuBtnClick() {
    setIsShown(prev => !prev);
  }

  useEffect(() => {
    if (selectedRow) setIsShown(true);

    if (!selectedRow && selectedRows && selectedRows?.length === 0) {
      setIsShown(false);
    }
  }, [selectedRow, selectedRows]);

  useCloseByEscapeOrClickOnBackdrop(setIsShown, 'data-burger', closeOnClickOut);

  return (
    <Menu isShown={isShown} hasFooter={footer} data-burger fxDirection={'column'}>
      <List isShown={isShown}>
        <FlexBox
          padding={'16px 8px'}
          gap={12}
          fxDirection={quickActionsDirection === 'column-reverse' ? 'column-reverse' : 'column'}
        >
          {isFilter && <TableFilter btnSize={36} />}

          {isFilter && actionsCreator && <Separator />}

          {actionsCreator && <TActions btnSize={36} renderSeparator={<Separator />} />}
        </FlexBox>
      </List>

      <ToggleButton
        hasFooter={footer}
        isShown={isShown}
        icon={'plus'}
        variant="def"
        iconSize="70%"
        size="48px"
        onClick={onMenuBtnClick}
      />
    </Menu>
  );
};
type StyledProps = { isShown: boolean; hasFooter?: boolean };

const Menu = styled(FlexBox)<StyledProps>`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 55;

  background-color: ${({ theme }) => theme.modalBackgroundColor};
  height: 100%;
  transition: all ${({ theme }) => theme.globals.timingFnLong};

  border-left: 1px solid ${({ theme }) => theme.modalBorderColor};
  ${({ isShown, theme }) =>
    isShown
      ? css<StyledProps>`
          //visibility: visible;
          //pointer-events: all;
          max-width: 100%;
          //box-shadow: ${theme.globals.shadowMain};
          //border-top: 1px solid ${({ theme }) => theme.modalBorderColor};
        `
      : css`
          max-width: 0;
        `};
`;

const List = styled.div<{ isShown: boolean }>`
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  gap: 8px;
  margin-top: auto;

  overflow: auto;

  ${({ isShown }) =>
    isShown
      ? css<StyledProps>`
          visibility: visible;
          pointer-events: all;
        `
      : css`
          max-width: 0;
          visibility: hidden;
          pointer-events: none;
        `};

  transition: all ${({ theme }) => theme.globals.timingFunctionMain};

  ::-webkit-scrollbar {
    width: 0;
    height: 0;
  }

  ::-webkit-scrollbar-button {
    height: 0;
    width: 0;
    overflow: hidden;
  }
`;

const ToggleButton = styled(ButtonIcon)<StyledProps>`
  position: absolute;
  //bottom: 0;
  right: ${({ isShown }) => (isShown ? '60px' : '10px')};
  bottom: ${({ hasFooter }) => (hasFooter ? '50px' : '10px')};
  z-index: 30;

  border-radius: 50%;
  fill: ${({ theme }) => theme.accentColor.base};

  box-shadow: ${({ isShown, theme }) => (isShown ? theme.globals.shadowMain : '')};
  background-color: ${({ theme, isShown }) => (isShown ? theme.backgroundColorMain : theme.backgroundColorSecondary)};
  transition: all ${({ theme }) => theme.globals.timingFunctionMain};
  transition: all ${({ theme }) => theme.globals.timingFunctionMain};

  & .icon {
    transition: all ${({ theme }) => theme.globals.timingFnMui};
  }

  & .icon {
    transform: ${({ isShown }) => (isShown ? 'rotate(45deg)' : '')};
  }

  &:hover {
    background-color: ${({ theme }) => theme.backgroundColorMain};
  }

  &:active {
    background-color: ${({ theme }) => theme.backgroundColorMain};
  }
`;

//
// @media screen and(max-height: 480px) {
//   flex-direction: row;
//   width: max-content;
//   height: 48px;
//   ${({ isShown }) =>
//   isShown
//     ? css`
//             max-width: 90vw;
//             padding: 8px 64px 8px 16px;
//             visibility: visible;
//             pointer-events: all;
//           `
//     : css`
//             max-width: 48px;
//             padding: 8px;
//             /* visibility: hidden; */
//             pointer-events: none;
//           `};
// }
const Separator = styled.div`
  align-self: stretch;
  position: relative;

  width: 100%;
  min-height: 2px;

  border-top: 2px solid ${({ theme }) => theme.modalBorderColor};
  @media screen and(max-height: 480px) {
    height: 100%;

    &::before {
      height: 100%;
      width: 1px;

      border-right: 2px solid ${({ theme }) => theme.modalBorderColor};
    }
  }
`;

export default QuickActions;
