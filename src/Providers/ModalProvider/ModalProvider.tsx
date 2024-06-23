import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import ModalComponent, { IModalSettings } from './ModalComponent';
import { nanoid } from '@reduxjs/toolkit';
import { ModalChildrenMap, ModalChildrenProps, Modals } from '../../components/Modals/Modals';
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
  $settings?: IModalSettings & S;
  id?: number | string;
}

export type OpenModalReturnType =
  | {
      onClose: () => void;
      id?: string;
    }
  | undefined;

export type CreatedModal = {
  onClose?: () => void;
  id?: string;
};
// export type ModalCreator<M extends Modals = any, P = any, S = any> = (
//   modal: CreatedModal
// ) => IModalRenderItemParams<M, P, S>;

type HandleOpenModalAsyncType = <M extends Modals = any, P = any, S = any>(
  args: IModalRenderItemParams<M, P, S>,
  getPropsAsync?: () => Promise<P>
) => Promise<OpenModalReturnType | undefined>;

export type OpenModalHandler = <M extends Modals = any, P = any, S = any>(
  args: IModalRenderItemParams<M, P, S>
) => OpenModalReturnType;

export type ModalCreator = <Props = any, S = any>(
  Component: React.FC<Props>,
  props?: Omit<Props, keyof CreatedModal>,
  $settings?: IModalSettings & S
) => OpenModalReturnType;

export interface IModalProviderContext {
  create: ModalCreator;

  openModal: OpenModalHandler;
  open: OpenModalHandler;
  handleCloseModal: (id?: string) => void;
  close: (id?: string) => void;
  handleOpenModalAsync: HandleOpenModalAsyncType;
  getState: () => IModalRenderItemParams[];
  isOpen: () => boolean;
  clearStack: () => void;
}
export interface ModalService extends IModalProviderContext {}
export const ModalProviderContext = createContext({});
export const useModalProvider = () => useContext(ModalProviderContext) as ModalService;
export const useModalService = () => useContext(ModalProviderContext) as ModalService;

const ModalProvider: React.FC<IModalProviderProps> = ({ children, portalId }) => {
  const [modalStack, setModalStack] = useState<IModalRenderItemParams<any, any>[]>([]);

  const onClose = useCallback((id?: string | number) => {
    setModalStack(prev => (id ? prev.filter(el => el.id !== id) : [...prev].splice(-1)));
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
      $settings,
      Modal,
      props,
    }: IModalRenderItemParams<M, P, S>): OpenModalReturnType => {
      try {
        if (ModalChildren && (typeof ModalChildren === 'function' || typeof ModalChildren === 'object')) {
          const id = `${ModalChildren.name}_${nanoid(8)}`;
          setModalStack(prev => [...prev, { ModalChildren, modalChildrenProps, $settings: $settings, id }]);
          return { onClose: () => onClose(id), id };
        }
        if (Modal && ModalChildrenMap[Modal]) {
          const id = `${Modal}_${nanoid(8)}`;

          setModalStack(prev => [
            ...prev,
            { ModalChildren: ModalChildrenMap[Modal], modalChildrenProps: props, $settings: $settings, id },
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

  const createModal: ModalCreator = useCallback(
    <P = any, S = any>(Component: React.FC<P>, props?: Omit<P, keyof CreatedModal>, $settings?: S) => {
      let id = nanoid(8);

      try {
        if (Component && (typeof Component === 'function' || typeof Component === 'object')) {
          setModalStack(prev => [...prev, { ModalChildren: Component, props, $settings: $settings, id }]);
          return {
            id,
            onClose: () => onClose(id),
          };
        }
        console.error('Add modal to stack error');
        toast.error(`Add modal to stack error:\n >>> ${Component} <<<`);
      } catch (e) {
        console.log(e);
        return undefined;
      }
    },
    [onClose]
  );

  const CTX = useMemo(
    (): ModalService => ({
      create: createModal,
      handleCloseModal: onClose,
      openModal: handleOpenModal,
      open: handleOpenModal,
      close: onClose,
      isOpen,
      getState,
      clearStack: () => {
        setModalStack([]);
      },
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
            $totalLength: modalStack.length,
            $isLast: idx === modalStack.length - 1,
            onClose: () => onClose(Item.id),
            $settings: Item?.$settings,
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

      {renderModalContent}
      {/*<ModalPortal portalId={portalId}>{}</ModalPortal>*/}
    </ModalProviderContext.Provider>
  );
};

export default ModalProvider;
