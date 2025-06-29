import PropertiesApi from '../../../api/properties.api';
import { createAppAsyncThunk2 } from '../../createAppAsynkThunk2';

enum PropertiesThunkType {
  getAll = 'offers/properties/getAll/Thunk',
  create = 'offers/properties/create/Thunk',
  update = 'offers/properties/update/Thunk',
  getOne = 'offers/properties/getOne/Thunk',
  delete = 'offers/properties/delete/Thunk',
}

export const getAllPropertiesThunk = createAppAsyncThunk2(PropertiesThunkType.getAll, PropertiesApi.getAll);
export const createPropertyThunk = createAppAsyncThunk2(PropertiesThunkType.create, PropertiesApi.create);
export const updatePropertyThunk = createAppAsyncThunk2(PropertiesThunkType.update, PropertiesApi.updateById);
export const getOnePropertyThunk = createAppAsyncThunk2(PropertiesThunkType.getOne, PropertiesApi.getAll);
export const deletePropertyThunk = createAppAsyncThunk2(PropertiesThunkType.delete, PropertiesApi.deleteById);
