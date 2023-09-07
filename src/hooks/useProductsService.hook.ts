import { AppDispatch, useAppDispatch } from 'redux/store.store';
import {
  IProduct,
  IProductReqData,
  IProperty,
  IPropertyReqData,
  IVariation,
  IVariationReqData,
} from '../redux/products/products.types';
import { OnlyUUID, ServiceApiCaller, ServiceDispatcherAsync } from 'redux/global.types';
import {
  createProductThunk,
  createPropertyThunk,
  getAllProductsThunk,
  getAllPropertiesThunk,
  getProductFullInfoThunk,
} from '../redux/products/products.thunks';
import { useMemo } from 'react';
import { defaultApiCallPayload, defaultThunkPayload } from 'utils/fabrics';
import { AppQueryParams, createApiCall } from 'api';
import ProductsApi from '../api/products.api';
import PropertiesApi from '../api/properties.api';
import VariationsApi from '../api/variations.api';

export interface ProductsService {
  create: ServiceDispatcherAsync<IProductReqData, IProduct>;
  deleteById: ServiceApiCaller<string, IProduct>; // !!!!! ===>>> ServiceDispatcher
  updateById: ServiceApiCaller<IProductReqData, IProduct>; // !!!!! ===>>> ServiceDispatcher
  getById: ServiceApiCaller<string, IProduct>;
  getAll: ServiceDispatcherAsync<{ refresh?: boolean; query?: AppQueryParams }, IProduct[]>;
  getProductFullInfo: ServiceDispatcherAsync<OnlyUUID, IProduct>;

  // * PROPERTIES

  createProperty: ServiceDispatcherAsync<IPropertyReqData, IProperty[]>;
  deletePropertyById: ServiceApiCaller<IPropertyReqData, IProperty[]>;
  updatePropertyById: ServiceApiCaller<IPropertyReqData, IProperty[]>;
  getPropertyById: ServiceApiCaller<IPropertyReqData, IProperty>;
  getAllProperties: ServiceDispatcherAsync<IPropertyReqData, IProperty[]>;

  createVariation: ServiceApiCaller<IVariationReqData, IVariation>;
  getAllVariationsByProductId: ServiceApiCaller<{ product: OnlyUUID; params?: AppQueryParams }, IVariation[]>;
  // deleteVariationById: ServiceApiCaller<IVariationReqData, IVariation>;
  // updateVariationById: ServiceApiCaller<IVariationReqData, IVariation>;
  // getVariationById: ServiceApiCaller<IVariationReqData, IVariation>;
  // getAllVariations: ServiceApiCaller<IVariationReqData, IVariation[]>;
}

const useProductsService = (): ProductsService => {
  const dispatch: AppDispatch = useAppDispatch();

  return useMemo((): Omit<ProductsService, 'state' | 'dispatch'> => {
    return {
      create: payload => dispatch(createProductThunk(defaultThunkPayload(payload))),
      deleteById: payload => createApiCall(defaultApiCallPayload(payload), ProductsApi.deleteById, ProductsApi),
      updateById: payload => createApiCall(defaultApiCallPayload(payload), ProductsApi.updateById, ProductsApi),
      getById: payload => createApiCall(defaultApiCallPayload(payload), ProductsApi.getById, ProductsApi),
      getAll: payload => dispatch(getAllProductsThunk(defaultThunkPayload(payload))),
      getProductFullInfo: args => dispatch(getProductFullInfoThunk(defaultThunkPayload(args))),

      // * PROPERTIES
      createProperty: args => dispatch(createPropertyThunk(defaultThunkPayload(args))),
      deletePropertyById: args => createApiCall(defaultApiCallPayload(args), PropertiesApi.deleteById, PropertiesApi),
      updatePropertyById: args => createApiCall(defaultApiCallPayload(args), PropertiesApi.updateById, PropertiesApi),
      getPropertyById: args => createApiCall(defaultApiCallPayload(args), PropertiesApi.getById, PropertiesApi),
      getAllProperties: args => dispatch(getAllPropertiesThunk(defaultThunkPayload(args))),

      createVariation: args => createApiCall(defaultApiCallPayload(args), VariationsApi.create, VariationsApi),
      getAllVariationsByProductId: args =>
        createApiCall(defaultApiCallPayload(args), VariationsApi.getAllByProductId, VariationsApi),

      // createVariation: args => dispatch(createVariationThunk(defaultThunkPayload(args))),
      // getAllVariationsByProductId: args => dispatch(getAllVariationsByProductIdThunk(defaultThunkPayload(args))),
    };
  }, [dispatch]);
};

export type useProductsServiceHookType = typeof useProductsService;
export default useProductsService as useProductsServiceHookType;
