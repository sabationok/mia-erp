import { ApiQueryParams } from './index';
import {
  IWarehouseDocReqData,
  IWarehouseReqData,
  OfferInventoryDto,
  WarehouseEntity,
  WarehouseInventoryEntity,
} from '../types/warehousing';
import { ApiAxiosResponse, OnlyUUID } from '../redux/app-redux.types';
import { ClientApi } from './client.api';

export class WarehouseInventoriesApi {
  private static api = ClientApi.clientRef;
  private static endpoints = ClientApi._endpoints.warehousing.inventories;

  public static getAll = (
    params?: Pick<ApiQueryParams, 'warehouseId' | 'offerId' | 'variationId'>
  ): Promise<ApiAxiosResponse<WarehouseInventoryEntity[]>> => {
    return this.api.get(this.endpoints.getAll(), { params });
  };
  public static create = (args?: {
    data: OfferInventoryDto;
  }): Promise<ApiAxiosResponse<WarehouseInventoryEntity[]>> => {
    return this.api.post(this.endpoints.create(), args?.data);
  };
}

export class WarehousingDocumentsApi {
  private static api = ClientApi.clientRef;
  private static endpoints = ClientApi._endpoints.warehousing.documents;
  public static create = (input?: IWarehouseDocReqData): Promise<ApiAxiosResponse<WarehouseInventoryEntity>> => {
    return this.api.post(this.endpoints.create(), input?.data, { params: input?.params });
  };
}
export class WarehousesApi {
  private static api = ClientApi.clientRef;
  private static endpoints = ClientApi._endpoints.warehousing;
  public static inventories = WarehouseInventoriesApi;
  public static documents = WarehousingDocumentsApi;

  public static create = (data?: IWarehouseReqData): Promise<ApiAxiosResponse<WarehouseEntity>> => {
    return this.api.post(this.endpoints.create(), data?.data, { params: data?.params });
  };

  public static update = (data?: IWarehouseReqData): Promise<ApiAxiosResponse<WarehouseEntity>> => {
    return this.api.patch(this.endpoints.update(), data?.data);
  };
  public static getById = (
    warehouse?: OnlyUUID,
    params?: ApiQueryParams
  ): Promise<ApiAxiosResponse<WarehouseEntity>> => {
    return this.api.get(this.endpoints.getById(warehouse?._id), { params: params });
  };

  public static getAll = (
    params?: Pick<ApiQueryParams, 'ids' | 'label' | 'barCode'>
  ): Promise<ApiAxiosResponse<WarehouseEntity[]>> => {
    return this.api.get(this.endpoints.getAll(), { params: params });
  };
}

export default WarehousesApi;
