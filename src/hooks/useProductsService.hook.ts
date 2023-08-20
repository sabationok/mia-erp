import { AppDispatch, useAppDispatch } from 'redux/store.store';
import { IProduct, IProductReqData } from '../redux/products/products.types';
import { ServiceApiCaller, ServiceDispatcherAsync } from 'redux/global.types';
import { createProductThunk, getAllProductsThunk } from '../redux/products/products.thunks';
import { useMemo } from 'react';
import { defaultApiCallPayload, defaultThunkPayload } from 'utils/fabrics';
import { AppQueryParams, createApiCall } from 'api';
import ProductsApi from '../api/products.api';

export interface ProductsService {
  create: ServiceDispatcherAsync<IProductReqData, IProduct>;
  deleteById: ServiceApiCaller<string, IProduct>; // !!!!! ===>>> ServiceDispatcher
  updateById: ServiceApiCaller<IProductReqData, IProduct>; // !!!!! ===>>> ServiceDispatcher
  getById: ServiceApiCaller<string, IProduct>;
  getAll: ServiceDispatcherAsync<{ refresh?: boolean; query?: AppQueryParams }, IProduct[]>;
}

const useProductsService = (): ProductsService => {
  const dispatch: AppDispatch = useAppDispatch();

  return useMemo((): Omit<ProductsService, 'state' | 'dispatch'> => {
    const { deleteById, updateById, getById } = ProductsApi;
    return {
      create: async payload => dispatch(createProductThunk(defaultThunkPayload(payload))),
      deleteById: async payload => createApiCall(defaultApiCallPayload(payload), deleteById, ProductsApi),
      updateById: async payload => createApiCall(defaultApiCallPayload(payload), updateById, ProductsApi),
      getById: async payload => createApiCall(defaultApiCallPayload(payload), getById, ProductsApi),
      getAll: async payload => dispatch(getAllProductsThunk(defaultThunkPayload(payload))),
    };
  }, [dispatch]);
};

export type useProductsServiceHookType = typeof useProductsService;
export default useProductsService as useProductsServiceHookType;
