import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import ModalPortal from './ModalPortal';
import ModalComponent, { IModalSettings } from './ModalComponent';
import { nanoid } from '@reduxjs/toolkit';
import { ModalChildrenMap, ModalChildrenProps, Modals } from './Modals';
import { toast } from 'react-toastify';

interface IModalProviderProps {
  children: React.ReactNode;
  portalId?: string;
}

export interface IModalChildrenProps {
  title?: string;
  onClose: () => void;
}

export interface IModalRenderItemParams<P = any, S = any, M extends Modals = any> {
  ModalChildren?: React.FC<P>;
  Modal?: M;
  props?: ModalChildrenProps[M];
  modalChildrenProps?: P;
  settings?: IModalSettings & S;
  id?: number | string;
}

export type OpenModalReturnType =
  | {
      onClose: () => void;
      id?: string;
    }
  | undefined;
type HandleOpenModalAsyncType = <P = any, S = any, M extends Modals = any>(
  args: IModalRenderItemParams<P, S, M>,
  getPropsAsync?: () => Promise<P>
) => Promise<OpenModalReturnType | undefined>;

export interface IModalProviderContext {
  handleOpenModal: <P = any, S = any, M extends Modals = any>(
    args: IModalRenderItemParams<P, S, M>
  ) => OpenModalReturnType;
  handleCloseModal: (id?: string) => void;
  handleOpenModalAsync: HandleOpenModalAsyncType;
  isOpen: boolean;
  modalContent: IModalRenderItemParams[];
}

export const ModalProviderContext = createContext({});
export const useModalProvider = () => useContext(ModalProviderContext) as IModalProviderContext;

const ModalProvider: React.FC<IModalProviderProps> = ({ children, portalId }) => {
  const [modalContent, setModalContent] = useState<IModalRenderItemParams<any, any>[]>([]);
  const onClose = useCallback((id?: string | number) => {
    setModalContent(prev => (id ? prev.filter(el => el.id !== id) : [...prev].splice(-1)));
  }, []);

  const createOnClose = useCallback((id?: string | number) => () => onClose(id), [onClose]);

  const handleOpenModal = useCallback(
    <P = any, S = any, M extends Modals = any>({
      ModalChildren,
      modalChildrenProps,
      settings,
      Modal,
      props,
    }: IModalRenderItemParams<P, S, M>): OpenModalReturnType => {
      const id = nanoid(8);
      try {
        if (ModalChildren && typeof ModalChildren === 'function') {
          setModalContent(prev => [...prev, { ModalChildren, modalChildrenProps, settings, id }]);
          return { onClose: createOnClose(id), id };
        }
        if (Modal && ModalChildrenMap[Modal]) {
          setModalContent(prev => [
            ...prev,
            { ModalChildren: ModalChildrenMap[Modal], modalChildrenProps: props, settings, id },
          ]);
          return { onClose: createOnClose(id), id };
        }
        console.error('Add modal to stack error');
        toast.error(`Add modal to stack error:\n >>> ${Modal} <<<`);
      } catch (e) {
        console.log(e);
      }
    },
    [createOnClose]
  );

  const CTX: IModalProviderContext = useMemo(
    () => ({
      handleCloseModal: onClose,
      handleOpenModal,
      handleOpenModalAsync: async <P = any, S = any>(
        options: IModalRenderItemParams<P, S>,
        getPropsAsync?: () => Promise<P>
      ) => {
        if (getPropsAsync) {
          const props = await getPropsAsync();
          if (props) return handleOpenModal({ ...options, modalChildrenProps: props });
        }
      },
      isOpen: modalContent.length > 0,
      modalContent,
    }),
    [handleOpenModal, modalContent, onClose]
  );

  const renderModalContent = useMemo(() => {
    return (
      modalContent?.length > 0 &&
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
              onClose: createOnClose(Item.id),
            }}
          >
            {Item?.ModalChildren && (
              <Item.ModalChildren {...{ ...Item?.modalChildrenProps, onClose: createOnClose(Item.id) }} />
            )}
            {/*{Item?.Modal && <ModalChildren {...{ ...Item?.props, onClose: createOnClose(Item.id) }} />}*/}
          </ModalComponent>
        );
      })
    );
  }, [modalContent, createOnClose]);

  useEffect(() => {
    if (modalContent.length === 0) document.querySelector('body')?.classList.remove('NotScroll');

    if (modalContent.length > 0) document.querySelector('body')?.classList.add('NotScroll');

    return () => {
      document.querySelector('body')?.classList.remove('NotScroll');
    };
  }, [modalContent.length]);

  return (
    <ModalProviderContext.Provider
      {...{
        value: CTX,
      }}
    >
      {children}

      <ModalPortal portalId={portalId}>{renderModalContent}</ModalPortal>
    </ModalProviderContext.Provider>
  );
};

export default ModalProvider;
