import { ApiAxiosResponse, ApiQueryParams, ClientApi } from './index';
import {
  Connections,
  InputConnectionEntity,
  InputIntegrationDto,
  OutputIntegrationDto,
} from '../types/integrations.types';

export namespace ConnectionsApi {
  export type GetAllQueries<Type extends Connections.TypeEnum = Connections.TypeEnum> = Partial<
    Pick<ApiQueryParams, 'warehouseId' | 'serviceId'>
  > & {
    type?: Type;
  };
  export interface GetOneQuery {
    _id?: string;
  }

  export type GetAllQuery<Type extends Connections.TypeEnum = Connections.TypeEnum> = Partial<
    Pick<ApiQueryParams, 'warehouseId' | 'serviceId'>
  > & {
    type: Type;
  };

  export class Client {
    private static _client = ClientApi.clientRef;
    private static endpoints = ClientApi._endpoints.connections;

    public static getAll = (
      _data?: unknown,
      params?: GetAllQueries
    ): Promise<ApiAxiosResponse<(Connections.Input.Entity | Connections.Output.Entity)[]>> => {
      return this._client.get(this.endpoints.getAll(), { params: { ...params } });
    };

    public static integrations = {
      remove: (data?: {
        type: keyof typeof Connections.TypeEnum;
        _id: string | undefined;
      }): Promise<ApiAxiosResponse<{ result: boolean }>> => {
        return this._client.delete(this.endpoints.delete(Connections.TypeEnum[data?.type || 'input'], data?._id));
      },
    };

    public static input = {
      getAll: (_data?: unknown, params?: GetAllQueries): Promise<ApiAxiosResponse<Connections.Input.Entity[]>> => {
        return this._client.get(this.endpoints.getAll(), { params: { type: Connections.TypeEnum.input, ...params } });
      },
      create: (data?: {
        data: InputIntegrationDto;
        params?: { setAsDefault?: boolean };
      }): Promise<ApiAxiosResponse<Connections.Input.Entity>> => {
        return this._client.post(this.endpoints.create(Connections.TypeEnum.input), data?.data, {
          params: data?.params,
        });
      },
      getById: (
        _data?: unknown,
        params?: ConnectionsApi.GetOneQuery
      ): Promise<ApiAxiosResponse<Connections.Output.Entity>> => {
        return this._client.get(this.endpoints.getById(Connections.TypeEnum.input, params?._id), { params });
      },
    };
    public static output = {
      getById: (
        _data?: unknown,
        params?: ConnectionsApi.GetOneQuery
      ): Promise<ApiAxiosResponse<Connections.Output.Entity>> => {
        return this._client.get(this.endpoints.getById(Connections.TypeEnum.output, params?._id), { params });
      },

      getAll: (_data?: unknown, params?: GetAllQueries): Promise<ApiAxiosResponse<Connections.Output.Entity[]>> => {
        return this._client.get(this.endpoints.getAll(), { params: { ...params, type: Connections.TypeEnum.output } });
      },
      create: (data?: {
        data: OutputIntegrationDto;
        params?: { setAsDefault?: boolean };
      }): Promise<ApiAxiosResponse<InputConnectionEntity>> => {
        return this._client.post(this.endpoints.create(Connections.TypeEnum.output), data?.data, {
          params: data?.params,
        });
      },
      update: (data?: { data: OutputIntegrationDto }): Promise<ApiAxiosResponse<Connections.Input.Entity>> => {
        return this._client.post(this.endpoints.update(Connections.TypeEnum.output), data?.data);
      },
      regenerateKeys: (config?: { params: { _id: string } }) => {
        return this._client.post(this.endpoints.generateKeys(Connections.TypeEnum.output, config?.params._id ?? '_'));
      },
    };
  }
}
