import APP_CONFIGS from '../redux/APP_CONFIGS';
import { AppQueryParams } from './index';
import {
  WarehouseItemEntity,
  WarehouseEntity,
  IWarehouseDocReqData,
  IWarehouseReqData,
} from '../types/warehousing/warehouses.types';
import { AppResponse, OnlyUUID } from '../redux/app-redux.types';
import { ClientApi } from './client.api';

export class WarehousesApi {
  private static api = ClientApi.clientRef;
  private static endpoints = APP_CONFIGS.endpoints.warehousing;

  public static async createWarehouse(data?: IWarehouseReqData): Promise<AppResponse<WarehouseEntity>> {
    return this.api.post(this.endpoints.create(), data?.data, { params: data?.params });
  }

  public static async updateWarehouse(data?: IWarehouseReqData): Promise<AppResponse<WarehouseEntity>> {
    return this.api.patch(this.endpoints.update(data?._id), data?.data);
  }
  public static async getById(warehouse?: OnlyUUID, params?: AppQueryParams): Promise<AppResponse<WarehouseEntity>> {
    return this.api.get(this.endpoints.getById(warehouse?._id), { params: params });
  }

  public static async getAllWarehouses(params?: AppQueryParams): Promise<AppResponse<WarehouseEntity[]>> {
    return this.api.get(this.endpoints.getAll(), { params: params });
  }

  public static async getAllInventories(params?: AppQueryParams): Promise<AppResponse<WarehouseItemEntity[]>> {
    return this.api.get(this.endpoints.getAllInventories(), { params });
  }

  // public static async getPriceListById(list?: OnlyUUID, params?: AppQueryParams): Promise<IWarehouseRe> {
  //   return this.api.get(this.endpoints.getById(list?._id), { params: params });
  // }
  //
  public static async createDocument(input?: IWarehouseDocReqData): Promise<AppResponse<WarehouseItemEntity>> {
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
