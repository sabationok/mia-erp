import baseApi from './baseApi';
import APP_CONFIGS from '../redux/APP_CONFIGS';
import { AppQueryParams } from './index';
import { IProductInventory, IWarehouse, IWarehouseDocReqData, IWarehouseReqData } from '../types/warehouses.types';
import { AppResponse, OnlyUUID } from '../redux/global.types';

export class WarehousesApi {
  private static api = baseApi;
  private static endpoints = APP_CONFIGS.endpoints.warehousesEndpoints;

  public static async createWarehouse(data?: IWarehouseReqData): Promise<AppResponse<IWarehouse>> {
    return this.api.post(this.endpoints.create(), data?.data, { params: data?.params });
  }

  public static async updateWarehouse(data?: IWarehouseReqData): Promise<AppResponse<IWarehouse>> {
    return this.api.patch(this.endpoints.update(data?._id), data?.data);
  }
  public static async getById(warehouse?: OnlyUUID, params?: AppQueryParams): Promise<AppResponse<IWarehouse>> {
    return this.api.get(this.endpoints.getById(warehouse?._id), { params: params });
  }

  public static async getAllWarehouses(params?: AppQueryParams): Promise<AppResponse<IWarehouse[]>> {
    return this.api.get(this.endpoints.getAll(), { params: params });
  }

  public static async getAllInventories(params?: AppQueryParams): Promise<AppResponse<IProductInventory[]>> {
    return this.api.get(this.endpoints.getAllInventories(), { params });
  }

  // public static async getPriceListById(list?: OnlyUUID, params?: AppQueryParams): Promise<IWarehouseRe> {
  //   return this.api.get(this.endpoints.getById(list?._id), { params: params });
  // }
  //
  public static async createDocument(input?: IWarehouseDocReqData): Promise<AppResponse<IProductInventory>> {
    return this.api.post(this.endpoints.createDocument(), input?.data, { params: input?.params });
  }
  //
  // public static async getAllItems(params?: {
  //   listId?: OnlyUUID;
  //   productId?: OnlyUUID;
  // }): Promise<IAllPriceListItemsRes> {
  //   return this.api.get(this.endpoints.getAllPrices(), { params });
  // }
}

export default WarehousesApi;
