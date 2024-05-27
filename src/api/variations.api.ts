import APP_CONFIGS from '../redux/APP_CONFIGS';
import { AppQueryParams } from './index';
import { AppResponse } from '../redux/app-redux.types';
import { IVariationReqData, VariationEntity } from 'types/offers/variations.types';
import { ClientApi } from './client.api';

export default class VariationsApi {
  private static api = ClientApi.clientRef;
  private static endpoints = APP_CONFIGS.endpoints.variationsApiEndpoints;

  public static async getAll(params?: AppQueryParams): Promise<AppResponse<VariationEntity[]>> {
    return this.api.get(this.endpoints.getAll(), { params });
  }

  public static async getAllByProductId(data?: {
    offerId: string;
    params?: AppQueryParams;
  }): Promise<AppResponse<VariationEntity[]>> {
    return this.api.get(this.endpoints.getAllByProductId(data?.offerId), { params: data?.params });
  }

  public static async create(data?: IVariationReqData): Promise<AppResponse<VariationEntity>> {
    return this.api.post(this.endpoints.create(), data?.data, { params: data?.params });
  }

  public static async updateById(data?: IVariationReqData): Promise<AppResponse<VariationEntity>> {
    return this.api.patch(this.endpoints.updateById(data?._id), data?.data, { params: data?.params });
  }

  public static async getById(data?: IVariationReqData): Promise<AppResponse<VariationEntity>> {
    return this.api.get(this.endpoints.getById(data?._id), { params: data?.params });
  }

  public static async deleteById(data?: IVariationReqData): Promise<AppResponse<VariationEntity[]>> {
    return this.api.delete(this.endpoints.deleteById(data?._id), { params: data?.params });
  }
}
