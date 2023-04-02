import ButtonIcon from 'components/atoms/ButtonIcon/ButtonIcon';
import SideBarOptions from './SideBarOptions';
import ToggleThemeMode from './Actions/ChangeTheme';
import ActionAppExit from './Actions/ActionAppExit';
import { useSideBar } from './SideBarProvider';
import styled, { css } from 'styled-components';
import { useState } from 'react';

const SideBar: React.FC = () => {
  const { isOpen, onTogglerClick, handleOptionsState, sideBarButtons, sideBarButtonsBottom, RightSideContent } =
    useSideBar();
  const [isMiddleOpen, setIsMiddleOpen] = useState(false);

  function handleMiddleOpen() {
    setIsMiddleOpen(prev => !prev);
  }
  return (
    <StyledSideBar isOpen={!!isOpen} data-sidebar>
      <MenuToggler isOpen={!!isOpen} onClick={onTogglerClick} />

      <SideBarContainer>
        <Content isOpen={!!isOpen}>
          <Top>
            <ToggleThemeMode />
          </Top>

          <Middle>
            <MiddleToggler variant="def" iconId="actionsH" iconSize="24px" onClick={() => handleMiddleOpen()} />

            <MiddleButtons isMiddleOpen={isMiddleOpen}>
              {sideBarButtons &&
                sideBarButtons.map(item => (
                  <StyledButtonIcon
                    key={item?.iconId}
                    iconId={item?.iconId}
                    title={item?.title}
                    iconSize="20px"
                    variant="pointerLeft"
                    isActive={item?.title === RightSideContent?.title}
                    onClick={() => handleOptionsState && handleOptionsState(item)}
                  />
                ))}
            </MiddleButtons>
          </Middle>

          <Bottom>
            {sideBarButtonsBottom &&
              sideBarButtonsBottom.map(item => (
                <StyledButtonIcon
                  key={item?.iconId}
                  iconId={item?.iconId}
                  title={item?.title}
                  iconSize="20px"
                  variant="pointerLeft"
                  isActive={item?.title === RightSideContent?.title}
                  onClick={() => handleOptionsState && handleOptionsState(item)}
                />
              ))}
            <ActionAppExit />
          </Bottom>
        </Content>

        <SideBarOptions />
      </SideBarContainer>
    </StyledSideBar>
  );
};

interface SideBarState {
  isOpen: boolean;
  options?: any[] | null;
}
const sideBarCompWidth = '36px';

const StyledSideBar = styled.div<SideBarState>`
  grid-column: 1/2;
  grid-row: 2/3;

  display: grid;
  grid-template-columns: ${({ isOpen }) => (isOpen ? 'min-content' : '4px')} 1fr;

  width: fit-content;
  max-width: 40px;
  height: 100%;

  position: relative;
  z-index: 1000;

  fill: ${({ theme }) => theme.fillColorHeader};
  color: ${({ theme }) => theme.fontColorHeader};
  background-color: ${({ theme }) => theme.backgroundColorSecondary};
`;
const SideBarContainer = styled.div`
  display: grid;
  grid-template-columns: min-content min-content;

  height: 100%;
  width: 100%;
`;
const Content = styled.div<SideBarState>`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 32px 1fr min-content;

  position: relative;

  max-width: 0;
  height: 100%;
  max-height: 100%;
  min-width: ${({ isOpen }) => (isOpen ? sideBarCompWidth : '0')};

  overflow: hidden;

  background-color: ${({ theme }) => theme.backgroundColorSecondary};
  transition: min-width ${({ theme }) => theme.globals.timingFunctionLong};
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  /* height: 100%; */
  width: ${sideBarCompWidth};
`;
const MiddleToggler = styled(ButtonIcon)`
  position: sticky;
  top: 0;
  left: 0;

  width: ${sideBarCompWidth};
  height: 32px;
`;
const Middle = styled.div`
  height: 100%;
  max-height: 100%;
  width: ${sideBarCompWidth};
  overflow: hidden;
`;
const MiddleButtons = styled.div<{ isMiddleOpen: boolean }>`
  /* max-height: 0; */
  overflow: hidden;

  position: relative;

  @media screen and (min-height: 480px) {
    position: absolute;
    top: 0;
    left: 50%;

    overflow: auto;
    max-height: 100%;
  }
`;

const Bottom = styled.div`
  display: flex;
  flex-direction: column;

  padding-bottom: 12px;

  width: ${sideBarCompWidth};
`;

const MenuToggler = styled.button<SideBarState>`
  width: 4px;
  height: 100%;
  padding: 0;

  position: sticky;
  top: 0;
  left: 0;
  z-index: 100;

  border-style: none;

  background-color: ${({ isOpen, theme }) => (isOpen ? theme.trBorderClr : theme.backgroundColorSecondary)};
  border-right: ${({ theme, isOpen }) => (!isOpen ? `1px solid ${theme.trBorderClr}` : '')};
  transition: all ${({ theme }) => theme.globals.timingFunctionMain};
`;

const isActiveCss = css`
  background-color: ${({ theme }) => theme.backgroundColorMain};
  color: ${({ theme }) => theme.accentColor.base};
  &::before {
    height: 80%;
    background-color: ${({ theme }) => theme.accentColor.base};
  }
`;
const StyledButtonIcon = styled(ButtonIcon)<{ isActive: boolean }>`
  width: 100%;
  height: 32px;

  border-radius: 0;
  border: 0;

  ${({ isActive }) => (isActive ? isActiveCss : null)}
`;

export default SideBar;
