import { IOrderTempSlot } from 'types/orders/order-slot.types';
import { createSlice, nanoid } from '@reduxjs/toolkit';
import { Action, ActionPayload } from '../store.store';
import { clearFormStateAction, setFormStateAction } from './cart.actions';
import { updateIdsArray } from '../../utils';
import {
  FormOrderSummaryData,
  ICreateOrderInfoFormState,
  OrderEntity,
  OrdersGroupEntity,
  OrderSummary,
} from 'types/orders/orders.types';
import { CustomerEntity } from '../../types/customers.types';
import { HasBaseCmsConfigs } from '../../types/cms.types';
import { HasImgPreview, HasLabel, HasSku } from '../../types/utils.types';
import { WarehouseEntity } from '../../types/warehousing/warehouses.types';
import { SliceMap } from '../reduxTypes.types';

export const CART_ID_PREFIX = 'cart';
export const CART_DEFAULT_ID = 'default';

type OrderId = string;
type SlotId = string;
export type CustomerId = string;
export type CartId = CustomerId | typeof CART_DEFAULT_ID;
export type WarehouseId = string;
export type OfferId = string;
export type VariationId = string;

export type CartSlotId = string | `${typeof CART_ID_PREFIX}_${CartId}_${SlotId}`;
export type CartOrderId = string | `${typeof CART_ID_PREFIX}_${CartId}_${OrderId}`;

export type CartOrderSummary = OrderSummary;

export interface CartStateMap extends SliceMap<CartId, CustomerId, CartOrdersGroup> {}
export interface OrdersStateMap extends SliceMap<CartOrderId, CartOrderId, CartOrder> {}
export interface SlotsStateMap extends SliceMap<CartSlotId, CartOrderId, IOrderTempSlot> {
  variationsIdMap: Record<VariationId, CartSlotId>;
}
export interface CartState extends CartStateMap {
  currentId?: CartId;

  orders: OrdersStateMap;
  slots: SlotsStateMap;

  recommends: Record<string, SetRecommendationPayload & { timestamp?: number }>;
}

export interface SetRecommendationPayload extends HasSku, HasLabel, HasBaseCmsConfigs, HasImgPreview {
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

export interface CartOrdersGroup extends Omit<OrdersGroupEntity, 'summary' | 'orders'> {
  tempId: CartId;

  information?: ICreateOrderInfoFormState;
  summary: CartOrderSummary;

  warehousesIds: WarehouseId[];
  ordersIds: CartOrderId[];
  slotsIds: CartSlotId[];

  offersIdsMap: Record<OfferId, CartSlotId[]>;
}
export interface CartOrder extends Omit<OrderEntity, 'summary' | 'slots'> {
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

const InitCart = (customer?: CustomerEntity, st?: CartState, tempId?: CartId): CartOrdersGroup => {
  const newCart: CartOrdersGroup = {
    _id: '',
    tempId: tempId ?? (customer?._id || CART_DEFAULT_ID),
    slotsIds: [],
    ordersIds: [],
    offersIdsMap: {},

    warehousesIds: [],
    summary: {
      slotsCount: 0,
      offersCount: 0,
      brutto: '0',
      ordersCount: 0,
      netto: '0',
      deliveriesCount: 0,
      deliveryPrice: '0',
      // cashback: { amount: '0', percentage: '0' },
    },
    information: {
      customer,
    },
  };
  if (st) {
    st.dataMap[newCart.tempId] = newCart;
  }

  return newCart;
};

const InitCartOrder = (cartId: CartId, warehouse?: WarehouseEntity, st?: CartState): CartOrder => {
  const order: CartOrder = {
    _id: '',
    cartId,
    tempId: `${CART_ID_PREFIX}_${cartId}_${warehouse?._id || nanoid(12)}`,
    slotsIds: [],
    ordersIds: [],
    selectedIds: [],

    // offersIds: [],
    summary: {
      slotsCount: 0,
      offersCount: 0,
      brutto: '0',
      ordersCount: 0,
      netto: '0',
      deliveriesCount: 0,
      deliveryPrice: '0',
      // cashback: { amount: '0', percentage: '0' },
    },
  };

  if (st) {
    st.orders.dataMap[order.tempId] = order;
    const cart = st.dataMap[cartId];

    if (cart) {
      cart.ordersIds = updateIdsArray({
        id: order.tempId,
        arr: cart?.ordersIds,
      });
      if (warehouse?._id) {
        cart.warehousesIds = updateIdsArray({
          id: warehouse?._id,
          arr: cart?.warehousesIds,
        });
      }
      st.dataMap[cartId] = cart;
    }
  }

  return order;
};

const initialCartState: CartState = {
  currentId: CART_DEFAULT_ID,
  recommends: {},

  dataMap: {
    [CART_DEFAULT_ID]: InitCart(),
  },
  keysMap: {},
  ids: [],

  orders: {
    dataMap: {},
    keysMap: {},
    ids: [],
  },

  slots: {
    dataMap: {},
    keysMap: {},
    ids: [],
    variationsIdMap: {},
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
    addNewCartAction: (st, a: Action<{ customer: CustomerEntity }>) => {
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
      RemoveSlot(st, a.payload);

      return st;
    },
    removeOrderAction: (st, a: Action<{ orderId: string }>) => {
      const order = st.orders.dataMap?.[a.payload.orderId];
      order && RemoveOrder(st, order);
      return st;
    },
    removeCartAction: (st, a: Action<{ cartId: string }>) => {
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
            // const nestedOrdersIds = order.ordersIds;

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
      st,
      {
        payload: { tempId, orderId, checked },
      }: Action<{ orderId?: CartOrderId; tempId?: CartSlotId; checked: boolean }>
    ) {
      if (tempId) {
        SetSlotCheckedStatus(st, { tempId, checked });
      } else if (orderId) {
        const order = st.orders.dataMap?.[orderId];
        const slotIds = order.slotsIds;

        if (slotIds?.length) {
          slotIds.forEach(slotId => {
            SetSlotCheckedStatus(st, { tempId: slotId, checked, isFoList: true });
          });
        }
        order.selectedIds = checked ? slotIds : [];
        order.isSelected = checked;

        st.orders.dataMap[orderId] = order;
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
  removeOrderAction,
  removeCartAction,
  setOrderSummaryAction,
  setCartIdAction,
} = cartSlice.actions;

const UpdateCartSlotMutation = (
  st: CartState,
  item: IOrderTempSlot,
  options?: ActionPayload<{ cartId?: CartId; customer?: CustomerEntity }>
): { orderId?: string; recount?: boolean } => {
  const { tempId: slotId } = item;
  if (!slotId) {
    return {};
  }
  let tempId = slotId;

  let currentCartId = item.cartId || st.currentId;

  const Cart = (currentCartId ? st.dataMap[currentCartId] : undefined) || InitCart(options?.customer);

  if (currentCartId) {
    const [prefix] = tempId?.split('_') ?? [];
    if (prefix !== CART_ID_PREFIX) {
      tempId = `${CART_ID_PREFIX}_${currentCartId}_${tempId}`;
      item.tempId = tempId;
    }
  } else {
    currentCartId = Cart.tempId;
    console.warn('[Cart warning]'.toUpperCase(), { currentCartId, tempId, slot: item });
  }

  try {
    const existSlot = st.slots.dataMap?.[tempId];

    st.slots.dataMap[tempId] = options?.update ? { ...(existSlot ?? {}), ...item } : item;

    const updatedSlot = st.slots.dataMap[tempId];

    const offerId = updatedSlot.offer?._id;
    if (offerId) {
      st.dataMap[currentCartId].offersIdsMap[offerId] = updateIdsArray({
        id: tempId,
        arr: st.dataMap[currentCartId].offersIdsMap[offerId],
      });
    }
    const variationId = updatedSlot.variation?._id;
    if (variationId) {
      st.slots.variationsIdMap[variationId] = tempId;
    }

    if (updatedSlot?.warehouse) {
      const warehouseId = updatedSlot?.warehouse?._id;
      let orderId = item.cartOrderId;

      const orderData =
        (orderId ? st.orders.dataMap?.[orderId] : undefined) ||
        InitCartOrder(currentCartId, updatedSlot?.warehouse, st);

      Cart.warehousesIds = updateIdsArray({
        id: warehouseId,
        arr: Cart.warehousesIds,
      });

      if (orderData) {
        if (!orderId) {
          orderId = orderData.tempId;
        }

        orderData.slotsIds = updateIdsArray({
          id: tempId,
          arr: orderData?.slotsIds,
        });

        orderData.selectedIds = updateIdsArray({
          id: tempId,
          arr: orderData?.selectedIds,
          remove: !updatedSlot?.isSelected,
        });

        orderData.isSelected = orderData.slotsIds?.length === orderData.selectedIds?.length;

        orderData.warehouse = { ...(orderData?.warehouse ?? {}), ...updatedSlot?.warehouse };

        st.slots.dataMap[tempId].cartId = currentCartId;
        st.slots.dataMap[tempId].cartOrderId = orderId;

        st.dataMap[currentCartId] = Cart;
        st.orders.dataMap[orderId] = orderData;
      }
    }
  } catch (e) {
    console.error('[Cart error]'.toUpperCase(), e);
  }
  return {};
};

function RemoveSlot(
  st: CartState,
  { tempId, fromOrder = true, fromCart = true }: { tempId: CartSlotId; fromOrder?: boolean; fromCart?: boolean }
) {
  const slot = st.slots.dataMap?.[tempId];

  const variationId = slot?.variation?._id;
  if (variationId && st?.slots.variationsIdMap[variationId]) {
    delete st?.slots.variationsIdMap[variationId];
  }

  if (slot) {
    delete st.slots.dataMap?.[tempId];
  }

  fromCart && slot && RemoveSlotFromCart(st, slot);

  fromOrder && slot && RemoveSlotFromOrder(st, slot);
}
function RemoveSlotFromCart(st: CartState, { tempId, cartId, offer, ...slot }: IOrderTempSlot) {
  if (!tempId || !cartId) return;
  const cart = cartId ? st.dataMap?.[cartId] : undefined;
  if (!cart) return;

  const offerId = offer?._id;
  if (offerId && cart?.offersIdsMap[offerId]?.length) {
    cart.offersIdsMap[offerId] = updateIdsArray({
      id: tempId,
      arr: cart.offersIdsMap[offerId],
      remove: true,
    });
  }

  cart.slotsIds = updateIdsArray({
    id: tempId,
    arr: cart.slotsIds,
    remove: true,
  });
}
function RemoveSlotFromOrder(st: CartState, { tempId, cartOrderId }: IOrderTempSlot) {
  if (!tempId || !cartOrderId) return;
  const order = cartOrderId ? st.orders.dataMap?.[cartOrderId] : undefined;

  if (order) {
    if (order.slotsIds.length <= 1) {
      RemoveOrder(st, order);
      return;
    }

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

    st.orders.dataMap[order.tempId] = order;
  }
}
function RemoveOrder(st: CartState, order: CartOrder) {
  order.slotsIds?.forEach(slotId => {
    RemoveSlot(st, { tempId: slotId, fromOrder: false, fromCart: true });
  });

  if (order.tempId) {
    delete st?.orders.dataMap?.[order.tempId];
  }
  return UpdateCart(st, { order, remove: true });
}

function UpdateCart(
  st: CartState,
  { slot, order, remove }: { slot?: IOrderTempSlot; order?: CartOrder; remove?: boolean }
) {
  const cartId = order?.cartId || slot?.cartId;
  if (!cartId) return;

  const cart = cartId ? st.dataMap?.[cartId] : undefined;
  if (!cart) return;

  if (order) {
    cart.ordersIds = updateIdsArray({
      id: order.tempId,
      arr: cart.ordersIds,
      remove,
    });
  }

  if (slot) {
    remove && RemoveSlotFromCart(st, slot);
  }

  // st.dataMap[cartId] = cart;
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

function SetSlotCheckedStatus(
  st: CartState,
  { tempId, checked, isFoList }: { tempId: CartSlotId; checked: boolean; isFoList?: boolean }
) {
  const slot = st.slots.dataMap?.[tempId];
  if (slot) {
    slot.isSelected = checked;

    st.slots.dataMap[tempId] = slot;

    if (!isFoList) {
      const orderId = slot?.cartOrderId;
      if (orderId) {
        const order = st.orders.dataMap?.[orderId];

        if (order) {
          order.selectedIds = updateIdsArray({
            id: tempId,
            arr: order.selectedIds,
            remove: !checked,
          });

          st.orders.dataMap[orderId] = order;
        }
      }
    }
  }
}
