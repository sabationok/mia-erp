import { AppDispatch, useAppDispatch } from 'redux/store.store';
import { IProductReqData, IStorageItem } from './products.types';
import { ServiceApiCaller, ServiceDispatcherAsync } from 'redux/global.types';
import { createProductThunk, getAllProductsThunk } from './products.thunks';
import { useMemo } from 'react';
import { defaultApiCallPayload, defaultThunkPayload } from 'utils/fabrics';
import { AppQueryParams, createApiCall } from 'api';
import ProductsApi from '../../api/products.api';

export interface StorageService {
  create: ServiceDispatcherAsync<IProductReqData, IStorageItem>;
  deleteById: ServiceApiCaller<string, IStorageItem>; // !!!!! ===>>> ServiceDispatcher
  updateById: ServiceApiCaller<IProductReqData, IStorageItem>; // !!!!! ===>>> ServiceDispatcher
  getById: ServiceApiCaller<string, IStorageItem>;
  getAll: ServiceDispatcherAsync<{ refresh?: boolean; query?: AppQueryParams }, IStorageItem[]>;
}

const useStorageService = (): StorageService => {
  const dispatch: AppDispatch = useAppDispatch();

  return useMemo((): Omit<StorageService, 'state' | 'dispatch'> => {
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

export type useStorageServiceHookType = typeof useStorageService;
export default useStorageService as useStorageServiceHookType;
