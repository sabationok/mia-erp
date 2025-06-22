import { createSlice } from '@reduxjs/toolkit';
import { OrderEntity } from '../../types/orders/orders.types';
import { getAllOrdersThunk, getOrderSlotsThunk, getOrderThunk } from './orders.thunks';
import { onUserLogoutMatch } from '../auth/auth.actions';
import { sliceCleaner, updateIdsArray } from '../../utils';
import { UUID } from '../../types/utils.types';
import { IOrderTempSlot, OrderSlotEntity } from '../../types/orders/order-slot.types';
import * as AppCart from '../cart/cart.slice';

export interface OrdersState {
  orders: OrderEntity[];
  isLoading: boolean;
  error: any;

  keysMap: Record<UUID, UUID[]>;
  dataMap: Record<UUID, AppCart.CartOrder>;
  list: OrderEntity[];

  slots: {
    keysMap: Record<UUID, UUID[]>;
    dataMap: Record<UUID, IOrderTempSlot>;
    list: IOrderTempSlot[];
  };
}

const initState: OrdersState = {
  orders: [],
  isLoading: false,
  error: null,

  keysMap: {},
  dataMap: {},
  list: [],

  slots: {
    keysMap: {},
    dataMap: {},
    list: [],
  },
};

export const ordersSlice = createSlice({
  name: 'orders',
  initialState: initState,
  reducers: {},
  extraReducers: builder =>
    builder
      .addCase(getAllOrdersThunk.fulfilled, (s, a) => {
        if (Array.isArray(a.payload.data)) {
          if (a.payload.update) {
            s.orders = [...s.orders, ...a.payload.data];
          } else if (a.payload.prepend) {
            s.orders = [...a.payload.data, ...s.orders];
          } else {
            s.orders = a.payload.data;
          }
        }
      })

      .addCase(getOrderThunk.fulfilled, (S, A) => {
        const id = A.payload.data._id;

        S.dataMap[id] = A.payload.data;
      })
      .addCase(getOrderSlotsThunk.fulfilled, (st, ac) => {
        ac.payload.data.forEach(slot => {
          st.slots.dataMap[slot._id] = slot;
          const orderId = slot.order?._id;
          if (!orderId) return st;
          st.slots.keysMap[orderId] = [...new Set([slot._id, ...(st.slots.keysMap[orderId] ?? [])])];
        });
      })
      .addMatcher(onUserLogoutMatch, sliceCleaner(initState)),
});

export const UpdateCartSlotMutation = (st: OrdersState, item: OrderSlotEntity) => {
  const { _id: slotId } = item;
  if (!slotId) {
    return {};
  }
  const orderId = item?.order?._id;

  const Order = orderId ? st.dataMap[orderId] : undefined;
  if (!Order) return st;

  try {
    const existSlot = st.slots.dataMap?.[slotId];

    st.slots.dataMap[slotId] = { ...(existSlot ?? {}), ...item };

    const updatedSlot = st.slots.dataMap[slotId];

    const offerId = updatedSlot.offer?._id;
    const variationId = updatedSlot.variation?._id;

    if (offerId) {
      Order.offersIdsMap = {
        ...Order?.offersIdsMap,
        [offerId]: updateIdsArray({
          id: variationId ?? '',
          arr: Order?.offersIdsMap?.[offerId],
        }),
      };
    }
    Order.slotsIds = updateIdsArray({
      id: slotId,
      arr: Order?.slotsIds,
    });

    Order.selectedIds = updateIdsArray({
      id: slotId,
      arr: Order?.selectedIds,
      remove: !updatedSlot?.isSelected,
    });
  } catch (e) {
    console.error('[Order process error]'.toUpperCase(), e);
  }
  return st;
};

// function RemoveSlot(st: CartState) {
//   const slot = st.slots.dataMap?.[tempId];
//
//   const variationId = slot?.variation?._id;
//   if (variationId && st?.slots.variationsIdMap[variationId]) {
//     delete st?.slots.variationsIdMap[variationId];
//   }
//
//   if (slot) {
//     delete st.slots.dataMap?.[tempId];
//   }
//
//   fromOrder && slot && RemoveSlotFromOrder(st, slot);
// }
// function RemoveSlotFromOrder(st: CartState, { tempId, cartOrderId }: IOrderTempSlot) {
//   if (!tempId || !cartOrderId) return;
//   const order = cartOrderId ? st.orders.dataMap?.[cartOrderId] : undefined;
//
//   if (order) {
//     if (order.slotsIds.length <= 1) {
//       RemoveOrder(st, order);
//       return;
//     }
//
//     order.slotsIds = updateIdsArray({
//       id: tempId,
//       arr: order.slotsIds,
//       remove: true,
//     });
//     order.selectedIds = updateIdsArray({
//       id: tempId,
//       arr: order.selectedIds,
//       remove: true,
//     });
//
//     st.orders.dataMap[order.tempId] = order;
//   }
// }
// function RemoveOrder(st: CartState, order: CartOrder) {
//   order.slotsIds?.forEach(slotId => {
//     RemoveSlot(st, { tempId: slotId, fromOrder: false, fromCart: true });
//   });
//
//   if (order.tempId) {
//     delete st?.orders.dataMap?.[order.tempId];
//   }
//   return UpdateCart(st, { order, remove: true });
// }
//
// function UpdateCart(
//   st: CartState,
//   { slot, order, remove }: { slot?: IOrderTempSlot; order?: CartOrder; remove?: boolean }
// ) {
//   const cartId = order?.cartId || slot?.cartId;
//   if (!cartId) return;
//
//   const cart = cartId ? st.dataMap?.[cartId] : undefined;
//   if (!cart) return;
//
//   if (order) {
//     cart.ordersIds = updateIdsArray({
//       id: order.tempId,
//       arr: cart.ordersIds,
//       remove,
//     });
//   }
//
//   if (slot) {
//     remove && RemoveSlotFromCart(st, slot);
//   }
//
//   // st.dataMap[cartId] = cart;
// }
//
// function SetSlotCheckedStatus(
//   st: CartState,
//   { tempId, checked, isFoList }: { tempId: CartSlotId; checked: boolean; isFoList?: boolean }
// ) {
//   const slot = st.slots.dataMap?.[tempId];
//   if (slot) {
//     slot.isSelected = checked;
//
//     st.slots.dataMap[tempId] = slot;
//
//     if (!isFoList) {
//       const orderId = slot?.cartOrderId;
//       if (orderId) {
//         const order = st.orders.dataMap?.[orderId];
//
//         if (order) {
//           order.selectedIds = updateIdsArray({
//             id: tempId,
//             arr: order.selectedIds,
//             remove: !checked,
//           });
//
//           st.orders.dataMap[orderId] = order;
//         }
//       }
//     }
//   }
// }
