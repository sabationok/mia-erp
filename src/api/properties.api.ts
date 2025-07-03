import { CreatePropertyDto, PropertyEntity, UpdatePropertyDto } from 'types/offers/properties.types';
import { ClientApi } from './client.api';
import { ApiAxiosResponse, ApiQueryParams, ApiRequestConfig } from './api.types';

export type PropertyApiReqConfig = ApiRequestConfig<
  CreatePropertyDto,
  Pick<ApiQueryParams, 'dataView' | 'getAll' | 'depth' | 'parentId' | 'withDeleted'>
>;
export type UpdatePropertyApiReqConfig = ApiRequestConfig<
  UpdatePropertyDto,
  Pick<ApiQueryParams, 'dataView' | 'getAll' | 'depth' | 'parentId' | 'withDeleted'>
>;

export default class PropertiesApi {
  private static api = ClientApi.clientRef;
  private static endpoints = ClientApi._endpoints.offers.properties;

  public static getAll = (config: Omit<PropertyApiReqConfig, 'data'>): Promise<ApiAxiosResponse<PropertyEntity[]>> => {
    return this.api.get(this.endpoints.getAll(), {
      ...config,
      params: {
        ...config.params,
        dataView: 'list',
      },
    });
  };
  public static getTree = (config: Omit<PropertyApiReqConfig, 'data'>): Promise<ApiAxiosResponse<PropertyEntity[]>> => {
    return this.api.get(this.endpoints.getAll(), {
      ...config,
      params: {
        ...config.params,
        depth: 3,
        dataView: 'tree',
      },
    });
  };

  public static create = ({ data, ...config }: PropertyApiReqConfig): Promise<ApiAxiosResponse<PropertyEntity>> => {
    return this.api.post(this.endpoints.create(), data, config);
  };

  public static updateById = ({
    data,
    ...config
  }: UpdatePropertyApiReqConfig): Promise<ApiAxiosResponse<PropertyEntity>> => {
    return this.api.patch(this.endpoints.update(), data, config);
  };

  public static getOne = (config?: Omit<PropertyApiReqConfig, 'data'>): Promise<ApiAxiosResponse<PropertyEntity>> => {
    return this.api.get(this.endpoints.getOne(), {
      ...config,
      params: {
        ...config?.params,
      },
    });
  };

  public static deleteById = (
    config?: Omit<PropertyApiReqConfig, 'data'>
  ): Promise<ApiAxiosResponse<PropertyEntity>> => {
    return this.api.delete(this.endpoints.delete(), {
      ...config,
      params: {
        dataView: 'list',
        ...config?.params,
      },
    });
  };
}
