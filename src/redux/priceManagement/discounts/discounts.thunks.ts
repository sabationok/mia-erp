import { PriceManagementApi } from '../../../api';
import { createAppAsyncThunk } from '../../createAppAsynkThunk';

enum TypeEnum {
  getAll = 'prices/discounts/getAll/Thunk',
  create = 'prices/discounts/create/Thunk',
  update = 'prices/discounts/update/Thunk',
  getOne = 'prices/discounts/getOne/Thunk',
  remove = 'prices/discounts/remove/Thunk',
}

export const getAllDiscountsThunk = createAppAsyncThunk(TypeEnum.getAll, PriceManagementApi.discounts.getAll);
export const createDiscountThunk = createAppAsyncThunk(TypeEnum.create, PriceManagementApi.discounts.create);
export const updateDiscountThunk = createAppAsyncThunk(TypeEnum.update, PriceManagementApi.discounts.update);
export const getDiscountThunk = createAppAsyncThunk(TypeEnum.getOne, PriceManagementApi.discounts.getOne);
export const removeDiscountThunk = createAppAsyncThunk(TypeEnum.remove, PriceManagementApi.discounts.remove);
