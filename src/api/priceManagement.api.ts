import baseApi from './baseApi';
import APP_CONFIGS from '../redux/APP_CONFIGS';
import { OnlyUUID } from '../redux/global.types';
import {
  IAllPriceListItemsRes,
  IAllPriceListsRes,
  ICreatePriceListItemReqData,
  IPriceListReqData,
  IPriceListRes,
} from '../redux/priceManagement/priceManagement.types';
import { AppQueryParams } from './index';

export class PriceManagementApi {
  private static api = baseApi;
  private static endpoints = APP_CONFIGS.endpoints.priceManagementEndpoints;

  public static async createPriceList(data?: IPriceListReqData): Promise<IPriceListRes> {
    return this.api.post(this.endpoints.createList(), data?.data);
  }

  public static async updatePriceList(data?: IPriceListReqData): Promise<IPriceListRes> {
    return this.api.patch(this.endpoints.updateList(data?._id), data?.data);
  }

  public static async getAllPriceLists(query?: AppQueryParams): Promise<IAllPriceListsRes> {
    return this.api.get(this.endpoints.getAll(), { params: query });
  }

  public static async getPriceListById(list?: OnlyUUID, query?: AppQueryParams): Promise<IPriceListRes> {
    return this.api.get(this.endpoints.getById(list?._id), { params: query });
  }

  public static async addItemToList(input?: ICreatePriceListItemReqData): Promise<IPriceListRes> {
    return this.api.post(this.endpoints.addItemToList(input?.list._id), input?.data);
  }

  public static async getAllItems(params?: {
    listId?: OnlyUUID;
    productId?: OnlyUUID;
  }): Promise<IAllPriceListItemsRes> {
    return this.api.get(this.endpoints.getAllPrices(), { params });
  }
}

export default PriceManagementApi;
