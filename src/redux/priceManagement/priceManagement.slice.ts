import { createSlice } from '@reduxjs/toolkit';
import { StateErrorType } from 'redux/reduxTypes.types';
import { PriceEntity, PriceListEntity } from '../../types/price-management/price-management.types';
import * as thunks from './priceManagement.thunks';
import { PartialRecord, UUID } from '../../types/utils.types';
import { omit } from 'lodash';
import { PriceDiscountEntity } from '../../types/price-management/discounts';
import { getIdFromRef } from 'utils';

export interface PricesState {
  lists: PriceListEntity[];
  filteredLists?: PriceListEntity[];
  current?: PriceListEntity | null;
  isLoading: boolean;
  error: StateErrorType;
  dataMap: PartialRecord<UUID, PriceEntity>;
  keysMap: PartialRecord<UUID, UUID[]>;

  discounts: {
    dataMap: PartialRecord<UUID, PriceDiscountEntity>;
    keysMap: PartialRecord<UUID, UUID[]>;
  };
}

const initialState: PricesState = {
  isLoading: false,
  error: null,
  lists: [],
  current: null,
  filteredLists: [],
  dataMap: {},
  keysMap: {},

  discounts: {
    keysMap: {},
    dataMap: {},
  },
};

export const priceManagementSlice = createSlice({
  name: 'priceLists',
  initialState,
  reducers: {},
  extraReducers: builder =>
    builder
      .addCase(thunks.getAllPriceListsThunk.fulfilled, (s, a) => {
        s.isLoading = false;
        const inputArr = a?.payload?.data && Array.isArray(a?.payload?.data) ? a?.payload?.data : [];

        if (a.payload?.refresh) {
          s.lists = [...inputArr];
          return;
        }
        s.lists = [...inputArr, ...s.lists];
      })
      .addCase(thunks.createPriceListThunk.fulfilled, (s, a) => {
        s.isLoading = false;
        if (a.payload) {
          s.lists = [a.payload, ...s.lists];
        }
      })
      .addCase(thunks.refreshPriceListByIdThunk.fulfilled, (s, a) => {
        const idx = s.lists.findIndex(l => l._id === a.payload?._id);
        if (idx >= 0 && a.payload) {
          s.lists.splice(idx, 1, a.payload);
        }
        if (s.current?._id === a.payload?._id) {
          s.current = a.payload;
        }
      })
      .addCase(thunks.updatePriceListByIdThunk.fulfilled, (s, a) => {
        const idx = s.lists.findIndex(l => l._id === a.payload?._id);
        if (idx >= 0 && a.payload) {
          s.lists.splice(idx, 1, a.payload);
        }
      })
      .addCase(thunks.getPriceListByIdThunk.fulfilled, (s, a) => {
        if (a.payload.refreshCurrent && s.current) {
          s.current = { ...s.current, ...a.payload.data };
        } else {
          s.current = a.payload.data;
        }
      })
      .addCase(thunks.getPriceThunk.fulfilled, (st, a) => {
        ManagePricesStateMap(st, { data: a.payload.data });
      })
      .addCase(thunks.createPriceThunk.fulfilled, (s, a) => {
        if (s?.current) {
          if (a.payload.data) {
            s.current = {
              ...s.current,
              prices: s.current?.prices ? [...s.current?.prices, a.payload?.data] : [a.payload.data],
            };
          } else if (a.payload?.refreshCurrent && a.payload?.data) {
          }
        }
      })
      .addCase(thunks.getAllPricesThunk.fulfilled, (s, a) => {
        if (a.payload.refreshCurrent) {
          s.current = { ...(s.current as PriceListEntity), prices: a.payload?.data };
        }

        let discounts: PriceDiscountEntity[] = [];

        a.payload?.data.forEach(price => {
          ManagePricesStateMap(s, { data: price });

          if (price.discounts?.length) {
            discounts = discounts.concat(price.discounts);
          }
        });

        if (discounts?.length) {
          discounts.forEach(item => {
            ManageDiscountsStateMap(s, { data: item });
          });
        }
      })
      .addCase(thunks.deletePriceFromListThunk.fulfilled, (s, a) => {
        ManagePricesStateMap(s, { removeId: a.payload?.data?.priceId });
      })
      .addCase(thunks.updatePriceThunk.fulfilled, (s, a) => {
        ManagePricesStateMap(s, { data: a.payload.data });
      }),
});

function ManagePricesStateMap(
  st: PricesState,
  input: { data?: PriceEntity; removeId?: string },
  options?: { refresh?: boolean; isForList?: boolean }
) {
  if (input.data) {
    const itemId = input.data?._id;

    st.dataMap[itemId] = options?.refresh ? input.data : { ...st.dataMap?.[itemId], ...input.data };
    const offerId = input?.data?.offer?._id;
    const variationId = input?.data?.variation?._id;

    if (offerId) {
      st.keysMap[offerId] = Array.from(new Set(...(st.keysMap[offerId] ?? [])).add(itemId));
    }
    if (variationId) {
      st.keysMap[variationId] = Array.from(new Set(...(st.keysMap[variationId] ?? [])).add(itemId));
    }
  } else if (input?.removeId) {
    const itemId = input?.removeId;
    const current = st.dataMap?.[itemId];

    st.dataMap = omit(st.dataMap, itemId);

    const offerId = current?.offer?._id;
    const variationId = current?.variation?._id;

    if (offerId) {
      const idsSet = new Set(...(st.keysMap[offerId] ?? []));
      idsSet.delete(itemId);
      st.keysMap[offerId] = Array.from(idsSet);
    }
    if (variationId) {
      const idsSet = new Set(...(st.keysMap[variationId] ?? []));
      idsSet.delete(itemId);
      st.keysMap[variationId] = Array.from(idsSet);
    }
  }
}

function idsFromRefs<Ref extends { [key in '_id']: string }>(refs: Ref[]): string[] {
  const ids: string[] = [];
  for (const ref of refs) {
    const id = getIdFromRef(ref);
    if (id) ids.push(id);
  }
  return ids;
}
function ManageDiscountsStateMap(
  st: PricesState,
  input: { data?: PriceDiscountEntity; removeId?: string },
  options?: { refresh?: boolean; isForList?: boolean }
) {
  if (input.data) {
    const itemId = input.data?._id;

    st.discounts.dataMap[itemId] = options?.refresh ? input.data : { ...st.discounts.dataMap?.[itemId], ...input.data };

    const priceIdKeys = input?.data?.prices?.length ? idsFromRefs(input?.data?.prices) : [];
    const orderIdKeys = input?.data?.offers?.length ? idsFromRefs(input?.data?.offers) : [];

    for (const priceId of [...priceIdKeys, ...orderIdKeys]) {
      console.log('discounts before', st.discounts.keysMap[priceId]);
      const idsSet = new Set(...(st.discounts.keysMap?.[priceId] ?? []));
      st.discounts.keysMap[priceId] = Array.from(idsSet);
      console.log('discounts after', st.discounts.keysMap[priceId]);
    }
  }
}
