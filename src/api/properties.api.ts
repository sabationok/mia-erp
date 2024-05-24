import APP_CONFIGS from '../redux/APP_CONFIGS';
import { AppResponse } from '../redux/global.types';
import { IPropertyReqData, PropertyEntity } from 'types/offers/properties.types';
import { ClientApi } from './client.api';

export default class PropertiesApi {
  private static api = ClientApi.clientRef;
  private static endpoints = APP_CONFIGS.endpoints.propertiesApiEndpoints;

  public static getAll = ({ data }: { data?: IPropertyReqData }): Promise<AppResponse<PropertyEntity[]>> => {
    return this.api.get(this.endpoints.getAll(), {
      params: {
        ...data?.params,
        dataView: 'list',
      },
    });
  };
  public static getAllsTree = ({ data }: { data?: IPropertyReqData }): Promise<AppResponse<PropertyEntity[]>> => {
    return this.api.get(this.endpoints.getAll(), {
      params: {
        ...data?.params,
        dataView: 'tree',
      },
    });
  };

  public static create = (data?: IPropertyReqData): Promise<AppResponse<PropertyEntity>> => {
    return this.api.post(this.endpoints.create(), data?.data, {
      params: {
        ...data?.params,
        dataView: 'list',
        getAll: false,
      },
    });
  };

  public static updateById = (data?: IPropertyReqData): Promise<AppResponse<PropertyEntity>> => {
    return this.api.patch(this.endpoints.updateById(data?._id), data?.data, {
      params: {
        ...data?.params,
        dataView: 'list',
        getAll: false,
      },
    });
  };

  public static getById = (data?: IPropertyReqData): Promise<AppResponse<PropertyEntity>> => {
    return this.api.get(this.endpoints.getById(data?._id), {
      params: {
        ...data?.params,
      },
    });
  };

  public static deleteById = (data?: IPropertyReqData): Promise<AppResponse<PropertyEntity>> => {
    return this.api.delete(this.endpoints.deleteById(data?._id), {
      params: {
        ...data?.params,
        getAll: false,
        dataView: 'list',
      },
    });
  };
}
