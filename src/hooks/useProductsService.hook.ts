import { AppDispatch, useAppDispatch } from 'redux/store.store';
import { IProduct, IProductReqData } from '../redux/products/products.types';
import { OnlyUUID, ServiceApiCaller, ServiceDispatcherAsync } from 'redux/global.types';
import { createProductThunk, getAllProductsThunk, getProductFullInfoThunk } from '../redux/products/products.thunks';
import { useMemo } from 'react';
import { defaultApiCallPayload, defaultThunkPayload } from 'utils/fabrics';
import { AppQueryParams, createApiCall } from 'api';
import ProductsApi from '../api/products.api';
import PropertiesApi from '../api/properties.api';
import { IProperty, IPropertyReqData } from '../redux/products/properties.types';
import { createPropertyThunk, getAllPropertiesThunk } from '../redux/products/properties.thunks';
import { createVariationThunk, getAllVariationsByProductIdThunk } from '../redux/products/variations.thunks';
import { IVariation, IVariationReqData } from '../redux/products/variations.types';

export interface ProductsService {
  create: ServiceDispatcherAsync<IProductReqData, IProduct>;
  deleteById: ServiceApiCaller<string, IProduct>; // !!!!! ===>>> ServiceDispatcher
  updateById: ServiceApiCaller<IProductReqData & { refreshCurrent?: boolean }, IProduct>; // !!!!! ===>>> ServiceDispatcher
  getById: ServiceApiCaller<string, IProduct>;
  getAll: ServiceDispatcherAsync<{ refresh?: boolean; query?: AppQueryParams }, IProduct[]>;
  getProductFullInfo: ServiceDispatcherAsync<OnlyUUID, IProduct>;

  // * PROPERTIES

  createProperty: ServiceDispatcherAsync<IPropertyReqData, IProperty[]>;
  getAllProperties: ServiceDispatcherAsync<IPropertyReqData, IProperty[]>;
  updatePropertyById: ServiceApiCaller<IPropertyReqData, IProperty[]>;
  deletePropertyById: ServiceApiCaller<IPropertyReqData, IProperty[]>;
  getPropertyById: ServiceApiCaller<IPropertyReqData, IProperty>;

  createVariation: ServiceDispatcherAsync<IVariationReqData, IVariation>;
  updateVariationById: ServiceDispatcherAsync<IVariationReqData, IVariation>;
  getAllVariationsByProductId: ServiceDispatcherAsync<
    { product: OnlyUUID; params?: AppQueryParams; refreshCurrent?: boolean },
    IVariation[]
  >;
  // deleteVariationById: ServiceApiCaller<IVariationReqData, IVariation>;
  // getVariationById: ServiceApiCaller<IVariationReqData, IVariation>;
  // getAllVariations: ServiceApiCaller<IVariationReqData, IVariation[]>;
}

const useProductsService = (): ProductsService => {
  const dispatch: AppDispatch = useAppDispatch();

  return useMemo((): Omit<ProductsService, 'state' | 'dispatch'> => {
    return {
      create: payload => dispatch(createProductThunk(defaultThunkPayload(payload))),
      updateById: payload => createApiCall(defaultApiCallPayload(payload), ProductsApi.updateById, ProductsApi),
      deleteById: payload => createApiCall(defaultApiCallPayload(payload), ProductsApi.deleteById, ProductsApi),
      getById: payload => createApiCall(defaultApiCallPayload(payload), ProductsApi.getById, ProductsApi),
      getAll: payload => dispatch(getAllProductsThunk(defaultThunkPayload(payload))),
      getProductFullInfo: args => dispatch(getProductFullInfoThunk(defaultThunkPayload(args))),

      // * PROPERTIES
      createProperty: args => dispatch(createPropertyThunk(defaultThunkPayload(args))),
      getAllProperties: args => dispatch(getAllPropertiesThunk(defaultThunkPayload(args))),
      deletePropertyById: args => createApiCall(defaultApiCallPayload(args), PropertiesApi.deleteById, PropertiesApi),
      updatePropertyById: args => createApiCall(defaultApiCallPayload(args), PropertiesApi.updateById, PropertiesApi),
      getPropertyById: args => createApiCall(defaultApiCallPayload(args), PropertiesApi.getById, PropertiesApi),

      // createVariation: args => createApiCall(defaultApiCallPayload(args), VariationsApi.create, VariationsApi),
      createVariation: args => dispatch(createVariationThunk(defaultThunkPayload(args))),
      updateVariationById: args => dispatch(createVariationThunk(defaultThunkPayload(args))),
      getAllVariationsByProductId: args => dispatch(getAllVariationsByProductIdThunk(defaultThunkPayload(args))),

      // getAllVariationsByProductId: args => dispatch(getAllVariationsByProductIdThunk(defaultThunkPayload(args))),
    };
  }, [dispatch]);
};

export type useProductsServiceHookType = typeof useProductsService;
export default useProductsService as useProductsServiceHookType;
