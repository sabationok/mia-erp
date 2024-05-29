import { IOrderTempSlot } from '../types/orders/order-slot.types';
import { ICreateOrderInfoFormState } from '../types/orders/createOrderInfoFormState.type';
import { OrderSummary } from '../types/orders/orders.types';
import { useAppDispatch } from '../redux/store.store';
import { useCartSelector } from '../redux/selectors.store';
import {
  addNewSlotToCartAction,
  CartState,
  clearCartAction,
  removeSlotAction,
  setCheckedStatusAction,
  updateSlotAction,
} from '../redux/cart/cart.slice';
import { countOrderSlotValues, countOrderSummary, createOrderTempSlot, CreateOrderTempSlotArgs } from '../utils';
import { useMemo } from 'react';
import _ from 'lodash';
import { setFormStateAction } from '../redux/cart/cart.actions';

export interface GetCurrentSlotReturn extends Partial<IOrderTempSlot> {
  setQty: (q: number) => void;
  isAdded: () => boolean;
  isChecked: () => boolean;
}
export interface CartService {
  actions: UseCartActions;
  setFormState: (info: ICreateOrderInfoFormState) => void;
  clearFormState: () => void;
  deliveriesCount: number;
  warehousesSlotsMap: Record<string, IOrderTempSlot[]>;
  warehousesSelectedSlotsMap: Record<string, IOrderTempSlot[]>;
  warehousesSummariesMap: Record<string, OrderSummary>;
  summary: OrderSummary;
  isCartEmpty: boolean;
  hasSelectedSlots: boolean;
}
type UseCartActions = ReturnType<typeof useCartActions>;

const useCartActions = () => {
  const dispatch = useAppDispatch();
  const state = useCartSelector();
  function setChecked({ tempId, checked, warehouseId }: { warehouseId?: string; tempId?: string; checked: boolean }) {
    dispatch(setCheckedStatusAction({ tempId, checked, warehouseId }));
  }

  function _toSlot(slot?: IOrderTempSlot): GetCurrentSlotReturn {
    return {
      ...slot,
      setQty: (q: number) => {
        slot?.tempId && setQty(slot?.tempId, q);
      },
      isAdded() {
        return isInCart(slot);
      },
      isChecked() {
        return isSelected(slot);
      },
    };
  }
  function getSlot(tempId?: string): GetCurrentSlotReturn {
    const slot = tempId ? state.slotsMap?.[tempId] : undefined;

    return _toSlot(slot);
  }

  function setQty(tempId: string, quantity: number) {
    const slot = getSlot(tempId);
    if (!slot) return;
    dispatch(
      updateSlotAction({
        data: {
          ...countOrderSlotValues({ ...slot, quantity }),
          isSelected: true,
        },
      })
    );
  }
  function addSlot(args: CreateOrderTempSlotArgs) {
    dispatch(addNewSlotToCartAction({ data: createOrderTempSlot(args) }));
  }
  function isSelected(slot?: IOrderTempSlot) {
    const tempId = slot?.tempId;
    if (!tempId) return false;
    const wrhs = getWarehouseBySlot(slot);
    if (!wrhs) return false;

    return wrhs?.selectedIds?.includes(tempId);
  }
  function isInCart(slot?: IOrderTempSlot) {
    const tempId = slot?.tempId;
    if (!tempId) return false;
    const wrhs = getWarehouseBySlot(slot);
    if (!wrhs) return false;

    return wrhs?.slotKeys?.includes(tempId);
  }
  function getWarehouseById(id: string) {
    return state.warehousesDataMap?.[id];
  }
  function getWarehouseBySlot(slot?: IOrderTempSlot) {
    const wrhsId = !slot?.warehouse?._id
      ? slot?.tempId
        ? getSlot(slot?.tempId)?.warehouse?._id
        : undefined
      : slot?.warehouse?._id;
    if (!wrhsId) return undefined;

    return state.warehousesDataMap?.[wrhsId];
  }
  function update(slot: IOrderTempSlot) {
    dispatch(updateSlotAction({ data: createOrderTempSlot(slot) }));
  }
  function remove(tempId: string) {
    dispatch(removeSlotAction({ tempId }));
  }
  function clear() {
    dispatch(clearCartAction());
  }
  function isOfferInCart({ offerId }: { offerId: string }) {
    return !!state.offersMap?.[offerId]?.length;
  }
  function getWrsData(id: string) {
    return state.warehousesDataMap?.[id];
  }

  function getSlotByVariationId(variationId?: string): GetCurrentSlotReturn {
    const data =
      !variationId || !state.keysMap?.[variationId] ? undefined : state.slotsMap?.[state.keysMap?.[variationId]];

    return _toSlot(data);
  }

  return {
    getSlot,
    setQty,
    addSlot,
    isSelected,
    isInCart,
    getWarehouseBySlot,
    getWarehouseById,
    setChecked,
    update,
    remove,
    clear,
    isOfferInCart,
    getWrsData,
    getSlotByVariationId,
  };
};

export function collectSlotsByQuery(
  st: CartState,
  { warehouseId, omitNotSelected = false }: { warehouseId?: string; omitNotSelected?: boolean } = {}
): IOrderTempSlot[] {
  const slots: IOrderTempSlot[] = [];
  if (warehouseId) {
    const wrs = st?.warehousesDataMap?.[warehouseId];
    const tempIds = omitNotSelected ? wrs?.selectedIds : wrs?.slotKeys;
    if (wrs?.slotKeys?.length) {
      for (const key of tempIds) {
        st.slotsMap[key] && slots.push(st.slotsMap[key]);
      }
    }

    return slots;
  }

  Object.values(st.slotsMap).forEach(slot => {
    const wrsId = slot?.warehouse?._id;
    if (!wrsId) return false;
    const wrs = st?.warehousesDataMap?.[wrsId];
    const tempIds = omitNotSelected ? wrs?.selectedIds : wrs?.slotKeys;
    if (!!slot?.tempId && tempIds?.includes(slot?.tempId)) {
      slots.push(slot);
    }
  });

  return slots;
}

export const useCartService = (): CartService => {
  const dispatch = useAppDispatch();

  const state = useCartSelector();

  const actions = useCartActions();

  const countedCartData = useMemo(() => {
    const warehousesSlotsMap: Record<string, IOrderTempSlot[]> = {};
    const warehousesSelectedSlotsMap: Record<string, IOrderTempSlot[]> = {};
    const warehousesSummariesMap: Record<string, OrderSummary> = {};
    const wrhsIds = Object.entries(state.warehousesDataMap);
    let isCartEmpty = true;
    let hasSelectedSlots = false;

    for (const [wrhsId, wrhs] of wrhsIds) {
      warehousesSlotsMap[wrhsId] = [];
      if (wrhs.slotKeys?.length) {
        isCartEmpty = false;

        wrhs.slotKeys.forEach(key => {
          warehousesSlotsMap[wrhsId].push(state.slotsMap?.[key]);
        });

        if (wrhs.selectedIds?.length) {
          hasSelectedSlots = true;

          warehousesSelectedSlotsMap[wrhsId] = [];
          wrhs.selectedIds.forEach(key => {
            warehousesSelectedSlotsMap[wrhsId].push(state.slotsMap?.[key]);
          });
        }
      }
    }

    for (const [wrhsId, _wrhs] of wrhsIds) {
      if (warehousesSelectedSlotsMap[wrhsId]?.length) {
        warehousesSummariesMap[wrhsId] = countOrderSummary({
          slots: warehousesSelectedSlotsMap[wrhsId],
        });
      }
    }
    const warehousesSummaries = Object.values(warehousesSummariesMap);

    const summary = countOrderSummary({ warehouses: warehousesSummaries });
    return {
      warehousesSlotsMap,
      warehousesSummariesMap,
      warehousesSelectedSlotsMap,
      summary,
      isCartEmpty,
      hasSelectedSlots,
    };
  }, [state.slotsMap, state.warehousesDataMap]);

  const res = useMemo((): CartService & { wrsIds: string[] } => {
    const wrsIds = Object.keys(state.warehousesDataMap).filter(
      wrsId => state.warehousesDataMap?.[wrsId]?.selectedIds?.length
    );

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
  }, [actions, countedCartData, dispatch, state.warehousesDataMap]);

  return res;
};
