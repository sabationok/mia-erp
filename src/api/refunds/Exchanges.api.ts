import { ClientApi } from '../client.api';
import { ApiAxiosResponse, ApiRequestConfig } from '../api.types';
import { ExchangeEntity } from '../../types/refunds/exchange.types';

export class ExchangesApi {
  private static client = ClientApi.clientRef;
  private static endpoints = ClientApi._endpoints.refunds.exchanges;

  static getOne = (input: Omit<ApiRequestConfig, 'data'>): Promise<ApiAxiosResponse<ExchangeEntity>> => {
    return this.client.get(this.endpoints.getOne(), input);
  };
  static getAll = (input: Omit<ApiRequestConfig, 'data'>): Promise<ApiAxiosResponse<ExchangeEntity[]>> => {
    return this.client.get(this.endpoints.getAll(), input);
  };

  static create = (input: ApiRequestConfig): Promise<ApiAxiosResponse<ExchangeEntity[]>> => {
    return this.client.post(this.endpoints.create(), input.data, input);
  };

  static update = (input: ApiRequestConfig): Promise<ApiAxiosResponse<ExchangeEntity[]>> => {
    return this.client.patch(this.endpoints.update(), input.data, input);
  };
}
