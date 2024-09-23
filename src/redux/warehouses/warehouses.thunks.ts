import { WarehousesApi } from '../../api';
import { createAppAsyncThunk } from '../createAppAsynkThunk';

enum WarehousingThunkType {
  getAll = 'warehouses/getAllThunk',
  create = 'warehouses/createThunk',
  getById = 'warehouses/getByIdThunk',
  update = 'warehouses/updateThunk',
}

export const getAllWarehousesThunk = createAppAsyncThunk(WarehousingThunkType.getAll, WarehousesApi.getAll);
export const createWarehouseThunk = createAppAsyncThunk(WarehousingThunkType.create, WarehousesApi.create);
export const updateWarehouseThunk = createAppAsyncThunk(WarehousingThunkType.update, WarehousesApi.update);
export const getWarehouseByIdThunk = createAppAsyncThunk(WarehousingThunkType.getById, WarehousesApi.getById);
