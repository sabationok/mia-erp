import React, { useEffect } from 'react';
import ButtonIcon from 'components/atoms/ButtonIcon/ButtonIcon';
import { useModalProvider } from 'components/ModalProvider/ModalProvider';
import { iconId } from 'data';
import { useSideBar } from './SideBarProvider';
import styled, { css } from 'styled-components';

const SideBarOptions: React.FC = () => {
  const { RightSideContent, onClose, isOpen } = useSideBar();

  const modal = useModalProvider();

  function handleCloseMenu() {
    onClose && onClose();
  }
  function onBackdropClick(ev: React.MouseEvent<HTMLDivElement>) {
    const { target, currentTarget } = ev;
    console.log(target);
    if (target === currentTarget) handleCloseMenu();
  }

  useEffect(() => {
    if (modal.isOpen) return;
    if (!RightSideContent) return;

    function onMenuClose(ev: KeyboardEvent | MouseEvent) {
      if (modal.isOpen) return;

      const { target } = ev;
      if (target instanceof HTMLElement && !target?.closest('[data-sidebar]')) onClose && onClose();
      if (ev instanceof KeyboardEvent && ev?.code === 'Escape') onClose && onClose();
    }
    const rootEl = document.getElementById('root');

    rootEl?.addEventListener('click', onMenuClose);
    rootEl?.addEventListener('keydown', onMenuClose);

    return () => {
      rootEl?.removeEventListener('click', onMenuClose);
      rootEl?.removeEventListener('keydown', onMenuClose);
    };
  }, [onClose, modal.isOpen, RightSideContent]);

  return (
    <Backdrop
      className="backdrop"
      isOpen={isOpen && RightSideContent?.RenderComponent ? true : false}
      maxWidth={RightSideContent?.maxWidth}
      onClick={onBackdropClick}
    >
      <Container
        isOpen={isOpen && RightSideContent?.RenderComponent ? true : false}
        maxWidth={RightSideContent?.maxWidth}
      >
        <Header>
          <Title>{RightSideContent?.title}</Title>

          <ButtonIcon iconSize="18px" size="22px" iconId={iconId.close} variant="def" onClick={handleCloseMenu} />
        </Header>

        <ContentScroll>{RightSideContent?.RenderComponent ? <RightSideContent.RenderComponent /> : null}</ContentScroll>
      </Container>
    </Backdrop>
  );
};

const Backdrop = styled.div<{ isOpen: boolean; maxWidth?: string }>`
  position: absolute;
  top: 0;
  left: 100%;

  max-height: 100%;
  height: 100%;
  overflow: hidden;
  /* min-width: calc(100vw - 40px); */
  background-color: ${({ theme }) => theme.backdropColor};

  transition: visibility ${({ theme }) => theme.globals.timingFunctionMain},
    opacity ${({ theme }) => theme.globals.timingFunctionMain}, width ${({ theme }) => theme.globals.timingFnNull};
  transition-delay: ${({ isOpen }) => (isOpen ? '' : '250ms')};

  ${({ isOpen }) =>
    isOpen
      ? css`
          width: calc(100vw - 40px);
          opacity: 1;
          visibility: visible;
          pointer-events: all;
        `
      : css`
          width: 0;
          opacity: 0;
          visibility: hidden;
          pointer-events: none;
        `}
`;
const Container = styled.div<{ isOpen: boolean; maxWidth?: string }>`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: min-content 1fr;

  height: 100%;
  max-width: ${({ maxWidth }) => (maxWidth ? maxWidth : '250px')};
  overflow: hidden;

  background-color: ${({ theme }) => theme.backgroundColorLight};

  transform: ${({ isOpen }) => `translate(${isOpen ? '0' : '-100%'})`};
  transition: transform ${({ theme }) => theme.globals.timingFunctionMain},
    max-width ${({ theme }) => theme.globals.timingFunctionMain};
`;
const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;

  /* position: sticky;
  top: 0;
  left: 0; */

  padding: 0 8px;

  font-size: 14px;
  font-weight: 600;

  height: 32px;
  width: 100%;

  background-color: ${({ theme }) => theme.backgroundColorSecondary};
  cursor: default;
`;
const Title = styled.div`
  display: flex;
  align-items: center;
`;

const ContentScroll = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;

  height: 100%;
  width: 100%;
  overflow: auto;

  padding: 4px;
`;

const Test = styled.div`
  min-height: 1500px;
  width: 100%;
  border: 2px solid tomato;
`;
export default SideBarOptions;
