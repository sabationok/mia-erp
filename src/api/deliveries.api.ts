import { ApiQueryParams } from './index';
import { ApiAxiosResponse } from '../redux/app-redux.types';
import { IDeliveryMethod, IDeliveryMethodReqData } from '../types/integrations.types';
import { ClientApi } from './client.api';
import { IDelivery } from '../types/deliveries.types';

export class DeliveryMethodsApi {
  private static api = ClientApi.clientRef;
  private static endpoints = ClientApi._endpoints.deliveries.methods;

  public static getAll = (
    params?: Pick<ApiQueryParams, 'disabled' | 'isDefault'>
  ): Promise<ApiAxiosResponse<IDeliveryMethod[]>> => {
    return this.api.get(this.endpoints.getAll(), { params });
  };
  public static update = (args?: IDeliveryMethodReqData): Promise<ApiAxiosResponse<IDeliveryMethod>> => {
    return this.api.patch(this.endpoints.update(), args?.data, { params: args?.params });
  };
}
export class DeliveriesApi {
  private static api = ClientApi.clientRef;
  private static endpoints = ClientApi._endpoints.deliveries;
  static readonly methods = DeliveryMethodsApi;
  public static createOne = (args?: any, params?: ApiQueryParams): Promise<ApiAxiosResponse<IDelivery>> => {
    return this.api.post(this.endpoints.create(), args?.data);
  };
  public static getAll = (
    _?: undefined,
    params?: Partial<Pick<ApiQueryParams, 'orderId' | 'groupId' | 'customerId' | 'withDeleted'>>
  ): Promise<ApiAxiosResponse<IDelivery[]>> => {
    return this.api.get(this.endpoints.getAll(), { params });
  };
  public static getById = (id?: string, params?: ApiQueryParams) => {
    return this.api.get(this.endpoints.getById(id), { params });
  };
}

export default DeliveriesApi;
