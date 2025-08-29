import { ExternalServiceTypeEnum, ExtServiceBase } from '../types/integrations.types';
import { ApiAxiosResponse, ApiRequestConfig } from './api.types';
import { ClientApi } from './client.api';

export default class ExtServicesApi {
  private static api = ClientApi.clientRef;
  private static endpoints = ClientApi._endpoints.extServices;

  public static getExtServicesList = (config?: {
    params?: {
      type: ExternalServiceTypeEnum;
    };
  }): Promise<ApiAxiosResponse<ExtServiceBase[]>> => {
    return this.api.get(this.endpoints.getAll(), config);
  };

  public static setDefaultInput = (
    config: ApiRequestConfig<{
      serviceId: string;
      inputId: string;
    }>
  ): Promise<ApiAxiosResponse<ExtServiceBase[]>> => {
    return this.api.patch(this.endpoints.setDefaultInput(config.data?.serviceId, config.data?.inputId));
  };
}
