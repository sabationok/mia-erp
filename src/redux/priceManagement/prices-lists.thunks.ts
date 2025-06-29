import { createAppAsyncThunk2 } from '../createAppAsynkThunk2';
import { PriceManagementApi } from '../../api';

enum ThunkType {
  getAll = 'prices/lists/getAll/Thunk',
  create = 'prices/lists/create/Thunk',
  update = 'prices/lists/update/Thunk',
  delete = 'prices/lists/delete/Thunk',
  getOne = 'prices/lists/getOne/Thunk',
}

export const getAllPriceListsThunk = createAppAsyncThunk2(ThunkType.getAll, PriceManagementApi.lists.getAll);
// export const deleteAllPriceListThunk = createAppAsyncThunk2(
//   ThunkType.delete,
//   PriceManagementApi.lists.getAll
// );
export const createPriceListThunk = createAppAsyncThunk2(ThunkType.create, PriceManagementApi.lists.create);

export const getPriceListThunk = createAppAsyncThunk2(ThunkType.getOne, PriceManagementApi.lists.getOne);

export const updatePriceListThunk = createAppAsyncThunk2(ThunkType.update, PriceManagementApi.lists.update);
