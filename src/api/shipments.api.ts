import APP_CONFIGS from '../redux/APP_CONFIGS';
import { AppQueryParams } from './index';
import { ApiResponse } from '../redux/app-redux.types';
import { IDeliveryMethod } from '../types/integrations.types';
import { ClientApi } from './client.api';

export default class ShipmentsApi {
  private static api = ClientApi.clientRef;
  private static endpoints = APP_CONFIGS.endpoints.shipments;

  public static createOne(args?: any, params?: AppQueryParams) {
    return this.api.post(this.endpoints.create());
  }
  public static getAllByQueries(params?: AppQueryParams) {
    return this.api.get(this.endpoints.getAll(), { params });
  }
  public static getById(id?: string, params?: AppQueryParams) {
    return this.api.get(this.endpoints.getAll(), { params });
  }

  public static getAllMethods(
    params?: Pick<AppQueryParams, 'disabled' | 'isDefault'>
  ): Promise<ApiResponse<IDeliveryMethod[]>> {
    return this.api.get(this.endpoints.getAllMethods(), { params });
  }
  public static updateMethod(args: any): Promise<ApiResponse<IDeliveryMethod>> {
    return this.api.patch(this.endpoints.updateMethod(args._id), args.data, { params: args?.params });
  }
}
