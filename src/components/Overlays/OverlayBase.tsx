import styled from 'styled-components';
import React, { memo } from 'react';
import { OverlayHeader } from './index';

export interface DrawerBaseProps extends Omit<React.FormHTMLAttributes<HTMLDivElement>, 'onSubmit' | 'onReset'> {
  footer?: boolean;
  onClosePress?: () => void;
  onBackPress?: () => void;
  isLoading?: boolean;
  extraFooter?: React.ReactNode;
  extraHeader?: React.ReactNode;
  fillWidth?: boolean;
  fillHeight?: boolean;
  fitContentV?: boolean;
  fitContentH?: boolean;
  height?: string;
  width?: string;
  canSubmit?: boolean;
  okButton?: boolean;
}

const DrawerBase: React.FC<DrawerBaseProps> = ({
  title,
  footer = false,
  children,
  extraFooter,
  extraHeader,
  isLoading = false,
  onClosePress,
  onBackPress,
  okButton,
  canSubmit,
  ...props
}) => {
  return (
    <DrawerContainer className="modal_base" {...props}>
      <OverlayHeader
        onBackPress={onBackPress}
        onClosePress={onClosePress}
        title={title}
        canSubmit={canSubmit}
        okButton={okButton}
      >
        {extraHeader}
      </OverlayHeader>

      <Content className="main">{children}</Content>
    </DrawerContainer>
  );
};

const DrawerContainer = styled.div<
  Pick<DrawerBaseProps, 'fillHeight' | 'fillWidth' | 'fitContentH' | 'fitContentV' | 'width' | 'height'>
>`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: min-content 1fr max-content;

  position: relative;
  padding: 0 8px;

  min-height: 200px;
  max-height: 90vh;

  color: ${p => p.theme.fontColorSidebar};
  width: ${({ width = '480px', fillWidth, fitContentH }) =>
    (fillWidth && '100vw') || (fitContentH && 'max-content') || width};
  height: ${({ height = '', fillHeight, fitContentV }) =>
    (fillHeight && '90vh') || (fitContentV && 'max-content') || height};

  min-width: 250px;
  max-width: 100%;

  //overflow: hidden;

  box-shadow: ${({ theme }) => theme.globals.shadowMain};
  fill: ${({ theme }) => theme.fillColor};
  color: ${({ theme }) => theme.fontColor};
  background-color: ${({ theme }) => theme.modalBackgroundColor};

  border-radius: 2px;
  border-bottom: 1px solid ${({ theme }) => theme.modalBorderColor};
  /* resize: both; */

  @media screen and (max-width: 480px) {
    width: 98vw;
  }

  @media screen and (min-width: 480px) {
    width: ${p => (p.fillWidth ? '98vw' : '450px')};
  }
`;

const Content = styled.main`
  display: flex;
  flex-direction: column;

  overflow: auto;
  position: relative;
  height: 100%;
  max-width: 100%;
  max-height: 100%;
  width: 100%;

  background-color: ${({ theme }) => theme.modalBackgroundColor};

  ::-webkit-scrollbar {
    width: 4px;
    height: 4px;
  }
  //border-right: 1px solid ${({ theme }) => theme.modalBorderColor};
  //border-left: 1px solid ${({ theme }) => theme.modalBorderColor};
`;

export default memo(DrawerBase);
