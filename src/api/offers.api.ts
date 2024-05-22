import APP_CONFIGS from '../redux/APP_CONFIGS';
import { AppQueryParams } from './index';
import { IOfferDefaultsDto, IProductReqData, OfferEntity } from '../types/offers/offers.types';
import { AppResponse } from '../redux/global.types';
import { ClientApi } from './client.api';
import { UUID } from '../types/utils.types';

export interface GetOneOfferQuery {
  _id?: UUID;
  sku?: string;
  label?: string;
  langKey?: string;
  getPrices?: boolean;
  getVariations?: boolean;
  getDiscounts?: boolean;
}
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

  public static getById = (id?: string, params?: AppQueryParams): Promise<AppResponse<OfferEntity>> => {
    return this.api.get(this.endpoints.getById(id), { params });
  };

  public static getOne = ({ params }: { params?: GetOneOfferQuery } = {}): Promise<AppResponse<OfferEntity>> => {
    return this.api.get(this.endpoints.getOne(), { params });
  };

  public static getFullInfoById = (id?: string, params?: AppQueryParams): Promise<AppResponse<OfferEntity>> => {
    return this.api.get(this.endpoints.getFullInfoById(id), { params });
  };

  public static deleteById = (id?: string): Promise<AppResponse<OfferEntity>> => {
    return this.api.delete(this.endpoints.deleteById(id));
  };
}
