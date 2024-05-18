import { useMemo } from 'react';
import { useAppDispatch } from '../redux/store.store';
import { OnlyUUID, ServiceDispatcher, ServiceDispatcherAsync } from '../redux/global.types';
import {
  ICreateOrderInfoDto,
  ICreateOrderInfoFormState,
  OrderEntity,
  IOrderReqData,
  IOrderSlot,
  IOrderSlotDto,
  IOrderTempSlot,
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
import { IInvoice } from '../types/invoices.types';
import { IDelivery } from '../types/deliveries.types';
import { IPayment } from '../types/payments.types';

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
  getSlots: ServiceDispatcherAsync<
    { params?: Pick<AppQueryParams<any>, 'group' | 'order'>; update?: boolean },
    IOrderSlot[]
  >;

  getPaymentsByOrderId: ServiceDispatcherAsync<
    { params?: Pick<AppQueryParams<any>, 'customer' | 'manager' | 'group' | 'status' | 'order'>; update?: boolean },
    IPayment[]
  >;

  getInvoicesByOrderId: ServiceDispatcherAsync<
    { params?: Pick<AppQueryParams<any>, 'customer' | 'manager' | 'group' | 'status' | 'order'>; update?: boolean },
    IInvoice[]
  >;
  getDeliveriesByOrderId: ServiceDispatcherAsync<
    { params?: Pick<AppQueryParams<any>, 'customer' | 'manager' | 'group' | 'status' | 'order'>; update?: boolean },
    IDelivery[]
  >;

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
  ) => IOrderSlotDto[] | undefined;
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

      getPaymentsByOrderId: args => dispatch(getAllPaymentsByOrderThunk(defaultThunkPayload(args))),
      getInvoicesByOrderId: args => dispatch(getAllInvoicesByOrderThunk(defaultThunkPayload(args))),
      getDeliveriesByOrderId: args => dispatch(getAllDeliveriesByOrderThunk(defaultThunkPayload(args))),

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
