import { createContext, useCallback, useContext, useState } from 'react';
import { nanoid } from '@reduxjs/toolkit';

export interface OverlayStackProviderValue {
  getStack: () => OverlayStackItemData[];
  open: OverlayHandler;
  remove: (id: string) => void;
  clearStack: () => void;
}

export type OverlayHandler = <Props = any>(params: OverlayHandlerParams<Props>) => CreatedOverlay;

export interface OverlayHandlerParams<Props = any> {
  RenderComponent: React.FC<OverlayRenderComponentProps<Props>>;
  props?: OverlayRenderComponentProps<Props>;
}
export type OverlayRenderComponentProps<Props = any> = CreatedOverlay & Props;

export interface OverlayStackItemData<Props = any> {
  RenderComponent: React.FC<OverlayRenderComponentProps<Props & CreatedOverlay>>;
  props?: OverlayRenderComponentProps<Props>;
  id: string;
}

export interface OverlayRenderComponent<Props = any> extends React.FC<OverlayRenderComponentProps<Props>> {}

export interface CreatedOverlay {
  onClose?: () => void;
  index?: number;
  compId?: string;
}
export const PageCurrentOrderCTX = createContext({});

export const useOverlayService = () => useContext(PageCurrentOrderCTX) as OverlayStackProviderValue;

const OverlayStackProvider: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
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
            const clearedStack = prev.filter(el => el.RenderComponent?.name !== isExist.RenderComponent?.name);

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

      const returnData: CreatedOverlay = {
        onClose: () => removeStackItem(id),
        compId: id,
      };
      return returnData;
    },
    [removeStackItem]
  );

  const getStack = () => overlayStack;

  const value: OverlayStackProviderValue = {
    getStack,
    remove: removeStackItem,
    clearStack,
    open: createOverlayComponent,
  };

  return <PageCurrentOrderCTX.Provider value={value}>{children}</PageCurrentOrderCTX.Provider>;
};
export default OverlayStackProvider;
