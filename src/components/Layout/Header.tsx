import React, { useMemo } from 'react';
import NavMenu from './NavMenu/NavMenu';
import LogoSvg from './LogoSvg';

import UserMenu from './UserMenu';
import styled from 'styled-components';
import ActionToggleSideBar from 'components/SideBarLeft/Actions/ActionToggleSideBar';

interface IHeaderComponent {
  Component: React.FC | null;
  props?: any;
  corp?: boolean;
}

const HeaderLeftSideItems: IHeaderComponent[] = [
  { Component: ActionToggleSideBar, corp: false },
  { Component: LogoSvg, corp: false },
  { Component: NavMenu, corp: true },
];
const HeaderRightSideItems: IHeaderComponent[] = [{ Component: UserMenu, corp: false }];

type HeaderProps = {
  havePermission?: boolean;
};
const Header: React.FC<HeaderProps> = ({ havePermission }) => {
  const renderLeftSide = useMemo(
    () =>
      HeaderLeftSideItems.filter(el => (havePermission ? el : !el.corp)).map(({ Component, corp, props }, idx) => (
        <StyledBox key={idx} borderRight>
          {Component && <Component {...props} />}
        </StyledBox>
      )),
    [havePermission]
  );

  const renderRightSide = useMemo(
    () =>
      HeaderRightSideItems.filter(el => (havePermission ? el : !el.corp)).map(({ Component, corp, props }, idx) => (
        <StyledBox key={idx} borderRight>
          {Component && <Component {...props} />}
        </StyledBox>
      )),
    [havePermission]
  );

  return (
    <StyledHeader>
      <LeftSide>{renderLeftSide}</LeftSide>

      <RightSide>{renderRightSide}</RightSide>
    </StyledHeader>
  );
};

const StyledHeader = styled.header`
  grid-column: 1/3;
  grid-row: 1/2;

  display: flex;
  align-items: center;
  justify-content: space-between;

  position: sticky;
  top: 0;
  left: 0;
  z-index: 600;

  height: 100%;
  width: 100%;

  fill: ${({ theme }) => theme.accentColor.base};
  color: ${({ theme }) => theme.fontColorHeader};

  background-color: ${({ theme }) => theme.headerBackgroundColor};
  border-bottom: 1px solid ${({ theme }) => theme.headerBorderColor};
`;
const LeftSide = styled.div`
  display: grid;
  grid-template-columns: 40px min-content min-content;
  align-items: center;

  height: 100%;
`;

const StyledBox = styled.div<{ borderRight?: boolean; borderLeft?: boolean }>`
  display: flex;
  align-items: center;

  height: 100%;

  border-right: ${({ theme, borderRight = false }) => (borderRight ? `1px solid ${theme.headerBorderColor}` : 'none')};
  border-left: ${({ theme, borderLeft = false }) => (borderLeft ? `1px solid ${theme.headerBorderColor}` : 'none')};
`;

const RightSide = styled.div`
  display: flex;
  align-items: center;
`;

export default Header;
