import { ApiQueryParams } from './index';
import { ApiAxiosResponse } from '../redux/app-redux.types';
import { IDeliveryMethod } from '../types/integrations.types';
import { ClientApi } from './client.api';

export default class ShipmentsApi {
  private static api = ClientApi.clientRef;
  private static endpoints = ClientApi._endpoints.shipments;

  public static createOne(args?: any, params?: ApiQueryParams) {
    return this.api.post(this.endpoints.create());
  }
  public static getAllByQueries(params?: ApiQueryParams) {
    return this.api.get(this.endpoints.getAll(), { params });
  }
  public static getById(id?: string, params?: ApiQueryParams) {
    return this.api.get(this.endpoints.getAll(), { params });
  }

  public static getAllMethods(
    params?: Pick<ApiQueryParams, 'disabled' | 'isDefault'>
  ): Promise<ApiAxiosResponse<IDeliveryMethod[]>> {
    return this.api.get(this.endpoints.getAllMethods(), { params });
  }
  public static updateMethod(args: any): Promise<ApiAxiosResponse<IDeliveryMethod>> {
    return this.api.patch(this.endpoints.updateMethod(args._id), args.data, { params: args?.params });
  }
}
