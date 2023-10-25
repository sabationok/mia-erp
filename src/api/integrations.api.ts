import APP_CONFIGS from '../redux/APP_CONFIGS';
import { AppQueryParams } from './index';
import baseApi from './baseApi';
import { ExtIntegrationBase, ExtIntegrationBaseDto, ExtServiceBase } from '../redux/integrations/integrations.types';
import { AppResponse } from '../redux/global.types';

export default class IntegrationsApi {
  private static api = baseApi;
  private static endpoints = APP_CONFIGS.endpoints.integrations;

  public static createExternal(data?: { data: ExtIntegrationBaseDto }): Promise<AppResponse<ExtIntegrationBase>> {
    return this.api.post(this.endpoints.createExt(), data?.data);
  }

  public static createInternal(data?: { data: ExtIntegrationBaseDto }): Promise<AppResponse<ExtIntegrationBase>> {
    return this.api.post(this.endpoints.createInt(), data?.data);
  }

  public static getAllExtIntegrationServices(params?: AppQueryParams<ExtServiceBase>) {
    return this.api.get(this.endpoints.getAllExtIntegrationServices(), { params });
  }

  public static getAllByQueries(params?: AppQueryParams) {
    return this.api.get(this.endpoints.getAll(), { params });
  }
}
