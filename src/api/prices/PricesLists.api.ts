import { ClientApi } from '../client.api';
import { ApiAxiosResponse, OnlyUUID } from '../../redux/app-redux.types';
import { PriceListApiReqConfig, PriceListEntity } from '../../types/price-management';
import { ApiQueryParams } from '../index';

export class PriceListsApi {
  private static _client = ClientApi.clientRef;
  private static endpoints = ClientApi._endpoints.priceManagement;

  public static create = async (config?: PriceListApiReqConfig): Promise<ApiAxiosResponse<PriceListEntity>> => {
    return this._client.post(this.endpoints.lists.create(), config?.data);
  };

  public static update = async ({ data }: PriceListApiReqConfig): Promise<ApiAxiosResponse<PriceListEntity>> => {
    return this._client.patch(this.endpoints.lists.update(), data);
  };

  public static getAll = async ({
    params,
  }: {
    params?: ApiQueryParams;
  }): Promise<ApiAxiosResponse<PriceListEntity[]>> => {
    return this._client.get(this.endpoints.getAll(), { params });
  };

  public static getOne = async ({ params }: { params?: OnlyUUID }): Promise<ApiAxiosResponse<PriceListEntity>> => {
    return this._client.get(this.endpoints.lists.getOne(), { params });
  };
}
