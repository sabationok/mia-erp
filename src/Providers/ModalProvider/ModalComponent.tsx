import React, { createContext, memo, Suspense, useContext, useEffect, useMemo, useState } from 'react';
import CloseButton from './CloseButton';
import styled from 'styled-components';

interface ModalComponentProps<P = any> {
  children?: React.ReactNode;
  RenderModalComponentChildren?: React.FC<RenderModalComponentChildrenProps & P>;
  childrenProps?: P;
  idx?: number;
  settings?: IModalSettings;
  onClose: () => void;
  id?: number | string;
  $totalLength?: number;
  $isLast?: boolean;
}
export interface RenderModalComponentChildrenProps {
  onClose?: () => void;
  modalId?: string | number;
  index?: number;
}

export enum ModalAnimationType {
  ScaleCenter = 'ScaleCenter',
  FromBottom = 'FromBottom',
  FromRight = 'FromRight',
}

const modalAnimation = {
  [ModalAnimationType.ScaleCenter]: `ModalAnimationScaleCenter 100ms linear`,
  [ModalAnimationType.FromBottom]: `ModalAnimationFromBottom 150ms linear`,
  [ModalAnimationType.FromRight]: `ModalAnimationFromRight 500ms linear`,
};

const modalStyle = {
  [ModalAnimationType.FromRight]: {
    bottom: 0,
    right: 0,
  },
  [ModalAnimationType.ScaleCenter]: {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  [ModalAnimationType.FromBottom]: {
    bottom: 0,
    margin: 'auto',
  },
};

export interface IModalSettings {
  backdropColor?: string;
  backdropAnimation?: string;
  modalAnimation?: string;
  backdropStyle?: React.CSSProperties;
  modalStyle?: React.CSSProperties;
  closeBtnStyle?: React.CSSProperties;
  closeBtn?: boolean;
  onBackdropClose?: boolean;
  onEscapePressClose?: boolean;

  closeByBackdropPress?: boolean;
  closeByEscapePress?: boolean;
}

const initialSettings: IModalSettings = {
  backdropColor: 'rgba(0, 0, 0, 0.5)',
  backdropAnimation: 'BackdropAnimation 100ms linear',
  modalAnimation: modalAnimation[ModalAnimationType.FromBottom],
  closeBtn: false,
  modalStyle: modalStyle[ModalAnimationType.FromBottom],
  closeByBackdropPress: true,
  closeByEscapePress: true,
};

interface ModalCTX {
  onClose: () => void;
  modalIdx?: string | number;
  modalSettings?: IModalSettings;
  id?: string | number;
  totalLength?: number;
  isLast?: boolean;
  handleSetModalSettings: (settings: IModalSettings) => void;
}

export const ModalContext = createContext({});
export const useModal = () => useContext(ModalContext) as ModalCTX;

const ModalComponent: React.FC<ModalComponentProps> = ({
  RenderModalComponentChildren,
  childrenProps,
  idx,
  settings,
  onClose,
  id,
  $totalLength,
  $isLast,
}) => {
  const [modalSettings, setModalSettings] = useState<IModalSettings>({ ...initialSettings, ...settings });
  function handleSetModalSettings(settings: IModalSettings) {
    setModalSettings(settings);
  }

  function handleMouseDownOnBackdrop(ev: React.MouseEvent<HTMLDivElement>) {
    if (modalSettings?.closeByBackdropPress) {
      if (ev.target === ev.currentTarget) {
        ev.target.addEventListener('mouseup', onClose, { once: true });
        return;
      }
    }
  }

  const CTX: ModalCTX = useMemo(
    () => ({
      onClose,
      modalIdx: idx,
      modalSettings,
      id,
      handleSetModalSettings,
    }),
    [id, idx, modalSettings, onClose]
  );

  const renderChildren = useMemo(() => {
    return RenderModalComponentChildren ? (
      <RenderModalComponentChildren id={id} onClose={onClose} index={idx} {...childrenProps} />
    ) : null;
    // eslint-disable-next-line
  }, [childrenProps, id, idx]);

  useEffect(() => {
    if (!modalSettings.closeByEscapePress) return;

    function handleToggleModalByEsc(evt: KeyboardEvent) {
      if (!$isLast || !modalSettings.closeByEscapePress) return;

      if (evt?.code === 'Escape') {
        if (typeof onClose === 'function') onClose();
      }
    }

    document.addEventListener('keydown', handleToggleModalByEsc);

    return () => {
      document.removeEventListener('keydown', handleToggleModalByEsc);
    };
  }, [$isLast, modalSettings.closeByEscapePress, onClose]);

  return (
    <Backdrop
      key={idx}
      $isLast={$isLast}
      style={modalSettings.backdropStyle}
      modalSettings={modalSettings}
      onMouseDown={handleMouseDownOnBackdrop}
      // onMouseUp={handleCloseByBackdrop}
    >
      <Suspense>
        <ModalContext.Provider value={CTX}>
          <Modal style={modalSettings.modalStyle} modalSettings={modalSettings}>
            {modalSettings?.closeBtn && <CloseButton onClick={onClose} />}

            {renderChildren}
          </Modal>
        </ModalContext.Provider>
      </Suspense>
    </Backdrop>
  );
};

const Backdrop = styled.div<{
  $isLast: boolean | undefined;
  modalSettings: IModalSettings;
}>`
  display: flex;
  align-items: center;
  justify-content: center;

  position: fixed;
  top: 0;
  left: 0;
  z-index: 1300;

  width: 100%;
  height: 100%;

  background-color: ${({ $isLast, modalSettings }) => ($isLast ? modalSettings.backdropColor : '')};
  /* animation: ${({ $isLast, modalSettings }) => (!$isLast ? modalSettings.backdropAnimation : '')}; */
`;
const Modal = styled.div<{ modalSettings: IModalSettings }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  position: absolute;
  bottom: 0;

  min-width: 200px;

  min-height: 50px;
  max-width: 98%;
  max-height: 98%;

  //transform: translate(-50%, 0);
  border-radius: 2px;
  overflow: hidden;
  /* background-color: rgba(255, 255, 255, 0.5); */

  animation: ${({ modalSettings }) => modalSettings.modalAnimation};
`;

export default memo(ModalComponent);
