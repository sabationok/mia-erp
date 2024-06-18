import APP_CONFIGS from '../redux/APP_CONFIGS';
import { AppQueries } from './index';
import { ExternalServiceTypeEnum, ExtServiceBase } from '../types/integrations.types';
import { AppResponse } from '../redux/app-redux.types';
import { ClientApi } from './client.api';

export interface GetIntegrationsListQuery extends Pick<AppQueries, 'warehouseId' | 'serviceId'> {
  type: 'external' | 'internal';
}
export default class ExtServicesApi {
  private static api = ClientApi.clientRef;
  private static endpoints = APP_CONFIGS.endpoints.extServices;

  public static getExtServicesList = (params?: {
    type?: ExternalServiceTypeEnum;
  }): Promise<AppResponse<ExtServiceBase[]>> => {
    return this.api.get(this.endpoints.getList(), { params });
  };

  public static setDefaultInput = (data?: {
    serviceId: string;
    inputId: string;
  }): Promise<AppResponse<ExtServiceBase[]>> => {
    return this.api.get(this.endpoints.setDefaultInput(data?.serviceId, data?.inputId));
  };
}
