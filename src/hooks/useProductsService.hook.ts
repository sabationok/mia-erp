import { AppDispatch, useAppDispatch } from 'redux/store.store';
import { OfferEntity } from '../types/offers/offers.types';
import {
  _ServiceDispatcherAsync,
  OnlyUUID,
  ServiceApiCaller,
  ServiceDispatcher,
  ServiceDispatcherAsync,
} from 'redux/app-redux.types';
import {
  createOfferThunk,
  getAllInventoriesByProductIdThunk,
  getAllOfferPricesThunk,
  getAllOffersThunk,
  getOfferFullInfoThunk,
  getOfferThunk,
  updateOfferDefaultsThunk,
  updateProductThunk,
} from '../redux/products/products.thunks';
import { useMemo } from 'react';
import { defaultApiCallPayload, defaultThunkPayload } from 'utils/fabrics';
import { apiCall, AppQueryParams, createApiCall, GetOneOfferQuery } from 'api';
import OffersApi from '../api/offers.api';
import PropertiesApi from '../api/properties.api';
import { IPropertyReqData, PropertyEntity } from '../types/offers/properties.types';
import {
  createPropertyThunk,
  getAllPropertiesThunk,
  updatePropertyThunk,
} from '../redux/products/properties/properties.thunks';
import {
  createVariationThunk,
  getAllVariationsByOfferIdThunk,
  updateVariationThunk,
} from '../redux/products/variations/variations.thunks';
import { IVariationReqData, VariationEntity } from '../types/offers/variations.types';
import { clearCurrentProductAction } from '../redux/products/products.actions';
import { PriceEntity } from '../types/price-management/price-management.types';
import { WarehouseItemEntity } from '../types/warehousing/warehouses.types';
import { GetAllPricesQuery } from '../api';

// type Test=_ServiceDispatcherAsync<typeof createOfferThunk>

export interface OffersService {
  create: _ServiceDispatcherAsync<typeof createOfferThunk>;
  deleteById: ServiceApiCaller<string, OfferEntity>; // !!!!! ===>>> ServiceDispatcher
  updateById: _ServiceDispatcherAsync<typeof updateProductThunk>; // !!!!! ===>>> ServiceDispatcher
  getById: ServiceApiCaller<string, OfferEntity>;
  getOne: ServiceDispatcherAsync<{ params?: GetOneOfferQuery }, { data: OfferEntity }>;
  getAll: _ServiceDispatcherAsync<typeof getAllOffersThunk>;
  getProductFullInfo: _ServiceDispatcherAsync<typeof getOfferFullInfoThunk>;
  clearCurrent: ServiceDispatcher<undefined>;
  setDefaults: _ServiceDispatcherAsync<typeof updateOfferDefaultsThunk>;

  // * PROPERTIES
  getAllProperties: ServiceDispatcherAsync<IPropertyReqData, PropertyEntity[]>;
  createProperty: ServiceDispatcherAsync<IPropertyReqData, PropertyEntity>;
  updatePropertyById: ServiceDispatcherAsync<IPropertyReqData, PropertyEntity>;
  deletePropertyById: ServiceApiCaller<IPropertyReqData, PropertyEntity>;

  getPropertyById: ServiceApiCaller<IPropertyReqData, PropertyEntity>;
  changeDisabledStatus: ServiceApiCaller<
    OnlyUUID & { data?: { isSelectable?: boolean }; params?: AppQueryParams },
    PropertyEntity
  >;

  // * VARIATIONS
  createVariation: ServiceDispatcherAsync<IVariationReqData, VariationEntity>;
  updateVariationById: ServiceDispatcherAsync<IVariationReqData, VariationEntity>;
  getAllVariationsByProductId: ServiceDispatcherAsync<
    { offerId: string; params?: AppQueryParams; refreshCurrent?: boolean; updateCurrent?: boolean },
    VariationEntity[]
  >;

  // * PRICES
  getAllPrices: ServiceDispatcherAsync<
    {
      refreshCurrent?: boolean;
      updateCurrent?: boolean;
      params: GetAllPricesQuery;
    },
    PriceEntity[]
  >;
  // * INVENTORIES
  getAllInventories: ServiceDispatcherAsync<
    {
      refreshCurrent?: boolean;
      updateCurrent?: boolean;
      params: AppQueryParams;
    },
    WarehouseItemEntity[]
  >;
}

const useOffersService = (): OffersService => {
  const dispatch: AppDispatch = useAppDispatch();

  return useMemo((): OffersService => {
    return {
      create: args => dispatch(createOfferThunk(defaultThunkPayload(args))),
      updateById: args => dispatch(updateProductThunk(defaultThunkPayload(args))),
      deleteById: args => createApiCall(defaultApiCallPayload(args), OffersApi.deleteById),
      getById: args => createApiCall(defaultApiCallPayload(args), OffersApi.getById),
      getOne: args => dispatch(getOfferThunk(defaultThunkPayload(args))),
      getAll: args => dispatch(getAllOffersThunk(defaultThunkPayload(args))),
      getProductFullInfo: args => dispatch(getOfferFullInfoThunk(defaultThunkPayload(args))),
      clearCurrent: () => dispatch(clearCurrentProductAction()),
      setDefaults: args => dispatch(updateOfferDefaultsThunk(defaultThunkPayload(args))),

      // * PROPERTIES
      createProperty: args => dispatch(createPropertyThunk(defaultThunkPayload(args))),
      getAllProperties: args => dispatch(getAllPropertiesThunk(defaultThunkPayload(args))),
      deletePropertyById: args => apiCall(PropertiesApi.deleteById, defaultApiCallPayload(args)),
      updatePropertyById: args => dispatch(updatePropertyThunk(defaultApiCallPayload(args))),
      getPropertyById: args => apiCall(PropertiesApi.getById, defaultApiCallPayload(args)),
      changeDisabledStatus: args => apiCall(PropertiesApi.updateById, defaultApiCallPayload(args)),

      // * VARIATIONS
      createVariation: args => dispatch(createVariationThunk(defaultThunkPayload(args))),
      updateVariationById: args => dispatch(updateVariationThunk(defaultThunkPayload(args))),
      getAllVariationsByProductId: args => dispatch(getAllVariationsByOfferIdThunk(defaultThunkPayload(args))),

      // * PRICES
      getAllPrices: args => dispatch(getAllOfferPricesThunk(defaultThunkPayload(args))),

      // * WAREHOUSING
      getAllInventories: args => dispatch(getAllInventoriesByProductIdThunk(defaultThunkPayload(args))),
    };
  }, [dispatch]);
};

export default useOffersService;
