import { AppDispatch, useAppDispatch } from 'redux/store.store';
import { IProduct, IProductReqData } from '../redux/products/products.types';
import { OnlyUUID, ServiceApiCaller, ServiceDispatcher, ServiceDispatcherAsync } from 'redux/global.types';
import {
  createProductThunk,
  getAllPricesByCurrentProduct,
  getAllProductsThunk,
  getProductFullInfoThunk,
  updateProductThunk,
} from '../redux/products/products.thunks';
import { useMemo } from 'react';
import { defaultApiCallPayload, defaultThunkPayload } from 'utils/fabrics';
import { AppQueryParams, createApiCall } from 'api';
import ProductsApi from '../api/products.api';
import PropertiesApi from '../api/properties.api';
import { IProperty, IPropertyReqData } from '../redux/products/properties.types';
import { createPropertyThunk, getAllPropertiesThunk } from '../redux/products/properties.thunks';
import { createVariationThunk, getAllVariationsByProductIdThunk } from '../redux/products/variations.thunks';
import { IVariation, IVariationReqData } from '../redux/products/variations.types';
import { clearCurrentProductAction } from '../redux/products/products.actions';
import { IPriceListItem } from '../redux/priceManagement/priceManagement.types';

export interface ProductsService {
  create: ServiceDispatcherAsync<IProductReqData, IProduct>;
  deleteById: ServiceApiCaller<string, IProduct>; // !!!!! ===>>> ServiceDispatcher
  updateById: ServiceDispatcherAsync<IProductReqData & { refreshCurrent?: boolean }, IProduct>; // !!!!! ===>>> ServiceDispatcher
  getById: ServiceApiCaller<string, IProduct>;
  getAll: ServiceDispatcherAsync<{ refresh?: boolean; query?: AppQueryParams }, IProduct[]>;
  getProductFullInfo: ServiceDispatcherAsync<OnlyUUID, IProduct>;
  clearCurrent: ServiceDispatcher<undefined>;
  // * PROPERTIES

  createProperty: ServiceDispatcherAsync<IPropertyReqData, IProperty[]>;
  getAllProperties: ServiceDispatcherAsync<IPropertyReqData, IProperty[]>;
  updatePropertyById: ServiceApiCaller<IPropertyReqData, IProperty[]>;
  deletePropertyById: ServiceApiCaller<IPropertyReqData, IProperty[]>;
  getPropertyById: ServiceApiCaller<IPropertyReqData, IProperty>;
  changeDisabledStatus: ServiceApiCaller<
    OnlyUUID & { data?: { isSelectable?: boolean }; params?: AppQueryParams },
    IProperty[]
  >;

  // * VARIATIONS
  createVariation: ServiceDispatcherAsync<IVariationReqData, IVariation>;
  updateVariationById: ServiceDispatcherAsync<IVariationReqData, IVariation>;
  getAllVariationsByProductId: ServiceDispatcherAsync<
    { product: OnlyUUID; params?: AppQueryParams; refreshCurrent?: boolean },
    IVariation[]
  >;

  // * PRICES
  getAllPricesByCurrentProduct: ServiceDispatcherAsync<
    { refreshCurrent?: boolean; params: Pick<AppQueryParams, 'product' | 'list' | 'variation'> },
    IPriceListItem[]
  >;
  // deleteVariationById: ServiceApiCaller<IVariationReqData, IVariation>;
  // getVariationById: ServiceApiCaller<IVariationReqData, IVariation>;
  // getAllVariations: ServiceApiCaller<IVariationReqData, IVariation[]>;
}

const useProductsService = (): ProductsService => {
  const dispatch: AppDispatch = useAppDispatch();

  return useMemo((): Omit<ProductsService, 'state' | 'dispatch'> => {
    return {
      create: args => dispatch(createProductThunk(defaultThunkPayload(args))),
      updateById: args => dispatch(updateProductThunk(defaultThunkPayload(args))),
      deleteById: args => createApiCall(defaultApiCallPayload(args), ProductsApi.deleteById, ProductsApi),
      getById: args => createApiCall(defaultApiCallPayload(args), ProductsApi.getById, ProductsApi),
      getAll: args => dispatch(getAllProductsThunk(defaultThunkPayload(args))),
      getProductFullInfo: args => dispatch(getProductFullInfoThunk(defaultThunkPayload(args))),
      clearCurrent: () => dispatch(clearCurrentProductAction()),
      // * PROPERTIES
      createProperty: args => dispatch(createPropertyThunk(defaultThunkPayload(args))),
      getAllProperties: args => dispatch(getAllPropertiesThunk(defaultThunkPayload(args))),
      deletePropertyById: args => createApiCall(defaultApiCallPayload(args), PropertiesApi.deleteById, PropertiesApi),
      updatePropertyById: args => createApiCall(defaultApiCallPayload(args), PropertiesApi.updateById, PropertiesApi),
      getPropertyById: args => createApiCall(defaultApiCallPayload(args), PropertiesApi.getById, PropertiesApi),
      changeDisabledStatus: args => createApiCall(defaultApiCallPayload(args), PropertiesApi.updateById, PropertiesApi),
      // * VARIATIONS
      // createVariation: args => createApiCall(defaultApiCallPayload(args), VariationsApi.create, VariationsApi),
      createVariation: args => dispatch(createVariationThunk(defaultThunkPayload(args))),
      updateVariationById: args => dispatch(createVariationThunk(defaultThunkPayload(args))),
      getAllVariationsByProductId: args => dispatch(getAllVariationsByProductIdThunk(defaultThunkPayload(args))),

      // * PRICES
      getAllPricesByCurrentProduct: args => dispatch(getAllPricesByCurrentProduct(defaultThunkPayload(args))),
      // getAllVariationsByProductId: args => dispatch(getAllVariationsByProductIdThunk(defaultThunkPayload(args))),
    };
  }, [dispatch]);
};

export type useProductsServiceHookType = typeof useProductsService;
export default useProductsService as useProductsServiceHookType;
