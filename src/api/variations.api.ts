import baseApi from './baseApi';
import APP_CONFIGS from '../redux/APP_CONFIGS';
import { AppQueryParams } from './index';
import { AppResponse, OnlyUUID } from '../redux/global.types';
import { IVariation, IVariationReqData } from '../redux/products/products.types';

export default class VariationsApi {
  private static api = baseApi;
  private static endpoints = APP_CONFIGS.endpoints.variationsApiEndpoints;

  public static async getAll(params?: AppQueryParams): Promise<AppResponse<IVariation[]>> {
    return this.api.get(this.endpoints.getAll(), { params });
  }

  public static async getAllByProductId(data?: {
    product: OnlyUUID;
    params?: AppQueryParams;
  }): Promise<AppResponse<IVariation[]>> {
    return this.api.get(this.endpoints.getAllByProductId(data?.product?._id), { params: data?.params });
  }

  public static async create(data?: IVariationReqData): Promise<AppResponse<IVariation>> {
    return this.api.post(this.endpoints.create(), data?.data, { params: data?.params });
  }

  public static async updateById(data?: IVariationReqData): Promise<AppResponse<IVariation[]>> {
    return this.api.patch(this.endpoints.updateById(data?._id), data?.data, { params: data?.params });
  }

  public static async getById(data?: IVariationReqData): Promise<AppResponse<IVariation>> {
    return this.api.get(this.endpoints.getById(data?._id), { params: data?.params });
  }

  public static async deleteById(data?: IVariationReqData): Promise<AppResponse<IVariation[]>> {
    return this.api.delete(this.endpoints.deleteById(data?._id), { params: data?.params });
  }
}
