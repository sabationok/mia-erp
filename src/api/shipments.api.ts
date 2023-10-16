import APP_CONFIGS from '../redux/APP_CONFIGS';
import { AppQueryParams } from './index';
import baseApi from './baseApi';
import { AppResponse } from '../redux/global.types';
import { IShipmentMethod, IShipmentMethodReqData } from '../redux/shipments/shipments.types';

export default class ShipmentsApi {
  private static api = baseApi;
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
  ): Promise<AppResponse<IShipmentMethod[]>> {
    return this.api.get(this.endpoints.getAllMethods(), { params });
  }
  public static updateMethod(args: IShipmentMethodReqData): Promise<AppResponse<IShipmentMethod>> {
    return this.api.patch(this.endpoints.updateMethod(args._id), args.data, { params: args?.params });
  }
}
