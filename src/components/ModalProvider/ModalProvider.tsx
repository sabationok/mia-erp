import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import ModalPortal from './ModalPortal';
import ModalComponent, { IModalSettings } from './ModalComponent';
import { nanoid } from '@reduxjs/toolkit';
import FormCreateTag from '../Forms/FormCreateTag';
import FormCreateDirTreeComp from '../Forms/FormCreateDirTreeComp';
import FormCreateActivity from '../Forms/FormCreateActivity';
import FormCreateContractor from '../Forms/FormCreateContractor';
import FormCreateTransaction from '../Forms/FormCreateTransaction';
import FormCreateCategory from '../Forms/FormCreateCategory';
import FormCreatePriceList from '../Forms/FormCreatePriceList';
import FormCreateCustomRole from '../Forms/FormCreateCustomRole';
import FormCreateCount from '../Forms/FormCreateCount';

interface IModalProviderProps {
  children: React.ReactNode;
  portalId?: string;
}

export interface IModalChildrenProps {
  title?: string;
  onClose: () => void;
}

export enum Modal {
  FormCreateTag = 'FormCreateTag',
  FormCreateActivity = 'FormCreateActivity',
  FormCreateDirTreeComponent = 'FormCreateDirTreeComponent',
  FormCreateContractor = 'FormCreateContractor',
  FormCreateTransaction = 'FormCreateTransaction',
  FormCreatePrice = 'FormCreatePrice',
  FormCreateOrder = 'FormCreateOrder',
  FormCreatePriceList = 'FormCreatePriceList',
  FormCreateCustomRole = 'FormCreateCustomRole',
  FormCreateCount = 'FormCreateCount',
  FormCreateCategory = 'FormCreateCategory',
  FormCreateCompany = 'FormCreateCompany',
}

export const ModalChildrenComponent = {
  [Modal.FormCreateTag]: FormCreateTag,
  [Modal.FormCreateDirTreeComponent]: FormCreateDirTreeComp,
  [Modal.FormCreateActivity]: FormCreateActivity,
  [Modal.FormCreateContractor]: FormCreateContractor,
  [Modal.FormCreateTransaction]: FormCreateTransaction,
  [Modal.FormCreatePrice]: FormCreateTag,
  [Modal.FormCreateCategory]: FormCreateCategory,
  [Modal.FormCreatePriceList]: FormCreatePriceList,
  [Modal.FormCreateCustomRole]: FormCreateCustomRole,
  [Modal.FormCreateCount]: FormCreateCount,

  // [Modal.FormCreateTag]: FormCreateTag,
};

// export const ModalComponentProps: Record<keyof typeof ModalChildrenComponent, any> = {};

export interface IModalRenderItemParams<P = any, S = any> {
  ModalChildren?: React.FC<P>;
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
type HandleOpenModalAsyncType = <P = any, S = any>(
  args: IModalRenderItemParams<P, S>,
  getPropsAsync?: () => Promise<P>
) => Promise<OpenModalReturnType | undefined>;

export interface IModalProviderContext {
  handleOpenModal: <P = any, S = any>(args: IModalRenderItemParams<P, S>) => OpenModalReturnType;
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
    <P = any, S = any>({
      ModalChildren,
      modalChildrenProps,
      settings,
    }: IModalRenderItemParams<P, S>): OpenModalReturnType => {
      if (!ModalChildren) {
        console.error('ModalChildren is not passed');
        return;
      }

      if (typeof ModalChildren === 'function') {
        const id = nanoid(8);
        setModalContent(prev => [...prev, { ModalChildren, modalChildrenProps, settings, id }]);
        return { onClose: createOnClose(id), id };
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
            onClose: createOnClose(Item.id),
          }}
        >
          {Item?.ModalChildren && (
            <Item.ModalChildren {...{ ...Item?.modalChildrenProps, onClose: createOnClose(Item.id) }} />
          )}
        </ModalComponent>
      )),
    [modalContent, createOnClose]
  );

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
