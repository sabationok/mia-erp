import { useMemo } from 'react';
import { OnlyUUID, ServiceApiCaller, ServiceDispatcherAsync } from '../redux/global.types';
import { AppQueryParams } from '../api';
import { IProductInventory, IProductInventoryReqData, IWarehouse, IWarehouseReqData } from '../types/warehouses.types';
import {
  createWarehouseThunk,
  getAllWarehousesThunk,
  getWarehouseByIdThunk,
} from '../redux/warehouses/warehouses.thunks';
import { defaultThunkPayload } from '../utils/fabrics';
import { useAppDispatch } from '../redux/store.store';

export interface WarehousesService {
  getAll: ServiceDispatcherAsync<{ refresh?: boolean; query?: AppQueryParams }, IWarehouse[]>;
  getById: ServiceDispatcherAsync<OnlyUUID, IWarehouse>;
  create: ServiceDispatcherAsync<IWarehouseReqData, IWarehouse>;

  update?: ServiceApiCaller<IWarehouseReqData, IWarehouse>;

  // ? PRODUCT INVENTORIES
  addItem?: ServiceApiCaller<IProductInventoryReqData, IProductInventory>;
  removeItem?: ServiceApiCaller<IProductInventoryReqData, IProductInventory>;
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
