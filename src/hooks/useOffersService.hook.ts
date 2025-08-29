import { AppDispatch, useAppDispatch } from 'redux/store.store';
import { OfferEntity } from '../types/offers';
import { __ServiceDispatcherAsync, ServiceApiCaller } from 'redux/app-redux.types';
import {
  createOfferThunk,
  createVariationThunk,
  getAllOffersThunk,
  getAllVariationsThunk,
  getOfferFullInfoThunk,
  getOfferThunk,
  updateOfferThunk,
  updateVariationThunk,
} from '../redux/products/offers.thunks';
import { useMemo } from 'react';
import { defaultApiCallPayload } from 'utils/fabrics';
import { createApiCall } from 'api';
import OffersApi from '../api/offers/offers.api';
import {
  createPropertyThunk,
  deletePropertyThunk,
  getAllPropertiesThunk,
  getOnePropertyThunk,
  updatePropertyThunk,
} from '../redux/products/properties/properties.thunks';

export interface OffersService {
  create: __ServiceDispatcherAsync<typeof createOfferThunk>;
  getOne: __ServiceDispatcherAsync<typeof getOfferThunk>;
  getAll: __ServiceDispatcherAsync<typeof getAllOffersThunk>;
  updateById: __ServiceDispatcherAsync<typeof updateOfferThunk>; // !!!!! ===>>> ServiceDispatcher
  deleteById: ServiceApiCaller<string, OfferEntity>; // !!!!! ===>>> ServiceDispatcher
  getFullInfo: __ServiceDispatcherAsync<typeof getOfferFullInfoThunk>;

  properties: {
    getAll: __ServiceDispatcherAsync<typeof getAllPropertiesThunk>;
    create: __ServiceDispatcherAsync<typeof createPropertyThunk>;
    update: __ServiceDispatcherAsync<typeof updatePropertyThunk>;
    getOne: __ServiceDispatcherAsync<typeof getOnePropertyThunk>;
    delete: __ServiceDispatcherAsync<typeof deletePropertyThunk>;
  };
  variations: {
    create: __ServiceDispatcherAsync<typeof createVariationThunk>;
    update: __ServiceDispatcherAsync<typeof updateVariationThunk>;
    getAll: __ServiceDispatcherAsync<typeof getAllVariationsThunk>;
    // delete: __ServiceDispatcherAsync<typeof deleteOfferThunk>;
  };
}

const useOffersService = (): OffersService => {
  const dispatch: AppDispatch = useAppDispatch();

  return useMemo((): OffersService => {
    return {
      deleteById: args => createApiCall(defaultApiCallPayload(args), OffersApi.deleteById),
      create: args => dispatch(createOfferThunk(args)),
      updateById: args => dispatch(updateOfferThunk(args)),
      getOne: args => dispatch(getOfferThunk(args)),
      getAll: args => dispatch(getAllOffersThunk(args)),
      getFullInfo: args => dispatch(getOfferFullInfoThunk(args)),

      properties: {
        // * PROPERTIES
        create: args => dispatch(createPropertyThunk(args)),
        getAll: args => dispatch(getAllPropertiesThunk(args)),
        update: args => dispatch(updatePropertyThunk(args)),
        delete: args => dispatch(deletePropertyThunk(args)),
        getOne: args => dispatch(getOnePropertyThunk(args)),
        // changeDisabledStatus: args => apiCall(PropertiesApi.updateById, defaultApiCallPayload(args)),
      },

      variations: {
        create: args => dispatch(createVariationThunk(args)),
        update: args => dispatch(updateVariationThunk(args)),
        getAll: args => dispatch(getAllVariationsThunk(args)),
      },
    };
  }, [dispatch]);
};

export default useOffersService;
