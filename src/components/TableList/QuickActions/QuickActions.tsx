import React, { useEffect, useState } from 'react';
import ButtonIcon from 'components/atoms/ButtonIcon/ButtonIcon';
import { iconId } from 'data';

import styled, { css } from 'styled-components';

const QuickActions: React.FC<{ top?: any[]; bottom?: any[]; footer?: boolean }> = ({ top, bottom, footer }) => {
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
        <Top top={!!top}>
          {top &&
            top.map(({ name, disableChek, ...props }, idx) => (
              <ButtonIcon
                key={idx}
                variant='onlyIcon'
                disabled={typeof disableChek === 'function' && disableChek()}
                size='28px'
                iconSize='80%'
                tabIndex={isShown ? -1 : 0}
                {...props}
              />
            ))}
        </Top>

        <Separator />

        <Bottom bottom={!!bottom}>
          {bottom &&
            bottom.map(({ name, disableChek, ...props }, idx) => (
              <ButtonIcon
                key={idx}
                variant='onlyIconFilled'
                disabled={typeof disableChek === 'function' && disableChek()}
                size='28px'
                // iconSize="80%"
                tabIndex={isShown ? -1 : 0}
                {...props}
              />
            ))}
        </Bottom>
      </List>

      <ToggleButton
        isShown={isShown}
        // iconId={isShown ? iconId.close : iconId.actionsV}
        iconId={iconId.plus}
        variant='def'
        iconSize='70%'
        size='48px'
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
  bottom: ${({ footer }) => (footer ? '40px' : '10px')};
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

  ${({ isShown }) =>
          isShown
                  ? css`
                    max-height: 90vh;
                    padding: 16px 8px 64px;
                    visibility: visible;
                    pointer-events: all;
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
const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;

  width: 100%;

  @media screen and (max-height: 480px) {
    flex-direction: row;
  }
`;
const Top = styled(Content)<{ top: boolean }>``;

const Bottom = styled(Content)<{ bottom: boolean }>``;

const Separator = styled.div`
  position: relative;

  width: 100%;

  &::before {
    display: block;
    content: '';
    /* position: absolute; */
    width: 100%;
    height: 1px;

    border-top: 1px solid ${({ theme }) => theme.borderColor};
  }

  @media screen and (max-height: 480px) {
    height: 100%;
    &::before {
      height: 100%;
      width: 1px;

      border-right: 1px solid ${({ theme }) => theme.borderColor};
    }
  }
`;

export default QuickActions;
