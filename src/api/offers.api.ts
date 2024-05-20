import APP_CONFIGS from '../redux/APP_CONFIGS';
import { AppQueryParams } from './index';
import { IOfferDefaultsDto, IProductReqData, OfferEntity } from '../types/offers/offers.types';
import { AppResponse } from '../redux/global.types';
import { ClientApi } from './client.api';

export default class OffersApi {
  private static api = ClientApi.clientRef;
  private static endpoints = APP_CONFIGS.endpoints.offers;

  public static async getAll(params?: AppQueryParams): Promise<AppResponse<OfferEntity[]>> {
    return this.api.get(this.endpoints.getAll(), {
      params,
    });
  }

  public static async create(data?: IProductReqData): Promise<AppResponse<OfferEntity>> {
    return this.api.post(this.endpoints.create(), data?.data);
  }

  public static async updateById(data?: IProductReqData): Promise<AppResponse<OfferEntity>> {
    return this.api.patch(this.endpoints.updateById(data?._id), data?.data);
  }

  public static async updateDefaultsById(data?: {
    _id: string;
    defaults: IOfferDefaultsDto;
  }): Promise<AppResponse<OfferEntity>> {
    return this.api.patch(this.endpoints.updateDefaultsById(data?._id), data?.defaults);
  }

  public static async getById(id?: string, params?: AppQueryParams): Promise<AppResponse<OfferEntity>> {
    return this.api.get(this.endpoints.getById(id), { params });
  }

  public static async getFullInfoById(id?: string, params?: AppQueryParams): Promise<AppResponse<OfferEntity>> {
    return this.api.get(this.endpoints.getFullInfoById(id), { params });
  }

  public static async deleteById(id?: string): Promise<AppResponse<OfferEntity>> {
    return this.api.delete(this.endpoints.deleteById(id));
  }
}
