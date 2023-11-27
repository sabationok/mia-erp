import { useMemo } from 'react';
import { useAppDispatch } from '../redux/store.store';
import { OnlyUUID, ServiceDispatcher, ServiceDispatcherAsync } from '../redux/global.types';
import { ICreateOrderInfoFormState, IOrder, IOrderReqData, IOrderTempSlot } from '../types/orders/orders.types';
import { AppQueryParams } from '../api';
import {
  AddSlotToGroupAction,
  ClearCurrentGroupFormDataAction,
  RemoveSlotFromGroupAction,
  UpdateCurrentGroupFormInfoDataAction,
  UpdateSlotInGroupAction,
} from '../redux/orders/orders.actions';
import { getAllOrdersThunk } from '../redux/orders/orders.thunks';
import { defaultThunkPayload } from '../utils/fabrics';

type EmptyFn = (...args: any[]) => Promise<any>;

export interface OrdersService {
  createOne: EmptyFn | ServiceDispatcherAsync<IOrderReqData, IOrder>;
  deleteOne: EmptyFn | ServiceDispatcherAsync;
  updateOne: EmptyFn | ServiceDispatcherAsync;
  getById: EmptyFn | ServiceDispatcherAsync<OnlyUUID, IOrder>;
  getAll: ServiceDispatcherAsync<{ refresh?: boolean; query?: AppQueryParams }, IOrder[]>;
  getSlotsByOrderId: EmptyFn | ServiceDispatcherAsync<OnlyUUID>;
  getShipmentsByOrderId: EmptyFn | ServiceDispatcherAsync<OnlyUUID>;
  getPaymentsByOrderId: EmptyFn | ServiceDispatcherAsync<OnlyUUID>;
  getInvoicesByOrderId: EmptyFn | ServiceDispatcherAsync<OnlyUUID>;

  updateCurrentGroupFormInfoData: ServiceDispatcher<ICreateOrderInfoFormState>;
  clearCurrentGroupFormData: ServiceDispatcher;

  addTempSlot: ServiceDispatcher<IOrderTempSlot>;
  removeTempSlot: ServiceDispatcher<string>;
  updateTempSlot: ServiceDispatcher<IOrderTempSlot>;
}

const useOrdersServiceHook = (): OrdersService => {
  const dispatch = useAppDispatch();

  return useMemo(
    (): OrdersService => ({
      createOne: async () => dispatch(() => {}),
      getById: async () => dispatch(() => {}),
      getAll: args => dispatch(getAllOrdersThunk(defaultThunkPayload(args))),
      deleteOne: async () => dispatch(() => {}),
      updateOne: async () => dispatch(() => {}),

      getSlotsByOrderId: async () => dispatch(() => {}),
      getShipmentsByOrderId: async () => dispatch(() => {}),
      getPaymentsByOrderId: async () => dispatch(() => {}),
      getInvoicesByOrderId: async () => dispatch(() => {}),

      addTempSlot: args => dispatch(AddSlotToGroupAction(args)),
      removeTempSlot: args => dispatch(RemoveSlotFromGroupAction(args)),
      updateTempSlot: args => dispatch(UpdateSlotInGroupAction(args)),

      updateCurrentGroupFormInfoData: args => dispatch(UpdateCurrentGroupFormInfoDataAction(args)),
      clearCurrentGroupFormData: () => dispatch(ClearCurrentGroupFormDataAction({})),
    }),
    [dispatch]
  );
};

export default useOrdersServiceHook;
