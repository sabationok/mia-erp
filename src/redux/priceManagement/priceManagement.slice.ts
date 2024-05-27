import { createSlice } from '@reduxjs/toolkit';
import { StateErrorType } from 'redux/reduxTypes.types';
import { PriceEntity, PriceListEntity } from '../../types/price-management/price-management.types';
import * as thunks from './priceManagement.thunks';
import { PartialRecord, UUID } from '../../types/utils.types';
import { omit } from 'lodash';
import { PriceDiscountEntity } from '../../types/price-management/discounts';
import { onCreateDiscountMather, onGetDiscountsMatcher } from './discounts/discounts.matchers';
import { Action } from '../store.store';

export interface PricesState {
  lists: PriceListEntity[];
  filteredLists?: PriceListEntity[];
  current?: PriceListEntity | null;
  isLoading: boolean;
  error: StateErrorType;
  dataMap: PartialRecord<UUID, PriceEntity>;
  keysMap: PartialRecord<UUID, UUID[]>;

  discounts: {
    list: PriceDiscountEntity[];
    dataMap: PartialRecord<UUID, PriceDiscountEntity>;
    keysMap: PartialRecord<UUID, UUID[]>;
  };
}

const initialState: PricesState = {
  isLoading: false,
  error: null,
  lists: [],
  // currentRoot: null,
  filteredLists: [],
  dataMap: {},
  keysMap: {},

  discounts: {
    list: [],
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
      })
      .addCase(thunks.deletePriceFromListThunk.fulfilled, (s, a) => {
        ManagePricesStateMap(s, { removeId: a.payload?.data?.priceId });
      })
      .addCase(thunks.updatePriceThunk.fulfilled, (s, a) => {
        ManagePricesStateMap(s, { data: a.payload.data });
      })
      .addMatcher(
        onGetDiscountsMatcher,
        (st, a: Action<{ data: PriceDiscountEntity[]; params?: { priceId?: string } }>) => {
          console.warn('onGetDiscountsCase  =======>>>>>>>>>');
          console.log(a);

          const priceId = a.payload.params?.priceId;
          if (priceId && st.dataMap[priceId]) {
            const current = st.dataMap[priceId];
            if (current) {
              current.discounts = a.payload.data;
              st.dataMap[priceId] = current;
            }
          }
        }
      )
      .addMatcher(
        onCreateDiscountMather,
        (st, a: Action<{ data: PriceDiscountEntity; params?: { priceId?: string } }>) => {
          const priceId = a.payload.params?.priceId;
          if (priceId && st.dataMap[priceId]) {
            const current = st.dataMap[priceId];
            if (current) {
              current.discounts = [a.payload.data, ...(current?.discounts ?? [])];

              st.dataMap[priceId] = current;
            }
          }
        }
      ),
});
function ManagePricesStateMap(
  st: PricesState,
  input: { data?: PriceEntity; removeId?: string },
  options?: { refresh?: boolean; isForList?: boolean; setDiscounts?: boolean }
) {
  if (input.data) {
    const itemId = input.data?._id;

    st.dataMap[itemId] = options?.refresh
      ? input.data
      : { ...st.dataMap?.[itemId], ...input.data, discounts: input.data?.discounts };

    const current = st.dataMap?.[itemId];

    for (const idKey of [current?.offer?._id, current?.variation?._id]) {
      if (idKey) {
        const idsSet = new Set(st.discounts.keysMap?.[idKey]);
        if (!idsSet?.has(itemId)) {
          idsSet.add(itemId);
          st.discounts.keysMap[idKey] = Array.from(idsSet);
        }
      }
    }
  } else if (input?.removeId) {
    const itemId = input?.removeId;
    const current = st.dataMap?.[itemId];

    st.dataMap = omit(st.dataMap, itemId);

    for (const idKey of [current?.offer?._id, current?.variation?._id]) {
      if (idKey) {
        const idsSet = new Set(...(st.keysMap[idKey] ?? []));
        idsSet.delete(itemId);
        st.keysMap[idKey] = Array.from(idsSet);
      }
    }
  }
}
