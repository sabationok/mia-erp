import { createContext, useCallback, useContext, useState } from 'react';
import { nanoid } from '@reduxjs/toolkit';

export interface PageOverlayProviderValue {
  getOverlayStack: () => OverlayStackItemData[];
  overlayStack: OverlayStackItemData[];
  createOverlayComponent: OverlayHandler;
  removeStackItem: (id: string) => void;
  clearStack: () => void;
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

export type OverlayRenderComponentProps<Props = any> = OverlayHandlerReturn & Props;
export interface OverlayRenderComponent<Props = any> extends React.FC<OverlayRenderComponentProps<Props>> {}

export interface OverlayHandlerReturn {
  onClose?: () => void;
  index?: number;
  overlayId?: string;
}
export const PageCurrentOrderCTX = createContext({});

export const usePageOverlayService = () => useContext(PageCurrentOrderCTX) as PageOverlayProviderValue;

const PageOverlayProvider: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const [overlayStack, setOverlayStack] = useState<OverlayStackItemData[]>([]);

  const removeStackItem = useCallback((id: string) => {
    setOverlayStack(pStack => pStack.filter(el => el.id !== id));
  }, []);

  const clearStack = useCallback(() => {
    setOverlayStack([]);
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
        onClose: () => removeStackItem(id),
        overlayId: id,
      };
      return returnData;
    },
    [removeStackItem]
  );

  const getOverlayStack = useCallback(() => overlayStack, [overlayStack]);

  const value: PageOverlayProviderValue = {
    getOverlayStack,
    removeStackItem,
    clearStack,
    createOverlayComponent,
    overlayStack,
  };

  return <PageCurrentOrderCTX.Provider value={value}>{children}</PageCurrentOrderCTX.Provider>;
};
export default PageOverlayProvider;
