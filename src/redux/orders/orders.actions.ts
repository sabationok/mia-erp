import { createAction } from '@reduxjs/toolkit';
import { ICreateOrderInfoFormState, OrderEntity, IOrderTempSlot } from '../../types/orders/orders.types';

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

export type OrderListDataKey = keyof Pick<OrderEntity, 'slots' | 'deliveries' | 'invoices' | 'payments'>;

export const UpdateCurrentOrderInfoAction = createAction<
  { key: OrderListDataKey; data: OrderEntity[OrderListDataKey] } & { update?: boolean; refresh?: boolean }
>(`orders/updateCurrentOrderInfoAction`);

export const UpdateCurrentOrderInfoByKeyAction = <Key extends OrderListDataKey>(
  key: Key,
  data: OrderEntity[Key],
  options?: { update?: boolean; refresh?: boolean }
) => {
  const action = createAction<
    { key: OrderListDataKey; data: OrderEntity[OrderListDataKey] } & { update?: boolean; refresh?: boolean }
  >(`orders/updateCurrentOrderInfoAction/key_${key}`);

  return action({ key, data, ...options });
};
export const isUpdateCurrentOrderInfoByKeyAction = (type: string) => {
  const keys: OrderListDataKey[] = ['deliveries', 'slots', 'invoices', 'payments'];
  return type.startsWith('orders') && keys.some(k => type.endsWith(`key_${k}`));
};
