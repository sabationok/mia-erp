import { AppDispatch, useAppDispatch } from 'redux/store.store';
import { OnlyUUID, ServiceApiCaller, ServiceDispatcherAsync } from 'redux/global.types';
import { useMemo } from 'react';
import { defaultThunkPayload } from 'utils/fabrics';
import { AppQueryParams } from 'api';
import {
  ICreatePriceReqData,
  IPriceListReqData,
  IUpdatePriceReqData,
  OfferPriceEntity,
  PriceListEntity,
} from '../types/price-management/priceManagement.types';
import * as thunks from '../redux/priceManagement/priceManagement.thunks';
import { IPricesThunksData } from '../redux/priceManagement/priceManagement.thunks';

export interface PriceManagementService {
  // createList?: ServiceDispatcherAsync<IPriceListReqData, IPriceList>;
  createList: ServiceDispatcherAsync<IPriceListReqData, PriceListEntity>;
  deleteById?: ServiceApiCaller<string, PriceListEntity>; // !!!!! ===>>> ServiceDispatcher
  updateById?: ServiceApiCaller<IPriceListReqData, PriceListEntity>; // !!!!! ===>>> ServiceDispatcher
  getById: ServiceDispatcherAsync<
    { list: OnlyUUID; query?: AppQueryParams; refreshCurrent?: boolean },
    PriceListEntity
  >;
  getAll: ServiceDispatcherAsync<{ refresh?: boolean; query?: AppQueryParams }, PriceListEntity[]>;
  refreshListById: ServiceDispatcherAsync<OnlyUUID, PriceListEntity>;

  // ? PRICES
  getAllPrices: ServiceDispatcherAsync<
    { refreshCurrent?: boolean; params?: Pick<AppQueryParams, 'list' | 'offer' | 'variation'> },
    OfferPriceEntity[]
  >;

  updatePriceById: ServiceDispatcherAsync<IPricesThunksData<IUpdatePriceReqData>, OfferPriceEntity>;
  addPriceToList: ServiceDispatcherAsync<IPricesThunksData<ICreatePriceReqData>, OfferPriceEntity>;
  deletePriceById?: ServiceApiCaller<OnlyUUID, OfferPriceEntity>; // !!!!! ===>>> ServiceDispatcher
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
