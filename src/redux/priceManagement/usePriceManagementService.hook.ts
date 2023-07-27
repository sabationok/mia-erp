import { AppDispatch, useAppDispatch } from 'redux/store.store';
import { OnlyUUID, ServiceApiCaller, ServiceDispatcherAsync } from 'redux/global.types';
import { useMemo } from 'react';
import { defaultApiCallPayload, defaultThunkPayload } from 'utils/fabrics';
import { AppQueryParams, createApiCall } from 'api';
import {
  ICreatePriceListItemReqData,
  IPriceList,
  IPriceListItem,
  IPriceListItemReqData,
  IPriceListReqData,
} from './priceManagement.types';
import { PriceManagementApi } from '../../api/priceManagement.api';
import * as thunks from './priceManagement.thunks';

export interface PriceManagementService {
  // createList?: ServiceDispatcherAsync<IPriceListReqData, IPriceList>;
  createList: ServiceDispatcherAsync<IPriceListReqData, IPriceList>;
  deleteById?: ServiceApiCaller<string, IPriceList>; // !!!!! ===>>> ServiceDispatcher
  updateById?: ServiceApiCaller<IPriceListReqData, IPriceList>; // !!!!! ===>>> ServiceDispatcher
  getById: ServiceApiCaller<OnlyUUID, IPriceList>;
  getAll: ServiceDispatcherAsync<{ refresh?: boolean; query?: AppQueryParams }, IPriceList[]>;
  refreshListById: ServiceDispatcherAsync<OnlyUUID, IPriceList>;

  getAllItemsByProductId?: ServiceApiCaller<OnlyUUID, IPriceListItem[]>;
  updateItemById?: ServiceApiCaller<IPriceListItemReqData, IPriceListItem>; // !!!!! ===>>> ServiceDispatcher
  addItemToList: ServiceDispatcherAsync<ICreatePriceListItemReqData, IPriceList>;
  // addItemToList?: ServiceDispatcherAsync<IPriceListItemReqData, IPriceListItem>;
  deleteItemById?: ServiceApiCaller<OnlyUUID, IPriceListItem>; // !!!!! ===>>> ServiceDispatcher
}

const usePriceManagementService = (): PriceManagementService => {
  const dispatch: AppDispatch = useAppDispatch();

  return useMemo((): PriceManagementService => {
    const { getPriceListById } = PriceManagementApi;
    return {
      createList: async arg => dispatch(thunks.createPriceListThunk(defaultThunkPayload(arg))),
      getAll: async arg => dispatch(thunks.getAllPriceListsThunk(defaultThunkPayload(arg))),
      getById: async arg => createApiCall(defaultApiCallPayload(arg), getPriceListById, PriceManagementApi),
      refreshListById: async arg => dispatch(thunks.refreshPriceListByIdThunk(defaultThunkPayload(arg))),

      addItemToList: async arg => dispatch(thunks.addPriceToListThunk(defaultThunkPayload(arg))),
      // createList: async payload => dispatch(createProductThunk(defaultThunkPayload(payload))),
      // deleteById: async payload => createApiCall(defaultApiCallPayload(payload), deleteById, ProductsApi),
      // updateById: async payload => createApiCall(defaultApiCallPayload(payload), updateById, ProductsApi),
      // getById: async payload => createApiCall(defaultApiCallPayload(payload), getById, ProductsApi),
    };
  }, [dispatch]);
};

export type usePriceManagementServiceHookType = typeof usePriceManagementService;
export default usePriceManagementService as usePriceManagementServiceHookType;
