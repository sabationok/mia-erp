import { ClientApi } from './client.api';
import { AppResponse } from '../redux/app-redux.types';
import { PriceDiscountDto, PriceDiscountEntity } from '../types/price-management/discounts';
import { AppQueryParams } from './index';

export interface GetDiscountQuery {
  getOffers?: boolean;
  getPrices?: boolean;
  getSlots?: boolean;
  getPricesLists?: boolean;
}
export interface GetAllDiscountsQuery
  extends Pick<AppQueryParams, 'priceId' | 'offerId' | 'listId' | 'offset' | 'limit' | 'ids'> {}
export class DiscountsApi {
  private static readonly _client = ClientApi.clientRef;
  private static readonly _BASE_URL = 'price-management/discounts';
  private static readonly _endpoints = {
    getAll: `${this._BASE_URL}/getAll`,
    create: `${this._BASE_URL}/create`,
    update: `${this._BASE_URL}/update`,
    getOne: `${this._BASE_URL}/one`,
  };

  public static readonly getAll = (
    _?: undefined,
    params?: GetAllDiscountsQuery
  ): Promise<AppResponse<PriceDiscountEntity[]>> => {
    return this._client.get(this._endpoints.getAll, { params });
  };
  public static readonly getOne = (
    _?: undefined,
    params?: GetDiscountQuery
  ): Promise<AppResponse<PriceDiscountEntity>> => {
    return this._client.get(this._endpoints.getOne, { params });
  };
  public static readonly create = (data?: PriceDiscountDto): Promise<AppResponse<PriceDiscountEntity>> => {
    return this._client.post(this._endpoints.create, data);
  };

  public static readonly update = (data?: {
    dto: PriceDiscountDto;
    _id: string;
  }): Promise<AppResponse<PriceDiscountEntity>> => {
    return this._client.patch(this._endpoints.create, data);
  };
}
