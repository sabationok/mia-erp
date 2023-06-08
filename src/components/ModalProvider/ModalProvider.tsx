import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import ModalPortal from './ModalPortal';
import ModalComponent, { IModalSettings } from './ModalComponent';
import { nanoid } from '@reduxjs/toolkit';

interface IModalProviderProps {
  children: React.ReactNode;
  portalId?: string;
}

export interface IModalChildrenProps {
  title?: string;
}

export interface IModalRenderItemParams<T = any, S = any> {
  ModalChildren?: React.FC<IModalChildrenProps & T>;
  modalChildrenProps?: IModalChildrenProps & T;
  settings?: IModalSettings & S;
  id?: number | string;
}

interface IModalProviderContext {
  handleOpenModal: <T = any, S = any>(args: IModalRenderItemParams<T, S>) => void;
  handleCloseModal: (id?: string) => void;
  isOpen: boolean;
}

export const ModalProviderContext = createContext({});
export const useModalProvider = () => useContext(ModalProviderContext) as IModalProviderContext;

const ModalProvider: React.FC<IModalProviderProps> = ({ children, portalId }) => {
  const [modalContent, setModalContent] = useState<IModalRenderItemParams<any, any>[]>([]);

  function handleOpenModal<T = any, S = any>({
    ModalChildren,
    modalChildrenProps,
    settings,
  }: IModalRenderItemParams<T, S>) {
    if (!ModalChildren) return console.error('ModalChildren is undefined');

    if (typeof ModalChildren === 'function') {
      setModalContent(prev => [...prev, { ModalChildren, modalChildrenProps, settings, id: nanoid(8) }]);
      return;
    }
  }

  const onClose = useCallback(
    (id?: string | number) => () =>
      setModalContent(prev => (id ? prev.filter(el => el.id !== id) : [...prev].splice(-1))),
    []
  );
  const CTX = {
    handleCloseModal: onClose,
    handleOpenModal,
    isOpen: modalContent.length > 0,
  };

  const renderModalContent = useMemo(
    () =>
      modalContent?.length > 0 &&
      modalContent.map((Item, idx) => (
        <ModalComponent
          key={Item.id}
          {...{
            ...Item,
            idx,
            id: Item.id,
            totalLength: modalContent.length,
            isLast: idx === modalContent.length - 1,
            onClose: onClose(Item.id),
          }}
        >
          {Item?.ModalChildren && <Item.ModalChildren {...{ ...Item?.modalChildrenProps, onClose }} />}
        </ModalComponent>
      )),
    [modalContent, onClose]
  );

  useEffect(() => {
    if (modalContent.length === 0) document.querySelector('body')?.classList.remove('NotScroll');

    if (modalContent.length > 0) document.querySelector('body')?.classList.add('NotScroll');

    return () => {
      document.querySelector('body')?.classList.remove('NotScroll');
    };
  }, [modalContent.length]);

  return (
    <ModalProviderContext.Provider {...{ value: CTX }}>
      {children}

      <ModalPortal portalId={portalId}>{renderModalContent}</ModalPortal>
    </ModalProviderContext.Provider>
  );
};

export default ModalProvider;
