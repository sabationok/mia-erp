import baseApi from './baseApi';

import APP_CONFIGS from '../redux/APP_CONFIGS';
import { IProperty, IPropertyReqData } from '../redux/products/products.types';
import { AppResponse } from '../redux/global.types';

export default class PropertiesApi {
  private static api = baseApi;
  private static endpoints = APP_CONFIGS.endpoints.propertiesApiEndpoints;

  public static async getAll(data?: IPropertyReqData): Promise<AppResponse<IProperty[]>> {
    return this.api.get(this.endpoints.getAll(), { params: data?.params });
  }

  public static async create(data?: IPropertyReqData): Promise<AppResponse<IProperty[]>> {
    return this.api.post(this.endpoints.create(), data?.data, { params: data?.params });
  }

  public static async updateById(data?: IPropertyReqData): Promise<AppResponse<IProperty[]>> {
    return this.api.patch(this.endpoints.updateById(data?._id), data?.data, { params: data?.params });
  }

  public static async getById(data?: IPropertyReqData): Promise<AppResponse<IProperty>> {
    return this.api.get(this.endpoints.getById(data?._id), { params: data?.params });
  }

  public static async deleteById(data?: IPropertyReqData): Promise<AppResponse<IProperty[]>> {
    return this.api.delete(this.endpoints.deleteById(data?._id), { params: data?.params });
  }
}
