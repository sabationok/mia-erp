import { ApiAxiosResponse, ApiQueryParams, ClientApi } from './index';
import {
  InputConnectionEntity,
  InputIntegrationDto,
  Integration,
  OutputIntegrationDto,
} from '../types/integrations.types';

export namespace IntegrationsApi {
  export interface GetOneQuery {
    _id?: string;
  }

  export type GetAllQuery<Type extends Integration.DirectionType = Integration.DirectionType> = Partial<
    Pick<ApiQueryParams, 'warehouseId' | 'serviceId'>
  > & {
    type: Type;
  };

  export class Client {
    private static api = ClientApi.clientRef;
    private static endpoints = ClientApi._endpoints.integrations;

    public static getAll = (
      _data?: unknown,
      params?: GetAllIntegrationsQueries
    ): Promise<ApiAxiosResponse<(Integration.Input.Entity | Integration.Output.Entity)[]>> => {
      return this.api.get(this.endpoints.getAll(params?.type), { params });
    };

    public static integrations = {
      remove: (data?: {
        type: 'input' | 'output' | undefined;
        _id: string | undefined;
      }): Promise<ApiAxiosResponse<{ result: boolean }>> => {
        return this.api.delete(this.endpoints.delete(data?.type, data?._id));
      },
    };

    public static input = {
      getAll: (
        _data?: unknown,
        params?: GetAllIntegrationsQueries
      ): Promise<ApiAxiosResponse<Integration.Input.Entity[]>> => {
        return this.api.get(this.endpoints.getAll('input'), { params });
      },
      create: (data?: {
        data: InputIntegrationDto;
        params?: { setAsDefault?: boolean };
      }): Promise<ApiAxiosResponse<Integration.Input.Entity>> => {
        return this.api.post(this.endpoints.create('input'), data?.data, { params: data?.params });
      },
      getById: (
        _data?: unknown,
        params?: IntegrationsApi.GetOneQuery
      ): Promise<ApiAxiosResponse<Integration.Output.Entity>> => {
        return this.api.get(this.endpoints.getById('input', params?._id), { params });
      },
    };
    public static output = {
      getById: (
        _data?: unknown,
        params?: IntegrationsApi.GetOneQuery
      ): Promise<ApiAxiosResponse<Integration.Output.Entity>> => {
        return this.api.get(this.endpoints.getById('output', params?._id), { params });
      },

      getAll: (
        _data?: unknown,
        params?: GetAllIntegrationsQueries
      ): Promise<ApiAxiosResponse<Integration.Output.Entity[]>> => {
        return this.api.get(this.endpoints.getAll('output'), { params });
      },
      create: (data?: {
        data: OutputIntegrationDto;
        params?: { setAsDefault?: boolean };
      }): Promise<ApiAxiosResponse<InputConnectionEntity>> => {
        return this.api.post(this.endpoints.create('output'), data?.data, {
          params: data?.params,
        });
      },
      update: (data?: { data: OutputIntegrationDto }): Promise<ApiAxiosResponse<Integration.Input.Entity>> => {
        return this.api.post(this.endpoints.update('output'), data?.data);
      },
    };
  }
}

export type GetAllIntegrationsQueries<Type extends Integration.DirectionType = Integration.DirectionType> = Partial<
  Pick<ApiQueryParams, 'warehouseId' | 'serviceId'>
> & {
  type: Type;
};
