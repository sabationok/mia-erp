import React, { useEffect, useState } from 'react';
import ButtonIcon from 'components/atoms/ButtonIcon/ButtonIcon';
import { iconId } from 'data';

import styled, { css } from 'styled-components';
import { useTable } from './TableList';
import TActions from './TActions';
import TableFilter from './TableFilter';

const QuickActions: React.FC<any> = () => {
  const { actionsCreator, isFilter, footer } = useTable();
  const [isShown, setIsShown] = useState(false);

  function onMenuBtnClick() {
    setIsShown(!isShown);
  }

  useEffect(() => {
    function onMenuClose(ev: MouseEvent | KeyboardEvent) {
      if (ev.target instanceof HTMLElement && !ev.target.closest('[data-burger]')) setIsShown(false);
      if (ev instanceof KeyboardEvent && ev?.code === 'Escape') setIsShown(false);
    }

    document.addEventListener('click', onMenuClose);
    document.addEventListener('keydown', onMenuClose);

    return () => {
      document.removeEventListener('click', onMenuClose);
      document.removeEventListener('keydown', onMenuClose);
    };
  }, []);

  return (
    <Menu isShown={isShown} footer={footer} data-burger>
      <List isShown={isShown}>
        {isFilter && <TableFilter />}
        {isFilter && actionsCreator && <Separator />}

        {actionsCreator && <TActions renderSeparator={<Separator />} />}
      </List>

      <ToggleButton
        isShown={isShown}
        iconId={iconId.plus}
        variant="def"
        iconSize="70%"
        size="48px"
        onClick={onMenuBtnClick}
      />
    </Menu>
  );
};

const ToggleButton = styled(ButtonIcon)<{ isShown: boolean }>`
  position: absolute;
  bottom: 0;
  right: 0;
  z-index: 70;

  border-radius: 50%;
  fill: ${({ theme }) => theme.accentColor.base};

  box-shadow: ${({ isShown }) => (isShown ? 'var(--header-shadow)' : '')};
  background-color: ${({ theme, isShown }) => (isShown ? theme.backgroundColorMain : theme.backgroundColorSecondary)};
  transition: ${({ theme }) => theme.globals.timingFunctionMain};

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

const Menu = styled.div<{ isShown: boolean; footer?: boolean }>`
  position: absolute;
  bottom: ${({ footer }) => (footer ? '44px' : '10px')};
  right: 10px;
  z-index: 65;

  width: 48px;
  height: 48px;

  border-radius: 24px;
`;
const List = styled.div<{ isShown: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;

  position: absolute;
  bottom: 0;
  right: 0;

  width: 48px;
  min-height: 48px;
  height: max-content;
  overflow: hidden;

  background-color: ${({ theme }) => theme.backgroundColorSecondary};

  border-radius: 24px;
  box-shadow: ${({ isShown }) => (isShown ? 'var(--header-shadow)' : '')};

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

  ${({ isShown }) =>
    isShown
      ? css`
          max-height: calc(100vh - 88px);
          padding: 16px 8px 64px;
          visibility: visible;
          pointer-events: all;

          &:hover {
            overflow: auto;
          }
        `
      : css`
          max-height: 48px;
          padding: 8px;
          visibility: hidden;
          pointer-events: none;
        `};

  @media screen and(max-height: 480px) {
    flex-direction: row;
    width: max-content;
    height: 48px;
    ${({ isShown }) =>
      isShown
        ? css`
            max-width: 90vw;
            padding: 8px 64px 8px 16px;
            visibility: visible;
            pointer-events: all;
          `
        : css`
            max-width: 48px;
            padding: 8px;
            /* visibility: hidden; */
            pointer-events: none;
          `};
  }
`;

const Separator = styled.div`
  align-self: stretch;
  position: relative;

  width: 100%;
  min-height: 2px;

  border-top: 2px solid ${({ theme }) => theme.tableHeaderStroke};
  @media screen and(max-height: 480px) {
    height: 100%;

    &::before {
      height: 100%;
      width: 1px;

      border-right: 1px solid ${({ theme }) => theme.borderColor};
    }
  }
`;

export default QuickActions;
