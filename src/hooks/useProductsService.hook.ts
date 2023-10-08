import { AppDispatch, useAppDispatch } from 'redux/store.store';
import { IProduct, IProductReqData } from '../redux/products/products.types';
import { OnlyUUID, ServiceApiCaller, ServiceDispatcher, ServiceDispatcherAsync } from 'redux/global.types';
import {
  createProductThunk,
  getAllInventoriesByProductIdThunk,
  getAllPricesByProductIdThunk,
  getAllProductsThunk,
  getProductFullInfoThunk,
  updateProductDefaultsThunk,
  updateProductThunk,
} from '../redux/products/products.thunks';
import { useMemo } from 'react';
import { defaultApiCallPayload, defaultThunkPayload } from 'utils/fabrics';
import { AppQueryParams, createApiCall } from 'api';
import ProductsApi from '../api/products.api';
import PropertiesApi from '../api/properties.api';
import { IProperty, IPropertyReqData } from '../redux/products/properties.types';
import { createPropertyThunk, getAllPropertiesThunk } from '../redux/products/properties.thunks';
import {
  createVariationThunk,
  getAllVariationsByProductIdThunk,
  updateVariationThunk,
} from '../redux/products/variations.thunks';
import { IVariation, IVariationReqData } from '../redux/products/variations.types';
import { clearCurrentProductAction } from '../redux/products/products.actions';
import { IPriceListItem } from '../redux/priceManagement/priceManagement.types';
import { IProductInventory } from '../redux/warehouses/warehouses.types';

export interface ProductsService {
  create: ServiceDispatcherAsync<IProductReqData, IProduct>;
  deleteById: ServiceApiCaller<string, IProduct>; // !!!!! ===>>> ServiceDispatcher
  updateById: ServiceDispatcherAsync<IProductReqData & { refreshCurrent?: boolean; updateCurrent?: boolean }, IProduct>; // !!!!! ===>>> ServiceDispatcher
  getById: ServiceApiCaller<string, IProduct>;
  getAll: ServiceDispatcherAsync<{ refresh?: boolean; query?: AppQueryParams }, IProduct[]>;
  getProductFullInfo: ServiceDispatcherAsync<OnlyUUID, IProduct>;
  clearCurrent: ServiceDispatcher<undefined>;
  setDefaults: ServiceDispatcherAsync<
    IProductReqData & { refreshCurrent?: boolean; updateCurrent?: boolean },
    IProduct
  >;

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
    { product: OnlyUUID; params?: AppQueryParams; refreshCurrent?: boolean; updateCurrent?: boolean },
    IVariation[]
  >;

  // * PRICES
  getAllPricesByProductId: ServiceDispatcherAsync<
    {
      refreshCurrent?: boolean;
      updateCurrent?: boolean;
      params: Pick<AppQueryParams, 'product' | 'list' | 'variation'>;
    },
    IPriceListItem[]
  >;
  // * INVENTORIES
  getAllInventoriesByProductId: ServiceDispatcherAsync<
    {
      refreshCurrent?: boolean;
      updateCurrent?: boolean;
      params: Pick<AppQueryParams, 'product' | 'warehouse' | 'variation' | 'price'>;
    },
    IProductInventory[]
  >;
}

const useProductsService = (): ProductsService => {
  const dispatch: AppDispatch = useAppDispatch();

  return useMemo((): ProductsService => {
    return {
      create: args => dispatch(createProductThunk(defaultThunkPayload(args))),
      updateById: args => dispatch(updateProductThunk(defaultThunkPayload(args))),
      deleteById: args => createApiCall(defaultApiCallPayload(args), ProductsApi.deleteById, ProductsApi),
      getById: args => createApiCall(defaultApiCallPayload(args), ProductsApi.getById, ProductsApi),
      getAll: args => dispatch(getAllProductsThunk(defaultThunkPayload(args))),
      getProductFullInfo: args => dispatch(getProductFullInfoThunk(defaultThunkPayload(args))),
      clearCurrent: () => dispatch(clearCurrentProductAction()),
      setDefaults: args => dispatch(updateProductDefaultsThunk(defaultThunkPayload(args))),

      // * PROPERTIES
      createProperty: args => dispatch(createPropertyThunk(defaultThunkPayload(args))),
      getAllProperties: args => dispatch(getAllPropertiesThunk(defaultThunkPayload(args))),
      deletePropertyById: args => createApiCall(defaultApiCallPayload(args), PropertiesApi.deleteById, PropertiesApi),
      updatePropertyById: args => createApiCall(defaultApiCallPayload(args), PropertiesApi.updateById, PropertiesApi),
      getPropertyById: args => createApiCall(defaultApiCallPayload(args), PropertiesApi.getById, PropertiesApi),
      changeDisabledStatus: args => createApiCall(defaultApiCallPayload(args), PropertiesApi.updateById, PropertiesApi),

      // * VARIATIONS
      createVariation: args => dispatch(createVariationThunk(defaultThunkPayload(args))),
      updateVariationById: args => dispatch(updateVariationThunk(defaultThunkPayload(args))),
      getAllVariationsByProductId: args => dispatch(getAllVariationsByProductIdThunk(defaultThunkPayload(args))),

      // * PRICES
      getAllPricesByProductId: args => dispatch(getAllPricesByProductIdThunk(defaultThunkPayload(args))),

      // * WAREHOUSING
      getAllInventoriesByProductId: args => dispatch(getAllInventoriesByProductIdThunk(defaultThunkPayload(args))),
    };
  }, [dispatch]);
};

export type useProductsServiceHookType = typeof useProductsService;
export default useProductsService as useProductsServiceHookType;
