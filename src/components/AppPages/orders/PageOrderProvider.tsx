import React, { createContext, useContext, useMemo } from 'react';
import { useOrdersSelector } from '../../../redux/selectors.store';
import { OrderEntity } from '../../../types/orders/orders.types';

export interface PageCurrentOrderProviderProps {
  children?: React.ReactNode;
}

export interface PageOrderProviderValue {
  currentOrder?: OrderEntity;
  mainPagePath?: string;
}

export const PageOrderCTX = createContext({});

export const usePageCurrentOrder = () => useContext(PageOrderCTX) as PageOrderProviderValue;

const PageOrderProvider: React.FC<PageCurrentOrderProviderProps> = ({ children }) => {
  const { currentOrder } = useOrdersSelector();
  // const service = useAppServiceProvider()[ServiceName.orders];

  const CTX = useMemo(
    (): PageOrderProviderValue => ({
      currentOrder,
    }),
    [currentOrder]
  );

  return <PageOrderCTX.Provider value={CTX}>{children}</PageOrderCTX.Provider>;
};
export default PageOrderProvider;
