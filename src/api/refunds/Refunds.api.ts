import { ClientApi } from '../client.api';
import { ApiAxiosResponse, ApiRequestConfig } from '../api.types';
import { RefundEntity } from '../../types/refunds';

export class RefundsApi {
  private static client = ClientApi.clientRef;
  private static endpoints = ClientApi._endpoints.refunds;

  static getOne = (input: Omit<ApiRequestConfig, 'data'>): Promise<ApiAxiosResponse<RefundEntity>> => {
    return this.client.get(this.endpoints.getOne(), input);
  };
  static getAll = (input: Omit<ApiRequestConfig, 'data'>): Promise<ApiAxiosResponse<RefundEntity[]>> => {
    return this.client.get(this.endpoints.getAll(), input);
  };

  static create = (input: ApiRequestConfig): Promise<ApiAxiosResponse<RefundEntity[]>> => {
    return this.client.post(this.endpoints.create(), input.data, input);
  };

  static update = (input: ApiRequestConfig): Promise<ApiAxiosResponse<RefundEntity[]>> => {
    return this.client.patch(this.endpoints.update(), input.data, input);
  };
}
