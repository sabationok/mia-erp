import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { useProductsSelector } from '../../redux/selectors.store';
import { IProduct } from '../../redux/products/products.types';
import { nanoid } from '@reduxjs/toolkit';

export interface PageCurrentProductProviderProps {
  children?: React.ReactNode;
}
export interface PageCurrentProductProviderValue {
  currentProduct?: IProduct;
  getOverlayStack: () => OverlayStackItemData[];
  overlayStack: OverlayStackItemData[];
  createOverlayComponent: OverlayHandler;
  handleRemoveStackItem: (id: string) => void;
}
export type OverlayHandler = <Props = any>(params: OverlayHandlerParams<Props>) => OverlayHandlerReturn;
export interface OverlayHandlerParams<Props = any> {
  RenderComponent: React.FC<OverlayRenderComponentProps<Props>>;
  props?: OverlayRenderComponentProps<Props>;
}
export interface OverlayStackItemData<Props = any> {
  RenderComponent: React.FC<OverlayRenderComponentProps<Props>>;
  props?: OverlayRenderComponentProps<Props>;
  id: string;
}
export interface OverlayRenderComponent<Props = any> extends React.FC<OverlayRenderComponentProps<Props>> {}

export type OverlayRenderComponentProps<Props = any> = OverlayHandlerReturn & Props;
export interface OverlayHandlerReturn {
  onClose?: () => void;
  index?: number;
  id?: string;
}
export const PageCurrentProductCTX = createContext({});
export const usePageCurrentProduct = () => useContext(PageCurrentProductCTX) as PageCurrentProductProviderValue;

const PageCurrentProductProvider: React.FC<PageCurrentProductProviderProps> = ({ children }) => {
  const { currentProduct } = useProductsSelector();
  const [overlayStack, setOverlayStack] = useState<OverlayStackItemData[]>([]);

  const handleRemoveStackItem = useCallback((id: string) => {
    setOverlayStack(pStack => pStack.filter(el => el.id !== id));
  }, []);

  const createOverlayComponent: OverlayHandler = useCallback(
    params => {
      const id = `${params.RenderComponent.name}_${nanoid(8)}`;

      if (typeof params.RenderComponent === 'function') {
        setOverlayStack(prev => {
          const isExist = prev.find(el => el.id.includes(params.RenderComponent.name));

          if (isExist) {
            const clearedStack = prev.filter(el => el.id !== isExist.id);

            return [
              ...clearedStack,
              {
                ...params,
                id,
              },
            ];
          }

          return [
            ...prev,
            {
              ...params,
              id,
            },
          ];
        });
      }

      const returnData: OverlayHandlerReturn = {
        onClose: () => handleRemoveStackItem(id),
        id,
      };
      return returnData;
    },
    [handleRemoveStackItem]
  );

  const getOverlayStack = useCallback(() => overlayStack, [overlayStack]);

  const CTX = useMemo(
    (): PageCurrentProductProviderValue => ({
      currentProduct,
      createOverlayComponent,
      overlayStack,
      handleRemoveStackItem,
      getOverlayStack,
    }),
    [createOverlayComponent, currentProduct, getOverlayStack, handleRemoveStackItem, overlayStack]
  );

  return <PageCurrentProductCTX.Provider value={CTX}>{children}</PageCurrentProductCTX.Provider>;
};
export default PageCurrentProductProvider;
