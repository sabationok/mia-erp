import { ICreateOrderInfoFormState, OrderEntity, OrderSummary as CartOrderSummary } from '../orders/orders.types';
import { SliceMap } from '../../redux/reduxTypes.types';
import { IOrderTempSlot } from '../orders/order-slot.types';
import { UUID } from '../utils.types';
import { WarehouseEntity } from '../warehousing';

export const CART_ID_PREFIX = 'cart';
export const CART_DEFAULT_ID = 'default';

export type SlotId = UUID;
export type CustomerId = UUID;
export type CartId = CustomerId | typeof CART_DEFAULT_ID;
export type WarehouseId = UUID;
export type OfferId = UUID;
export type VariationId = UUID;
export type OrderId = UUID;

export type CartSlotId = UUID | `${typeof CART_ID_PREFIX}_${CartId}_${SlotId}`;
export type CartOrderId = UUID | `${typeof CART_ID_PREFIX}_${CartId}_${OrderId}`;

export type CartSlot = IOrderTempSlot;

export interface CartOrdersState extends SliceMap<CartOrderId, CartOrderId, CartOrder> {
  summary: CartOrderSummary;
}
export interface CartOrderSlotsState extends SliceMap<CartSlotId, CartOrderId, CartSlot> {}

export type CartOrderBase = {
  tempId: CartOrderId;
  cartId: CartId;
  ordersIds: CartOrderId[];
  selectedIds: CartSlotId[];
  warehousesIds: WarehouseId[];

  slotsIds: CartSlotId[];

  offersIdsMap: Record<OfferId, CartSlotId[]>;
};
export interface CartOrder extends CartOrderBase, Omit<OrderEntity, 'summary' | 'slots'> {
  isSelected?: boolean;

  warehouse?: WarehouseEntity;
  summary: CartOrderSummary;

  orders?: CartOrder[];

  slots: CartOrderSlotsState;
}

export interface CartStateMap extends SliceMap<CartId, CustomerId, CartOrder> {}
export interface Cart extends CartOrderBase, CartStateMap {
  summary: CartOrderSummary;

  information?: ICreateOrderInfoFormState;
}
