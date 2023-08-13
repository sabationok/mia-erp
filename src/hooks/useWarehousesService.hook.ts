import { useMemo } from 'react';
import { ServiceApiCaller, ServiceDispatcher } from '../redux/global.types';
import { AppQueryParams } from '../api';
import { IWarehouse } from '../redux/warehouses/warehouses.types';
import { getAllWarehousesThunk, getWarehouseByIdThunk } from '../redux/warehouses/warehouses.thunks';
import { defaultThunkPayload } from '../utils/fabrics';
import { useAppDispatch } from '../redux/store.store';

export interface WarehousesService {
  getAll: ServiceDispatcher<{ refresh?: boolean; query?: AppQueryParams }, IWarehouse[]>;
  getAllTables?: ServiceApiCaller;
  getTableById?: ServiceApiCaller;
  getById: ServiceDispatcher<IWarehouse, Partial<IWarehouse>>;
}
export const useWarehousesService = (): WarehousesService => {
  const dispatch = useAppDispatch();
  return useMemo(
    (): WarehousesService => ({
      getAll: async p => dispatch(getAllWarehousesThunk(defaultThunkPayload(p))),
      getById: args => dispatch(getWarehouseByIdThunk(defaultThunkPayload(args))),
    }),
    [dispatch]
  );
};
export default useWarehousesService;
