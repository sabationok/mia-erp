import PropertiesApi from '../../../api/properties.api';
import { createAppAsyncThunk } from '../../createAppAsynkThunk';

enum PropertiesThunkType {
  getAll = 'products/properties/getAllThunk',
  create = 'products/properties/createThunk',
  update = 'products/properties/updateThunk',
}

export const getAllPropertiesThunk = createAppAsyncThunk(PropertiesThunkType.getAll, PropertiesApi.getAll);

export const createPropertyThunk = createAppAsyncThunk(PropertiesThunkType.create, PropertiesApi.create);

export const updatePropertyThunk = createAppAsyncThunk(PropertiesThunkType.update, PropertiesApi.updateById);
