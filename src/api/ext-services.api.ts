import { ApiQueryParams } from './index';
import { ExternalServiceTypeEnum, ExtServiceBase } from '../types/integrations.types';
import { ApiAxiosResponse } from '../redux/app-redux.types';
import { ClientApi } from './client.api';

export interface GetIntegrationsListQuery extends Pick<ApiQueryParams, 'warehouseId' | 'serviceId'> {
  type: 'external' | 'internal';
}
export default class ExtServicesApi {
  private static api = ClientApi.clientRef;
  private static endpoints = ClientApi._endpoints.extServices;

  public static getExtServicesList = (params?: {
    type?: ExternalServiceTypeEnum;
  }): Promise<ApiAxiosResponse<ExtServiceBase[]>> => {
    return this.api.get(this.endpoints.getList(), { params });
  };

  public static setDefaultInput = (data?: {
    serviceId: string;
    inputId: string;
  }): Promise<ApiAxiosResponse<ExtServiceBase[]>> => {
    return this.api.patch(this.endpoints.setDefaultInput(data?.serviceId, data?.inputId));
  };
}
