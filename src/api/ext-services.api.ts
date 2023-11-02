import APP_CONFIGS from '../redux/APP_CONFIGS';
import { AppQueries, AppQueryParams } from './index';
import baseApi from './baseApi';
import { ExtServiceBase } from '../redux/integrations/integrations.types';
import { AppResponse } from '../redux/global.types';

export interface GetAllIntegrationsQueries extends Pick<AppQueries, 'warehouseId' | 'serviceId'> {
  type: 'external' | 'internal';
}
export default class ExtServicesApi {
  private static api = baseApi;
  private static endpoints = APP_CONFIGS.endpoints.extServices;

  public static getAllExtServices(params?: AppQueryParams): Promise<AppResponse<ExtServiceBase[]>> {
    return this.api.get(this.endpoints.getAll(), { params });
  }
}
