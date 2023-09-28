import { AppDispatch, useAppDispatch } from 'redux/store.store';
import { OnlyUUID, ServiceApiCaller, ServiceDispatcherAsync } from 'redux/global.types';
import { useMemo } from 'react';
import { defaultApiCallPayload, defaultThunkPayload } from 'utils/fabrics';
import { AppQueryParams, createApiCall } from 'api';
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
  getById: ServiceDispatcherAsync<{ list: OnlyUUID; query?: AppQueryParams }, IPriceList>;
  getAll: ServiceDispatcherAsync<{ refresh?: boolean; query?: AppQueryParams }, IPriceList[]>;
  refreshListById: ServiceDispatcherAsync<OnlyUUID, IPriceList>;

  // ? PRICES
  getAllPricesByProductId: ServiceApiCaller<Pick<AppQueryParams, 'product'>, IPriceListItem[]>;
  getAllPricesByListId: ServiceApiCaller<Pick<AppQueryParams, 'list'>, IPriceListItem[]>;
  updatePriceById?: ServiceApiCaller<IUpdatePriceReqData, IPriceListItem>; // !!!!! ===>>> ServiceDispatcher
  addPriceToList: ServiceDispatcherAsync<IPricesThunksData<ICreatePriceReqData>, IPriceListItem>;
  deletePriceById?: ServiceApiCaller<OnlyUUID, IPriceListItem>; // !!!!! ===>>> ServiceDispatcher
}

const usePriceManagementService = (): PriceManagementService => {
  const dispatch: AppDispatch = useAppDispatch();

  return useMemo((): PriceManagementService => {
    const { getAllPricesByProductId, getAllPricesByListId } = PriceManagementApi;
    return {
      createList: arg => dispatch(thunks.createPriceListThunk(defaultThunkPayload(arg))),
      getAll: arg => dispatch(thunks.getAllPriceListsThunk(defaultThunkPayload(arg))),
      getById: arg => dispatch(thunks.getPriceListByIdThunk(defaultThunkPayload(arg))),
      refreshListById: arg => dispatch(thunks.refreshPriceListByIdThunk(defaultThunkPayload(arg))),

      // ? PRICES
      addPriceToList: arg => dispatch(thunks.addPriceToListThunk(defaultThunkPayload(arg))),
      getAllPricesByProductId: arg =>
        createApiCall(defaultApiCallPayload(arg), getAllPricesByProductId, PriceManagementApi),
      getAllPricesByListId: arg => createApiCall(defaultApiCallPayload(arg), getAllPricesByListId, PriceManagementApi),

      // createList: async payload => dispatch(createProductThunk(defaultThunkPayload(payload))),
      // deleteById: async payload => createApiCall(defaultApiCallPayload(payload), deleteById, ProductsApi),
      // updateById: async payload => createApiCall(defaultApiCallPayload(payload), updateById, ProductsApi),
      // getById: async payload => createApiCall(defaultApiCallPayload(payload), getById, ProductsApi),
    };
  }, [dispatch]);
};

export type usePriceManagementServiceHookType = typeof usePriceManagementService;
export default usePriceManagementService as usePriceManagementServiceHookType;
