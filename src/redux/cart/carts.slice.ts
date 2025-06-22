import { Cart, CartId, OfferId, OrderId } from '../../types/cart/cart.types';
import { addSlot, getInitialCart, removeSlot, updateSlot } from './carts.thunks';
import { AppModuleName, SliceMap } from '../reduxTypes.types';
import { createSlice } from '@reduxjs/toolkit';
import { Action } from '../store.store';
import { onUserLogoutMatch } from '../auth/auth.actions';
import { sliceCleaner } from '../../utils';
import type { HasImgPreview, HasLabel, HasSku } from '../../types/utils.types';
import type { HasBaseCmsConfigs } from '../../types/cms.types';

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
export interface CartsState extends SliceMap<CartId, OrderId, Cart> {
  recommends: Record<OfferId, SetRecommendationPayload & { timestamp?: number }>;
}

const initialState: CartsState = {
  dataMap: {},
  ids: [],
  keysMap: {},
  recommends: {},
};

export const cartsSlice = createSlice({
  name: AppModuleName.carts,
  initialState: initialState,
  reducers: {
    removeCart: (st, { payload: { cartId } }: Action<{ cartId: string }>) => {
      delete st.dataMap[cartId];
      return st;
    },
    addCart: (st, { payload: { customerId } }: Action<{ customerId: string }>) => {
      st.dataMap[customerId] = getInitialCart(customerId);
      return st;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(addSlot.fulfilled, (state, action) => {
        const { cartId, cart } = action.payload;
        state.dataMap[cartId] = cart;
      })
      .addCase(updateSlot.fulfilled, (state, action) => {
        const { cartId, cart } = action.payload;
        state.dataMap[cartId] = cart;
      })
      .addCase(removeSlot.fulfilled, (state, action) => {
        const { cartId, cart } = action.payload;
        state.dataMap[cartId] = cart;
      })
      .addMatcher(onUserLogoutMatch, sliceCleaner(initialState, { name: AppModuleName.carts }));
  },
});

export const { removeCart } = cartsSlice.actions;
