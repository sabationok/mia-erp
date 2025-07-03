import { createSlice } from '@reduxjs/toolkit';
import { AppModuleName, StateErrorType } from 'redux/reduxTypes.types';
import { IOfferRelatedDefaultFields, OfferEntity, OfferTypeEnum } from '../../types/offers/offers.types';
import * as thunks from './offers.thunks';
import {
  PropertyBaseEntity,
  PropertyLevelTypeEnum,
  PropertySelectableTypeEnum,
  VariationEntity,
} from '../../types/offers';
import { createPropertyThunk, getAllPropertiesThunk, updatePropertyThunk } from './properties/properties.thunks';
import { PartialRecord, SKU, UUID } from '../../types/utils.types';
import { onCreatePriceMather, onGetPricesCase, onUpdatePriceMatcher } from '../priceManagement/prices.actions';
import { Action, ActionPayload } from '../store.store';
import { onUserLogoutMatch } from '../auth/auth.actions';
import { sliceCleaner } from '../../utils';

const ROOT_KEY = 'root';

type OfferDefaultsKey = keyof IOfferRelatedDefaultFields;
export interface OffersState {
  list: OfferEntity[];
  filteredProducts?: OfferEntity[];
  properties: PropertyBaseEntity[];
  isLoading: boolean;
  error: StateErrorType;

  skuKeysMap: PartialRecord<SKU, UUID>;
  dataMap: PartialRecord<UUID, OfferEntity>;

  variationsKeysMap: PartialRecord<UUID, UUID[]>;
  variationsMap: PartialRecord<UUID, VariationEntity>;

  propertiesKeysMap: Record<
    OfferTypeEnum | PropertySelectableTypeEnum | PropertyLevelTypeEnum | typeof ROOT_KEY | UUID,
    UUID[]
  >;
  propertiesDataMap: PartialRecord<UUID, PropertyBaseEntity>;
}

const initialState: OffersState = {
  isLoading: false,
  error: null,
  list: [],
  filteredProducts: [],
  properties: [],

  dataMap: {},
  skuKeysMap: {},

  variationsKeysMap: {},
  variationsMap: {},

  propertiesKeysMap: {
    group: [],
    value: [],
    prop: [],
    GOODS: [],
    SERVICE: [],
    SET: [],
    static: [],
    dynamic: [],
    row: [],
    col: [],
    cell: [],
  },
  propertiesDataMap: {},
};

export const offersSlice = createSlice({
  name: AppModuleName.offers,
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
      .addCase(thunks.getAllVariationsThunk.fulfilled, (s, a) => {
        const offerId = a.payload?.params?.offerId || a.payload?.data?.[0]?._id;

        if (offerId) {
          a.payload?.data.forEach(vr => {
            ManageVariationsStateMap(s, { data: vr, offerId });
          });

          return ManageOffersStateMap(s, { data: { _id: offerId, variations: a.payload?.data } });
        }
      })
      //  * sep ============>>>>>>>>>>> PRICES
      // .addCase(thunks.getAllOfferPricesThunk.fulfilled, (s, a) => {
      //   if (a.payload.params?.offerId) {
      //     return ManageOffersStateMap(s, { data: { _id: a.payload.params?.offerId, prices: a.payload.data } });
      //   }
      // })
      .addMatcher(onGetPricesCase, (s, a) => {
        const { params: { offerId } = {}, data, refresh } = a.payload;

        if (!offerId) return s;

        s.dataMap[offerId] = {
          ...(s.dataMap[offerId] as OfferEntity),
          prices: refresh ? data : s.dataMap[offerId]?.prices ? [...data, ...(s.dataMap[offerId]?.prices ?? [])] : data,
        };

        // ManageOffersStateMap(s, { data: { _id: a.payload.params?.offerId, prices: a.payload.data } });
      })
      .addMatcher(onCreatePriceMather, (s, a) => {
        const { data } = a.payload;
        if (!data) return;
        const offerId = data?.offer?._id;
        if (offerId) {
          const current = s.dataMap?.[offerId];
          if (!current) return s;

          if (current?.prices?.length) {
            current?.prices?.unshift(data);
          }
          current.prices = [data];

          s.dataMap[offerId] = current;
        }
      })
      .addMatcher(onUpdatePriceMatcher, (s, a) => {
        const { data } = a.payload;
        if (!data) return;

        const offerId = data?.offer?._id;

        if (offerId) {
          const current = s.dataMap?.[offerId];
          if (!current) return;

          if (current?.prices?.length) {
            current.prices.map(price => {
              return price?._id === data._id ? data : price;
            });
          }
          current.prices = [data];

          s.dataMap[offerId] = current;
        }
      })
      .addMatcher(onUserLogoutMatch, sliceCleaner(initialState)),
});

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

  // console.log('input.data', input.data);
  const offer = input.data;

  if (options?.refresh) {
    st.dataMap[itemId] = offer;
  } else {
    try {
      st.dataMap[itemId] = {
        // ...(st.dataMap[itemId] ? JSON.parse(JSON.stringify(st.dataMap[itemId])) : {}),
        ...st.dataMap[itemId],
        ...offer,
      };
    } catch (e) {
      console.error('[ManageOffersStateMap]', e);
    }
  }

  const Offer = st.dataMap[itemId];

  // console.log('offer from state', Offer);

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
    const parentId = item?.parent?._id || st.propertiesDataMap?.[itemId]?.parent?._id;

    for (const getDataKey of [
      () => item.levelType,
      () => item.type,
      () => parentId,
      () => (!item.parent ? ROOT_KEY : undefined),
    ]) {
      const dataKey = getDataKey();

      if (dataKey) {
        const current = new Set(st.propertiesKeysMap[dataKey]);
        if (!current.has(itemId)) {
          current.add(itemId);

          st.propertiesKeysMap[dataKey] = Array.from(current);
        }
      }
    }

    // if (item?.childrenList) {
    //   UpdatePropertiesMap(st, { data: item?.childrenList });
    // }
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
