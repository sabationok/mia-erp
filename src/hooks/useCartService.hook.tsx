import { IOrderTempSlot } from '../types/orders/order-slot.types';
import { ICreateOrderInfoFormState } from '../types/orders/createOrderInfoFormState.type';
import { OrderSummary } from '../types/orders/orders.types';
import { useAppDispatch } from '../redux/store.store';
import { useCartsSelector } from '../redux/selectors.store';
import * as AppCart from '../redux/cart/cart.slice';
import { countOrderSummary, CreateOrderTempSlotArgs, ObjectKeys } from '../utils';
import { useEffect, useMemo } from 'react';
import * as _ from 'lodash';
import { setFormStateAction } from '../redux/cart/cart.actions';
import { CustomerEntity } from '../types/customers.types';
import { useAppParams } from './index';
import { UUID } from '../types/utils.types';

export interface CartService {
  actions: UseCartActions;
  setFormState: (info: ICreateOrderInfoFormState) => void;
  clearFormState: () => void;
  deliveriesCount: number;
  ordersSlotsMap: Record<UUID, IOrderTempSlot[]>;
  ordersSummariesMap: Record<UUID, OrderSummary>;
  ordersSelectedSlotsMap: Record<UUID, IOrderTempSlot[]>;
  summary: OrderSummary;
  isCartEmpty: boolean;
  hasSelectedSlots: boolean;
}
type UseCartActions = ReturnType<typeof useCartActions>;
export interface GetCurrentSlotReturn extends Partial<IOrderTempSlot> {
  setQty: (q: number) => void;
  isAdded: () => boolean;
  isChecked: () => boolean;
  remove: () => void;
}
export interface GetCurrentCartReturn extends Partial<AppCart.CartOrder> {
  remove: () => void;
  clear: () => void;
}
const useCartActions = () => {
  const dispatch = useAppDispatch();
  const state = useCartsSelector();
  const cartId = useAppParams().cartId;

  class Actions {
    static setChecked({ tempId, checked, orderId }: { orderId?: UUID; tempId?: UUID; checked: boolean }) {
      // dispatch(AppCart.setCheckedStatusAction({ tempId, checked, orderId }));
    }

    static setCartId(_id?: UUID, _customer?: CustomerEntity) {
      // dispatch(AppCart.setCartIdAction({ cartId: id || cartId }));
    }
    static clearCart(cartId: UUID) {
      // dispatch(AppCart.clearCartAction({ cartId }));
    }
    static removeCart(cartId: UUID) {
      // dispatch(AppCart.removeCartAction({ cartId }));
    }

    static removeOrder(orderId: UUID) {
      // dispatch(AppCart.removeOrderAction({ orderId }));
    }

    private static _addSlotMethods(slot?: IOrderTempSlot): GetCurrentSlotReturn {
      return {
        ...slot,
        setQty: (q: number) => {
          slot?.tempId && this.setQty(slot?.tempId, q);
        },
        isAdded: () => {
          return this.isInCart(slot);
        },
        isChecked: () => {
          return this.isSelected(slot);
        },
        remove: () => {
          slot?.tempId && this.removeSlot(slot?.tempId);
        },
      };
    }
    static getSlotById(tempId?: UUID) {
      return tempId ? state.slots?.dataMap?.[tempId] : undefined;
    }
    static getSlotWithMethods(tempId?: UUID): GetCurrentSlotReturn {
      return this._addSlotMethods(this.getSlotById(tempId));
    }
    static setQty(tempId: UUID, quantity: number) {
      const slot = this.getSlotById(tempId);
      if (!slot) return;
      // dispatch(
      //   AppCart.updateSlotAction({
      //     data: {
      //       ...countOrderSlotValues({ ...slot, quantity }),
      //       isSelected: true,
      //     },
      //   })
      // );
    }
    static addSlot(args: CreateOrderTempSlotArgs) {
      // dispatch(AppCart.addNewSlotToCartAction({ data: createOrderTempSlot(toSerializableObj(args)) }));
    }
    static isSelected(slot?: IOrderTempSlot) {
      const tempId = slot?.tempId;
      if (!tempId) return false;
      const wrhs = this.getOrderBySlot(slot);
      if (!wrhs) return false;

      return wrhs?.selectedIds?.includes(tempId) ?? false;
    }
    static isInCart(slot?: IOrderTempSlot) {
      const tempId = slot?.tempId;
      if (!tempId) return false;
      const wrhs = this.getOrderBySlot(slot);
      if (!wrhs) return false;

      return wrhs?.slotsIds?.includes(tempId) ?? false;
    }

    static getOrderBySlot(slot?: IOrderTempSlot) {
      const orderId = slot?.cartOrderId
        ? slot?.cartOrderId
        : slot?.tempId
          ? this.getSlotWithMethods(slot?.tempId)?.cartOrderId
          : undefined;

      if (!orderId) return undefined;

      return state.dataMap?.[orderId];
    }
    static clear(cartId?: UUID) {
      // dispatch(AppCart.clearCartAction({ cartId }));
    }
    static update(slot: IOrderTempSlot) {
      // dispatch(AppCart.updateSlotAction({ data: createOrderTempSlot(toSerializableObj(slot)) }));
    }
    static removeSlot(tempId: UUID) {
      // dispatch(AppCart.removeSlotAction({ tempId }));
    }
    static isOfferInCart({ offerId, cartId }: { cartId: UUID; offerId: string }) {
      return !!state.dataMap?.[cartId]?.offersIdsMap?.[offerId]?.length;
    }

    static getOrderById(id: UUID): AppCart.CartOrder | undefined {
      return state.dataMap?.[id];
    }
    private static _addCartMethods(cart: AppCart.CartOrder): GetCurrentCartReturn {
      return {
        ...cart,
        remove: () => {
          this.removeCart(cart._id);
        },
        clear: () => {
          this.clearCart(cart._id);
        },
      };
    }
    static getCartById(id?: UUID): AppCart.CartOrder | undefined {
      return !id ? undefined : state.dataMap?.[id];
    }
    static getCurrentCart(id?: UUID) {
      const cart = this.getCartById(id);

      return cart ? this._addCartMethods(cart) : cart;
    }

    static getSlotByVariationId(variationId?: string, _cartId?: UUID): GetCurrentSlotReturn | undefined {
      if (variationId) {
        // const cart = state.dataMap?.[cartId];

        let slotId = state.slots?.variationsIdMap?.[variationId];
        const slot = this.getSlotWithMethods(slotId);
        if (slot) {
          return this._addSlotMethods(slot);
        }
      }
    }
  }

  return Actions;
};

// export function collectSlotsByQuery(
//   st: CartState,
//   { warehouseId, omitNotSelected = false }: { warehouseId?: string; omitNotSelected?: boolean } = {}
// ): IOrderTempSlot[] {
//   const slots: IOrderTempSlot[] = [];
//   if (warehouseId) {
//     const wrs = st?.ordersDataMap?.[warehouseId];
//     const tempIds = omitNotSelected ? wrs?.selectedIds : wrs?.slotKeys;
//     if (wrs?.slotKeys?.length) {
//       for (const key of tempIds) {
//         st.slots[key] && slots.push(st.slots[key]);
//       }
//     }
//
//     return slots;
//   }
//
//   Object.values(st.slots).forEach(slot => {
//     const wrsId = slot?.warehouse?._id;
//     if (!wrsId) return false;
//     const wrs = st?.ordersDataMap?.[wrsId];
//     const tempIds = omitNotSelected ? wrs?.selectedIds : wrs?.slotKeys;
//     if (!!slot?.tempId && tempIds?.includes(slot?.tempId)) {
//       slots.push(slot);
//     }
//   });
//
//   return slots;
// }

export const useCartService = (): CartService => {
  const dispatch = useAppDispatch();
  const cartId = useAppParams().cartId;

  const state = useCartsSelector();

  const actions = useCartActions();

  const countedCartData = useMemo(() => {
    const ordersSlotsMap: Record<UUID, IOrderTempSlot[]> = {};
    const ordersSelectedSlotsMap: Record<UUID, IOrderTempSlot[]> = {};
    const ordersSummariesMap: Record<UUID, OrderSummary> = {};

    const cart = actions.getCartById(cartId);

    const ordersIds = cart?.ordersIds;

    let isCartEmpty = true;
    let hasSelectedSlots = false;

    for (const orderId of ordersIds ?? []) {
      const order = state.dataMap[orderId];
      if (!order) break;

      ordersSlotsMap[orderId] = [];

      if (order.slotsIds?.length) {
        isCartEmpty = false;

        order.slotsIds.forEach(key => {
          const slot = state.slots.dataMap?.[key];
          slot && ordersSlotsMap[orderId].push(slot);
        });

        if (order.selectedIds?.length) {
          hasSelectedSlots = true;

          ordersSelectedSlotsMap[orderId] = [];
          order.selectedIds.forEach(key => {
            ordersSelectedSlotsMap[orderId].push(state.slots.dataMap?.[key]);
          });
        }
      }
    }

    for (const orderId of ordersIds ?? []) {
      if (ordersSelectedSlotsMap[orderId]?.length) {
        ordersSummariesMap[orderId] = countOrderSummary({
          slots: ordersSelectedSlotsMap[orderId],
        });
      }
    }
    const ordersSummaries = Object.values(ordersSummariesMap);

    const summary = countOrderSummary({ warehouses: ordersSummaries });

    return {
      ordersSlotsMap,
      ordersSummariesMap,
      ordersSelectedSlotsMap,
      summary,
      isCartEmpty,
      hasSelectedSlots,
    };
  }, [actions, cartId, state.dataMap, state.slots.dataMap]);

  const res = useMemo((): CartService & { wrsIds: string[] } => {
    const wrsIds = ObjectKeys(state.dataMap).filter(wrsId => state.dataMap?.[wrsId]?.selectedIds?.length);

    return {
      ...countedCartData,
      actions,
      wrsIds,
      deliveriesCount: wrsIds.length,
      setFormState: async args => {
        const formData = _.cloneDeep(args);
        console.log('setFormState', { formData });

        return dispatch(setFormStateAction(_.cloneDeep(args)));
      },
      clearFormState: () => dispatch(setFormStateAction(undefined)),
    };
  }, [actions, countedCartData, dispatch, state.dataMap]);

  useEffect(() => {
    console.log('[ STATE ]', Object.entries(state));
  }, [state]);

  return res;
};
