import { ClientApi } from '../client.api';
import { ApiAxiosResponse, ApiRequestConfig } from '../api.types';
import { RefundSlotEntity } from '../../types/refunds/refunds.types';

export default class RefundsSlotsApi {
  private static api = ClientApi.clientRef;
  private static endpoints = ClientApi._endpoints.refunds.slots;

  public static getAll = (
    input: Omit<ApiRequestConfig<unknown>, 'data'>
  ): Promise<ApiAxiosResponse<RefundSlotEntity[]>> => {
    return this.api.get(this.endpoints.getAll(), input);
  };
  public static getOne = (
    input: Omit<ApiRequestConfig<unknown>, 'data'>
  ): Promise<ApiAxiosResponse<RefundSlotEntity>> => {
    return this.api.get(this.endpoints.getOne(), input);
  };
  public static create = (input: ApiRequestConfig): Promise<ApiAxiosResponse<RefundSlotEntity>> => {
    return this.api.post(this.endpoints.create(), input.data, input);
  };
  public static update = (input: ApiRequestConfig): Promise<ApiAxiosResponse<RefundSlotEntity>> => {
    return this.api.patch(this.endpoints.update(), input.data, input);
  };
}
