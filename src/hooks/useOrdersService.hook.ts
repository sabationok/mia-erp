import { useMemo } from 'react';
import { useAppDispatch } from '../redux/store.store';
import { OnlyUUID, ServiceDispatcherAsync } from '../redux/global.types';
// import { createOrderThunk, getAllOrdersThunk, getOrderByIdThunk } from '../redux/orders/orders.thunks';
import { IOrder, IOrderReqData } from '../redux/orders/orders.types';
import { AppQueryParams } from '../api';

type EmptyFn = (...args: any[]) => Promise<any>;

export interface OrdersService {
  createOne: EmptyFn | ServiceDispatcherAsync<IOrderReqData, IOrder>;
  deleteOne: EmptyFn | ServiceDispatcherAsync;
  updateOne: EmptyFn | ServiceDispatcherAsync;
  getById: EmptyFn | ServiceDispatcherAsync<OnlyUUID, IOrder>;
  getAll:
    | EmptyFn
    | ServiceDispatcherAsync<
        {
          refresh?: boolean;
          query?: AppQueryParams;
        },
        IOrder[]
      >;
  getSlotsByOrderId: EmptyFn | ServiceDispatcherAsync<OnlyUUID>;
  getShipmentsByOrderId: EmptyFn | ServiceDispatcherAsync<OnlyUUID>;
  getPaymentsByOrderId: EmptyFn | ServiceDispatcherAsync<OnlyUUID>;
  getInvoicesByOrderId: EmptyFn | ServiceDispatcherAsync<OnlyUUID>;
}

const useOrdersServiceHook = (): OrdersService => {
  const dispatch = useAppDispatch();

  return useMemo(
    (): OrdersService => ({
      createOne: async () => dispatch(() => {}),
      getById: async () => dispatch(() => {}),
      getAll: async () => dispatch(() => {}),
      deleteOne: async () => dispatch(() => {}),
      updateOne: async () => dispatch(() => {}),

      getSlotsByOrderId: async () => dispatch(() => {}),
      getShipmentsByOrderId: async () => dispatch(() => {}),
      getPaymentsByOrderId: async () => dispatch(() => {}),
      getInvoicesByOrderId: async () => dispatch(() => {}),
    }),
    [dispatch]
  );
};

export default useOrdersServiceHook;
