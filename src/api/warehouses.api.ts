import APP_CONFIGS from '../redux/APP_CONFIGS';
import { ApiQueryParams } from './index';
import {
  IWarehouseDocReqData,
  IWarehouseReqData,
  WarehouseEntity,
  WarehouseItemEntity,
} from '../types/warehousing/warehouses.types';
import { ApiResponse, OnlyUUID } from '../redux/app-redux.types';
import { ClientApi } from './client.api';

export class WarehouseInventoriesApi {
  private static api = ClientApi.clientRef;
  private static endpoints = APP_CONFIGS.endpoints.warehousing.inventories;

  public static getAll = (
    params?: Pick<ApiQueryParams, 'warehouseId' | 'offerId' | 'variationId'>
  ): Promise<ApiResponse<WarehouseItemEntity[]>> => {
    return this.api.get(this.endpoints.getAll(), { params });
  };
}

export class WarehousingDocumentsApi {
  private static api = ClientApi.clientRef;
  private static endpoints = APP_CONFIGS.endpoints.warehousing.documents;
  public static createDocument = (input?: IWarehouseDocReqData): Promise<ApiResponse<WarehouseItemEntity>> => {
    return this.api.post(this.endpoints.create(), input?.data, { params: input?.params });
  };
}
export class WarehousesApi {
  private static api = ClientApi.clientRef;
  private static endpoints = APP_CONFIGS.endpoints.warehousing;
  public static inventories = WarehouseInventoriesApi;
  public static documents = WarehousingDocumentsApi;

  public static createWarehouse = (data?: IWarehouseReqData): Promise<ApiResponse<WarehouseEntity>> => {
    return this.api.post(this.endpoints.create(), data?.data, { params: data?.params });
  };

  public static updateWarehouse = (data?: IWarehouseReqData): Promise<ApiResponse<WarehouseEntity>> => {
    return this.api.patch(this.endpoints.update(data?._id), data?.data);
  };
  public static getById = (warehouse?: OnlyUUID, params?: ApiQueryParams): Promise<ApiResponse<WarehouseEntity>> => {
    return this.api.get(this.endpoints.getById(warehouse?._id), { params: params });
  };

  public static getAll = (
    params?: Pick<ApiQueryParams, 'ids' | 'label' | 'barCode'>
  ): Promise<ApiResponse<WarehouseEntity[]>> => {
    return this.api.get(this.endpoints.getAll(), { params: params });
  };
}

export default WarehousesApi;
