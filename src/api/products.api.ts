import baseApi from './baseApi';

import APP_CONFIGS from '../redux/APP_CONFIGS';
import { AppQueryParams } from './index';
import { IAllProductsRes, ICreateProductRes, IProductReqData, IProductRes } from '../redux/products/products.types';

export default class ProductsApi {
  private static api = baseApi;
  private static endpoints = APP_CONFIGS.endpoints.products;

  public static async getAll(params?: AppQueryParams): Promise<IAllProductsRes> {
    return this.api.get(this.endpoints.getAll(), {
      params,
    });
  }

  public static async create(data?: IProductReqData): Promise<ICreateProductRes> {
    console.log('api product create', data);
    return this.api.post(this.endpoints.create(), data?.data);
  }

  public static async updateById(data?: IProductReqData): Promise<IProductRes> {
    return this.api.patch(this.endpoints.updateById(data?._id), data?.data);
  }

  public static async getById(id?: string): Promise<IProductRes> {
    return this.api.get(this.endpoints.getById(id));
  }

  public static async deleteById(id?: string): Promise<IProductRes> {
    return this.api.delete(this.endpoints.deleteById(id));
  }
}
