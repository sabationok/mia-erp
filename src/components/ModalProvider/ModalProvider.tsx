import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import ModalPortal from './ModalPortal';
import ModalComponent, { IModalSettings } from './ModalComponent';
import { nanoid } from '@reduxjs/toolkit';
import { ModalChildrenMap, ModalChildrenProps, Modals } from './Modals';
import { toast } from 'react-toastify';

interface IModalProviderProps {
  children: React.ReactNode;
  portalId?: string;
  isDevMode?: boolean;
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

export interface IModalProviderContext {
  create: <M extends Modals = any, S = any>(creator: ModalCreator<M, ModalChildrenProps[M], S>) => boolean;

  handleOpenModal: <M extends Modals = any, P = any, S = any>(
    args: IModalRenderItemParams<M, P, S>
  ) => OpenModalReturnType;
  handleCloseModal: (id?: string) => void;
  handleOpenModalAsync: HandleOpenModalAsyncType;
  getState: () => IModalRenderItemParams[];
}
export interface ModalService extends IModalProviderContext {}
export const ModalProviderContext = createContext({});
export const useModalProvider = () => useContext(ModalProviderContext) as IModalProviderContext;
export const useModalService = () => useContext(ModalProviderContext) as ModalService;

const ModalProvider: React.FC<IModalProviderProps> = ({ children, portalId }) => {
  const [modalContent, setModalContent] = useState<IModalRenderItemParams<any, any>[]>([]);
  const onClose = useCallback((id?: string | number) => {
    setModalContent(prev => (id ? prev.filter(el => el.id !== id) : [...prev].splice(-1)));
  }, []);

  const getState = useCallback(() => {
    return modalContent;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        console.error('Add modal to stack error');
        toast.error(`Add modal to stack error:\n >>> ${Modal} <<<`);
      } catch (e) {
        console.log(e);
      }
    },
    [onClose]
  );

  const createModal = useCallback(
    <M extends Modals = any, P = any, S = any>(modalCreator: ModalCreator<M, P, S>) => {
      if (typeof modalCreator === 'function') {
        const id = nanoid(8);
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

  const CTX: IModalProviderContext = useMemo(
    () => ({
      create: createModal,
      handleCloseModal: onClose,
      handleOpenModal,
      handleOpenModalAsync: async <M extends Modals = any, P = any, S = any>(
        options: IModalRenderItemParams<M, P, S>,
        getPropsAsync?: () => Promise<P>
      ) => {
        if (getPropsAsync) {
          const props = await getPropsAsync();
          if (props) return handleOpenModal({ ...options, modalChildrenProps: props });
        }
      },
      getState,
    }),
    [createModal, getState, handleOpenModal, onClose]
  );

  const renderModalContent = useMemo(() => {
    return modalContent.map((Item, idx) => {
      return (
        <ModalComponent
          key={Item.id}
          {...{
            ...Item,
            idx,
            id: Item.id,
            totalLength: modalContent.length,
            isLast: idx === modalContent.length - 1,
            onClose: () => onClose(Item.id),
          }}
          RenderModalComponentChildren={props =>
            Item?.ModalChildren ? (
              <Item.ModalChildren {...{ ...Item?.modalChildrenProps, onClose: () => onClose(Item.id) }} />
            ) : (
              <></>
            )
          }
        />
      );
    });
  }, [modalContent, onClose]);

  useEffect(() => {
    if (modalContent.length === 0) document.querySelector('body')?.classList.remove('NotScroll');

    if (modalContent.length > 0) document.querySelector('body')?.classList.add('NotScroll');

    return () => {
      document.querySelector('body')?.classList.remove('NotScroll');
    };
  }, [modalContent.length]);

  return (
    <ModalProviderContext.Provider value={CTX}>
      {children}

      <ModalPortal portalId={portalId}>{renderModalContent}</ModalPortal>
    </ModalProviderContext.Provider>
  );
};

export default ModalProvider;
