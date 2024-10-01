import { createAppAsyncThunk } from '../../createAppAsynkThunk';
import { WarehousesApi } from '../../../api';

enum WarehouseseDocsThunkType {
  getAll = 'warehousesDocuments/getAllThunk',
  create = 'warehousesDocuments/createThunk',
  getById = 'warehousesDocuments/getByIdThunk',
  update = 'warehousesDocuments/updateThunk',
}

export const getAllWrhsDocsThunk = createAppAsyncThunk(WarehouseseDocsThunkType.getAll, WarehousesApi.documents.getAll);
export const createWrhsDocThunk = createAppAsyncThunk(WarehouseseDocsThunkType.create, WarehousesApi.documents.create);
