import APP_CONFIGS, { IntegrationType } from '../redux/APP_CONFIGS';
import { AppQueries } from './index';
import {
  InputIntegrationBase,
  InputIntegrationDto,
  OutputIntegrationBase,
  OutputIntegrationDto,
} from '../types/integrations.types';
import { ApiResponse } from '../redux/app-redux.types';
import { ClientApi } from './client.api';

export type GetAllIntegrationsQueries = Partial<Pick<AppQueries, 'warehouseId' | 'serviceId'>> & {
  type: IntegrationType;
};
export class ExtServicesApi {
  private static api = ClientApi.clientRef;
  private static endpoints = APP_CONFIGS.endpoints.integrations;

  public static createInputIntegration = (data?: {
    data: InputIntegrationDto;
  }): Promise<ApiResponse<InputIntegrationBase>> => {
    return this.api.post(this.endpoints.create('input'), data?.data);
  };

  public static createOutputIntegration = (data?: {
    data: OutputIntegrationDto;
    params: { setAsDefault?: boolean };
  }): Promise<ApiResponse<InputIntegrationBase>> => {
    return this.api.post(this.endpoints.create('output'), data?.data, {
      params: { setAsDefault: data?.data.setAsDefault ?? data?.params.setAsDefault },
    });
  };

  public static updateOutputIntegration = (data?: {
    data: OutputIntegrationDto;
  }): Promise<ApiResponse<InputIntegrationBase>> => {
    return this.api.post(this.endpoints.create('output'), data?.data);
  };

  public static getAllByQueries = (
    params?: GetAllIntegrationsQueries
  ): Promise<ApiResponse<(InputIntegrationBase | OutputIntegrationBase)[]>> => {
    return this.api.get(this.endpoints.getAll(params?.type), { params });
  };

  public static remove = (data?: {
    type: 'input' | 'output' | undefined;
    id: string | undefined;
  }): Promise<ApiResponse<{ result: boolean }>> => {
    return this.api.delete(this.endpoints.delete(data?.type, data?.id));
  };
}
export default ExtServicesApi;
