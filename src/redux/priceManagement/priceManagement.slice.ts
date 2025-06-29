import { createSlice } from '@reduxjs/toolkit';
import { AppModuleName, SliceMap, StateErrorType } from 'redux/reduxTypes.types';
import { PriceDiscountEntity, PriceEntity, PriceListEntity } from '../../types/price-management';
import * as thunks from './prices.thunks';
import { PartialRecord, UUID } from '../../types/utils.types';
import { omit } from 'lodash';
import { onCreateDiscountMather, onGetDiscountsMatcher, onRemoveDiscountCase } from './discounts/discounts.matchers';
import { Action } from '../store.store';
import { onUserLogoutMatch } from '../auth/auth.actions';
import { sliceCleaner } from '../../utils';
import {
  createPriceListThunk,
  getAllPriceListsThunk,
  getPriceListThunk,
  updatePriceListThunk,
} from './prices-lists.thunks';

export interface PriceListsState extends SliceMap<UUID, UUID, PriceListEntity> {}
export interface PriceManagementState {
  lists: PriceListsState;
  isLoading: boolean;
  error: StateErrorType;
  dataMap: PartialRecord<UUID, PriceEntity>;
  keysMap: PartialRecord<UUID, UUID[]>;
}

const initialState: PriceManagementState = {
  isLoading: false,
  error: null,
  lists: {
    dataMap: {},
    keysMap: {},
    ids: [],
    list: [],
  },
  dataMap: {},
  keysMap: {},
};

export const priceManagementSlice = createSlice({
  name: AppModuleName.priceManagement,
  initialState,
  reducers: {},
  extraReducers: builder =>
    builder
      .addCase(getAllPriceListsThunk.fulfilled, (s, a) => {
        s.isLoading = false;
        const inputArr = a?.payload?.data && Array.isArray(a?.payload?.data) ? a?.payload?.data : [];

        if (a.payload?.refresh) {
          s.lists.list = [...inputArr];
          return;
        }
        s.lists.list = [...inputArr, ...(s.lists.list ?? [])];
      })
      .addCase(createPriceListThunk.fulfilled, (s, a) => {
        s.isLoading = false;
        if (a.payload) {
          s.lists.list = [a.payload.data, ...(s.lists.list ?? [])];
        }
      })
      .addCase(getPriceListThunk.fulfilled, (s, a) => {
        const id = a.payload.data?._id;
        if (!id || !a.payload.data) return;
        s.lists.dataMap[id] = a.payload.data;
      })
      .addCase(updatePriceListThunk.fulfilled, (s, a) => {
        const id = a.payload.data?._id;
        if (!id || !a.payload.data) return;
        s.lists.dataMap[id] = a.payload.data;
      })
      .addCase(thunks.getPriceThunk.fulfilled, (st, a) => {
        ManagePricesStateMap(st, { data: a.payload.data });
      })
      .addCase(thunks.createPriceThunk.fulfilled, (s, a) => {
        ManagePricesStateMap(s, { data: a.payload.data });
      })
      .addCase(thunks.getAllPricesThunk.fulfilled, (s, a) => {
        a.payload?.data.forEach(price => {
          ManagePricesStateMap(s, { data: price });
        });
      })
      .addCase(thunks.deletePriceFromListThunk.fulfilled, (s, a) => {
        ManagePricesStateMap(s, { removeId: a.payload?.params?._id });
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
      )
      .addMatcher(
        onRemoveDiscountCase,
        (s, a: Action<{ data: { result: boolean; discountId?: string; priceId?: string } }>) => {
          const priceId = a.payload.data?.priceId;
          const discountId = a.payload.data?.discountId;

          if (priceId) {
            const currrent = s.dataMap[priceId];
            if (currrent?.discounts?.length) {
              currrent.discounts = currrent.discounts?.filter(item => item._id !== discountId);
              s.dataMap[priceId] = currrent;
            }
          }
        }
      )
      .addMatcher(onUserLogoutMatch, sliceCleaner(initialState)),
});
function ManagePricesStateMap(
  st: PriceManagementState,
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
        const idsSet = new Set(st.keysMap?.[idKey]);
        if (!idsSet?.has(itemId)) {
          idsSet.add(itemId);
          st.keysMap[idKey] = Array.from(idsSet);
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
