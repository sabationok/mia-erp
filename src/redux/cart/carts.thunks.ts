import { createAsyncThunk, nanoid } from '@reduxjs/toolkit';
import { AppModuleName } from '../reduxTypes.types';
import type { UUID } from '../../types/utils.types';
import type { Cart, CartOrder, CartSlot } from 'types/cart/cart.types';
import Decimal from 'decimal.js';
import type { CartsState } from './carts.slice';
import { WarehouseEntity } from '../../types/warehousing';

export enum CartThunkType {
  addSlot = 'cart/addSlotThunk',
  removeSlot = 'cart/removeSlotThunk',
  updateSlot = 'cart/editSlotThunk',
  clear = 'cart/clearThunk',
  removeOrder = 'cart/removeOrderThunk',
  removeCart = 'cart/removeCartThunk',
}
interface HasCartState {
  state: { [AppModuleName.cart]: CartsState };
}
interface CartThunkReturnData extends CartBasePayload {
  cart: Cart;
}
type AddSlotPayload = CartBasePayload & {
  slot: CartSlot;
  warehouse: Pick<WarehouseEntity, '_id' | 'code' | 'address' | 'label'>;
};

const countOrderSummary = (order: CartOrder) => {
  order.summary.brutto = Object.values(order.slots.dataMap)
    .reduce((acc, slot) => acc.plus(new Decimal(slot.in ?? 0).mul(slot.quantity ?? 0)), new Decimal(0))
    .toFixed(2);

  return order;
};

export const getInitialCart = (customerId: string = nanoid(12)): Cart => {
  return {
    dataMap: {},
    keysMap: {},
    summary: {},
    ids: [],
    ordersIds: [],
    selectedIds: [],
    slotsIds: [],
    tempId: customerId,
    cartId: customerId,
    warehousesIds: [],
    offersIdsMap: {},
  };
};
const createCartAsyncThunk = <Input extends CartBasePayload = CartBasePayload, Return = any>(
  type: string,
  cb: (cart: Cart, input: Input) => Promise<Return>
) => {
  return createAsyncThunk<Return, Input, HasCartState>(type, async (input, { getState, rejectWithValue }) => {
    const state = getState().cart;
    // if (!cart) throw new Error('Cart not found');
    const cart = state.dataMap[input.cartId] || getInitialCart();
    if (!cart) throw new Error('Cart not exist');

    try {
      const res = await cb({ ...cart }, input);

      return res;
    } catch (e) {
      return rejectWithValue(e && typeof e === 'object' && 'message' in e ? e?.message : 'CartThunkError');
    }
  });
};

// Додати слот
export const addSlot = createCartAsyncThunk<AddSlotPayload, CartThunkReturnData>(
  CartThunkType.addSlot,
  async (cart, { cartId, slot, warehouse }) => {
    // Додаємо або оновлюємо слот в `slotsMap`
    const offerId = slot.offer?._id;
    if (offerId) {
      cart.dataMap[warehouse._id].slots.dataMap[offerId] = slot;
      // Перераховуємо сумарні показники для цього замовлення
      const order = cart.dataMap[warehouse._id];
      countOrderSummary(order);
      cart.dataMap[warehouse._id] = order;
    }

    return {
      cartId,
      cart,
    };
  }
);

export type UpdateCartSlotPayload = CartBasePayload & {
  offerId: string;
  updatedSlot: CartSlot;
  warehouseId: string;
};
// Оновити слот
export const updateSlot = createCartAsyncThunk<UpdateCartSlotPayload, CartThunkReturnData>(
  CartThunkType.updateSlot,
  async (cart, { cartId, offerId, updatedSlot, warehouseId }) => {
    const order = cart.dataMap[warehouseId];
    if (!order) throw new Error('Order not found');

    // Оновлюємо слот
    order.slots.dataMap[offerId] = updatedSlot;

    cart.dataMap[warehouseId] = countOrderSummary(order);
    return {
      cartId,
      cart,
    };
  }
);

export type RemoveCartSlotPayload = CartBasePayload & { offerId: string; warehouseId: string };

type CartBasePayload = {
  cartId: UUID;
};

// Видалити слот
export const removeSlot = createCartAsyncThunk<RemoveCartSlotPayload, CartThunkReturnData>(
  CartThunkType.removeSlot,
  async (cart, { cartId, offerId, warehouseId }) => {
    const order = cart.dataMap[warehouseId];
    if (!order) throw new Error('Order not found');

    // Видаляємо слот
    delete order.slots.dataMap[offerId];

    cart.dataMap[warehouseId] = countOrderSummary(order);
    return {
      cartId,
      cart,
    };
  }
);

export const removeOrderThunk = createCartAsyncThunk<CartBasePayload & { orderId: string }>(
  CartThunkType.removeOrder,
  async (cart, { cartId, orderId }) => {
    delete cart.dataMap[orderId];

    return {
      cartId,
      cart,
    };
  }
);
