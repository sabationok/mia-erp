import { ClientApi } from '../client.api';
import { ApiAxiosResponse, ApiRequestConfig } from '../api.types';
import { CreateRefundRequestDto, RefundRequestEntity, UpdateRefundRequestDto } from '../../types/refunds';

export class RefundRequestsApi {
  private static client = ClientApi.clientRef;
  private static endpoints = ClientApi._endpoints.refunds.requests;

  static getOne = (input: Omit<ApiRequestConfig, 'data'>): Promise<ApiAxiosResponse<RefundRequestEntity>> => {
    return this.client.get(this.endpoints.getOne(), input);
  };
  static getAll = (input: Omit<ApiRequestConfig, 'data'>): Promise<ApiAxiosResponse<RefundRequestEntity[]>> => {
    return this.client.get(this.endpoints.getAll(), input);
  };

  static create = (
    input: ApiRequestConfig<CreateRefundRequestDto>
  ): Promise<ApiAxiosResponse<RefundRequestEntity[]>> => {
    return this.client.post(this.endpoints.create(), input.data, input);
  };

  static update = (
    input: ApiRequestConfig<UpdateRefundRequestDto>
  ): Promise<ApiAxiosResponse<RefundRequestEntity[]>> => {
    return this.client.patch(this.endpoints.update(), input.data, input);
  };
}
