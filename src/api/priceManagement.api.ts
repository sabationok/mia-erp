import { ClientApi } from './client.api';
import APP_CONFIGS from '../redux/APP_CONFIGS';
import { AppResponse, OnlyUUID } from '../redux/global.types';
import {
  ICreatePriceReqData,
  IPriceListReqData,
  IUpdatePriceReqData,
  OfferPriceEntity,
  PriceListEntity,
} from '../types/price-management/price-management.types';
import { AppQueryParams } from './index';

export type GetAllPricesQuery = Pick<
  AppQueryParams,
  'list' | 'listId' | 'offer' | 'offerId' | 'variation' | 'variationId'
>;
export class PriceManagementApi {
  private static api = ClientApi.clientRef;
  private static endpoints = APP_CONFIGS.endpoints.priceManagementEndpoints;

  public static async createPriceList(data?: IPriceListReqData): Promise<AppResponse<PriceListEntity>> {
    return this.api.post(this.endpoints.createList(), data?.data);
  }

  public static async updatePriceList(data?: IPriceListReqData): Promise<AppResponse<PriceListEntity>> {
    return this.api.patch(this.endpoints.updateList(data?._id), data?.data);
  }

  public static async getAllPriceLists(query?: AppQueryParams): Promise<AppResponse<PriceListEntity[]>> {
    return this.api.get(this.endpoints.getAll(), { params: query });
  }

  public static async getPriceListById(list?: OnlyUUID, query?: AppQueryParams): Promise<AppResponse<PriceListEntity>> {
    return this.api.get(this.endpoints.getById(list?._id), { params: query });
  }

  public static async createPrice(input?: ICreatePriceReqData): Promise<AppResponse<OfferPriceEntity>> {
    return this.api.post(this.endpoints.createPrice(), input?.data);
  }
  public static async updatePriceById(input?: IUpdatePriceReqData): Promise<AppResponse<OfferPriceEntity>> {
    return this.api.post(this.endpoints.updatePrice(input?._id), input?.data);
  }

  public static async getAllPricesByListId(
    params?: Pick<AppQueryParams, 'list'>
  ): Promise<AppResponse<OfferPriceEntity[]>> {
    return this.api.get(this.endpoints.getAllPrices(), { params });
  }
  public static async getAllPrices(params?: GetAllPricesQuery): Promise<AppResponse<OfferPriceEntity[]>> {
    return this.api.get(this.endpoints.getAllPrices(), { params });
  }

  // !
  public static async getAllForUser(params?: {
    search: string | undefined;
    searchBy: string | undefined;
  }): Promise<AppResponse<OfferPriceEntity[]>> {
    return this.api.get('', { params });
  }
}

export default PriceManagementApi;
