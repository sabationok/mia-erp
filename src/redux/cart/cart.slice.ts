import { IOrderTempSlot } from 'types/orders/order-slot.types';
import { WarehouseEntity } from '../../types/warehousing/warehouses.types';
import { createSlice } from '@reduxjs/toolkit';
import { Action } from '../store.store';
import { clearFormStateAction, setFormStateAction } from './cart.actions';
import { updateIdsArray } from '../../utils';
import { FormOrderSummaryData, ICreateOrderInfoFormState, OrderSummary } from 'types/orders/orders.types';

export const CART_ID_PREFIX = 'cart';

export type TempOrderId = string;
export type TempSlotId = string;
export type CartId = string;

export type CartItemId = TempSlotId | `${typeof CART_ID_PREFIX}_${CartId}_${TempSlotId}`;
export type CartOrderId = TempOrderId | `${typeof CART_ID_PREFIX}_${CartId}_${TempOrderId}`;

export interface CartState {
  cartId?: CartId;
  info?: any;
  slots: IOrderTempSlot[];

  summary: OrderSummary;

  information?: ICreateOrderInfoFormState;
  recommends: Record<string, SetRecommendationPayload & { timestamp?: number }>;

  slotsMap: OrderSlotsMap;
  keysMap: Record<CartOrderId, CartItemId>;
  offersMap: Record<CartOrderId, CartItemId[]>;

  ordersDataMap: Record<CartOrderId, CartOrderData>;
}
export type CartOrderData = {
  summary: OrderSummary;
  slots: IOrderTempSlot[];
  slotKeys: CartItemId[];
  selectedIds: CartItemId[];
  isSelected?: boolean;
  warehouse?: WarehouseEntity;
  orders?: CartOrderData[];
};
export type OrderSlotsMap = Record<CartItemId, IOrderTempSlot>;

export interface SetRecommendationPayload {
  _id?: string;
  offerId?: string;
  fromRef: string;
  variation?: {
    _id?: string;
    properties?: { _id?: string }[];
  };
  sku?: string;
  label?: string;
  price?: {
    _id?: string;
    out?: string;
  };
}

const initialCartState: CartState = {
  slots: [],

  recommends: {},

  summary: {
    slotsCount: 0,
    offersCount: 0,
    ordersAmount: '0',
    ordersCount: 0,
    forPay: '0',
    deliveriesCount: 0,
    deliveryPrice: '0',
    // cashback: { amount: '0', percentage: '0' },
  },
  slotsMap: {},

  keysMap: {},
  offersMap: {},

  ordersDataMap: {},
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState: initialCartState,
  reducers: {
    setCartIdAction: (s, a: Action<{ userId?: string }>) => {
      s.cartId = a.payload.userId;
      return s;
    },
    setRecommendationAction: (s, a: Action<SetRecommendationPayload>) => {
      const key = a.payload?.offerId || a.payload?.sku;
      if (key) {
        s.recommends[key] = {
          ...s.recommends[key],
          fromRef: a.payload.fromRef,
          timestamp: Date.now(),
        };
      }
    },
    clearRecommendations: s => {
      s.recommends = {};
    },
    setWarehouseSummary(s, a: Action<{ warehouseId: CartOrderId; data: FormOrderSummaryData }>) {
      s.ordersDataMap[a.payload.warehouseId] = {
        ...s.ordersDataMap[a.payload.warehouseId],
        summary: a.payload.data,
      };
    },
    setSummary(s, a: Action<FormOrderSummaryData>) {
      s.summary = a.payload;
    },
    addNewSlotToCartAction(st, a: Action<{ data: IOrderTempSlot }>) {
      const fromRefKey = a.payload.data?.offer?._id;

      if (fromRefKey && st.recommends?.[fromRefKey]?.fromRef) {
        a.payload.data.fromRef = st.recommends?.[fromRefKey]?.fromRef;
      }
      UpdateCartSlotMutation(st, a.payload.data);
      return st;
    },
    updateSlotAction(st, a: Action<{ data: IOrderTempSlot }>) {
      const fromRefKey = a.payload.data.offer?._id;
      if (fromRefKey && st.recommends?.[fromRefKey]?.fromRef) {
        a.payload.data.fromRef = st.recommends?.[fromRefKey]?.fromRef;
      }
      UpdateCartSlotMutation(st, a.payload.data, {
        update: true,
      });
      return st;
    },
    setSlotAction(st, a: Action<{ data: IOrderTempSlot }>) {
      const fromRefKey = a.payload.data.offer?._id;
      if (fromRefKey && st.recommends?.[fromRefKey]?.fromRef) {
        a.payload.data.fromRef = st.recommends?.[fromRefKey]?.fromRef;
      }
      UpdateCartSlotMutation(st, a.payload.data, {
        update: false,
      });
      return st;
    },
    removeSlotAction(st, a: Action<{ tempId: string }>) {
      RemoveCartSlotMutation(st, a.payload);

      return st;
    },
    clearCartAction(s) {
      s.slots = [];
      s.slotsMap = {};
      Object.keys(s.ordersDataMap).forEach(key => {
        if (s.ordersDataMap[key]) {
          s.ordersDataMap[key].summary = {};
          s.ordersDataMap[key].slotKeys = [];
        }
      });
      // RecountSummariesMutation(s);
    },
    setCheckedStatusAction(
      s,
      { payload: { tempId, warehouseId, checked } }: Action<{ warehouseId?: string; tempId?: string; checked: boolean }>
    ) {
      if (tempId) {
        UpdateCartSlotMutation(s, {
          tempId,
          isSelected: checked,
          isInCart: checked,
        });
        // const wrId = s.slotsMap[tempId].warehouse?._id;
        // if (wrId) {
        //   const wrs = s.ordersDataMap?.[wrId];
        //   if (wrs) {
        //     wrs.selectedIds = updateStringArray({
        //       id: tempId,
        //       arr: wrs.selectedIds,
        //       remove: checked,
        //     });
        //
        //     s.ordersDataMap[wrId] = wrs;
        //   }
        // }
      } else if (warehouseId) {
        const wr = s.ordersDataMap?.[warehouseId];
        s.ordersDataMap[warehouseId] = {
          ...wr,
          selectedIds: checked ? wr.slotKeys : [],
          isSelected: checked,
        };
      }
    },
  },
  extraReducers: builder =>
    builder
      .addCase(setFormStateAction, (s, a) => {
        s.information = {
          ...s.information,
          ...a.payload,
        };
        return s;
      })
      .addCase(clearFormStateAction, (s, _a) => {
        s.information = undefined;
      }),
});

export const {
  setRecommendationAction,
  clearRecommendations,
  addNewSlotToCartAction,
  updateSlotAction,
  removeSlotAction,
  clearCartAction,
  setCheckedStatusAction,
  setSummary,
  setWarehouseSummary,
} = cartSlice.actions;

const UpdateCartSlotMutation = (
  st: CartState,
  item: IOrderTempSlot,
  options?: { update?: boolean }
): { orderId?: string; recount?: boolean } => {
  const { tempId: slotId } = item;
  if (!slotId) {
    return {};
  }
  let tempId = slotId;

  const currentCartId = st.cartId;
  if (currentCartId) {
    const clotCartId = tempId?.startsWith(CART_ID_PREFIX) ? tempId?.split('_')[1] : undefined;
    if (clotCartId && clotCartId !== currentCartId) {
      console.error('This slot is not for current cart', { currentCartId, clotCartId });

      return {};
    }
  }

  const exist = st.slotsMap?.[tempId];
  st.slotsMap[tempId] = options?.update ? { ...exist, ...item } : item;

  const current = st.slotsMap[tempId];
  if (current.offer?._id) {
    st.offersMap[current.offer?._id] = updateIdsArray({
      id: tempId,
      arr: st.offersMap[current.offer?._id],
    });
  }

  if (current?.variation?._id) {
    if (!st.keysMap?.[current?.variation?._id]) st.keysMap[current.variation._id] = tempId;
  }
  if (current?.warehouse) {
    const orderId = currentCartId
      ? `${CART_ID_PREFIX}_${currentCartId}_${current?.warehouse?._id}`
      : current?.warehouse?._id;

    if (orderId) {
      let orderData = st.ordersDataMap?.[orderId] || {
        slotKeys: [],
        selectedIds: [],
        isSelected: true,
        warehouse: {},
      };
      orderData.slotKeys = updateIdsArray({
        id: tempId,
        arr: orderData?.slotKeys,
      });

      orderData.selectedIds = updateIdsArray({
        id: tempId,
        arr: orderData?.selectedIds,
        remove: !current?.isSelected,
      });
      st.ordersDataMap[orderId] = {
        ...orderData,
        // info: Object.assign(item?.warehouse ?? {}, wrSata?.info ?? {}),
        isSelected: orderData.slotKeys?.length === orderData.selectedIds?.length,
      };
      if (item?.warehouse) {
        st.ordersDataMap[orderId].warehouse = { ...item?.warehouse, ...(orderData?.warehouse ?? {}) };
      }
    }
  }
  return {};
};

function RemoveCartSlotMutation(st: CartState, { tempId }: { tempId: string }) {
  const exist = st.slotsMap?.[tempId];

  let warehouseId = exist?.warehouse?._id?.slice();

  const wrhs = warehouseId ? st.ordersDataMap?.[warehouseId] : undefined;

  if (wrhs) {
    const offerId = exist?.offer?._id;
    if (offerId && st.offersMap[offerId]) {
      st.offersMap[offerId] = updateIdsArray({
        id: tempId,
        arr: st.offersMap?.[tempId],
        remove: true,
      });
    }
    if (wrhs) {
      wrhs.slotKeys = updateIdsArray({
        id: tempId,
        arr: wrhs.slotKeys,
        remove: true,
      });
      wrhs.selectedIds = updateIdsArray({
        id: tempId,
        arr: wrhs.selectedIds,
        remove: true,
      });
    }
  }
}

// export function isCartCase(type: string) {
//   return isString(type) && type.startsWith('cart');
// }
// function inRecount(a: AnyAction) {
//   return isCartCase(a.type) && a.type.endsWith('/recount');
// }
// function inFulfilled(a: AnyAction) {
//   return isCartCase(a.type) && a.type.endsWith('fulfilled');
// }
// function inError(a: AnyAction) {
//   return isCartCase(a.type) && a.type.endsWith('rejected');
// }
