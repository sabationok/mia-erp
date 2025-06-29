import { ClientApi } from '../client.api';
import { PriceDiscountDto, PriceDiscountEntity } from '../../types/price-management';
import { ApiAxiosResponse, ApiQueryParams, ApiRequestConfig } from '../api.types';
import { OnlyUUID } from '../../types/utils.types';

export interface GetAllDiscountsQuery
  extends Pick<ApiQueryParams, 'priceId' | 'offerId' | 'listId' | 'offset' | 'limit' | 'ids'> {}
export class DiscountsApi {
  private static readonly _client = ClientApi.clientRef;
  // private static readonly _BASE_URL = 'price-management/discounts';
  private static readonly _endpoints = ClientApi._endpoints.priceManagement.discounts;

  public static readonly getAll = (
    config?: ApiRequestConfig<unknown, GetAllDiscountsQuery>
  ): Promise<ApiAxiosResponse<PriceDiscountEntity[]>> => {
    return this._client.get(this._endpoints.getAll(), config);
  };
  public static readonly getOne = (
    config?: ApiRequestConfig<unknown, OnlyUUID>
  ): Promise<ApiAxiosResponse<PriceDiscountEntity>> => {
    return this._client.get(this._endpoints.getOne(), config);
  };
  public static readonly create = (data?: PriceDiscountDto): Promise<ApiAxiosResponse<PriceDiscountEntity>> => {
    return this._client.post(this._endpoints.create(), data);
  };

  public static readonly update = (
    data?: PriceDiscountDto & OnlyUUID
  ): Promise<ApiAxiosResponse<PriceDiscountEntity>> => {
    return this._client.patch(this._endpoints.update(), data);
  };

  public static readonly remove = (data?: {
    discountId: string;
    priceId: string;
  }): Promise<ApiAxiosResponse<{ result: boolean; discountId: string; priceId?: string }>> => {
    return this._client.patch(this._endpoints.remove(), data);
  };
}
