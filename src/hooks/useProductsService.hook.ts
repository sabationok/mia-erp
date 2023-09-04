import { AppDispatch, useAppDispatch } from 'redux/store.store';
import { IProduct, IProductReqData, IProperty, IPropertyReqData } from '../redux/products/products.types';
import { ServiceApiCaller, ServiceDispatcherAsync } from 'redux/global.types';
import {
  createProductThunk,
  createPropertyThunk,
  getAllProductsThunk,
  getAllPropertiesThunk,
} from '../redux/products/products.thunks';
import { useMemo } from 'react';
import { defaultApiCallPayload, defaultThunkPayload } from 'utils/fabrics';
import { AppQueryParams, createApiCall } from 'api';
import ProductsApi from '../api/products.api';
import PropertiesApi from '../api/properties.api';

export interface ProductsService {
  create: ServiceDispatcherAsync<IProductReqData, IProduct>;
  deleteById: ServiceApiCaller<string, IProduct>; // !!!!! ===>>> ServiceDispatcher
  updateById: ServiceApiCaller<IProductReqData, IProduct>; // !!!!! ===>>> ServiceDispatcher
  getById: ServiceApiCaller<string, IProduct>;
  getAll: ServiceDispatcherAsync<{ refresh?: boolean; query?: AppQueryParams }, IProduct[]>;

  // * PROPERTIES

  createProperty: ServiceDispatcherAsync<IPropertyReqData, IProperty[]>;
  deletePropertyById: ServiceApiCaller<IPropertyReqData, IProperty[]>;
  updatePropertyById: ServiceApiCaller<IPropertyReqData, IProperty[]>;
  getPropertyById: ServiceApiCaller<IPropertyReqData, IProperty>;
  getAllProperties: ServiceDispatcherAsync<IPropertyReqData, IProperty[]>;
}

const useProductsService = (): ProductsService => {
  const dispatch: AppDispatch = useAppDispatch();

  return useMemo((): Omit<ProductsService, 'state' | 'dispatch'> => {
    const { deleteById, updateById, getById } = ProductsApi;
    return {
      create: payload => dispatch(createProductThunk(defaultThunkPayload(payload))),
      deleteById: payload => createApiCall(defaultApiCallPayload(payload), deleteById, ProductsApi),
      updateById: payload => createApiCall(defaultApiCallPayload(payload), updateById, ProductsApi),
      getById: payload => createApiCall(defaultApiCallPayload(payload), getById, ProductsApi),
      getAll: payload => dispatch(getAllProductsThunk(defaultThunkPayload(payload))),

      // * PROPERTIES
      createProperty: args => dispatch(createPropertyThunk(defaultThunkPayload(args))),
      deletePropertyById: args => createApiCall(defaultApiCallPayload(args), PropertiesApi.deleteById, PropertiesApi),
      updatePropertyById: args => createApiCall(defaultApiCallPayload(args), PropertiesApi.updateById, PropertiesApi),
      getPropertyById: args => createApiCall(defaultApiCallPayload(args), PropertiesApi.getById, PropertiesApi),
      getAllProperties: args => dispatch(getAllPropertiesThunk(defaultThunkPayload(args))),
    };
  }, [dispatch]);
};

export type useProductsServiceHookType = typeof useProductsService;
export default useProductsService as useProductsServiceHookType;
