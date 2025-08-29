import { ApiAxiosResponse, ApiQueryParams, ApiRequestConfig } from './api.types';
import { IDeliveryMethod } from '../types/integrations.types';
import { ClientApi } from './client.api';

export default class ShipmentsApi {
  private static api = ClientApi.clientRef;
  private static endpoints = ClientApi._endpoints.shipments;

  public static create = (config: ApiRequestConfig) => {
    return this.api.post(this.endpoints.create(), config.data);
  };
  public static getAll = (config: ApiRequestConfig<unknown, ApiQueryParams>) => {
    return this.api.get(this.endpoints.getAll(), config);
  };
  public static getOne = (config: ApiRequestConfig<unknown, ApiQueryParams>) => {
    return this.api.get(this.endpoints.getOne(), config);
  };

  public static getAllMethods = (
    config: ApiRequestConfig<unknown, Pick<ApiQueryParams, 'disabled' | 'isDefault'>>
  ): Promise<ApiAxiosResponse<IDeliveryMethod[]>> => {
    return this.api.get(this.endpoints.methods.getAll(), config);
  };
  public static updateMethod = (config: ApiRequestConfig): Promise<ApiAxiosResponse<IDeliveryMethod>> => {
    return this.api.patch(this.endpoints.methods.update(), config.data, config);
  };
}
