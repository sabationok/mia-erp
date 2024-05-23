import APP_CONFIGS from '../redux/APP_CONFIGS';
import { AppResponse } from '../redux/global.types';
import { IProperty, IPropertyReqData } from 'types/offers/properties.types';
import { ClientApi } from './client.api';

export default class PropertiesApi {
  private static api = ClientApi.clientRef;
  private static endpoints = APP_CONFIGS.endpoints.propertiesApiEndpoints;

  public static getAll = ({ data }: { data?: IPropertyReqData }): Promise<AppResponse<IProperty[]>> => {
    return this.api.get(this.endpoints.getAll(), {
      params: {
        dataView: 'tree',
        ...data?.params,
      },
    });
  };

  public static create = (data?: IPropertyReqData): Promise<AppResponse<IProperty[]>> => {
    return this.api.post(this.endpoints.create(), data?.data, {
      params: {
        getAll: true,
        dataView: 'tree',
        ...data?.params,
      },
    });
  };

  public static updateById = (data?: IPropertyReqData): Promise<AppResponse<IProperty[]>> => {
    return this.api.patch(this.endpoints.updateById(data?._id), data?.data, {
      params: {
        getAll: true,
        dataView: 'tree',
        ...data?.params,
      },
    });
  };

  public static getById = (data?: IPropertyReqData): Promise<AppResponse<IProperty>> => {
    return this.api.get(this.endpoints.getById(data?._id), {
      params: {
        dataView: 'tree',
        ...data?.params,
      },
    });
  };

  public static deleteById = (data?: IPropertyReqData): Promise<AppResponse<IProperty[]>> => {
    return this.api.delete(this.endpoints.deleteById(data?._id), {
      params: {
        getAll: true,
        dataView: 'tree',
        ...data?.params,
      },
    });
  };
}
