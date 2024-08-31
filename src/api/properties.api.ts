import { ApiAxiosResponse } from '../redux/app-redux.types';
import { IPropertyReqData, PropertyEntity } from 'types/offers/properties.types';
import { ClientApi } from './client.api';

export default class PropertiesApi {
  private static api = ClientApi.clientRef;
  private static endpoints = ClientApi._endpoints.propertiesApiEndpoints;

  public static getAll = (
    _?: undefined,
    params?: IPropertyReqData['params']
  ): Promise<ApiAxiosResponse<PropertyEntity[]>> => {
    return this.api.get(this.endpoints.getAll(), {
      params: {
        dataView: 'list',
        ...params,
      },
    });
  };
  public static getAllInTree = (
    _?: undefined,
    params?: IPropertyReqData['params']
  ): Promise<ApiAxiosResponse<PropertyEntity[]>> => {
    return this.api.get(this.endpoints.getAll(), {
      params: {
        dataView: 'tree',
        depth: 3,
        ...params,
      },
    });
  };

  public static create = (
    data?: IPropertyReqData,
    params?: IPropertyReqData['params']
  ): Promise<ApiAxiosResponse<PropertyEntity>> => {
    return this.api.post(this.endpoints.create(), data?.data, {
      params: {
        dataView: 'list',
        getAll: false,
        ...data?.params,
        ...params,
      },
    });
  };

  public static updateById = (
    data?: IPropertyReqData,
    params?: IPropertyReqData['params']
  ): Promise<ApiAxiosResponse<PropertyEntity>> => {
    return this.api.patch(this.endpoints.updateById(data?._id), data?.data, {
      params: {
        dataView: 'list',
        getAll: false,
        ...data?.params,
        ...params,
      },
    });
  };

  public static getById = (
    data?: IPropertyReqData,
    params?: IPropertyReqData['params']
  ): Promise<ApiAxiosResponse<PropertyEntity>> => {
    return this.api.get(this.endpoints.getById(data?._id), {
      params: {
        ...data?.params,
        ...params,
      },
    });
  };

  public static deleteById = (data?: IPropertyReqData): Promise<ApiAxiosResponse<PropertyEntity>> => {
    return this.api.delete(this.endpoints.deleteById(data?._id), {
      params: {
        getAll: false,
        dataView: 'list',
        ...data?.params,
      },
    });
  };
}
