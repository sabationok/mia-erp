import styled from 'styled-components';
import React, { memo } from 'react';
import { ModalHeader, ModalHeaderProps } from './ModalHeader';
import { useModal } from '../../../Providers/ModalProvider/ModalComponent';
import { FlexBoxProps, FlexMain } from '../FlexBox';

export interface ModalBaseProps
  extends ModalHeaderProps,
    Omit<React.FormHTMLAttributes<HTMLDivElement>, 'onSubmit' | 'onReset'> {
  $hasFooter?: boolean;
  onClose?: () => void;
  isLoading?: boolean;
  extraFooter?: React.ReactNode;
  extraHeader?: React.ReactNode;
  fillWidth?: boolean;
  fillHeight?: boolean;
  fitContentV?: boolean;
  fitContentH?: boolean;
  height?: string;
  width?: string;
  contentContainerProps?: FlexBoxProps;
}

const ModalBase: React.FC<ModalBaseProps> = ({
  title = 'Default modal title',
  $hasFooter = false,
  children,
  extraFooter,
  extraHeader,
  isLoading = false,
  onClose,
  onBackPress,
  hasOkButton,
  menuActions,
  canSubmit,
  renderTitle,
  contentContainerProps,
  ...props
}) => {
  const modal = useModal();
  return (
    <ModalContainer className="modal_base" {...props}>
      <ModalHeader
        title={title}
        hasOkButton={hasOkButton}
        onClose={onClose || modal?.onClose}
        onBackPress={onBackPress}
        menuActions={menuActions}
        canSubmit={canSubmit}
        renderTitle={renderTitle}
      >
        {extraHeader}
      </ModalHeader>

      <ModalMain {...contentContainerProps} className="main">
        {children}
      </ModalMain>
    </ModalContainer>
  );
};

const ModalContainer = styled.div<
  Pick<ModalBaseProps, 'fillHeight' | 'fillWidth' | 'fitContentH' | 'fitContentV' | 'width' | 'height'>
>`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: min-content 1fr max-content;

  position: relative;
  padding: 0 8px 8px;

  min-height: 200px;
  max-height: 90vh;

  color: ${p => p.theme.fontColorSidebar};
  width: ${({ width, fillWidth, fitContentH }) => (fillWidth && '100vw') || (fitContentH && 'max-content') || width};
  height: ${({ height = '', fillHeight, fitContentV }) =>
    (fillHeight && '90vh') || (fitContentV && 'max-content') || height};

  //min-width: 230px;
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
    width: ${p => (p.fillWidth ? '98vw' : p.width ? p.width : '450px')};
  }
`;

const ModalMain = styled(FlexMain)`
  //overflow: auto;
  overflow-y: auto;
  overflow-x: hidden;
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

export default memo(ModalBase);
