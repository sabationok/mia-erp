import { createContext, useContext, useEffect, useState } from 'react';
import ModalPortal from './ModalPortal';
import ModalComponent, { IModalSettings } from './ModalComponent';
import { nanoid } from '@reduxjs/toolkit';

interface IModalProviderProps {
  children: React.ReactNode;
  portalId?: string;
}
export interface IModalRenderItemParams {
  ModalChildren?: React.FC<any>;
  modalChildrenProps?: any;
  settings?: IModalSettings;
  id?: number | string;
}
interface IModalProviderContext {
  handleOpenModal: (args: IModalRenderItemParams) => void;
  handleCloseModal: (id?: string) => void;
  isOpen: boolean;
}

export const ModalProviderContext = createContext({});
export const useModalProvider = () => useContext(ModalProviderContext) as IModalProviderContext;

const ModalProvider: React.FC<IModalProviderProps> = ({ children, portalId }) => {
  const [modalContent, setModalContent] = useState<IModalRenderItemParams[]>([]);

  function handleOpenModal<T extends IModalRenderItemParams>({ ModalChildren, modalChildrenProps, settings }: T) {
    if (!ModalChildren) return console.error('ModalChildren is undefined');

    if (typeof ModalChildren === 'function') {
      setModalContent(prev => [...prev, { ModalChildren, modalChildrenProps, settings, id: nanoid(8) }]);
      return;
    }
  }
  function handleCloseModal(id: string | number | undefined) {
    setModalContent(prev => (id ? prev.filter(el => el.id !== id) : [...prev].splice(-1)));
  }

  const CTX = { handleCloseModal, handleOpenModal, isOpen: modalContent.length > 0 };

  useEffect(() => {
    if (modalContent.length === 0) document.querySelector('body')?.classList.remove('NotScroll');

    if (modalContent.length > 0) document.querySelector('body')?.classList.add('NotScroll');

    return () => {
      document.querySelector('body')?.classList.remove('NotScroll');
    };
  }, [modalContent.length]);
  return (
    <ModalProviderContext.Provider {...{ value: CTX }}>
      <>{children}</>

      <ModalPortal portalId={portalId}>
        {modalContent?.length > 0 &&
          modalContent.map((Item, idx) => {
            return (
              <ModalComponent
                key={Item.id}
                {...{
                  ...Item,
                  idx,
                  id: Item.id,
                  totalLength: modalContent.length,
                  isLast: idx === modalContent.length - 1,
                  onClose: () => {
                    handleCloseModal(Item.id);
                  },
                }}
              >
                {Item?.ModalChildren && <Item.ModalChildren {...Item?.modalChildrenProps} />}
              </ModalComponent>
            );
          })}
      </ModalPortal>
    </ModalProviderContext.Provider>
  );
};

export default ModalProvider;
