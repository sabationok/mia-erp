import { ClientApi } from '../client.api';
import { ICreatePriceReqData, PriceEntity, UpdatePriceDto } from '../../types/price-management';
import { ApiAxiosResponse, ApiQueryParams } from '../api.types';

export type GetAllPricesQuery = Pick<ApiQueryParams, 'listId' | 'offerId' | 'variationId'>;

export interface GetOnePriceQuery {
  _id?: string;
}

export class PricesApi {
  private static _client = ClientApi.clientRef;
  private static endpoints = ClientApi._endpoints.priceManagement.prices;

  public static getOne = async (config: { params?: GetOnePriceQuery }): Promise<ApiAxiosResponse<PriceEntity>> => {
    return this._client.get(this.endpoints.getOne(), config);
  };

  public static getAll = async (config: { params?: GetAllPricesQuery }): Promise<ApiAxiosResponse<PriceEntity[]>> => {
    return this._client.get(this.endpoints.getAll(), config);
  };

  public static create = async (input?: ICreatePriceReqData): Promise<ApiAxiosResponse<PriceEntity>> => {
    return this._client.post(this.endpoints.create(), input?.data);
  };
  public static update = async (input?: { data: UpdatePriceDto }): Promise<ApiAxiosResponse<PriceEntity>> => {
    return this._client.patch(this.endpoints.update(), input?.data);
  };
  public static delete = async ({ params }: { params?: GetOnePriceQuery }): Promise<ApiAxiosResponse<PriceEntity>> => {
    return this._client.delete(this.endpoints.delete(), { params });
  };
}
