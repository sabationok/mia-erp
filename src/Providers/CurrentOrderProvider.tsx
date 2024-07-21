import React, { createContext, useContext, useEffect, useMemo } from 'react';
import { useOrdersSelector } from '../redux/selectors.store';
import { OrderEntity } from '../types/orders/orders.types';
import { ServiceName, useAppServiceProvider } from '../hooks/useAppServices.hook';
import { useAppParams } from '../hooks';
import { useAppDispatch } from '../redux/store.store';
import {
  getAllDeliveriesByOrderThunk,
  getAllInvoicesByOrderThunk,
  getAllPaymentsByOrderThunk,
  getOrderSlotsThunk,
} from '../redux/orders/orders.thunks';
import { __ServiceDispatcherAsync } from '../redux/app-redux.types';

export interface PageCurrentOrderProviderProps {
  children?: React.ReactNode;
}

export type OrderProviderValue = Partial<OrderEntity> & {
  _origin?: OrderEntity;
  getSlots: __ServiceDispatcherAsync<typeof getOrderSlotsThunk>;
  getPayments: __ServiceDispatcherAsync<typeof getAllPaymentsByOrderThunk>;
  getInvoices: __ServiceDispatcherAsync<typeof getAllInvoicesByOrderThunk>;
  getDeliveries: __ServiceDispatcherAsync<typeof getAllDeliveriesByOrderThunk>;
};

export const CurrentOrderCTX = createContext({});

export const useCurrentOrder = () => useContext(CurrentOrderCTX) as OrderProviderValue;

const CurrentOrderProvider: React.FC<PageCurrentOrderProviderProps> = ({ children }) => {
  const { currentOrder } = useOrdersSelector();
  const params = useAppParams();
  const dispatch = useAppDispatch();
  const service = useAppServiceProvider()[ServiceName.orders];

  const CTX = useMemo((): OrderProviderValue => {
    const orderId = currentOrder?._id;

    return {
      ...currentOrder,
      _origin: currentOrder,
      getSlots: async args => {
        return !orderId ? undefined : dispatch(getOrderSlotsThunk({ ...args, data: { params: { orderId } } }));
      },
      getPayments: async args => {
        return !orderId ? undefined : dispatch(getAllPaymentsByOrderThunk({ ...args, data: { params: { orderId } } }));
      },
      getInvoices: async args => {
        return !orderId ? undefined : dispatch(getAllInvoicesByOrderThunk({ ...args, data: { params: { orderId } } }));
      },
      getDeliveries: async args => {
        return !orderId
          ? undefined
          : dispatch(getAllDeliveriesByOrderThunk({ ...args, data: { params: { orderId } } }));
      },
    };
  }, [currentOrder, dispatch]);
  useEffect(() => {
    console.log({ params });
  }, [params]);

  useEffect(() => {
    if (!currentOrder) {
      params.orderId && service.getById({ data: { _id: params.orderId } });
    }
  }, [currentOrder, params.orderId, service]);

  return <CurrentOrderCTX.Provider value={CTX ?? {}}>{children}</CurrentOrderCTX.Provider>;
};
export default CurrentOrderProvider;
