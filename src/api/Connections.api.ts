import { ApiAxiosResponse, ApiQueryParams, ClientApi } from './index';
import {
  Connection,
  InputConnectionEntity,
  InputIntegrationDto,
  OutputIntegrationDto,
} from '../types/integrations.types';

export namespace ConnectionsApi {
  export type GetAllQueries<Type extends Connection.TypeEnum = Connection.TypeEnum> = Partial<
    Pick<ApiQueryParams, 'warehouseId' | 'serviceId'>
  > & {
    type?: Type;
  };
  export interface GetOneQuery {
    _id?: string;
  }

  export type GetAllQuery<Type extends Connection.TypeEnum = Connection.TypeEnum> = Partial<
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
    ): Promise<ApiAxiosResponse<(Connection.Input.Entity | Connection.Output.Entity)[]>> => {
      return this._client.get(this.endpoints.getAll(), { params: { ...params } });
    };

    public static integrations = {
      remove: (data?: {
        type: keyof typeof Connection.TypeEnum;
        _id: string | undefined;
      }): Promise<ApiAxiosResponse<{ result: boolean }>> => {
        return this._client.delete(this.endpoints.delete(Connection.TypeEnum[data?.type || 'input'], data?._id));
      },
    };

    public static input = {
      getAll: (_data?: unknown, params?: GetAllQueries): Promise<ApiAxiosResponse<Connection.Input.Entity[]>> => {
        return this._client.get(this.endpoints.getAll(), { params: { type: Connection.TypeEnum.input, ...params } });
      },
      create: (data?: {
        data: InputIntegrationDto;
        params?: { setAsDefault?: boolean };
      }): Promise<ApiAxiosResponse<Connection.Input.Entity>> => {
        return this._client.post(this.endpoints.create(Connection.TypeEnum.input), data?.data, {
          params: data?.params,
        });
      },
      getById: (
        _data?: unknown,
        params?: ConnectionsApi.GetOneQuery
      ): Promise<ApiAxiosResponse<Connection.Output.Entity>> => {
        return this._client.get(this.endpoints.getById(Connection.TypeEnum.input, params?._id), { params });
      },
    };
    public static output = {
      getById: (
        _data?: unknown,
        params?: ConnectionsApi.GetOneQuery
      ): Promise<ApiAxiosResponse<Connection.Output.Entity>> => {
        return this._client.get(this.endpoints.getById(Connection.TypeEnum.output, params?._id), { params });
      },

      getAll: (_data?: unknown, params?: GetAllQueries): Promise<ApiAxiosResponse<Connection.Output.Entity[]>> => {
        return this._client.get(this.endpoints.getAll(), { params: { ...params, type: Connection.TypeEnum.output } });
      },
      create: (data?: {
        data: OutputIntegrationDto;
        params?: { setAsDefault?: boolean };
      }): Promise<ApiAxiosResponse<InputConnectionEntity>> => {
        return this._client.post(this.endpoints.create(Connection.TypeEnum.output), data?.data, {
          params: data?.params,
        });
      },
      update: (data?: { data: OutputIntegrationDto }): Promise<ApiAxiosResponse<Connection.Input.Entity>> => {
        return this._client.post(this.endpoints.update(Connection.TypeEnum.output), data?.data);
      },
    };
  }
}
