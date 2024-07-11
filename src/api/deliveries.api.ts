import APP_CONFIGS from '../redux/APP_CONFIGS';
import { AppQueryParams } from './index';
import { ApiResponse } from '../redux/app-redux.types';
import { IDeliveryMethod, IDeliveryMethodReqData } from '../types/integrations.types';
import { ClientApi } from './client.api';
import { IDelivery } from '../types/deliveries.types';

export class DeliveryMethodsApi {
  private static api = ClientApi.clientRef;
  private static endpoints = APP_CONFIGS.endpoints.deliveries.methods;

  public static getAll = (
    params?: Pick<AppQueryParams, 'disabled' | 'isDefault'>
  ): Promise<ApiResponse<IDeliveryMethod[]>> => {
    return this.api.get(this.endpoints.getAll(), { params });
  };
  public static update = (args?: IDeliveryMethodReqData): Promise<ApiResponse<IDeliveryMethod>> => {
    return this.api.patch(this.endpoints.update(), args?.data, { params: args?.params });
  };
}
export class DeliveriesApi {
  private static api = ClientApi.clientRef;
  private static endpoints = APP_CONFIGS.endpoints.deliveries;
  static readonly methods = DeliveryMethodsApi;
  public static createOne = (args?: any, params?: AppQueryParams): Promise<ApiResponse<IDelivery>> => {
    return this.api.post(this.endpoints.create(), args?.data);
  };
  public static getAll = (
    _?: undefined,
    params?: Partial<Pick<AppQueryParams, 'orderId' | 'groupId' | 'customerId' | 'withDeleted'>>
  ): Promise<ApiResponse<IDelivery[]>> => {
    return this.api.get(this.endpoints.getAll(), { params });
  };
  public static getById = (id?: string, params?: AppQueryParams) => {
    return this.api.get(this.endpoints.getById(id), { params });
  };
}

export default DeliveriesApi;
