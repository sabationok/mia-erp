import APP_CONFIGS from '../redux/APP_CONFIGS';
import { AppQueries } from './index';
import baseApi from './baseApi';
import { ExternalServiceTypeEnum, ExtServiceBase } from '../types/integrations.types';
import { AppResponse } from '../redux/global.types';

export interface GetIntegrationsListQuery extends Pick<AppQueries, 'warehouseId' | 'serviceId'> {
  type: 'external' | 'internal';
}
export default class ExtServicesApi {
  private static api = baseApi;
  private static endpoints = APP_CONFIGS.endpoints.extServices;

  public static getExtServicesList(params?: {
    type?: ExternalServiceTypeEnum;
  }): Promise<AppResponse<ExtServiceBase[]>> {
    return this.api.get(this.endpoints.getList(), { params });
  }
}
