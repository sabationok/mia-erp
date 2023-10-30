import APP_CONFIGS from '../redux/APP_CONFIGS';
import { AppQueries, AppQueryParams } from './index';
import baseApi from './baseApi';
import {
  ExtIntegrationBase,
  ExtIntegrationBaseDto,
  ExtServiceBase,
  IntIntegrationBase,
} from '../redux/integrations/integrations.types';
import { AppResponse } from '../redux/global.types';

export interface GetAllIntegrationsQueries extends Pick<AppQueries, 'warehouseId' | 'serviceId'> {
  type: 'external' | 'internal';
}
export default class ExtServicesApi {
  private static api = baseApi;
  private static endpoints = APP_CONFIGS.endpoints.extServices;

  public static createInputIntegration(data?: {
    data: ExtIntegrationBaseDto;
  }): Promise<AppResponse<ExtIntegrationBase>> {
    return this.api.post(this.endpoints.createInputInt(), data?.data);
  }

  public static updateOutputIntegration(data?: {
    data: ExtIntegrationBaseDto;
  }): Promise<AppResponse<ExtIntegrationBase>> {
    return this.api.post(this.endpoints.createOutputInt(), data?.data);
  }

  public static updateServiceById(data?: { data: ExtIntegrationBaseDto }): Promise<AppResponse<ExtIntegrationBase>> {
    return this.api.post(this.endpoints.updateService(), data?.data);
  }

  public static getAllExtIntegrationServices(
    params?: AppQueryParams<ExtServiceBase>
  ): Promise<AppResponse<ExtServiceBase[]>> {
    return this.api.get(this.endpoints.getAll(), { params });
  }

  public static getAllByQueries(
    params?: GetAllIntegrationsQueries
  ): Promise<AppResponse<(ExtIntegrationBase | IntIntegrationBase)[]>> {
    return this.api.get(this.endpoints.getAllIntegrationsByType(), { params });
  }
}