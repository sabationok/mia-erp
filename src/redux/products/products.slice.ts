import { AnyAction, createSlice } from '@reduxjs/toolkit';
import { StateErrorType } from 'redux/reduxTypes.types';
import { OfferEntity } from '../../types/offers/offers.types';
import {
  createProductThunk,
  getAllInventoriesByProductIdThunk,
  getAllPricesByProductIdThunk,
  getAllProductsThunk,
  getProductFullInfoThunk,
  updateProductDefaultsThunk,
  updateProductThunk,
} from './products.thunks';
import {
  createVariationThunk,
  getAllVariationsByProductIdThunk,
  updateVariationThunk,
} from './variations/variations.thunks';
import { IVariationTemplate } from '../../types/offers/properties.types';
import { createPropertyThunk, getAllPropertiesThunk } from './properties/properties.thunks';
import {
  clearCurrentProductAction,
  setCurrentProductInventoriesAction,
  setCurrentProductPricesAction,
  setCurrentProductVariationsAction,
} from './products.actions';
import { checks } from '../../utils';
import { PartialRecord } from '../../types/utils.types';
import { VariationEntity } from '../../types/offers/variations.types';

type SKU = string;
type UUID = string;

export interface OffersState {
  products: OfferEntity[];
  currentOffer?: OfferEntity;
  filteredProducts?: OfferEntity[];
  properties: IVariationTemplate[];
  isLoading: boolean;
  error: StateErrorType;

  skuKeysMap: PartialRecord<SKU, UUID>;
  dataMap: PartialRecord<UUID, OfferEntity>;

  variationsKeysMap: PartialRecord<UUID, UUID[]>;
  variationsMap: PartialRecord<UUID, VariationEntity>;
}

const initialState: OffersState = {
  isLoading: false,
  error: null,
  products: [],
  currentOffer: undefined,
  filteredProducts: [],
  properties: [],

  dataMap: {},
  skuKeysMap: {},
  variationsKeysMap: {},
  variationsMap: {},
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: builder =>
    builder
      .addCase(getAllProductsThunk.fulfilled, (s, a) => {
        if (Array.isArray(a.payload.data)) {
          if (a.payload.refresh) {
            s.products = a.payload.data;
            return;
          } else {
            s.products = [...a.payload.data, ...s.products];
          }

          a.payload.data.forEach(offer => {
            ManageOffersStateMap(s, { data: offer });
          });
        }
      })
      .addCase(createProductThunk.fulfilled, (s, a) => {
        if (a.payload?.data) {
          s.products = [a.payload.data, ...s.products];
          ManageOffersStateMap(s, a.payload);
        }
      })
      .addCase(updateProductThunk.fulfilled, (s, a) => {
        if (a.payload?.refreshCurrent) {
          s.currentOffer = { ...(s.currentOffer as OfferEntity), ...a.payload.data };
        }
        if (a.payload) {
          ManageOffersStateMap(s, a.payload);
        }
      })
      .addCase(getProductFullInfoThunk.fulfilled, (s, a) => {
        if (a.payload.refreshCurrent) {
          s.currentOffer = a.payload?.data;
        } else {
          s.currentOffer = { ...(s.currentOffer as OfferEntity), ...a.payload?.data };
        }
        ManageOffersStateMap(s, a.payload, { refresh: a.payload.refreshCurrent });
      })
      .addCase(getAllPropertiesThunk.fulfilled, (s, a) => {
        if (a.payload) {
          s.properties = a.payload;
        }
      })
      .addCase(createPropertyThunk.fulfilled, (s, a) => {
        if (a.payload) {
          s.properties = a.payload;
        }
      })
      .addCase(createVariationThunk.fulfilled, (s, a) => {
        if (!a.payload) {
          return;
        } else {
          s?.currentOffer?.variations?.unshift(a.payload);
          ManageVariationsStateMap(s, { data: a.payload });
        }
      })
      .addCase(updateProductDefaultsThunk.fulfilled, (s, a) => {
        if (a.payload?.updateCurrent && s.currentOffer) {
          s.currentOffer.defaults = a.payload.data?.defaults;
        } else if (a.payload?.refreshCurrent && s.currentOffer) {
          s.currentOffer = { ...s.currentOffer, ...a.payload?.data };
        }
      })
      .addCase(updateVariationThunk.fulfilled, (s, a) => {
        if (!a.payload) {
          return;
        } else if (s.currentOffer) {
          s.currentOffer.variations = s?.currentOffer?.variations?.map(vrn =>
            vrn._id === a.payload?._id ? a.payload : vrn
          );
          ManageVariationsStateMap(s, { data: a.payload });
        }
      })
      .addCase(getAllVariationsByProductIdThunk.fulfilled, (s, a) => {
        if (a.payload?.refreshCurrent) {
          s.currentOffer = { ...(s.currentOffer as OfferEntity), variations: a.payload.data };
        }
        a.payload?.data.forEach(vr => {
          ManageVariationsStateMap(s, { data: vr });
        });
      })
      .addCase(getAllPricesByProductIdThunk.fulfilled, (s, a) => {
        if (a.payload?.refreshCurrent) {
          s.currentOffer = { ...(s.currentOffer as OfferEntity), prices: a.payload.data };
        }
      })
      .addCase(getAllInventoriesByProductIdThunk.fulfilled, (s, a) => {
        if (a.payload?.refreshCurrent) {
          s.currentOffer = { ...(s.currentOffer as OfferEntity), inventories: a.payload.data };
        }
      })
      .addCase(clearCurrentProductAction, s => {
        s.currentOffer = { _id: '' };
      })
      .addCase(setCurrentProductPricesAction, (s, a) => {
        s.currentOffer = {
          ...(s.currentOffer as OfferEntity),
          prices: a.payload.refresh
            ? a.payload?.data
            : s.currentOffer?.prices
            ? [...a.payload.data, ...s.currentOffer?.prices]
            : a.payload.data,
        };
      })
      .addCase(setCurrentProductVariationsAction, (s, a) => {
        s.currentOffer = {
          ...(s.currentOffer as OfferEntity),
          variations: a.payload.refresh
            ? a.payload?.data
            : s.currentOffer?.variations
            ? [...a.payload.data, ...s.currentOffer?.variations]
            : a.payload.data,
        };
        a.payload?.data.forEach(vr => {
          ManageVariationsStateMap(s, { data: vr });
        });
      })
      .addCase(setCurrentProductInventoriesAction, (s, a) => {
        s.currentOffer = {
          ...(s.currentOffer as OfferEntity),
          inventories: a.payload.refresh
            ? a.payload?.data
            : s.currentOffer?.inventories
            ? [...a.payload.data, ...s.currentOffer?.inventories]
            : a.payload.data,
        };
      }),
});

function isProductsCase(type: string) {
  return checks.isStr(type) && type.startsWith('products');
}
function inPending(a: AnyAction) {
  return isProductsCase(a.type) && a.type.endsWith('pending');
}
function inFulfilled(a: AnyAction) {
  return isProductsCase(a.type) && a.type.endsWith('fulfilled');
}
function inError(a: AnyAction) {
  return isProductsCase(a.type) && a.type.endsWith('rejected');
}

function ManageOffersStateMap(
  st: OffersState,
  input: { data?: OfferEntity },
  options?: { refresh?: boolean; isForList?: boolean }
) {
  if (input.data) {
    const itemId = input.data?._id;
    const itemSku = input.data?.sku;

    st.dataMap[itemId] = options?.refresh ? input.data : { ...st.dataMap?.[itemId], ...input.data };

    if (itemSku) {
      st.skuKeysMap[itemSku] = itemId;
    }
  }
}

function ManageVariationsStateMap(
  st: OffersState,
  input: { data?: VariationEntity; offerId?: string },
  options?: { refresh?: boolean; isForList?: boolean }
) {
  if (input.data) {
    const itemId = input.data?._id;
    const offerId = input.data?.offer?._id || input?.offerId;
    const itemSku = input.data?.sku;

    st.variationsMap[itemId] = options?.refresh ? input.data : { ...st.dataMap?.[itemId], ...input.data };

    if (itemSku) {
      st.skuKeysMap[itemSku] = itemId;
    }

    if (offerId) {
      st.variationsKeysMap[itemId] = Array.from(new Set<string>(st.variationsKeysMap?.[itemId] ?? []).add(offerId));

      if (st.dataMap[offerId]) {
        if (!st.dataMap[offerId]?.variations) {
          st.dataMap[offerId] = {
            ...(st.dataMap[offerId] as OfferEntity),
            variations: [input.data],
          };
        } else {
          st.dataMap[offerId]?.variations?.push(input.data);
        }
      }
    }
  }
}
