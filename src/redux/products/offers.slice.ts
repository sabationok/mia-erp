import { createSlice } from '@reduxjs/toolkit';
import { StateErrorType } from 'redux/reduxTypes.types';
import { IOfferRelatedDefaultFields, OfferEntity, OfferTypeEnum } from '../../types/offers/offers.types';
import * as thunks from './offers.thunks';
import {
  PropertiesGroupEntity,
  PropertyBaseEntity,
  PropertyLevelTypeEnum,
  PropertySelectableTypeEnum,
} from '../../types/offers/properties.types';
import { createPropertyThunk, getAllPropertiesThunk, updatePropertyThunk } from './properties/properties.thunks';
import { clearCurrentOfferAction, setCurrentProductInventoriesAction, setOfferPricesAction } from './offers.actions';
import { PartialRecord, SKU, UUID } from '../../types/utils.types';
import { VariationEntity } from '../../types/offers/variations.types';
import { onCreatePriceMather, onUpdatePriceMatcher } from '../priceManagement/prices.actions';
import { Action, ActionPayload } from '../store.store';
import { PriceEntity } from '../../types/price-management/price-management.types';

type OfferDefaultsKey = keyof IOfferRelatedDefaultFields;
export interface OffersState {
  list: OfferEntity[];
  currentOffer?: OfferEntity;
  filteredProducts?: OfferEntity[];
  properties: PropertiesGroupEntity[];
  isLoading: boolean;
  error: StateErrorType;

  skuKeysMap: PartialRecord<SKU, UUID>;
  dataMap: PartialRecord<UUID, OfferEntity>;

  variationsKeysMap: PartialRecord<UUID, UUID[]>;
  variationsMap: PartialRecord<UUID, VariationEntity>;

  propertiesKeysMap: PartialRecord<UUID, UUID[]>;
  propertiesDataMap: PartialRecord<UUID, PropertyBaseEntity>;
  propertiesByTypeKeysMap: Record<OfferTypeEnum | PropertySelectableTypeEnum | PropertyLevelTypeEnum, UUID[]>;
}

const initialState: OffersState = {
  isLoading: false,
  error: null,
  list: [],
  currentOffer: undefined,
  filteredProducts: [],
  properties: [],

  dataMap: {},
  skuKeysMap: {},

  variationsKeysMap: {},
  variationsMap: {},

  propertiesKeysMap: {},
  propertiesDataMap: {},
  propertiesByTypeKeysMap: {
    group: [],
    value: [],
    prop: [],
    GOODS: [],
    SERVICE: [],
    SET: [],
    static: [],
    dynamic: [],
  },
};

export const offersSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setOfferDefaultsAction: (
      st,
      { payload: { data, offerId } }: Action<{ offerId: string; data: Partial<Pick<OfferEntity, OfferDefaultsKey>> }>
    ) => {
      ManageOffersStateMap(st, { data: { _id: offerId, ...data } }, {});
    },
  },
  extraReducers: builder =>
    builder
      .addCase(thunks.getAllOffersThunk.fulfilled, (s, a) => {
        const { upend, prepend } = a.payload;

        s.list = prepend ? [...a.payload.data, ...s.list] : upend ? [...s.list, ...a.payload.data] : a.payload.data;

        a.payload.data.forEach(offer => {
          return ManageOffersStateMap(
            s,
            { data: offer },
            { refresh: true, isForList: true, setPrices: false, setVariations: false }
          );
        });
      })
      .addCase(thunks.createOfferThunk.fulfilled, (s, a) => {
        return ManageOffersStateMap(s, a.payload, a.payload);
      })
      .addCase(thunks.updateOfferThunk.fulfilled, (s, a) => {
        return ManageOffersStateMap(s, a.payload, a.payload);
      })
      .addCase(thunks.getOfferFullInfoThunk.fulfilled, (s, a) => {
        return ManageOffersStateMap(s, a.payload, a.payload);
      })
      .addCase(thunks.getOfferThunk.fulfilled, (s, a) => {
        return ManageOffersStateMap(s, a.payload, a.payload);
      })
      .addCase(thunks.updateOfferDefaultsThunk.fulfilled, (s, a) => {
        return ManageOffersStateMap(s, a.payload, a.payload);
      })
      .addCase(clearCurrentOfferAction, s => {
        s.currentOffer = { _id: '' };
      })
      // * ============>>>>>>>>>>> PROPERTIES
      .addCase(getAllPropertiesThunk.fulfilled, (s, a) => {
        if (a.payload.params?.dataView === 'tree') {
          s.properties = a.payload.data;
        }

        UpdatePropertiesMap(s, a.payload);
      })
      .addCase(createPropertyThunk.fulfilled, (s, a) => {
        UpdatePropertiesMap(s, { data: [a.payload.data] });
      })
      .addCase(updatePropertyThunk.fulfilled, (s, a) => {
        UpdatePropertiesMap(s, { data: [a.payload.data] });
      })
      //  * sep ============>>>>>>>>>>> VARIATIONS

      .addCase(thunks.createVariationThunk.fulfilled, (s, a) => {
        ManageVariationsStateMap(s, { data: a.payload.data });
      })

      .addCase(thunks.updateVariationThunk.fulfilled, (s, a) => {
        ManageVariationsStateMap(s, { data: a.payload.data });
      })
      .addCase(thunks.getAllVariationsByOfferIdThunk.fulfilled, (s, a) => {
        const offerId = a.payload?.params?.offerId || a.payload?.data?.[0]?._id;
        if (offerId) {
          a.payload?.data.forEach(vr => {
            ManageVariationsStateMap(s, { data: vr, offerId });
          });

          return ManageOffersStateMap(s, { data: { _id: offerId, variations: a.payload?.data } });
        }
      })
      //  * sep ============>>>>>>>>>>> PRICES
      .addCase(thunks.getAllOfferPricesThunk.fulfilled, (s, a) => {
        if (a.payload.params?.offerId) {
          return ManageOffersStateMap(s, { data: { _id: a.payload.params?.offerId, prices: a.payload.data } });
        }
      })
      .addCase(setOfferPricesAction, (s, a) => {
        s.currentOffer = {
          ...(s.currentOffer as OfferEntity),
          prices: a.payload.refresh
            ? a.payload?.data
            : s.currentOffer?.prices
              ? [...a.payload.data, ...s.currentOffer?.prices]
              : a.payload.data,
        };

        // ManageOffersStateMap(s, { data: { _id: a.payload.params?.offerId, prices: a.payload.data } });
      })
      //  * sep ============>>>>>>>>>>> INVENTORIES
      .addCase(thunks.getAllInventoriesByProductIdThunk.fulfilled, (s, a) => {
        if (a.payload?.refresh) {
          s.currentOffer = { ...(s.currentOffer as OfferEntity), inventories: a.payload.data };
        }
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
      })
      .addMatcher(onCreatePriceMather, (s, a: Action<{ data: PriceEntity }>) => {
        const offerId = a.payload.data.offer?._id;
        if (offerId) {
          const current = s.dataMap?.[offerId];
          if (!current) return;

          if (current?.prices?.length) {
            current?.prices?.unshift(a.payload.data);
          }
          current.prices = [a.payload?.data];

          s.dataMap[offerId] = current;
        }
      })
      .addMatcher(onUpdatePriceMatcher, (s, a: Action<{ data: PriceEntity }>) => {
        const offerId = a.payload?.data?.offer?._id;

        if (offerId) {
          const current = s.dataMap?.[offerId];
          if (!current) return;

          if (current?.prices?.length) {
            current.prices.map(price => {
              return price?._id === a.payload.data._id ? a.payload.data : price;
            });
          }
          current.prices = [a.payload?.data];

          s.dataMap[offerId] = current;
        }
      }),
  // .addMatcher(onGetPricesCase, (s, a: Action<{ data: PriceEntity[] }>) => {
  //   console.log('onGetPricesCase', a);
  // }),
});

export const { setOfferDefaultsAction } = offersSlice.actions;

// function isProductsCase(type: string) {
//   return checks.isStr(type) && type.startsWith('products');
// }

function ManageOffersStateMap(
  st: OffersState,
  input: { data: OfferEntity },
  options?: ActionPayload & {
    refresh?: boolean;
    isForList?: boolean;
    setPrices?: boolean;
    setVariations?: boolean;
  }
) {
  const itemId = input?.data?._id;
  const itemSku = input?.data?.sku;

  console.log('input.data', input.data);
  const offer = input.data;

  if (options?.refresh) {
    st.dataMap[itemId] = offer;
  } else {
    try {
      st.dataMap[itemId] = {
        ...(st.dataMap[itemId] ? JSON.parse(JSON.stringify(st.dataMap[itemId])) : {}),
        ...offer,
      };
    } catch (e) {
      console.error('[ManageOffersStateMap]', e);
    }
  }

  const Offer = st.dataMap[itemId];

  console.log('offer from state', Offer);

  if (itemSku) {
    st.skuKeysMap[itemSku] = itemId;
  }

  if (!options?.isForList && Offer) {
    const listIndex = st.list.findIndex(o => o._id === itemId);
    st.list[listIndex] = Offer;
  }
  return st;
}

// function ManageOfferDefaults(
//   st: OffersState,
//   input: { data?: OfferEntity },
//   options?: { refresh?: boolean; isForList?: boolean }
// ) {
//   if (input.data) {
//     const itemId = input.data?._id;
//     const itemSku = input.data?.sku;
//
//     st.dataMap[itemId] = options?.refresh ? input.data : { ...st.dataMap?.[itemId], ...input.data };
//
//     if (itemSku) {
//       st.skuKeysMap[itemSku] = itemId;
//     }
//   }
// }

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
          st.dataMap[offerId]?.variations?.unshift(input.data);
        }
      }
    }
  }
}

function UpdatePropertiesMap(
  st: OffersState,
  {
    data,
  }: {
    data: PropertyBaseEntity[];
  }
) {
  data.forEach(item => {
    const itemId = item._id;
    const prev = st.propertiesDataMap?.[itemId];
    st.propertiesDataMap[itemId] = {
      ...prev,
      ...item,
      parent: prev?.parent
        ? {
            ...prev?.parent,
            ...item?.parent,
          }
        : item?.parent,
    };
    const parentId = st.propertiesDataMap?.[itemId]?.parent?._id;

    if (!item?.parent) {
      const current = st.propertiesByTypeKeysMap.group ?? [];

      st.propertiesByTypeKeysMap.group = Array.from(new Set([...current, itemId]));

      if (item.type) {
        const current = st.propertiesByTypeKeysMap[item.type] ?? [];
        st.propertiesByTypeKeysMap[item.type] = Array.from(new Set([...current, itemId]));
      }
    }

    if (parentId) {
      const current = st.propertiesKeysMap[parentId] ?? [];
      st.propertiesKeysMap[parentId] = Array.from(new Set([...current, itemId]));
    }

    if (item?.childrenList) {
      UpdatePropertiesMap(st, { data: item?.childrenList });
    }
  });
}

export function DeletePropertyFromMap(st: OffersState, input: { id: string }) {
  const currentId = input.id;
  const current = st.propertiesDataMap?.[currentId];

  function removeCurrentIdFromList(list?: string[]) {
    if (list) {
      list = list.filter(el => el !== currentId);
    } else {
      list = [];
    }
    return list;
  }

  if (current) {
    delete st.propertiesDataMap?.[currentId];
    removeCurrentIdFromList(st.propertiesKeysMap?.[currentId]);

    const childIds = st.propertiesKeysMap?.[currentId];
    if (childIds) {
      for (const childId of childIds) {
        DeletePropertyFromMap(st, { id: childId });
      }
    }
  }
}
