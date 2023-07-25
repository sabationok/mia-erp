import baseApi from './baseApi';
import APP_CONFIGS from '../redux/APP_CONFIGS';
import { AppResponse, OnlyUUID } from '../redux/global.types';
import {
  IAllPriceListsRes,
  IPriceListReqData,
  IPriceListRes,
  PriceListItemDto,
} from '../redux/priceManagement/priceManagement.types';
import { AppQueryParams } from './index';

export class PriceManagementApi {
  private static api = baseApi;
  private static endpoints = APP_CONFIGS.endpoints.priceManagamentEndpoins;

  public static async createPriceList(data?: IPriceListReqData): Promise<IPriceListRes> {
    return this.api.post(this.endpoints.createList(), data?.data);
  }

  public static async getAllPriceLists(query?: AppQueryParams): Promise<IAllPriceListsRes> {
    return this.api.get(this.endpoints.getAll(), { params: query });
  }

  public static async getPriceListById(list?: OnlyUUID, query?: AppQueryParams): Promise<IPriceListRes> {
    return this.api.get(this.endpoints.getById(list?._id), { params: query });
  }

  public static async addItemToList(input?: {
    list: OnlyUUID;
    data?: PriceListItemDto;
  }): Promise<AppResponse<IPriceListRes> | undefined> {
    return input ? this.api.post(this.endpoints.addItemToList(input?.list._id), input?.data) : undefined;
  }
}
