import { PriceManagementApi } from '../../api';
import { createAppAsyncThunk } from '../createAppAsynkThunk';
import { createAppAsyncThunk2 } from '../createAppAsynkThunk2';

enum ThunkType {
  create = 'prices/create/Thunk',
  getOne = 'prices/getOne/Thunk',
  delete = 'prices/delete/Thunk',
  update = 'prices/update/Thunk',
  getAll = 'prices/getAll/Thunk',
}

export const createPriceThunk = createAppAsyncThunk2(ThunkType.create, PriceManagementApi.prices.create);

export const updatePriceThunk = createAppAsyncThunk(ThunkType.update, PriceManagementApi.prices.update);

export const getAllPricesThunk = createAppAsyncThunk2(ThunkType.getAll, PriceManagementApi.prices.getAll);

export const deletePriceFromListThunk = createAppAsyncThunk2(ThunkType.delete, PriceManagementApi.prices.delete);

export const getPriceThunk = createAppAsyncThunk2(ThunkType.getOne, PriceManagementApi.prices.getOne);
