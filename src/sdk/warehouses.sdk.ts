import type { ApiAxiosResponse, ApiQueryParams } from '../api';
import type {
  IWarehouseDocReqData,
  IWarehouseReqData,
  WarehouseEntity,
  WarehouseInventoryDto,
  WarehouseInventoryEntity,
} from '../types/warehousing';
import type { ApiClientManager } from '../api/ApiClientManager';
import { OnlyUUID } from '../types/utils.types';
import { BaseSdk } from './abstract-base-sdk';

export class WarehouseInventoriesSdk extends BaseSdk {
  private endpoints = this.manager._endpoints.warehousing.inventories;

  getAll = (
    params?: Pick<ApiQueryParams, 'warehouseId' | 'offerId' | 'variationId'>
  ): Promise<ApiAxiosResponse<WarehouseInventoryEntity[]>> => {
    return this._client.get(this.endpoints.getAll(), { params });
  };
  create = (args?: { data: WarehouseInventoryDto }): Promise<ApiAxiosResponse<WarehouseInventoryEntity[]>> => {
    return this._client.post(this.endpoints.create(), args?.data);
  };
}

export class WarehousingDocumentsSdk extends BaseSdk {
  private endpoints = this.manager._endpoints.warehousing.documents;

  create = (input?: IWarehouseDocReqData): Promise<ApiAxiosResponse<WarehouseInventoryEntity>> => {
    return this._client.post(this.endpoints.create(), input?.data, { params: input?.params });
  };

  getAll = (input?: Pick<IWarehouseDocReqData, 'params'>): Promise<ApiAxiosResponse<WarehouseInventoryEntity[]>> => {
    return this._client.get(this.endpoints.create(), { params: input?.params });
  };
}

export class WarehousesSdk extends BaseSdk {
  private endpoints = this.manager._endpoints.warehousing;
  inventories: WarehouseInventoriesSdk;
  documents: WarehousingDocumentsSdk;

  constructor(manager: ApiClientManager) {
    super(manager);
    this.inventories = new WarehouseInventoriesSdk(manager);
    this.documents = new WarehousingDocumentsSdk(manager);
  }
  create = (data?: IWarehouseReqData): Promise<ApiAxiosResponse<WarehouseEntity>> => {
    return this._client.post(this.endpoints.create(), data?.data, { params: data?.params });
  };

  update = (data?: IWarehouseReqData): Promise<ApiAxiosResponse<WarehouseEntity>> => {
    return this._client.patch(this.endpoints.update(), data?.data);
  };
  getById = (data?: OnlyUUID, params?: Pick<ApiQueryParams, '_id'>): Promise<ApiAxiosResponse<WarehouseEntity>> => {
    return this._client.get(this.endpoints.getById(data?._id), { params: params });
  };

  getAll = (
    params?: Pick<ApiQueryParams, 'ids' | 'label' | 'barCode'>
  ): Promise<ApiAxiosResponse<WarehouseEntity[]>> => {
    return this._client.get(this.endpoints.getAll(), { params: params });
  };
}
