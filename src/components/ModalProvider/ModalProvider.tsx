import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import ModalPortal from './ModalPortal';
import ModalComponent, { IModalSettings } from './ModalComponent';
import { nanoid } from '@reduxjs/toolkit';
import { ModalChildrenMap, ModalChildrenProps, Modals } from '../Modals';
import { toast } from 'react-toastify';
import { ToastService } from '../../services';

// const isDevMode = ConfigService.isDevMode();

interface IModalProviderProps {
  children: React.ReactNode;
  portalId?: string;
}

export interface IModalChildrenProps {
  title?: string;
  onClose: () => void;
}

export interface IModalRenderItemParams<M extends Modals = any, P = any, S = any> {
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

export type CreatedModal = {
  onClose: () => void;
  id: string;
};
export type ModalCreator<M extends Modals = any, P = any, S = any> = (
  modal: CreatedModal
) => IModalRenderItemParams<M, P, S>;

type HandleOpenModalAsyncType = <M extends Modals = any, P = any, S = any>(
  args: IModalRenderItemParams<M, P, S>,
  getPropsAsync?: () => Promise<P>
) => Promise<OpenModalReturnType | undefined>;
type OpenModalHandler = <M extends Modals = any, P = any, S = any>(
  args: IModalRenderItemParams<M, P, S>
) => OpenModalReturnType;

export interface IModalProviderContext {
  create: <M extends Modals = any, S = any>(creator: ModalCreator<M, ModalChildrenProps[M], S>) => boolean;
  handleOpenModal: OpenModalHandler;
  open: OpenModalHandler;
  handleCloseModal: (id?: string) => void;
  close: (id?: string) => void;
  handleOpenModalAsync: HandleOpenModalAsyncType;
  getState: () => IModalRenderItemParams[];
  isOpen: () => boolean;
}
export interface ModalService extends IModalProviderContext {}
export const ModalProviderContext = createContext({});
export const useModalProvider = () => useContext(ModalProviderContext) as ModalService;
export const useModalService = () => useContext(ModalProviderContext) as ModalService;

const ModalProvider: React.FC<IModalProviderProps> = ({ children, portalId }) => {
  const [modalStack, setModalContent] = useState<IModalRenderItemParams<any, any>[]>([]);

  const onClose = useCallback((id?: string | number) => {
    setModalContent(prev => (id ? prev.filter(el => el.id !== id) : [...prev].splice(-1)));
  }, []);

  const getState = useCallback(() => {
    return modalStack;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const isOpen = useCallback(() => {
    return modalStack.length > 0;
  }, [modalStack.length]);

  const handleOpenModal = useCallback(
    <M extends Modals = any, P = any, S = any>({
      ModalChildren,
      modalChildrenProps,
      settings,
      Modal,
      props,
    }: IModalRenderItemParams<M, P, S>): OpenModalReturnType => {
      try {
        if (ModalChildren && (typeof ModalChildren === 'function' || typeof ModalChildren === 'object')) {
          const id = `${ModalChildren.name}_${nanoid(8)}`;
          setModalContent(prev => [...prev, { ModalChildren, modalChildrenProps, settings, id }]);
          return { onClose: () => onClose(id), id };
        }
        if (Modal && ModalChildrenMap[Modal]) {
          const id = `${Modal}_${nanoid(8)}`;

          setModalContent(prev => [
            ...prev,
            { ModalChildren: ModalChildrenMap[Modal], modalChildrenProps: props, settings, id },
          ]);
          return { onClose: () => onClose(id), id };
        }
        ToastService.error(`Add modal to stack error:\n >>> ${Modal} <<<`);
      } catch (e) {
        console.error('Add modal to stack error', e);
      }
    },
    [onClose]
  );

  const createModal = useCallback(
    <M extends Modals = any, P = any, S = any>(modalCreator: ModalCreator<M, P, S>) => {
      if (typeof modalCreator === 'function') {
        let id = nanoid(8);

        const { ModalChildren, modalChildrenProps, settings, Modal, props } = modalCreator({
          id,
          onClose: () => onClose(id),
        });

        try {
          if (ModalChildren && (typeof ModalChildren === 'function' || typeof ModalChildren === 'object')) {
            setModalContent(prev => [...prev, { ModalChildren, modalChildrenProps, settings, id }]);
            return true;
          }
          if (Modal && ModalChildrenMap[Modal]) {
            setModalContent(prev => [
              ...prev,
              { ModalChildren: ModalChildrenMap[Modal], modalChildrenProps: props, settings, id },
            ]);
            return true;
          }
          console.error('Add modal to stack error');
          toast.error(`Add modal to stack error:\n >>> ${Modal} <<<`);
        } catch (e) {
          console.log(e);
          return false;
        }
      }
      return true;
    },
    [onClose]
  );

  const CTX = useMemo(
    (): ModalService => ({
      create: createModal,
      handleCloseModal: onClose,
      handleOpenModal,
      open: handleOpenModal,
      close: onClose,
      isOpen,
      getState,
      handleOpenModalAsync: async <M extends Modals = any, P = any, S = any>(
        options: IModalRenderItemParams<M, P, S>,
        getPropsAsync?: () => Promise<P>
      ) => {
        if (getPropsAsync) {
          const props = await getPropsAsync();
          if (props) return handleOpenModal({ ...options, modalChildrenProps: props });
        }
      },
    }),
    [createModal, isOpen, getState, handleOpenModal, onClose]
  );

  const renderModalContent = useMemo(() => {
    return modalStack.map((Item, idx) => {
      return (
        <ModalComponent
          key={Item.id}
          {...{
            idx,
            id: Item.id,
            totalLength: modalStack.length,
            isLast: idx === modalStack.length - 1,
            onClose: () => onClose(Item.id),
          }}
          RenderModalComponentChildren={Item.ModalChildren}
          childrenProps={Item.props || Item.modalChildrenProps}
        />
      );
    });
  }, [modalStack, onClose]);

  useEffect(() => {
    if (modalStack.length === 0) document.querySelector('body')?.classList.remove('NotScroll');

    if (modalStack.length > 0) document.querySelector('body')?.classList.add('NotScroll');

    return () => {
      document.querySelector('body')?.classList.remove('NotScroll');
    };
  }, [modalStack.length]);

  return (
    <ModalProviderContext.Provider value={CTX}>
      {children}

      <ModalPortal portalId={portalId}>{renderModalContent}</ModalPortal>
    </ModalProviderContext.Provider>
  );
};

export default ModalProvider;
