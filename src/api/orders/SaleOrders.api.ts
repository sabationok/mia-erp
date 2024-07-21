import APP_CONFIGS from '../../redux/APP_CONFIGS';
import { ICreateOrderInfoDto, OrderEntity, SaleOrdersGroupDto } from '../../types/orders/orders.types';
import { ApiResponse } from '../../redux/app-redux.types';
import { ApiQueryParams, ApiQuerySearchParams, ApiQuerySortParams } from '../index';
import { ClientApi } from '../client.api';
import { OrderSlotEntity, SaleOrderSlotDto, UpdateSaleOrderSlotDto } from '../../types/orders/order-slot.types';
import { SaleOrdersSearchParam, SaleOrdersSortParam } from '../../data';
import { PartialRecord, UUID } from '../../types/utils.types';

export interface GetOrderSlotsApiQuery
  extends Partial<Pick<ApiQueryParams, 'groupId' | 'orderId' | 'order' | 'group' | 'offerId'>> {}

export class SaleOrderSlotsApi {
  private static api = ClientApi.clientRef;
  private static endpoints = APP_CONFIGS.endpoints.ordersEndpoints.sales.slots;

  public static getAll = (
    input: {
      params?: GetOrderSlotsApiQuery;
    } = {},
    params?: GetOrderSlotsApiQuery
  ): Promise<ApiResponse<OrderSlotEntity[]>> => {
    return this.api.get(this.endpoints.getAll(), { params: input.params || params });
  };

  public static create = (input?: { data: SaleOrderSlotDto }): Promise<ApiResponse<OrderSlotEntity>> => {
    return this.api.post(this.endpoints.create(), input?.data);
  };

  public static update = (input?: { data: UpdateSaleOrderSlotDto }): Promise<ApiResponse<OrderSlotEntity[]>> => {
    return this.api.patch(this.endpoints.create(), input?.data);
  };
}

export class SaleOrderGroupsApi {
  private static api = ClientApi.clientRef;
  private static endpoints = APP_CONFIGS.endpoints.ordersEndpoints.sales.groups;
  public static createByWarehouse = (data?: SaleOrdersGroupDto, params?: undefined): Promise<any> => {
    return this.api.post(this.endpoints.createByWarehouse(), { slots: data?.slots, ...data?.info }, { params: params });
  };
}

export interface GetAllSaleOrdersQuery
  extends ApiQuerySortParams<SaleOrdersSearchParam['dataPath']>,
    ApiQuerySearchParams<SaleOrdersSortParam['dataPath']> {
  ranges?: PartialRecord<'total' | '', [number, number]>;

  managersIds?: UUID;
  managerId?: UUID;
  warehouseId?: UUID;
  customerId?: string;
}

export interface GetSaleOrderQuery {
  _id?: string;
  reference?: string;
  getSlots?: boolean;
  getInvoices?: boolean;
  getDeliveries?: boolean;
  getPayments?: boolean;
  fullInfo?: boolean;
}

export default class SaleOrdersApi {
  public static readonly groups = SaleOrderGroupsApi;
  public static readonly slots = SaleOrderSlotsApi;
  private static api = ClientApi.clientRef;
  private static endpoints = ClientApi._endpoints.ordersEndpoints;

  public static getAll = (_?: any, params?: GetAllSaleOrdersQuery): Promise<ApiResponse<OrderEntity[]>> => {
    return this.api.get(this.endpoints.getAll(), { params });
  };
  public static getOne = (_?: unknown, params?: GetSaleOrderQuery): Promise<ApiResponse<OrderEntity>> => {
    return this.api.get(this.endpoints.getOne(), {
      params,
    });
  };
  public static create = (input?: ICreateOrderInfoDto): Promise<ApiResponse<OrderEntity>> => {
    return this.api.post(this.endpoints.create());
  };
}
