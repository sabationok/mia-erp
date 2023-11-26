import APP_CONFIGS from '../redux/APP_CONFIGS';
import { AppQueryParams } from './index';
import baseApi from './baseApi';
import { AppResponse } from '../redux/global.types';
import { IDeliveryMethod, IDeliveryMethodReqData } from '../types/integrations.types';

export default class DeliveriesApi {
  private static api = baseApi;
  private static endpoints = APP_CONFIGS.endpoints.deliveries;

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
  ): Promise<AppResponse<IDeliveryMethod[]>> {
    return this.api.get(this.endpoints.getAllMethods(), { params });
  }
  public static updateMethod(args?: IDeliveryMethodReqData): Promise<AppResponse<IDeliveryMethod>> {
    return this.api.patch(this.endpoints.updateMethod(args?._id), args?.data, { params: args?.params });
  }
}
