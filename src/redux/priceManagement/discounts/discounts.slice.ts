import { createSlice } from '@reduxjs/toolkit';
import * as thunks from './discounts.thunks';
import { PriceDiscountEntity } from '../../../types/price-management/discounts';
import { PartialRecord, UUID } from '../../../types/utils.types';
import { idsFromRefs, sliceCleaner } from '../../../utils';
import { onUserLogout } from '../../auth/auth.actions';

export type DiscountsState = {
  list: PriceDiscountEntity[];
  dataMap: PartialRecord<UUID, PriceDiscountEntity>;
  keysMap: PartialRecord<UUID, UUID[]>;
};
const initState: DiscountsState = {
  list: [],
  keysMap: {},
  dataMap: {},
};

export const discountsSlice = createSlice({
  name: 'discounts',
  reducers: {},
  initialState: initState,
  extraReducers: builder =>
    builder
      .addCase(thunks.getAllDiscountsThunk.fulfilled, (s, a) => {
        a.payload.data.forEach(ds => {
          s.list = a?.payload.update ? [...a.payload.data, ...s.list] : a.payload.data;

          ManageDiscountsStateMap(s, { data: ds }, { isForList: true, refresh: false });
        });
      })
      .addCase(thunks.createDiscountThunk.fulfilled, (s, a) => {
        ManageDiscountsStateMap(s, { data: a.payload.data }, { refresh: true });
      })
      .addCase(thunks.getDiscountThunk.fulfilled, (s, a) => {
        ManageDiscountsStateMap(s, { data: a.payload.data }, { refresh: true });
      })
      .addCase(thunks.updateDiscountThunk.fulfilled, (s, a) => {
        ManageDiscountsStateMap(s, { data: a.payload.data }, { refresh: false });
      })
      .addCase(thunks.removeDiscountThunk.fulfilled, (s, a) => {
        ManageDiscountsStateMap(s, { removeId: a.payload.data?.discountId });
      })
      .addMatcher(onUserLogout, sliceCleaner(initState)),
});

function ManageDiscountsStateMap(
  st: DiscountsState,
  input: { data?: PriceDiscountEntity; removeId?: string },
  options?: { refresh?: boolean; isForList?: boolean }
) {
  if (input.removeId) {
    const current = st.dataMap[input.removeId];
    const IdKeys = idsFromRefs([...(current?.prices ?? []), ...(current?.offers ?? [])]);

    for (const priceId of IdKeys) {
      const idsSet = new Set(st.keysMap?.[priceId]);
      if (!idsSet?.has(input.removeId)) {
        idsSet.delete(input.removeId);
        st.keysMap[priceId] = Array.from(idsSet);
      }
    }

    delete st.dataMap[input.removeId];
  } else if (input.data) {
    const itemId = input.data?._id;

    st.dataMap[itemId] = options?.refresh ? input.data : { ...st.dataMap?.[itemId], ...input.data };

    const IdKeys = idsFromRefs([...(input?.data?.prices ?? []), ...(input?.data?.offers ?? [])]);

    for (const priceId of IdKeys) {
      const idsSet = new Set(st.keysMap?.[priceId]);
      if (!idsSet?.has(itemId)) {
        idsSet.add(itemId);
        st.keysMap[priceId] = Array.from(idsSet);
      }
    }
  }
}
