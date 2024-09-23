import { useMemo } from 'react';
import { __ServiceDispatcherAsync, ServiceApiCaller } from '../redux/app-redux.types';
import {
  WarehouseInventoryReqData,
  IWarehouseReqData,
  WarehouseEntity,
  WarehouseInventoryEntity,
} from '../types/warehousing';
import {
  createWarehouseThunk,
  getAllWarehousesThunk,
  getWarehouseByIdThunk,
} from '../redux/warehouses/warehouses.thunks';
import { useAppDispatch } from '../redux/store.store';

export interface WarehousesService {
  getAll: __ServiceDispatcherAsync<typeof getAllWarehousesThunk>;
  getById: __ServiceDispatcherAsync<typeof getWarehouseByIdThunk>;
  create: __ServiceDispatcherAsync<typeof createWarehouseThunk>;

  update?: ServiceApiCaller<IWarehouseReqData, WarehouseEntity>;

  // ? INVENTORIES
  addItem?: ServiceApiCaller<WarehouseInventoryReqData, WarehouseInventoryEntity>;
  removeItem?: ServiceApiCaller<WarehouseInventoryReqData, WarehouseInventoryEntity>;
}
export const useWarehousesService = (): WarehousesService => {
  const dispatch = useAppDispatch();
  return useMemo(
    (): WarehousesService => ({
      getAll: args => dispatch(getAllWarehousesThunk(args)),
      getById: args => dispatch(getWarehouseByIdThunk(args)),
      create: args => dispatch(createWarehouseThunk(args)),
    }),
    [dispatch]
  );
};
export default useWarehousesService;
