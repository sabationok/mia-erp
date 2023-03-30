import React from 'react';
import NavMenu from '../NavMenu/NavMenu';
import LogoSvg from './LogoSvg/LogoSvg';

import UserMenu from '../UserMenu/UserMenu';
import styled from 'styled-components';
import ActionToggleSideBar from 'components/SideBarLeft/Actions/ActionToggleSideBar';

interface IHeaderComponent {
  Component: React.FC | null;
  props?: any;
}

const HeaderLeftSideItems: IHeaderComponent[] = [
  { Component: ActionToggleSideBar },
  { Component: LogoSvg },
  { Component: NavMenu },
];
const HeaderRightSideItems: IHeaderComponent[] = [{ Component: UserMenu }];
const Header: React.FC = () => {
  return (
    <StyledHeader>
      <LeftSide>
        {HeaderLeftSideItems.map(({ Component, props }, idx) => (
          <StyledBox key={idx}>{Component && <Component {...props} />}</StyledBox>
        ))}
      </LeftSide>

      <RightSide>
        {HeaderRightSideItems.map(({ Component, props }, idx) => (
          <StyledBox key={idx}>{Component && <Component {...props} />}</StyledBox>
        ))}
      </RightSide>
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
  z-index: 500;

  height: 100%;
  width: 100%;

  fill: ${({ theme }) => theme.fillColorHeader};
  color: ${({ theme }) => theme.fontColorHeader};
  background-color: ${({ theme }) => theme.backgroundColorSecondary};
  border-bottom: 1px solid ${({ theme }) => theme.trBorderClr};
`;
const LeftSide = styled.div`
  display: grid;
  grid-template-columns: 40px min-content min-content;
  align-items: center;

  height: 100%;
`;

const StyledBox = styled.div`
  display: flex;
  align-items: center;
  border-right: 1px solid ${({ theme }) => theme.trBorderClr};

  height: 100%;
`;

const RightSide = styled.div`
  display: flex;
  align-items: center;
`;

export default Header;
