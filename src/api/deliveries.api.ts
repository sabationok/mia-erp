import { ApiAxiosResponse, ApiQueryParams, ApiRequestConfig } from './api.types';
import { IDeliveryMethod, IDeliveryMethodReqData } from '../types/integrations.types';
import { ClientApi } from './client.api';
import { DeliveryEntity } from '../types/deliveries.types';

export class DeliveryMethodsApi {
  private static _client = ClientApi.clientRef;
  private static endpoints = ClientApi._endpoints.deliveries.methods;

  public static getAll = (): Promise<ApiAxiosResponse<IDeliveryMethod[]>> => {
    return this._client.get(this.endpoints.getAll());
  };

  public static update = (
    config: ApiRequestConfig<IDeliveryMethodReqData['data'], IDeliveryMethodReqData['params']>
  ): Promise<ApiAxiosResponse<IDeliveryMethod>> => {
    return this._client.patch(this.endpoints.update(), config?.data, config);
  };
}
export class DeliveriesApi {
  private static api = ClientApi.clientRef;
  private static endpoints = ClientApi._endpoints.deliveries;
  static readonly methods = DeliveryMethodsApi;
  public static createOne = (args?: any): Promise<ApiAxiosResponse<DeliveryEntity>> => {
    return this.api.post(this.endpoints.create(), args?.data);
  };
  public static getAll = (
    config: ApiRequestConfig<
      unknown,
      Partial<Pick<ApiQueryParams, 'orderId' | 'groupId' | 'customerId' | 'withDeleted'>>
    >
  ): Promise<ApiAxiosResponse<DeliveryEntity[]>> => {
    return this.api.get(this.endpoints.getAll(), config);
  };
  public static getOne = (
    config: ApiRequestConfig<
      unknown,
      Partial<Pick<ApiQueryParams, 'orderId' | 'groupId' | 'customerId' | 'withDeleted'>>
    >
  ) => {
    return this.api.get(this.endpoints.getOne(), config);
  };
}

export default DeliveriesApi;
