import { AppDispatch, useAppDispatch } from 'redux/store.store';
import { OfferEntity } from '../types/offers/offers.types';
import { __ServiceDispatcherAsync, OnlyUUID, ServiceApiCaller, ServiceDispatcher } from 'redux/app-redux.types';
import {
  createOfferThunk,
  createVariationThunk,
  getAllInventoriesByProductIdThunk,
  getAllOfferPricesThunk,
  getAllOffersThunk,
  getAllVariationsByOfferIdThunk,
  getAllVariationsThunk,
  getOfferFullInfoThunk,
  getOfferThunk,
  updateOfferThunk,
  updateVariationThunk,
} from '../redux/products/offers.thunks';
import { useMemo } from 'react';
import { defaultApiCallPayload } from 'utils/fabrics';
import { apiCall, AppQueryParams, createApiCall } from 'api';
import OffersApi from '../api/offers.api';
import PropertiesApi from '../api/properties.api';
import { IPropertyReqData, PropertyEntity } from '../types/offers/properties.types';
import {
  createPropertyThunk,
  getAllPropertiesThunk,
  updatePropertyThunk,
} from '../redux/products/properties/properties.thunks';
import { clearCurrentOfferAction } from '../redux/products/offers.actions';

// type Test=_ServiceDispatcherAsync<typeof createOfferThunk>

export interface OffersService {
  create: __ServiceDispatcherAsync<typeof createOfferThunk>;
  deleteById: ServiceApiCaller<string, OfferEntity>; // !!!!! ===>>> ServiceDispatcher
  updateById: __ServiceDispatcherAsync<typeof updateOfferThunk>; // !!!!! ===>>> ServiceDispatcher
  getById: ServiceApiCaller<string, OfferEntity>;
  getOne: __ServiceDispatcherAsync<typeof getOfferThunk>;
  getAll: __ServiceDispatcherAsync<typeof getAllOffersThunk>;
  getProductFullInfo: __ServiceDispatcherAsync<typeof getOfferFullInfoThunk>;
  clearCurrent: ServiceDispatcher<undefined>;

  // * PROPERTIES
  getAllProperties: __ServiceDispatcherAsync<typeof getAllPropertiesThunk>;
  createProperty: __ServiceDispatcherAsync<typeof createPropertyThunk>;
  updatePropertyById: __ServiceDispatcherAsync<typeof updatePropertyThunk>;
  deletePropertyById: ServiceApiCaller<IPropertyReqData, PropertyEntity>;

  getPropertyById: ServiceApiCaller<IPropertyReqData, PropertyEntity>;
  changeDisabledStatus: ServiceApiCaller<
    OnlyUUID & { data?: { isSelectable?: boolean }; params?: AppQueryParams },
    PropertyEntity
  >;

  // * VARIATIONS
  createVariation: __ServiceDispatcherAsync<typeof createVariationThunk>;
  updateVariationById: __ServiceDispatcherAsync<typeof updateVariationThunk>;

  getAllVariations: __ServiceDispatcherAsync<typeof getAllVariationsThunk>;

  getAllVariationsByProductId: __ServiceDispatcherAsync<typeof getAllVariationsByOfferIdThunk>;

  variations: {
    create: __ServiceDispatcherAsync<typeof createVariationThunk>;
    update: __ServiceDispatcherAsync<typeof updateVariationThunk>;
    getAll: __ServiceDispatcherAsync<typeof getAllVariationsThunk>;
  };

  // * PRICES
  getAllPrices: __ServiceDispatcherAsync<typeof getAllOfferPricesThunk>;
  // * INVENTORIES
  getAllInventories: __ServiceDispatcherAsync<typeof getAllInventoriesByProductIdThunk>;
}

const useOffersService = (): OffersService => {
  const dispatch: AppDispatch = useAppDispatch();

  return useMemo((): OffersService => {
    return {
      deleteById: args => createApiCall(defaultApiCallPayload(args), OffersApi.deleteById),
      getById: args => createApiCall(defaultApiCallPayload(args), OffersApi.getById),

      create: args => dispatch(createOfferThunk(args)),
      updateById: args => dispatch(updateOfferThunk(args)),
      getOne: args => dispatch(getOfferThunk(args)),
      getAll: args => dispatch(getAllOffersThunk(args)),

      getProductFullInfo: args => dispatch(getOfferFullInfoThunk(args)),
      clearCurrent: () => dispatch(clearCurrentOfferAction()),

      // * PROPERTIES
      createProperty: args => dispatch(createPropertyThunk(args)),
      getAllProperties: args => dispatch(getAllPropertiesThunk(args)),
      updatePropertyById: args => dispatch(updatePropertyThunk(args)),
      deletePropertyById: args => apiCall(PropertiesApi.deleteById, defaultApiCallPayload(args)),
      getPropertyById: args => apiCall(PropertiesApi.getById, defaultApiCallPayload(args)),
      changeDisabledStatus: args => apiCall(PropertiesApi.updateById, defaultApiCallPayload(args)),

      // * VARIATIONS
      createVariation: args => dispatch(createVariationThunk(args)),
      updateVariationById: args => dispatch(updateVariationThunk(args)),
      getAllVariations: args => dispatch(getAllVariationsThunk(args)),

      variations: {
        create: args => dispatch(createVariationThunk(args)),
        update: args => dispatch(updateVariationThunk(args)),
        getAll: args => dispatch(getAllVariationsThunk(args)),
      },

      getAllVariationsByProductId: args => dispatch(getAllVariationsByOfferIdThunk(args)),
      // * PRICES
      getAllPrices: args => dispatch(getAllOfferPricesThunk(args)),

      // * WAREHOUSING
      getAllInventories: args => dispatch(getAllInventoriesByProductIdThunk(args)),
    };
  }, [dispatch]);
};

export default useOffersService;
