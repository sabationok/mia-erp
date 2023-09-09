import React, { useEffect } from 'react';
import ButtonIcon from 'components/atoms/ButtonIcon/ButtonIcon';
import { ErrorContent } from 'components/atoms';
import { useModalProvider } from 'components/ModalProvider/ModalProvider';
import { iconId } from 'data';
import { useSideBar } from './SideBarProvider';
import styled, { css } from 'styled-components';
import FlexBox from '../atoms/FlexBox';

const SideBarOptions: React.FC = () => {
  const { RightSideContent, onClose, isOpen } = useSideBar();
  const modal = useModalProvider();

  function handleCloseMenu() {
    onClose && onClose();
  }

  function onBackdropClick(ev: React.MouseEvent<HTMLDivElement>) {
    const { target, currentTarget } = ev;
    if (target === currentTarget) handleCloseMenu();
  }

  useEffect(() => {
    const isModalOpen = modal.getState().length > 0;
    if (isModalOpen) return;
    if (!RightSideContent) return;

    function onMenuClose(ev: KeyboardEvent | MouseEvent) {
      if (isModalOpen) return;

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
  }, [onClose, modal, RightSideContent]);

  return (
    <Backdrop
      className="backdrop"
      isOpen={!!(isOpen && RightSideContent?.RenderComponent)}
      maxWidth={RightSideContent?.maxWidth}
      onClick={onBackdropClick}
    >
      <Container isOpen={!!(isOpen && RightSideContent?.RenderComponent)} maxWidth={RightSideContent?.maxWidth}>
        <Header>
          <Title>{RightSideContent?.title}</Title>

          <ButtonIcon
            iconSize="18px"
            size="22px"
            iconId={iconId.close}
            variant="defNoEffects"
            onClick={handleCloseMenu}
          />
        </Header>

        <ContentScroll>
          {typeof RightSideContent?.RenderComponent === 'function' ? (
            <RightSideContent.RenderComponent {...{ options: RightSideContent.options }} />
          ) : (
            <ErrorContent />
          )}
        </ContentScroll>
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

  background-color: ${({ theme }) => theme.sideBarBackgroundColor};
  border-right: 1px solid ${({ theme }) => theme.sideBarBorderColor};

  transform: ${({ isOpen }) => `translate(${isOpen ? '0' : '-100%'})`};
  transition: transform ${({ theme }) => theme.globals.timingFunctionMain},
    max-width ${({ theme }) => theme.globals.timingFunctionMain};

  @media screen and (max-width: 480px) {
    max-width: 480px;
  }
`;
const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;

  /* position: sticky;
  top: 0;
  left: 0; */

  padding: 0 8px;

  height: 32px;
  width: 100%;

  background-color: ${({ theme }) => theme.sideBarBackgroundColor};
  cursor: default;
`;
const Title = styled.div`
  display: flex;
  align-items: center;

  font-size: 16px;
  font-weight: 700;
`;

const ContentScroll = styled(FlexBox)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;

  height: 100%;
  width: 100%;
  overflow: auto;

  /* padding: 4px; */
  background-color: ${({ theme }) => theme.sideBarOptionsBackgroundColor};
  border-top: 1px solid ${({ theme }) => theme.sideBarBorderColor};
`;

export default SideBarOptions;
