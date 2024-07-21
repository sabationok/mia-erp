import { useMemo } from 'react';
import { OnlyUUID, ServiceApiCaller, ServiceDispatcherAsync } from '../redux/app-redux.types';
import { ApiQueryParams } from '../api';
import {
  IProductInventoryReqData,
  IWarehouseReqData,
  WarehouseEntity,
  WarehouseItemEntity,
} from '../types/warehousing/warehouses.types';
import {
  createWarehouseThunk,
  getAllWarehousesThunk,
  getWarehouseByIdThunk,
} from '../redux/warehouses/warehouses.thunks';
import { defaultThunkPayload } from '../utils/fabrics';
import { useAppDispatch } from '../redux/store.store';

export interface WarehousesService {
  getAll: ServiceDispatcherAsync<{ refresh?: boolean; query?: ApiQueryParams }, WarehouseEntity[]>;
  getById: ServiceDispatcherAsync<OnlyUUID, WarehouseEntity>;
  create: ServiceDispatcherAsync<IWarehouseReqData, WarehouseEntity>;

  update?: ServiceApiCaller<IWarehouseReqData, WarehouseEntity>;

  // ? PRODUCT INVENTORIES
  addItem?: ServiceApiCaller<IProductInventoryReqData, WarehouseItemEntity>;
  removeItem?: ServiceApiCaller<IProductInventoryReqData, WarehouseItemEntity>;
}
export const useWarehousesService = (): WarehousesService => {
  const dispatch = useAppDispatch();
  return useMemo(
    (): WarehousesService => ({
      getAll: args => dispatch(getAllWarehousesThunk(defaultThunkPayload(args))),
      getById: args => dispatch(getWarehouseByIdThunk(defaultThunkPayload(args))),
      create: args => dispatch(createWarehouseThunk(defaultThunkPayload(args))),
    }),
    [dispatch]
  );
};
export default useWarehousesService;
