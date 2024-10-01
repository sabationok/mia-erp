import { ExternalServiceTypeEnum, ExtServiceBase } from '../types/integrations.types';
import { ApiAxiosResponse } from './api.types';
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

  public static setDefaultInput = (data?: {
    serviceId: string;
    inputId: string;
  }): Promise<ApiAxiosResponse<ExtServiceBase[]>> => {
    return this.api.patch(this.endpoints.setDefaultInput(data?.serviceId, data?.inputId));
  };
}
