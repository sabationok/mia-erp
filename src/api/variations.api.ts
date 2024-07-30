import { ApiQueryParams } from './index';
import { ApiResponse } from '../redux/app-redux.types';
import { IVariationReqData, VariationEntity } from 'types/offers/variations.types';
import { ClientApi } from './client.api';

export default class VariationsApi {
  private static api = ClientApi.clientRef;
  private static endpoints = ClientApi._endpoints.variationsApiEndpoints;

  public static getAll = (
    _?: undefined,
    params?: Pick<ApiQueryParams, 'offerId' | 'label' | 'sku' | 'barCode'>
  ): Promise<ApiResponse<VariationEntity[]>> => {
    return this.api.get(this.endpoints.getAll(), { params });
  };

  public static getAllByOfferId = (
    _?: undefined,
    params?: {
      offerId: string;
    }
  ): Promise<ApiResponse<VariationEntity[]>> => {
    return this.api.get(this.endpoints.getAllByProductId(params?.offerId), { params: params });
  };

  public static create = (data?: IVariationReqData): Promise<ApiResponse<VariationEntity>> => {
    return this.api.post(this.endpoints.create(), data?.data, { params: data?.params });
  };

  public static updateById = (data?: IVariationReqData): Promise<ApiResponse<VariationEntity>> => {
    return this.api.patch(this.endpoints.updateById(data?._id), data?.data, { params: data?.params });
  };

  public static getById = (data?: IVariationReqData): Promise<ApiResponse<VariationEntity>> => {
    return this.api.get(this.endpoints.getById(data?._id), { params: data?.params });
  };

  public static deleteById = (data?: IVariationReqData): Promise<ApiResponse<VariationEntity[]>> => {
    return this.api.delete(this.endpoints.deleteById(data?._id), { params: data?.params });
  };
}
