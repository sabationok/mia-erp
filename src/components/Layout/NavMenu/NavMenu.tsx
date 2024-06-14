import React, { useCallback, useMemo, useState } from 'react';
import ButtonIcon from 'components/atoms/ButtonIcon';
import { NavLink } from 'react-router-dom';
import { IPage } from 'redux/page/pageSlice';
import styled from 'styled-components';

import SvgIcon from 'components/atoms/SvgIcon';
import { Text } from '../../atoms/Text';
import { useAppPages, useAppRouter } from '../../../hooks';
import SubNavMenu from './SubNavMenu';
import FlexBox, { FlexUl } from '../../atoms/FlexBox';
import { AppPagesEnum, IAppPage } from '../../AppPages';
import { useCloseByBackdropClick, useCloseByEscape } from '../../../hooks/useCloseByEscapeOrClickOnBackdrop.hook';
import { useAppSelector } from '../../../redux/store.store';

const NavMenu: React.FC = () => {
  const router = useAppRouter();
  const permissionId = router.params?.permissionId;
  const location = router.location;
  const pages = useAppPages({ permissionId });
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { warehouses, priceLists, permissions } = useAppSelector();

  const currentPageData = useMemo(() => {
    const currentPageData = pages.find(
      page => page.path === location.pathname || location.pathname.includes(page.path)
    );

    return currentPageData || pages?.[0];
  }, [location.pathname, pages]);

  const handleToggleIsOpen = () => {
    setIsOpen(p => !p);
  };

  const onNavLinkClick = useCallback((page: IPage) => {
    handleToggleIsOpen();
  }, []);

  const renderLinks = useMemo(() => {
    const dataMap: Record<AppPagesEnum | string, any[] | undefined> = {
      [AppPagesEnum.warehouses]: warehouses.warehouses,
      [AppPagesEnum.priceLists]: priceLists.lists,
      [AppPagesEnum.companies]: permissions.permissions,
    };

    return pages.map(item => {
      const childrenList = item.subMenuKey ? dataMap[item.subMenuKey] : undefined;
      return (
        <MenuItem
          key={item.path}
          item={item}
          isActive={currentPageData?.path === item.path}
          childrenList={childrenList}
          onItemPress={() => onNavLinkClick(item)}
        />
      );
    });
  }, [currentPageData?.path, onNavLinkClick, pages, permissions.permissions, priceLists.lists, warehouses.warehouses]);

  useCloseByEscape(setIsOpen);
  useCloseByBackdropClick(setIsOpen, 'data-nav-menu');

  return (
    <StyledNavMenu data-nav-menu>
      <MenuButton
        type={'button'}
        // variant="def"
        // endIconSize="24px"
        // endIconId={iconId.SmallArrowDown}
        isOpen={isOpen}
        onClick={handleToggleIsOpen}
      >
        {currentPageData?.title}

        <SvgIcon icon={'SmallArrowDown'} size={'26px'} className={'endIcon'} />
      </MenuButton>

      <NavMenuContainer
        isOpen={isOpen}
        onBlur={() => {
          setIsOpen(false);
        }}
      >
        <NavList>{renderLinks}</NavList>
      </NavMenuContainer>
    </StyledNavMenu>
  );
};

const MenuItem = ({
  onItemPress,
  item,
  childrenList,
  isActive,
}: {
  onItemPress?: () => void;
  item: IAppPage;
  childrenList?: any[];
  isActive?: boolean;
}) => {
  const [isSubMenuOpen, setIsSubMenuOpen] = useState<boolean>(false);

  return (
    <React.Fragment key={`nav-item-${item.path}`}>
      <MenuListItem fxDirection={'row'} isActive={isActive} justifyContent={'space-between'}>
        <StyledNavLink key={item?.path} to={item.path} onClick={onItemPress}>
          <SvgIcon icon={item.iconId} size="18px" style={{ display: 'none' }} />

          <Text>{item?.title || '---'}</Text>
        </StyledNavLink>

        {!!childrenList?.length && (
          <ButtonIcon
            variant={'onlyIconNoEffects'}
            icon={isSubMenuOpen ? 'SmallArrowDown' : 'SmallArrowLeft'}
            size={'32px'}
            iconSize={'80%'}
            disabled={!childrenList?.length}
            background={'transparent'}
            onClick={() => setIsSubMenuOpen(p => !p)}
          />
        )}
      </MenuListItem>

      {!!childrenList?.length && item?.subMenuKey && (
        <FlexBox height={isSubMenuOpen ? 'max-content' : '0'} overflow={'hidden'}>
          <SubNavMenu
            key={item?.subMenuKey}
            subMenuKey={item?.subMenuKey}
            childrenList={childrenList}
            onActive={_ => {
              setIsSubMenuOpen(true);
            }}
          />
        </FlexBox>
      )}
    </React.Fragment>
  );
};

interface MenuState {
  isOpen: boolean;
}

const StyledNavMenu = styled.div`
  position: relative;

  min-width: 180px;
  max-width: 100%;
  height: 100%;

  @media screen and (min-width: 768px) {
    min-width: 280px;
  }
`;
const MenuButton = styled.button<{ isOpen: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  min-height: 28px;
  height: 100%;

  padding: 0 8px 0 16px;
  border-radius: 0;

  //border: 1px solid;

  font-size: 12px;
  font-weight: 600;

  background-color: transparent;
  border: 0;

  & .endIcon {
    transform: ${({ isOpen }) => `rotate(${isOpen ? '180' : '0'}deg)`};
    transition: transform ${p => p.theme.globals.timingFnMain};
  }
`;
const NavMenuContainer = styled(FlexBox)<MenuState>`
  position: absolute;
  top: 100%;
  left: 0;

  overflow: hidden;
  width: max-content;
  min-width: 100%;
  max-width: calc(100% + 70px);
  height: ${({ isOpen }) => (isOpen ? 'calc(100vh - 50px)' : '80vh')};

  border: 1px solid ${p => p.theme.modalBorderColor};

  background-color: ${({ theme }) => theme.modalBackgroundColor};

  box-shadow: ${({ isOpen, theme }) =>
    isOpen ? '0 6px 18px 0px rgba(21, 21, 21, 0.15), 0 6px 18px 0px rgba(211, 211, 211, 0.15)' : ''};

  border-radius: 4px;
  // box-shadow: ${({ theme }) => theme.globals.shadowSecondary};

  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  pointer-events: ${({ isOpen }) => (isOpen ? 'all' : 'none')};
  visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
  transform-origin: top center;
  //transform: scaleY(${({ isOpen, theme }) => (isOpen ? 1 : 0.8)});

  transition: all ${({ theme }) => theme.globals.timingFnMain};
`;

const NavList = styled(FlexUl)`
  display: grid;
  grid-template-columns: 1fr;
  align-content: start;

  min-width: 100%;
  max-height: 100%;

  overflow-y: auto;
  overflow-x: hidden;

  padding: 8px 0;
`;
const MenuListItem = styled(FlexBox)`
  background-color: ${({ theme: { accentColor }, ...p }) => (p.isActive ? accentColor.extraLight : '')};
`;
const StyledNavLink = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 8px;

  position: relative;

  width: 100%;
  min-height: 38px;
  font-size: 15px;
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
    &::before {
      height: 100%;
      background-color: ${({ theme: { accentColor } }) => accentColor.base};
    }
  }

  &.active {
    background-color: ${({ theme: { accentColor } }) => accentColor.extraLight};
    &::before {
      height: 80%;
      background-color: ${({ theme: { accentColor } }) => accentColor.base};
    }
  }

  @media screen and (min-width: 768px) {
    min-height: 34px;
    font-size: 15px;
    height: min-content;
  }
`;

export default NavMenu;
