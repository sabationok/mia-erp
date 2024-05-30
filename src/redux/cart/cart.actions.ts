import { createAction } from '@reduxjs/toolkit';
import { ICreateOrderInfoFormState } from '../../types/orders/createOrderInfoFormState.type';
import { IOrderTempSlot } from '../../types/orders/order-slot.types';

export enum CartActionType {
  addSlot = 'cart/addSlot/recount',
  addSlotToOrder = 'cart/addSlotToOrder/recount',
  pushOrderSlotToList = 'cart/pushOrderSlotToList/recount',
  removeSlot = 'cart/removeSlot/recount',
  updateSlotInCart = 'cart/updateSlotInCart/recount',
  clearCart = 'cart/clearCart/recount',
  changeSlotQuantity = 'cart/changeSlotQuantity/recount',
  removeSlotsByWarehouse = 'cart/removeSlotsByWarehouse/recount',
  selectSlots = 'cart/selectSlots/recount',
  unSelectSlots = 'cart/unSelectSlots/recount',
  changeSelectedSlots = 'cart/changeSelectedSlots/recount',
  setCurrentSlot = 'cart/setCurrentSlot',
  removeCurrentSlot = 'cart/removeCurrentSlot',
  updateCurrentSlot = 'cart/updateCurrentSlot',
  // updatePersonInfo = 'cart/updatePersonInfo',
  setFormState = 'setFormStateAction',
  clearFormState = 'clearFormStateAction',
}

export const setFormStateAction = createAction<Partial<ICreateOrderInfoFormState | undefined>>(
  CartActionType.setFormState
);

export const clearFormStateAction = createAction<{ cartId?: string }>(CartActionType.clearFormState);

export const setCurrentSlotAction = createAction<Partial<IOrderTempSlot>>(CartActionType.setCurrentSlot);

export const removeCurrentSlotAction = createAction(CartActionType.removeCurrentSlot);
