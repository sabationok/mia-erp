import APP_CONFIGS, { IntegrationType } from '../redux/APP_CONFIGS';
import { AppQueries } from './index';
import baseApi from './baseApi';
import {
  InputIntegrationBase,
  InputIntegrationDto,
  OutputIntegrationBase,
  OutputIntegrationDto,
} from '../types/integrations.types';
import { AppResponse } from '../redux/global.types';

export interface GetAllIntegrationsQueries extends Pick<AppQueries, 'warehouseId' | 'serviceId'> {
  type: IntegrationType;
}
export default class ExtServicesApi {
  private static api = baseApi;
  private static endpoints = APP_CONFIGS.endpoints.integrations;

  public static createInputIntegration(data?: {
    data: InputIntegrationDto;
  }): Promise<AppResponse<InputIntegrationBase>> {
    return this.api.post(this.endpoints.create('input'), data?.data);
  }

  public static createOutputIntegration(data?: {
    data: OutputIntegrationDto;
  }): Promise<AppResponse<InputIntegrationBase>> {
    return this.api.post(this.endpoints.create('output'), data?.data);
  }

  public static updateOutputIntegration(data?: {
    data: OutputIntegrationDto;
  }): Promise<AppResponse<InputIntegrationBase>> {
    return this.api.post(this.endpoints.create('output'), data?.data);
  }

  // public static getAllExtIntegrationServices(
  //   params?: AppQueryParams<ExtServiceBase>
  // ): Promise<AppResponse<ExtServiceBase[]>> {
  //   console.log(params);
  //   return this.api.get(this.endpoints.getAll(), { params });
  // }

  public static getAllByQueries(
    params?: GetAllIntegrationsQueries
  ): Promise<AppResponse<(InputIntegrationBase | OutputIntegrationBase)[]>> {
    return this.api.get(this.endpoints.getAll(params?.type), { params });
  }
}
