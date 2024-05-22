import { ClientApi } from './client.api';
import { AppResponse } from '../redux/global.types';
import { PriceDiscountDto, PriceDiscountEntity } from '../types/price-management/discounts';

export class DiscountsApi {
  private static readonly _client = ClientApi.clientRef;
  private static readonly _BASE_URL = 'price-management/discounts';
  private static readonly _endpoints = {
    getAll: () => `${this._BASE_URL}/getAll`,
    create: () => `${this._BASE_URL}/create`,
    getOne: () => `${this._BASE_URL}/one`,
  };

  public static readonly getAll = (_?: undefined, params?: any): Promise<AppResponse<PriceDiscountEntity[]>> => {
    return this._client.get(this._endpoints.getAll(), { params });
  };
  public static readonly getOne = (_?: undefined, params?: any): Promise<AppResponse<PriceDiscountEntity>> => {
    return this._client.get(this._endpoints.getOne(), { params });
  };
  public static readonly create = (data?: PriceDiscountDto): Promise<AppResponse<PriceDiscountEntity>> => {
    return this._client.post(this._endpoints.create(), data);
  };
}
