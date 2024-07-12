import { useMemo } from 'react';
import { useAppDispatch } from '../redux/store.store';
import {
  __ServiceDispatcherAsync,
  OnlyUUID,
  ServiceDispatcher,
  ServiceDispatcherAsync,
} from '../redux/app-redux.types';
import {
  ICreateOrderInfoDto,
  ICreateOrderInfoFormState,
  IOrderReqData,
  OrderEntity,
} from '../types/orders/orders.types';
import { AppQueryParams } from '../api';
import {
  AddSlotToGroupAction,
  ClearCurrentGroupFormDataAction,
  RemoveSlotFromGroupAction,
  UpdateCurrentGroupFormInfoDataAction,
  UpdateSlotInGroupAction,
} from '../redux/orders/orders.actions';
import {
  getAllDeliveriesByOrderThunk,
  getAllInvoicesByOrderThunk,
  getAllOrdersThunk,
  getAllPaymentsByOrderThunk,
  getOrderByIdThunk,
  getOrderSlotsThunk,
} from '../redux/orders/orders.thunks';
import {
  defaultThunkPayload,
  toOrderSlotsReqData,
  toOrderSlotsRequestDataOptions,
  toReqData,
  ToRequestDataOptions,
} from '../utils';
import { EntityPath } from '../types/utils.types';
import { IOrderTempSlot, SaleOrderSlotDto } from '../types/orders/order-slot.types';

type EmptyFn = (...args: any[]) => Promise<any>;

export interface OrdersService {
  createOne: EmptyFn | ServiceDispatcherAsync<IOrderReqData, OrderEntity>;
  deleteOne: EmptyFn | ServiceDispatcherAsync;
  updateOne: EmptyFn | ServiceDispatcherAsync;
  getById: ServiceDispatcherAsync<
    OnlyUUID & { params?: { fullInfo?: boolean }; options?: { refreshCurrent?: boolean } },
    OrderEntity
  >;
  getAll: ServiceDispatcherAsync<{ refresh?: boolean; query?: AppQueryParams }, OrderEntity[]>;
  getSlots: __ServiceDispatcherAsync<typeof getOrderSlotsThunk>;

  getPaymentsByOrderId: __ServiceDispatcherAsync<typeof getAllPaymentsByOrderThunk>;

  getInvoicesByOrderId: __ServiceDispatcherAsync<typeof getAllInvoicesByOrderThunk>;
  getDeliveriesByOrderId: __ServiceDispatcherAsync<typeof getAllDeliveriesByOrderThunk>;

  getShipmentsByOrderId: EmptyFn | ServiceDispatcherAsync<OnlyUUID>;

  updateCurrentGroupFormInfoData: ServiceDispatcher<ICreateOrderInfoFormState>;
  clearCurrentGroupFormData: ServiceDispatcher;

  addTempSlot: ServiceDispatcher<IOrderTempSlot>;
  removeTempSlot: ServiceDispatcher<string>;
  updateTempSlot: ServiceDispatcher<IOrderTempSlot>;

  toOrderInfoReqData: (
    data: ICreateOrderInfoFormState,
    options: ToRequestDataOptions<EntityPath<ICreateOrderInfoFormState>>
  ) => ICreateOrderInfoDto;

  toOrderSlotsReqData: (
    slots: IOrderTempSlot[],
    options?: toOrderSlotsRequestDataOptions
  ) => SaleOrderSlotDto[] | undefined;
}

const useOrdersServiceHook = (): OrdersService => {
  const dispatch = useAppDispatch();

  return useMemo(
    (): OrdersService => ({
      createOne: async () => dispatch(() => {}),
      getById: args => dispatch(getOrderByIdThunk(defaultThunkPayload(args))),
      getAll: args => dispatch(getAllOrdersThunk(defaultThunkPayload(args))),

      deleteOne: async () => dispatch(() => {}),
      updateOne: async () => dispatch(() => {}),

      getSlots: args => dispatch(getOrderSlotsThunk(defaultThunkPayload(args))),

      getPaymentsByOrderId: args => dispatch(getAllPaymentsByOrderThunk(args)),
      getInvoicesByOrderId: args => dispatch(getAllInvoicesByOrderThunk(args)),
      getDeliveriesByOrderId: args => dispatch(getAllDeliveriesByOrderThunk(args)),
      getShipmentsByOrderId: async () => dispatch(() => {}),

      addTempSlot: args => dispatch(AddSlotToGroupAction(args)),
      removeTempSlot: args => dispatch(RemoveSlotFromGroupAction(args)),
      updateTempSlot: args => dispatch(UpdateSlotInGroupAction(args)),

      updateCurrentGroupFormInfoData: args => dispatch(UpdateCurrentGroupFormInfoDataAction(args)),
      clearCurrentGroupFormData: () => dispatch(ClearCurrentGroupFormDataAction({})),

      toOrderInfoReqData: (
        data: ICreateOrderInfoFormState,
        options: ToRequestDataOptions<EntityPath<ICreateOrderInfoFormState>>
      ) => toReqData(data, options),

      toOrderSlotsReqData: toOrderSlotsReqData,
    }),
    [dispatch]
  );
};

export default useOrdersServiceHook;
