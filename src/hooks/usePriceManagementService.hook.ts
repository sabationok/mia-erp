import { AppDispatch, useAppDispatch } from 'redux/store.store';
import { OnlyUUID, ServiceApiCaller, ServiceDispatcherAsync } from 'redux/app-redux.types';
import { useMemo } from 'react';
import { defaultThunkPayload } from 'utils/fabrics';
import { ApiQueryParams } from 'api';
import {
  ICreatePriceReqData,
  IPriceListReqData,
  IUpdatePriceReqData,
  PriceEntity,
  PriceListEntity,
} from '../types/price-management/price-management.types';
import * as thunks from '../redux/priceManagement/priceManagement.thunks';
import { IPricesThunksData } from '../redux/priceManagement/priceManagement.thunks';

export interface PriceManagementService {
  // createList?: ServiceDispatcherAsync<IPriceListReqData, IPriceList>;
  createList: ServiceDispatcherAsync<IPriceListReqData, PriceListEntity>;
  deleteById?: ServiceApiCaller<string, PriceListEntity>; // !!!!! ===>>> ServiceDispatcher
  updateById?: ServiceApiCaller<IPriceListReqData, PriceListEntity>; // !!!!! ===>>> ServiceDispatcher
  getById: ServiceDispatcherAsync<
    { list: OnlyUUID; query?: ApiQueryParams; refreshCurrent?: boolean },
    PriceListEntity
  >;
  getAll: ServiceDispatcherAsync<{ refresh?: boolean; query?: ApiQueryParams }, PriceListEntity[]>;
  refreshListById: ServiceDispatcherAsync<OnlyUUID, PriceListEntity>;

  // ? PRICES
  getAllPrices: ServiceDispatcherAsync<
    { refreshCurrent?: boolean; params?: Pick<ApiQueryParams, 'list' | 'offer' | 'variation'> },
    PriceEntity[]
  >;

  updatePriceById: ServiceDispatcherAsync<IPricesThunksData<IUpdatePriceReqData>, PriceEntity>;
  addPriceToList: ServiceDispatcherAsync<IPricesThunksData<ICreatePriceReqData>, PriceEntity>;
  deletePriceById?: ServiceApiCaller<OnlyUUID, PriceEntity>; // !!!!! ===>>> ServiceDispatcher
}

const usePriceManagementService = (): PriceManagementService => {
  const dispatch: AppDispatch = useAppDispatch();

  return useMemo((): PriceManagementService => {
    return {
      createList: arg => dispatch(thunks.createPriceListThunk(defaultThunkPayload(arg))),
      getAll: arg => dispatch(thunks.getAllPriceListsThunk(defaultThunkPayload(arg))),
      getById: arg => dispatch(thunks.getPriceListByIdThunk(defaultThunkPayload(arg))),
      refreshListById: arg => dispatch(thunks.refreshPriceListByIdThunk(defaultThunkPayload(arg))),

      // ? PRICES
      addPriceToList: arg => dispatch(thunks.createPriceThunk(defaultThunkPayload(arg))),
      updatePriceById: arg => dispatch(thunks.updatePriceThunk(defaultThunkPayload(arg))),

      getAllPrices: args => dispatch(thunks.getAllPricesThunk(defaultThunkPayload(args))),

      // createList: async payload => dispatch(createProductThunk(defaultThunkPayload(payload))),
      // deleteById: async payload => createApiCall(defaultApiCallPayload(payload), deleteById, ProductsApi),
      // updateById: async payload => createApiCall(defaultApiCallPayload(payload), updateById, ProductsApi),
      // getById: async payload => createApiCall(defaultApiCallPayload(payload), getById, ProductsApi),
    };
  }, [dispatch]);
};

export default usePriceManagementService;
