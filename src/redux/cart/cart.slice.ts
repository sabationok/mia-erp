import { IOrderTempSlot } from 'types/orders/order-slot.types';
import { createSlice } from '@reduxjs/toolkit';
import { Action } from '../store.store';
import { clearFormStateAction, setFormStateAction } from './cart.actions';
import { updateIdsArray } from '../../utils';
import {
  FormOrderSummaryData,
  ICreateOrderInfoFormState,
  OrderEntity,
  OrdersGroupEntity,
  OrderSummary,
} from 'types/orders/orders.types';
import { ICustomer } from '../../types/customers.types';
import { HasBaseCmsConfigs } from '../../types/cms.types';
import { HasLabel, HasSku } from '../../types/utils.types';
import { WarehouseEntity } from '../../types/warehousing/warehouses.types';

export const CART_ID_PREFIX = 'cart';
export const CART_DEFAULT_ID = 'default';

export type OrderId = string;
export type SlotId = string;
export type CartId = string | typeof CART_DEFAULT_ID;
type CustomerId = string;
type OfferId = string;

export type CartSlotId = `${typeof CART_ID_PREFIX}_${CartId}_${SlotId}`;
export type CartOrderId = `${typeof CART_ID_PREFIX}_${CartId}_${OrderId}`;

export type CartOrderSummary = OrderSummary | OrdersGroupEntity['summary'];
export interface CartOrdersGroup extends Omit<OrdersGroupEntity, 'summary'> {
  tempId: CartId;

  information?: ICreateOrderInfoFormState;
  summary: CartOrderSummary;

  ordersIds: CartOrderId[];
  slotsIds: CartSlotId[];

  offersIds: OfferId[];
}
export interface CartOrder extends Omit<OrderEntity, 'summary'> {
  tempId: CartOrderId;
  cartId: CartId;

  ordersIds: CartOrderId[];

  slotsIds: CartSlotId[];
  selectedIds: CartSlotId[];

  isSelected?: boolean;

  warehouse?: WarehouseEntity;
  summary: CartOrderSummary;
  orders?: CartOrder[];
}

const InitCart = (customer?: ICustomer): CartOrdersGroup => {
  return {
    _id: '',
    tempId: customer?._id || CART_DEFAULT_ID,
    slotsIds: [],
    ordersIds: [],
    offersIds: [],
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
    information: {
      customer,
    },
  };
};
const InitCartOrder = (cartId: CartId, warehouse: WarehouseEntity): CartOrder => {
  return {
    _id: '',
    cartId,
    tempId: `${CART_ID_PREFIX}_${cartId}_${warehouse._id}`,
    slotsIds: [],
    ordersIds: [],
    selectedIds: [],
    // offersIds: [],
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
  };
};

type SliceMap<RefKey extends string, InverseKey extends string, DataType, Extra = any> = {
  dataMap: Record<RefKey, DataType>;
  keysMap: Record<RefKey, InverseKey[]>;
  ids: RefKey[];
  extra?: Extra;
};
export interface CartStateMap extends SliceMap<CartId, CustomerId, CartOrdersGroup> {}
export interface CartState extends CartStateMap {
  currentId?: CartId;

  carts: CartStateMap;
  orders: SliceMap<CartOrderId, CartOrderId, CartOrder>;
  slots: SliceMap<CartSlotId, CartOrderId, IOrderTempSlot>;

  recommends: Record<string, SetRecommendationPayload & { timestamp?: number }>;
}

export interface SetRecommendationPayload extends HasSku, HasLabel, HasBaseCmsConfigs {
  _id?: string;
  offerId?: string;
  fromRef: string;
  variation?: HasSku &
    HasLabel & {
      // * не обовязково
      _id?: string;
      properties?: { _id?: string }[];
    };
}

const initialCartState: CartState = {
  currentId: CART_DEFAULT_ID,
  recommends: {},

  dataMap: {
    [CART_DEFAULT_ID]: InitCart(),
  },
  keysMap: {},
  ids: [],

  ...InitCart(),

  carts: {
    dataMap: {},
    keysMap: {},
    ids: [],
  },

  orders: {
    dataMap: {},
    keysMap: {},
    ids: [],
  },

  slots: {
    dataMap: {},
    keysMap: {},
    ids: [],
  },
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState: initialCartState,
  reducers: {
    setCartIdAction: (s, a: Action<{ cartId?: string }>) => {
      s.currentId = a.payload.cartId;
      return s;
    },
    addNewCartAction: (st, a: Action<{ customer: ICustomer }>) => {
      st.dataMap[a.payload.customer._id] = InitCart(a.payload.customer);
    },
    removeCartIdAction: (s, a: Action<{ cartId?: string }>) => {
      s.currentId = a.payload.cartId;
      // TODO ===================================
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

    setOrderSummaryAction(
      s,
      { payload: { orderId, data } }: Action<{ orderId: CartOrderId; data: FormOrderSummaryData }>
    ) {
      const order = s.orders.dataMap[orderId];
      if (order) {
        order.summary = data;

        s.orders.dataMap[orderId] = order;
      }
    },

    addNewSlotToCartAction(st, a: Action<{ data: IOrderTempSlot }>) {
      // const fromRefKey = a.payload.data?.offer?._id;
      //
      // if (fromRefKey && st.recommends?.[fromRefKey]?.fromRef) {
      //   a.payload.data.fromRef = st.recommends?.[fromRefKey]?.fromRef;
      // }
      UpdateCartSlotMutation(st, a.payload.data);
      return st;
    },
    updateSlotAction(st, a: Action<{ data: IOrderTempSlot }>) {
      // const fromRefKey = a.payload.data.offer?._id;
      // if (fromRefKey && st.recommends?.[fromRefKey]?.fromRef) {
      //   a.payload.data.fromRef = st.recommends?.[fromRefKey]?.fromRef;
      // }
      UpdateCartSlotMutation(st, a.payload.data, {
        update: true,
      });
      return st;
    },
    setSlotAction(st, a: Action<{ data: IOrderTempSlot }>) {
      // const fromRefKey = a.payload.data.offer?._id;
      // if (fromRefKey && st.recommends?.[fromRefKey]?.fromRef) {
      //   a.payload.data.fromRef = st.recommends?.[fromRefKey]?.fromRef;
      // }
      UpdateCartSlotMutation(st, a.payload.data, {
        update: false,
      });
      return st;
    },
    removeSlotAction: (st, a: Action<{ tempId: CartSlotId }>) => {
      RemoveCartSlotMutation(st, a.payload);

      return st;
    },
    clearCartAction(s, a: Action<{ cartId?: CartId }>) {
      const { cartId } = a.payload;
      if (cartId) {
        const cart = s.dataMap[cartId];

        const orderIds = cart.ordersIds;

        if (orderIds?.length) {
          orderIds.forEach(orderId => {
            const order = s.orders.dataMap[orderId];
            const nestedOrdersIds = order.ordersIds;
            console.log('clearCartAction', { nestedOrdersIds });

            const slotsIds = order.slotsIds;

            if (slotsIds.length) {
              slotsIds.forEach(slotId => {
                delete s.slots.dataMap[slotId];
                delete s.slots.keysMap?.[slotId];
                s.slots.ids = updateIdsArray({
                  id: slotId,
                  arr: s.slots.ids,
                  remove: true,
                });
              });
            }
            delete s.orders.dataMap[orderId];
            delete s.orders.keysMap[orderId];
            s.orders.ids = updateIdsArray({
              id: orderId,
              arr: s.orders.ids,
              remove: true,
            });
          });
        }
      }
      // RecountSummariesMutation(s);
    },
    setCheckedStatusAction(
      s,
      {
        payload: { tempId, orderId, checked },
      }: Action<{ orderId?: CartOrderId; tempId?: CartSlotId; checked: boolean }>
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
      } else if (orderId) {
        const order = s.orders.dataMap?.[orderId];
        const slotIds = order.slotsIds;
        if (slotIds?.length) {
          slotIds.forEach(slotId => {
            if (s.slots.dataMap[slotId]) {
              s.slots.dataMap[slotId].isSelected = checked;
            }
          });
        }

        s.orders.dataMap[orderId] = {
          ...order,
          selectedIds: checked ? slotIds : [],
          isSelected: checked,
        };
      }
    },
  },
  extraReducers: builder =>
    builder
      .addCase(setFormStateAction, (s, a) => {
        const cartId = a.payload?.cartId || CART_DEFAULT_ID;
        const cart = s.dataMap[cartId];

        if (cart) {
          s.dataMap[cartId].information = {
            ...cart.information,
            ...a.payload,
          };
        }
        return s;
      })
      .addCase(clearFormStateAction, (s, a) => {
        const cartId = a.payload?.cartId || CART_DEFAULT_ID;

        const cart = s.dataMap[cartId];

        if (cart) {
          delete s.dataMap[cartId].information;
        }
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
  setOrderSummaryAction,
  setCartIdAction,
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

  const currentCartId = st.currentId;

  if (currentCartId) {
    const [prefix] = tempId.split('_');
    if (prefix !== CART_ID_PREFIX) {
      tempId = `${CART_ID_PREFIX}_${currentCartId}_${tempId}`;
      item.tempId = tempId;
    }

    // const clotCartId = tempId?.startsWith(CART_ID_PREFIX) ? tempId?.split('_')[1] : undefined;
    // if (clotCartId && clotCartId !== currentCartId) {
    //   console.error('This slot is not for current cart', { currentCartId, clotCartId });
    //
    //   return {};
    // }
  } else {
    console.error('[Cart error]'.toUpperCase(), { currentCartId, tempId, slot: item });
    return {};
  }

  try {
    const exist = st.slots.dataMap?.[tempId];

    st.slots.dataMap[tempId] = options?.update ? { ...exist, ...item } : item;

    const current = st.slots.dataMap[tempId];
    if (current.offer?._id) {
      st.dataMap[currentCartId].offersIds = updateIdsArray({
        id: current.offer?._id,
        arr: st.dataMap[currentCartId]?.offersIds,
      });
    }

    if (current.variation?._id) {
      st.dataMap[currentCartId].offersIds = updateIdsArray({
        id: current.variation?._id,
        arr: st.dataMap[currentCartId]?.offersIds,
      });
    }

    if (current?.warehouse) {
      const orderId: CartOrderId | undefined = currentCartId
        ? `${CART_ID_PREFIX}_${currentCartId}_${current?.warehouse?._id}`
        : undefined;

      if (orderId) {
        let orderData = st.orders.dataMap?.[orderId] || InitCartOrder(currentCartId, current?.warehouse);
        orderData.slotsIds = updateIdsArray({
          id: tempId,
          arr: orderData?.slotsIds,
        });

        orderData.selectedIds = updateIdsArray({
          id: tempId,
          arr: orderData?.selectedIds,
          remove: !current?.isSelected,
        });

        orderData.isSelected = orderData.slotsIds?.length === orderData.selectedIds?.length;

        orderData.warehouse = { ...(orderData?.warehouse ?? {}), ...current?.warehouse };

        st.orders.dataMap[orderId] = orderData;
      }
    }
  } catch (e) {
    console.error('[Cart error]'.toUpperCase(), e);
  }
  return {};
};

function RemoveCartSlotMutation(st: CartState, { tempId }: { tempId: CartSlotId }) {
  const slot = st.slots.dataMap?.[tempId];

  let cartId = slot?.cartId;
  const cart = cartId ? st.dataMap?.[cartId] : undefined;

  // TODO переробити / додати варіації
  const offerId = slot?.offer?._id;
  if (offerId && cart?.offersIds?.length) {
    cart.offersIds = updateIdsArray({
      id: tempId,
      arr: cart?.offersIds,
      remove: true,
    });
  }

  let orderId = slot?.cartOrderId;
  const order = orderId ? st.orders.dataMap?.[orderId] : undefined;

  if (order) {
    order.slotsIds = updateIdsArray({
      id: tempId,
      arr: order.slotsIds,
      remove: true,
    });
    order.selectedIds = updateIdsArray({
      id: tempId,
      arr: order.selectedIds,
      remove: true,
    });
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
