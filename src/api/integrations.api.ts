import APP_CONFIGS from '../redux/APP_CONFIGS';
import { AppQueryParams } from './index';
import baseApi from './baseApi';
import { IntegrationProviderTypeEnum } from '../redux/integrations/integrations.types';

export default class IntegrationsApi {
  private static api = baseApi;
  private static endpoints = APP_CONFIGS.endpoints.integrations;

  public static create() {
    return this.api.post(this.endpoints.create());
  }

  public static getAllIntegrationProviders(params?: AppQueryParams<IntegrationProviderTypeEnum>) {
    return this.api.get(this.endpoints.getAllIntegrationProviders(), { params });
  }

  public static getAllByQueries(params?: AppQueryParams) {
    return this.api.get(this.endpoints.getAll(), { params });
  }
}
