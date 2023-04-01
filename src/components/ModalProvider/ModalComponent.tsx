import React, { useState, createContext, useContext, useEffect } from 'react';
import CloseButton from './CloseButton';
import styled from 'styled-components';

//* ""handleToggle"" функція яка тоглить стейт модалки
//* ""defaultBtn"" BOOLEAN чи потрібна дефолтна кнопка закриття
//* ""children"" вміст модалки

interface ModalComponentProps {
  children: React.ReactNode;
  idx?: number | string;
  settings?: IModalSettings;
  onClose: (args?: any) => void;
  id?: number | string;
  totalLength?: number;
  isLast?: boolean;
}
export interface IModalSettings {
  backdropColor?: string;
  backdropAnimation?: string;
  modalAnimation?: string;
  backdropStyle?: React.CSSProperties;
  modalStyle?: React.CSSProperties;
  closeBtnStyle?: React.CSSProperties;
  closeBtn?: boolean;
}
const initialSettings: IModalSettings = {
  backdropColor: 'rgba(0, 0, 0, 0.5)',
  backdropAnimation: 'BackdropAnimation 100ms linear',
  modalAnimation: `ModalAnimation 100ms linear`,
  closeBtn: false,
};

interface ModalCTX {
  onClose: (args?: any) => void;
  modalIdx: number;
  modalSettings: IModalSettings;
  id: number | string;
  totalLength: number;
  isLast: boolean;
}

export const ModalContext = createContext({});
export const useModal = () => useContext(ModalContext) as ModalCTX;

const ModalComponent: React.FC<ModalComponentProps> = ({
  children,
  idx,
  settings,
  onClose,
  id,
  totalLength,
  isLast,
}) => {
  const [modalSettings] = useState<IModalSettings>(settings || initialSettings);

  function onBackdropClick(ev: React.MouseEvent) {
    if (ev.target !== ev.currentTarget) return;
    if (typeof onClose === 'function') onClose();
  }

  const CTX = { onClose, modalIdx: idx, modalSettings, id, totalLength, isLast };

  useEffect(() => {
    function handleToggleModalByEsc(evt: KeyboardEvent) {
      if (!isLast) return;

      if (evt?.code === 'Escape') {
        if (typeof onClose === 'function') onClose();
      }
    }

    document.addEventListener('keydown', handleToggleModalByEsc);

    return () => {
      document.removeEventListener('keydown', handleToggleModalByEsc);
    };
  }, [isLast, onClose]);
  return (
    <Backdrop
      key={idx}
      isLast={isLast}
      onClick={onBackdropClick}
      style={modalSettings.backdropStyle}
      modalSettings={modalSettings}
    >
      <ModalContext.Provider value={CTX}>
        <Modal style={modalSettings.modalStyle} modalSettings={modalSettings}>
          {modalSettings?.closeBtn && <CloseButton onClick={onClose} />}

          {children}
        </Modal>
      </ModalContext.Provider>
    </Backdrop>
  );
};

const Backdrop = styled.div<{ isLast: boolean | undefined; modalSettings: IModalSettings }>`
  display: flex;
  align-items: center;
  justify-content: center;

  position: fixed;
  top: 0;
  left: 0;
  z-index: 1300;

  width: 100%;
  height: 100%;

  background-color: ${({ isLast, modalSettings }) => (isLast ? modalSettings.backdropColor : '')};
  /* animation: ${({ isLast, modalSettings }) => (!isLast ? modalSettings.backdropAnimation : '')}; */
`;
const Modal = styled.div<{ modalSettings: IModalSettings }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  position: absolute;
  top: 50%;
  left: 50%;

  min-width: 200px;

  min-height: 50px;
  max-width: 98%;
  max-height: 98%;

  transform: translate(-50%, -50%);
  border-radius: 2px;
  overflow: hidden;
  /* background-color: rgba(255, 255, 255, 0.5); */

  animation: ${({ modalSettings }) => modalSettings.modalAnimation};
`;

export default ModalComponent;
