import baseApi from './baseApi';
import APP_CONFIGS, { Endpoints } from '../redux/APP_CONFIGS';
import { AppQueryParams } from './index';
import {
  IAllWarehousesRes,
  IProductInventoriesRes,
  IWarehouse,
  IWarehouseReqData,
  IWarehouseRes,
} from '../redux/warehouses/warehouses.types';

export class WarehousesApi {
  private static api = baseApi;
  private static endpoints = APP_CONFIGS.endpoints.warehousesEndpoints;

  public static async createWarehouse(data?: IWarehouseReqData): Promise<IWarehouseRes> {
    return this.api.post(this.endpoints.create(), data?.data);
  }

  public static async updateWarehouse(data?: IWarehouseReqData): Promise<IWarehouseRes> {
    return this.api.patch(this.endpoints.updateById(data?._id || ''), data?.data);
  }
  public static async getById(warehouse?: IWarehouse, query?: AppQueryParams): Promise<IWarehouseRes> {
    return this.api.get(this.endpoints.getById(warehouse?._id || ''), { params: query });
  }

  public static async getAllWarehouses(query?: AppQueryParams): Promise<IAllWarehousesRes> {
    return this.api.get(this.endpoints.getAll(), { params: query });
  }

  public static async getAllItems(warehouse?: IWarehouse, params?: AppQueryParams): Promise<IProductInventoriesRes> {
    return this.api.get(this.endpoints[Endpoints.getById](warehouse?._id || ''), { params });
  }

  // public static async getPriceListById(list?: OnlyUUID, query?: AppQueryParams): Promise<IWarehouseRe> {
  //   return this.api.get(this.endpoints.getById(list?._id), { params: query });
  // }
  //
  // public static async addItemToList(input?: ICreatePriceListItemReqData): Promise<IPriceListRes> {
  //   return this.api.post(this.endpoints.addItemToList(input?.list._id), input?.data);
  // }
  //
  // public static async getAllItems(params?: {
  //   listId?: OnlyUUID;
  //   productId?: OnlyUUID;
  // }): Promise<IAllPriceListItemsRes> {
  //   return this.api.get(this.endpoints.getAllPrices(), { params });
  // }
}

export default WarehousesApi;
