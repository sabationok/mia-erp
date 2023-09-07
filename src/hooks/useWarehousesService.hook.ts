import { useMemo } from 'react';
import { OnlyUUID, ServiceApiCaller, ServiceDispatcherAsync } from '../redux/global.types';
import { AppQueryParams } from '../api';
import {
  IProductInventory,
  IProductInventoryDto,
  IWarehouse,
  IWarehouseReqData,
} from '../redux/warehouses/warehouses.types';
import {
  createWarehouseThunk,
  getAllWarehousesThunk,
  getWarehouseByIdThunk,
} from '../redux/warehouses/warehouses.thunks';
import { defaultThunkPayload } from '../utils/fabrics';
import { useAppDispatch } from '../redux/store.store';

export interface WarehousesService {
  getAll: ServiceDispatcherAsync<{ refresh?: boolean; query?: AppQueryParams }, IWarehouse[]>;
  getById: ServiceDispatcherAsync<IWarehouse, Partial<IWarehouse>>;

  create: ServiceDispatcherAsync<IWarehouseReqData, IWarehouse>;
  update?: ServiceApiCaller<IWarehouseReqData, IWarehouse>;
  addItem?: ServiceApiCaller<{ _id?: OnlyUUID; data: IProductInventoryDto; warehouse: OnlyUUID }, IProductInventory>;
  removeItem?: ServiceApiCaller<{ _id?: OnlyUUID; data: IProductInventoryDto; warehouse: OnlyUUID }, IProductInventory>;
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
