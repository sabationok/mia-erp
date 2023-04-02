import React, { useEffect, useState } from 'react';
import ButtonIcon from 'components/atoms/ButtonIcon/ButtonIcon';
import SvgIcon from 'components/atoms/SvgIcon/SvgIcon';
import { NavLink, useLocation } from 'react-router-dom';
import { pages } from 'data';
import { iconId } from 'data';
import { IPage } from 'redux/page/pageSlice';
import styled from 'styled-components';

const NavMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activePage, setActivePage] = useState<IPage>(pages[0]);
  const location = useLocation();

  function handleOpenNavMenu() {
    setIsOpen(!isOpen);
  }
  function handleSetActivePage(page: IPage) {
    setActivePage(page);
  }
  function onNavLinkClick(page: IPage) {
    handleSetActivePage(page);

    handleOpenNavMenu();
  }

  useEffect(() => {
    const currentPathName = location.pathname.replace('/', '');

    const currentPageData = pages.find(page => page.path === currentPathName);

    setActivePage(currentPageData || pages[0]);
  }, [location.pathname]);

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
        <NavList>
          {pages.map(item => {
            return (
              <StyledNavLink
                key={item?.path}
                to={item?.path}
                onClick={() => {
                  onNavLinkClick(item);
                }}
              >
                <SvgIcon iconId={item.iconId} size="18px" />

                {item?.title || '---'}
              </StyledNavLink>
            );
          })}
        </NavList>
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
  /* width: fit-content; */
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

  fill: ${({ theme: { accentColor } }) => accentColor.base};
  background-color: transparent;

  & .svgIcon {
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
  max-height: ${({ isOpen }) => (isOpen ? '100vh' : '0')};
  box-shadow: ${({ isOpen, theme }) => (isOpen ? theme.globals.shadowMain : '')};
  transition: max-height ${({ theme }) => theme.globals.timingFnMain}; ;
`;

const NavList = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  align-content: start;

  min-width: 100%;

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
  width: 100%;

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
    background-color: rgba(254, 254, 254, 0.05);
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
