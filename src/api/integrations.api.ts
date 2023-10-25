import APP_CONFIGS from '../redux/APP_CONFIGS';
import { AppQueryParams } from './index';
import baseApi from './baseApi';
import { ExtServiceBase } from '../redux/integrations/integrations.types';

export default class IntegrationsApi {
  private static api = baseApi;
  private static endpoints = APP_CONFIGS.endpoints.integrations;

  public static create() {
    return this.api.post(this.endpoints.create());
  }

  public static getAllExtIntegrationServices(params?: AppQueryParams<ExtServiceBase>) {
    return this.api.get(this.endpoints.getAllExtIntegrationServices(), { params });
  }

  public static getAllByQueries(params?: AppQueryParams) {
    return this.api.get(this.endpoints.getAll(), { params });
  }
}
