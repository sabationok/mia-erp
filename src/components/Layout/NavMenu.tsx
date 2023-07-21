import React, { useCallback, useEffect, useMemo, useState } from 'react';
import ButtonIcon from 'components/atoms/ButtonIcon/ButtonIcon';
import { NavLink, useLocation } from 'react-router-dom';
import { iconId } from 'data';
import { IPage } from 'redux/page/pageSlice';
import styled from 'styled-components';

import SvgIcon from 'components/atoms/SvgIcon/SvgIcon';
import Text from '../atoms/Text';
import { useAppPages, useAppParams } from '../../hooks';

const NavMenu: React.FC = () => {
  const { permissionId } = useAppParams();
  const pages = useAppPages({ permissionId });
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activePage, setActivePage] = useState<IPage>(pages[0]);
  const location = useLocation();

  const handleOpenNavMenu = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  function handleSetActivePage(page: IPage) {
    setActivePage(page);
  }

  const onNavLinkClick = useCallback(
    (page: IPage) => {
      handleSetActivePage(page);

      handleOpenNavMenu();
    },
    [handleOpenNavMenu]
  );

  const renderLinks = useMemo(
    () =>
      pages.map(item => {
        return (
          <StyledNavLink
            key={item?.path}
            // to={companyId ? `/${companyId}/${item?.path}` : `/${item.path}`}
            to={item.path}
            onClick={() => {
              onNavLinkClick(item);
            }}
          >
            <SvgIcon iconId={item.iconId} size="18px" style={{ display: 'none' }} />

            <Text>{item?.title || '---'}</Text>
          </StyledNavLink>
        );
      }),
    [onNavLinkClick, pages]
  );

  useEffect(() => {
    const currentPageData = pages.find(page => page.path === location.pathname);

    setActivePage(currentPageData || pages[0]);
  }, [location.pathname, pages, permissionId]);

  useEffect(() => {
    function onMenuClose(ev: MouseEvent | KeyboardEvent) {
      const { target } = ev;
      if (target instanceof HTMLElement && !target?.closest('[data-nav-menu]')) setIsOpen(false);
      if (ev instanceof KeyboardEvent && ev?.code === 'Escape') setIsOpen(false);
    }

    document.addEventListener('click', onMenuClose);
    document.addEventListener('keydown', onMenuClose);

    return () => {
      document.removeEventListener('click', onMenuClose);
      document.removeEventListener('keydown', onMenuClose);
    };
  }, []);

  return (
    <StyledNavMenu data-nav-menu>
      <MenuButton
        variant="def"
        endIconSize="24px"
        endIconId={iconId.SmallArrowDown}
        isOpen={isOpen}
        onClick={handleOpenNavMenu}
      >
        {activePage?.title}
      </MenuButton>

      <NavMenuContainer isOpen={isOpen}>
        <NavList>{renderLinks}</NavList>
      </NavMenuContainer>
    </StyledNavMenu>
  );
};

interface MenuState {
  isOpen: boolean;
}

const StyledNavMenu = styled.div`
  position: relative;

  min-width: 150px;
  max-width: 100%;
  height: 100%;

  font-size: 12px;
  font-weight: 600;
  @media screen and (min-width: 768px) {
    min-width: 200px;
  }
`;
const MenuButton = styled(ButtonIcon)<{ isOpen: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  min-height: 28px;
  height: 100%;

  padding: 0 8px 0 16px;
  border-radius: 0;

  font-size: 12px;
  font-weight: 600;

  background-color: transparent;
  border: 0;

  & .endIcon {
    transform: ${({ isOpen }) => `rotate(${isOpen ? '180' : '0'}deg)`};
  }
`;
const NavMenuContainer = styled.div<MenuState>`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  position: absolute;
  top: 100%;
  left: 0;

  overflow: hidden;
  min-width: 100%;
  max-width: calc(100% + 30px);

  background-color: ${({ theme }) => theme.backgroundColorSecondary};
  max-height: ${({ isOpen }) => (isOpen ? '80vh' : '0')};
  box-shadow: ${({ isOpen, theme }) => (isOpen ? theme.globals.shadowMain : '')};
  transition: max-height ${({ theme }) => theme.globals.timingFnMain},
    box-shadow ${({ theme }) => theme.globals.timingFnMain};
`;

const NavList = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  align-content: start;

  min-width: 100%;
  max-height: 100%;

  padding: 8px 0;
`;

const StyledNavLink = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 8px;

  position: relative;

  width: 100%;
  min-height: 34px;
  font-size: 14px;
  height: min-content;

  padding: 4px 16px;

  border-radius: 0;
  border-style: none;
  transition: none;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;

    width: 3px;
    height: 0;

    background-color: transparent;

    transform: translateY(-50%);
    transition: all ${({ theme }) => theme.globals.timingFunctionLong};
  }

  &:hover {
    background-color: rgba(254, 254, 254, 0.25);

    &::before {
      height: 100%;
      background-color: var(--darkOrange);
    }
  }

  &.active {
    background-color: rgba(254, 254, 254, 0.05);
    /* color: var(--darkOrange); */
    /* fill: var(--darkOrange); */

    &::before {
      height: 80%;
      background-color: ${({ theme: { accentColor } }) => accentColor.base};
    }
  }

  @media screen and (min-width: 768px) {
    min-height: 24px;
    font-size: 12px;
    height: min-content;
  }
`;

export default NavMenu;
