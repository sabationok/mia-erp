import { ClientApi } from './client.api';
import APP_CONFIGS from '../redux/APP_CONFIGS';
import { AppResponse, OnlyUUID } from '../redux/global.types';
import {
  ICreatePriceReqData,
  IPriceList,
  IPriceListItem,
  IPriceListReqData,
  IUpdatePriceReqData,
} from '../types/priceManagement.types';
import { AppQueryParams } from './index';

export class PriceManagementApi {
  private static api = ClientApi.clientRef;
  private static endpoints = APP_CONFIGS.endpoints.priceManagementEndpoints;

  public static async createPriceList(data?: IPriceListReqData): Promise<AppResponse<IPriceList>> {
    return this.api.post(this.endpoints.createList(), data?.data);
  }

  public static async updatePriceList(data?: IPriceListReqData): Promise<AppResponse<IPriceList>> {
    return this.api.patch(this.endpoints.updateList(data?._id), data?.data);
  }

  public static async getAllPriceLists(query?: AppQueryParams): Promise<AppResponse<IPriceList[]>> {
    return this.api.get(this.endpoints.getAll(), { params: query });
  }

  public static async getPriceListById(list?: OnlyUUID, query?: AppQueryParams): Promise<AppResponse<IPriceList>> {
    return this.api.get(this.endpoints.getById(list?._id), { params: query });
  }

  public static async createPrice(input?: ICreatePriceReqData): Promise<AppResponse<IPriceListItem>> {
    return this.api.post(this.endpoints.createPrice(), input?.data);
  }
  public static async updatePriceById(input?: IUpdatePriceReqData): Promise<AppResponse<IPriceListItem>> {
    return this.api.post(this.endpoints.updatePrice(input?._id), input?.data);
  }

  public static async getAllPricesByListId(
    params?: Pick<AppQueryParams, 'list'>
  ): Promise<AppResponse<IPriceListItem[]>> {
    return this.api.get(this.endpoints.getAllPrices(), { params });
  }
  public static async getAllPricesByProductId(
    params?: Pick<AppQueryParams, 'product' | 'list' | 'variation'>
  ): Promise<AppResponse<IPriceListItem[]>> {
    return this.api.get(this.endpoints.getAllPrices(), { params });
  }
  public static async getAllPrices(
    params?: Pick<AppQueryParams, 'product' | 'list' | 'variation'>
  ): Promise<AppResponse<IPriceListItem[]>> {
    return this.api.get(this.endpoints.getAllPrices(), { params });
  }

  // !
  public static async getAllForUser(params?: {
    search: string | undefined;
    searchBy: string | undefined;
  }): Promise<AppResponse<IPriceListItem[]>> {
    return this.api.get('', { params });
  }
}

export default PriceManagementApi;
