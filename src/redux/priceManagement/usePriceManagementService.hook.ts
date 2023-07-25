import { AppDispatch, useAppDispatch } from 'redux/store.store';
import { OnlyUUID, ServiceApiCaller, ServiceDispatcherAsync } from 'redux/global.types';
import { useMemo } from 'react';
import { defaultApiCallPayload, defaultThunkPayload } from 'utils/fabrics';
import { AppQueryParams, createApiCall } from 'api';
import {
  IPriceList,
  IPriceListItem,
  IPriceListItemReqData,
  IPriceListReqData,
  IPriceListRes,
  PriceListItemDto,
} from './priceManagement.types';
import { PriceManagementApi } from '../../api/priceManagement.api';
import { createPriceListThunk, getAllPriceListsThunk } from './priceManagement.thunks';

export interface PriceManagementService {
  // createList?: ServiceDispatcherAsync<IPriceListReqData, IPriceList>;
  createList: ServiceDispatcherAsync<IPriceListReqData, IPriceList>;
  deleteById?: ServiceApiCaller<string, IPriceList>; // !!!!! ===>>> ServiceDispatcher
  updateById?: ServiceApiCaller<IPriceListReqData, IPriceList>; // !!!!! ===>>> ServiceDispatcher
  getById: ServiceApiCaller<OnlyUUID, IPriceList>;
  getAll: ServiceDispatcherAsync<{ refresh?: boolean; query?: AppQueryParams }, IPriceList[]>;

  getAllItemsByProductId?: ServiceApiCaller<OnlyUUID, IPriceListItem[]>;
  updateItemById?: ServiceApiCaller<IPriceListItemReqData, IPriceListItem>; // !!!!! ===>>> ServiceDispatcher
  addItemToList: ServiceApiCaller<{ list: OnlyUUID; data: PriceListItemDto }, IPriceListRes>;
  // addItemToList?: ServiceDispatcherAsync<IPriceListItemReqData, IPriceListItem>;
  deleteItemById?: ServiceApiCaller<OnlyUUID, IPriceListItem>; // !!!!! ===>>> ServiceDispatcher
}

const usePriceManagementService = (): PriceManagementService => {
  const dispatch: AppDispatch = useAppDispatch();

  return useMemo((): PriceManagementService => {
    const { addItemToList, getPriceListById } = PriceManagementApi;
    return {
      createList: async payload => dispatch(createPriceListThunk(defaultThunkPayload(payload))),
      getAll: async payload => dispatch(getAllPriceListsThunk(defaultThunkPayload(payload))),

      getById: async payload => createApiCall(defaultApiCallPayload(payload), getPriceListById, PriceManagementApi),

      addItemToList: async payload => createApiCall(defaultApiCallPayload(payload), addItemToList, PriceManagementApi),
      // createList: async payload => dispatch(createProductThunk(defaultThunkPayload(payload))),
      // deleteById: async payload => createApiCall(defaultApiCallPayload(payload), deleteById, ProductsApi),
      // updateById: async payload => createApiCall(defaultApiCallPayload(payload), updateById, ProductsApi),
      // getById: async payload => createApiCall(defaultApiCallPayload(payload), getById, ProductsApi),
    };
  }, [dispatch]);
};

export type usePriceManagementServiceHookType = typeof usePriceManagementService;
export default usePriceManagementService as usePriceManagementServiceHookType;
