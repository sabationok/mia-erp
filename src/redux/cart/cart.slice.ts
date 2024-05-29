import { OfferEntity } from 'types/offers/offers.types';
import { IOrderTempSlot } from 'types/orders/order-slot.types';
import { WarehouseEntity } from '../../types/warehousing/warehouses.types';
import { createSlice } from '@reduxjs/toolkit';
import { Action } from '../store.store';
import {
  clearFormStateAction,
  removeCurrentSlotAction,
  setCurrentSlotAction,
  setFormStateAction,
} from './cart.actions';
import { updateIdsArray } from '../../utils';
import { FormOrderSummaryData, ICreateOrderInfoFormState, OrderSummary } from 'types/orders/orders.types';

type WarehouseId = string;
type TempId = string;

export interface CartState {
  info?: any;
  slots: Partial<IOrderTempSlot>[];
  currentSlot?: Partial<IOrderTempSlot>;
  currentOffer?: OfferEntity;

  summary: OrderSummary;

  information?: ICreateOrderInfoFormState;
  recommends: Record<string, SetRecommendationPayload & { timestamp?: number }>;

  slotsMap: OrderSlotsMap;
  keysMap: Record<WarehouseId, TempId>;
  offersMap: Record<WarehouseId, TempId[]>;

  warehousesDataMap: Record<WarehouseId, CartWarehouseData>;
}
export type CartWarehouseData = {
  summary: OrderSummary;
  slotKeys: TempId[];
  selectedIds: TempId[];
  isSelected?: boolean;
  info?: WarehouseEntity;
};
export type OrderSlotsMap = Record<TempId, IOrderTempSlot>;

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

  warehousesDataMap: {},
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState: initialCartState,
  reducers: {
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
    setWarehouseSummary(s, a: Action<{ warehouseId: WarehouseId; data: FormOrderSummaryData }>) {
      s.warehousesDataMap[a.payload.warehouseId] = {
        ...s.warehousesDataMap[a.payload.warehouseId],
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
    removeSlotAction(st, a: Action<{ tempId: string }>) {
      RemoveCartSlotMutation(st, a.payload);

      return st;
    },
    clearCartAction(s) {
      s.slots = [];
      s.slotsMap = {};
      Object.keys(s.warehousesDataMap).forEach(key => {
        if (s.warehousesDataMap[key]) {
          s.warehousesDataMap[key].summary = {};
          s.warehousesDataMap[key].slotKeys = [];
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
        //   const wrs = s.warehousesDataMap?.[wrId];
        //   if (wrs) {
        //     wrs.selectedIds = updateStringArray({
        //       id: tempId,
        //       arr: wrs.selectedIds,
        //       remove: checked,
        //     });
        //
        //     s.warehousesDataMap[wrId] = wrs;
        //   }
        // }
      } else if (warehouseId) {
        const wr = s.warehousesDataMap?.[warehouseId];
        s.warehousesDataMap[warehouseId] = {
          ...wr,
          selectedIds: checked ? wr.slotKeys : [],
          isSelected: checked,
        };
      }
    },
  },
  extraReducers: builder =>
    builder
      .addCase(setCurrentSlotAction, (s, a) => {
        s.currentSlot = a.payload;
      })
      .addCase(removeCurrentSlotAction, (s, _a) => {
        s.currentSlot = undefined;
      })
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
  s: CartState,
  item: IOrderTempSlot,
  _options?: { update?: boolean }
): { warehouseId?: string; recount?: boolean } => {
  const { tempId } = item;
  if (!tempId) {
    return {};
  }
  const exist = s.slotsMap?.[tempId];
  s.slotsMap[tempId] = { ...exist, ...item };

  const current = s.slotsMap[tempId];
  if (current.offer?._id) {
    s.offersMap[current.offer?._id] = updateIdsArray({
      id: tempId,
      arr: s.offersMap[current.offer?._id],
    });
  }

  if (current?.variation?._id) {
    if (!s.keysMap?.[current?.variation?._id]) s.keysMap[current.variation._id] = tempId;
  }

  const warehouseId = current?.warehouse?._id;

  if (warehouseId) {
    let wrSata = s.warehousesDataMap?.[warehouseId] || {
      slotKeys: [],
      selectedIds: [],
      isSelected: true,
      info: {},
    };
    wrSata.slotKeys = updateIdsArray({
      id: tempId,
      arr: wrSata?.slotKeys,
    });

    wrSata.selectedIds = updateIdsArray({
      id: tempId,
      arr: wrSata?.selectedIds,
      remove: !current?.isSelected,
    });
    s.warehousesDataMap[warehouseId] = {
      ...wrSata,
      // info: Object.assign(item?.warehouse ?? {}, wrSata?.info ?? {}),
      isSelected: wrSata.slotKeys?.length === wrSata.selectedIds?.length,
    };
    if (item?.warehouse) {
      s.warehousesDataMap[warehouseId].info = { ...item?.warehouse, ...(wrSata?.info ?? {}) };
    }
  }
  return {};
};

function RemoveCartSlotMutation(st: CartState, { tempId }: { tempId: string }) {
  const exist = st.slotsMap?.[tempId];

  let warehouseId = exist?.warehouse?._id?.slice();

  const wrhs = warehouseId ? st.warehousesDataMap?.[warehouseId] : undefined;

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
