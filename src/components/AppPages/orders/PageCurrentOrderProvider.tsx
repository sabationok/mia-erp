import React, { createContext, useCallback, useContext, useMemo } from 'react';
import { useOrdersSelector } from '../../../redux/selectors.store';
import { IOrder } from '../../../redux/orders/orders.types';

export interface PageCurrentOrderProviderProps {
  children?: React.ReactNode;
}

export interface PageCurrentOrderProviderValue {
  currentOrder?: IOrder;
  clearCurrent: () => void;
  mainPagePath?: string;
}

export const PageCurrentOrderCTX = createContext({});

export const usePageCurrentOrder = () => useContext(PageCurrentOrderCTX) as PageCurrentOrderProviderValue;

const PageCurrentOrderProvider: React.FC<PageCurrentOrderProviderProps> = ({ children }) => {
  const { currentOrder } = useOrdersSelector();
  // const service = useAppServiceProvider()[ServiceName.orders];

  const clearCurrent = useCallback(() => {
    // service.clearCurrent({});
    console.log('clear current order');
  }, []);

  const CTX = useMemo(
    (): PageCurrentOrderProviderValue => ({
      currentOrder,
      clearCurrent,
    }),
    [currentOrder, clearCurrent]
  );

  return <PageCurrentOrderCTX.Provider value={CTX}>{children}</PageCurrentOrderCTX.Provider>;
};
export default PageCurrentOrderProvider;
