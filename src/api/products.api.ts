import baseApi from './baseApi';

import APP_CONFIGS from '../redux/APP_CONFIGS';
import { AppQueryParams } from './index';
import { IProduct, IProductReqData } from '../redux/products/products.types';
import { AppResponse } from '../redux/global.types';

export default class ProductsApi {
  private static api = baseApi;
  private static endpoints = APP_CONFIGS.endpoints.products;

  public static async getAll(params?: AppQueryParams): Promise<AppResponse<IProduct[]>> {
    return this.api.get(this.endpoints.getAll(), {
      params,
    });
  }

  public static async create(data?: IProductReqData): Promise<AppResponse<IProduct>> {
    return this.api.post(this.endpoints.create(), data?.data);
  }

  public static async updateById(data?: IProductReqData): Promise<AppResponse<IProduct>> {
    return this.api.patch(this.endpoints.updateById(data?._id), data?.data);
  }

  public static async getById(id?: string): Promise<AppResponse<IProduct>> {
    return this.api.get(this.endpoints.getById(id));
  }
  public static async getFullInfoById(id?: string): Promise<AppResponse<IProduct>> {
    return this.api.get(this.endpoints.getFullInfoById(id));
  }

  public static async deleteById(id?: string): Promise<AppResponse<IProduct>> {
    return this.api.delete(this.endpoints.deleteById(id));
  }
}
