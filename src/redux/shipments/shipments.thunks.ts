import { ShipmentsApi } from '../../api';
import { createAppAsyncThunk } from '../createAppAsynkThunk';

enum ThunkTypeEnum {
  _base = 'shipments',
  getAll = `${_base}/getAll/Thunk`,

  _methods = `${_base}/methods`,
  getAllMethods = `${_methods}/getAllThunk`,
  updateMethod = `${_methods}/updateThunk`,
}

export const getAllDeliveryMethodsThunk = createAppAsyncThunk(ThunkTypeEnum.getAllMethods, ShipmentsApi.getAllMethods);
export const updateShipmentMethodThunk = createAppAsyncThunk(ThunkTypeEnum.updateMethod, ShipmentsApi.updateMethod);
