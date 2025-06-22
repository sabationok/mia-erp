import { useMemo } from 'react';
import { useAppDispatch } from '../redux/store.store';
import { __ServiceDispatcherAsync, ServiceDispatcher, ServiceDispatcherAsync } from '../redux/app-redux.types';
import {
  ICreateOrderInfoDto,
  ICreateOrderInfoFormState,
  IOrderReqData,
  OrderEntity,
} from '../types/orders/orders.types';
import {
  AddSlotToGroupAction,
  ClearCurrentGroupFormDataAction,
  RemoveSlotFromGroupAction,
  UpdateCurrentGroupFormInfoDataAction,
  UpdateSlotInGroupAction,
} from '../redux/orders/orders.actions';
import { getAllOrdersThunk, getOrderSlotsThunk, getOrderThunk } from '../redux/orders/orders.thunks';
import {
  defaultThunkPayload,
  toOrderSlotsReqData,
  toOrderSlotsRequestDataOptions,
  toReqData,
  ToRequestDataOptions,
} from '../utils';
import { EmptyFn, EntityPath } from '../types/utils.types';
import { IOrderTempSlot, SaleOrderSlotDto } from '../types/orders/order-slot.types';

export interface OrdersService {
  createOne: EmptyFn | ServiceDispatcherAsync<IOrderReqData, OrderEntity>;
  deleteOne: EmptyFn | ServiceDispatcherAsync;
  updateOne: EmptyFn | ServiceDispatcherAsync;
  getById: __ServiceDispatcherAsync<typeof getOrderThunk>;
  getAll: __ServiceDispatcherAsync<typeof getAllOrdersThunk>;
  getSlots: __ServiceDispatcherAsync<typeof getOrderSlotsThunk>;

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
      getById: args => dispatch(getOrderThunk(args as never)),
      getAll: args => dispatch(getAllOrdersThunk(args as never)),

      deleteOne: async () => dispatch(() => {}),
      updateOne: async () => dispatch(() => {}),

      getSlots: args => dispatch(getOrderSlotsThunk(defaultThunkPayload(args))),

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
