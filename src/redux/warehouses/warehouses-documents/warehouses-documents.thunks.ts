import { createAppAsyncThunk } from '../../createAppAsynkThunk';
import { WarehousesApi } from '../../../api';

enum WarehousingThunkType {
  getAll = 'warehousesDocuments/getAllThunk',
  create = 'warehousesDocuments/createThunk',
  getById = 'warehousesDocuments/getByIdThunk',
  update = 'warehousesDocuments/updateThunk',
}

export const getAllWrhsDocsThunk = createAppAsyncThunk(WarehousingThunkType.getAll, WarehousesApi.getAll);
export const createWrhsDocThunk = createAppAsyncThunk(WarehousingThunkType.create, WarehousesApi.create);
