import { AppDispatch, useAppDispatch } from 'redux/store.store';
import { OnlyUUID, ServiceApiCaller, ServiceDispatcherAsync } from 'redux/global.types';
import { useMemo } from 'react';
import { defaultThunkPayload } from 'utils/fabrics';
import { AppQueryParams } from 'api';
import {
  ICreatePriceReqData,
  IPriceList,
  IPriceListItem,
  IPriceListReqData,
  IUpdatePriceReqData,
} from '../redux/priceManagement/priceManagement.types';
import { PriceManagementApi } from '../api/priceManagement.api';
import * as thunks from '../redux/priceManagement/priceManagement.thunks';
import { IPricesThunksData } from '../redux/priceManagement/priceManagement.thunks';

export interface PriceManagementService {
  // createList?: ServiceDispatcherAsync<IPriceListReqData, IPriceList>;
  createList: ServiceDispatcherAsync<IPriceListReqData, IPriceList>;
  deleteById?: ServiceApiCaller<string, IPriceList>; // !!!!! ===>>> ServiceDispatcher
  updateById?: ServiceApiCaller<IPriceListReqData, IPriceList>; // !!!!! ===>>> ServiceDispatcher
  getById: ServiceDispatcherAsync<{ list: OnlyUUID; query?: AppQueryParams; refreshCurrent?: boolean }, IPriceList>;
  getAll: ServiceDispatcherAsync<{ refresh?: boolean; query?: AppQueryParams }, IPriceList[]>;
  refreshListById: ServiceDispatcherAsync<OnlyUUID, IPriceList>;

  // ? PRICES
  getAllPrices: ServiceDispatcherAsync<
    { refreshCurrent?: boolean; params?: Pick<AppQueryParams, 'list' | 'product' | 'variation'> },
    IPriceListItem[]
  >;

  updatePriceById: ServiceDispatcherAsync<IPricesThunksData<IUpdatePriceReqData>, IPriceListItem>;
  addPriceToList: ServiceDispatcherAsync<IPricesThunksData<ICreatePriceReqData>, IPriceListItem>;
  deletePriceById?: ServiceApiCaller<OnlyUUID, IPriceListItem>; // !!!!! ===>>> ServiceDispatcher
}

const usePriceManagementService = (): PriceManagementService => {
  const dispatch: AppDispatch = useAppDispatch();

  return useMemo((): PriceManagementService => {
    const { getAllPrices } = PriceManagementApi;
    return {
      createList: arg => dispatch(thunks.createPriceListThunk(defaultThunkPayload(arg))),
      getAll: arg => dispatch(thunks.getAllPriceListsThunk(defaultThunkPayload(arg))),
      getById: arg => dispatch(thunks.getPriceListByIdThunk(defaultThunkPayload(arg))),
      refreshListById: arg => dispatch(thunks.refreshPriceListByIdThunk(defaultThunkPayload(arg))),

      // ? PRICES
      addPriceToList: arg => dispatch(thunks.addPriceToListThunk(defaultThunkPayload(arg))),
      updatePriceById: arg => dispatch(thunks.updatePriceInListThunk(defaultThunkPayload(arg))),

      getAllPrices: args => dispatch(thunks.getAllPricesThunk(defaultThunkPayload(args))),

      // createList: async payload => dispatch(createProductThunk(defaultThunkPayload(payload))),
      // deleteById: async payload => createApiCall(defaultApiCallPayload(payload), deleteById, ProductsApi),
      // updateById: async payload => createApiCall(defaultApiCallPayload(payload), updateById, ProductsApi),
      // getById: async payload => createApiCall(defaultApiCallPayload(payload), getById, ProductsApi),
    };
  }, [dispatch]);
};

export default usePriceManagementService;
