import { createAction } from '@reduxjs/toolkit';
import { ICreateOrderInfoFormState, IOrderTempSlot } from '../../types/orders/orders.types';

enum OrdersActionTypeEnum {
  addSlotToOrder = 'orders/addSlotToOrderAction',
  removeSlotFromOrder = 'orders/removeSlotFromOrderAction',
  updateCurrentOrderInfo = '',
  addSlotToGroup = 'orders/addSlotToGroupAction',
  removeSlotFromGroup = 'orders/removeSlotFromGroupAction',
  updateSlotInGroup = 'orders/updateSlotInGroupAction',
  updateGroupFormInfoData = 'orders/updateGroupFormInfoDataAction',
  clearGroupFormData = 'orders/clearGroupFormDataAction',
}

export const AddSlotToOrderAction = createAction<IOrderTempSlot, OrdersActionTypeEnum.addSlotToOrder>(
  OrdersActionTypeEnum.addSlotToOrder
);
export const RemoveSlotFromOrderAction = createAction<string, OrdersActionTypeEnum.removeSlotFromOrder>(
  OrdersActionTypeEnum.removeSlotFromOrder
);
export const AddSlotToGroupAction = createAction<IOrderTempSlot, OrdersActionTypeEnum.addSlotToGroup>(
  OrdersActionTypeEnum.addSlotToGroup
);
export const RemoveSlotFromGroupAction = createAction<string, OrdersActionTypeEnum.removeSlotFromGroup>(
  OrdersActionTypeEnum.removeSlotFromGroup
);
export const UpdateSlotInGroupAction = createAction<IOrderTempSlot, OrdersActionTypeEnum.updateSlotInGroup>(
  OrdersActionTypeEnum.updateSlotInGroup
);
export const UpdateCurrentGroupFormInfoDataAction = createAction<
  ICreateOrderInfoFormState,
  OrdersActionTypeEnum.updateGroupFormInfoData
>(OrdersActionTypeEnum.updateGroupFormInfoData);

export const ClearCurrentGroupFormDataAction = createAction<any, OrdersActionTypeEnum.clearGroupFormData>(
  OrdersActionTypeEnum.clearGroupFormData
);
