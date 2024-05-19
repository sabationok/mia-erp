import { AnyAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StateErrorType } from 'redux/reduxTypes.types';
import { IPriceList, OfferPriceEntity } from '../../types/price-management/priceManagement.types';
import * as thunks from './priceManagement.thunks';
import { checks } from '../../utils';
import { PartialRecord, UUID } from '../../types/utils.types';
import { omit } from 'lodash';

export interface PricesState {
  lists: IPriceList[];
  filteredLists?: IPriceList[];
  current?: IPriceList | null;
  isLoading: boolean;
  error: StateErrorType;
  dataMap: PartialRecord<UUID, OfferPriceEntity>;
  keysMap: PartialRecord<UUID, UUID[]>;
}

const initialState: PricesState = {
  isLoading: false,
  error: null,
  lists: [],
  current: null,
  filteredLists: [],
  dataMap: {},
  keysMap: {},
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
      .addCase(thunks.addPriceToListThunk.fulfilled, (s, a) => {
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
          s.current = { ...(s.current as IPriceList), prices: a.payload?.data };
        }

        a.payload?.data.forEach(price => {
          ManagePricesStateMap(s, { data: price });
        });
      })
      .addCase(thunks.deletePriceFromListThunk.fulfilled, (s, a) => {
        ManagePricesStateMap(s, { removeId: a.payload?.data?.priceId });
      })
      .addCase(thunks.updatePriceInListThunk.fulfilled, (s, a) => {
        ManagePricesStateMap(s, { data: a.payload.data });
      })

      .addMatcher(inPending, s => {
        s.isLoading = true;
        s.error = null;
      })
      .addMatcher(inFulfilled, s => {
        s.isLoading = false;
        s.error = null;
      })
      .addMatcher(inError, (s, a: PayloadAction<StateErrorType>) => {
        s.isLoading = false;
        s.error = a.payload;
      }),
});

export function isPriceManagementCase(type: string) {
  return checks.isStr(type) && type.startsWith('users');
}
function inPending(a: AnyAction) {
  return isPriceManagementCase(a.type) && a.type.endsWith('pending');
}
function inFulfilled(a: AnyAction) {
  return isPriceManagementCase(a.type) && a.type.endsWith('fulfilled');
}
function inError(a: AnyAction) {
  return isPriceManagementCase(a.type) && a.type.endsWith('rejected');
}

function ManagePricesStateMap(
  st: PricesState,
  input: { data?: OfferPriceEntity; removeId?: string },
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

// s.current = a.payload;
// const idx = s.lists.findIndex(l => l._id === 'p?._id');
// if (idx >= 0 && a.payload) {
//   s.lists.splice(idx, 1, a.payload);
//   console.log('updateList action', `idx-${idx}`, s.lists);
// }
