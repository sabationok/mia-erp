import { ICreateOrderInfoDto, OrderEntity, SaleOrdersGroupDto } from '../../types/orders/orders.types';
import { ApiAxiosResponse, OnlyUUID } from '../../redux/app-redux.types';
import { ApiQueryParams, ApiQuerySearchParams, ApiQuerySortParams } from '../index';
import { ClientApi } from '../client.api';
import { OrderSlotEntity, SaleOrderSlotDto, UpdateSaleOrderSlotDto } from '../../types/orders/order-slot.types';
import { OrdersSortParam, SaleOrdersSearchParam } from '../../data';
import { PartialRecord, UUID } from '../../types/utils.types';

export interface GetOrderSlotsApiQuery
  extends Partial<Pick<ApiQueryParams, 'groupId' | 'orderId' | 'order' | 'group' | 'offerId'>> {}

export class OrderSlotsApi {
  private static api = ClientApi.clientRef;
  private static endpoints = ClientApi._endpoints.ordersEndpoints.sales.slots;

  public static getAll = (input?: { params: GetOrderSlotsApiQuery }): Promise<ApiAxiosResponse<OrderSlotEntity[]>> => {
    return this.api.get(this.endpoints.getAll(), { params: input?.params });
  };

  public static getOne = (input?: { params: OnlyUUID }): Promise<ApiAxiosResponse<OrderSlotEntity[]>> => {
    return this.api.get(this.endpoints.getAll(), { params: input?.params });
  };

  public static create = (input?: { data: SaleOrderSlotDto }): Promise<ApiAxiosResponse<OrderSlotEntity>> => {
    return this.api.post(this.endpoints.create(), input?.data);
  };

  public static update = (input?: { data: UpdateSaleOrderSlotDto }): Promise<ApiAxiosResponse<OrderSlotEntity[]>> => {
    return this.api.patch(this.endpoints.update(), input?.data);
  };
  public static remove = (input?: { params: OnlyUUID }): Promise<ApiAxiosResponse<OrderSlotEntity[]>> => {
    return this.api.delete(this.endpoints.remove(), input);
  };
}

export class SaleOrderGroupsApi {
  private static api = ClientApi.clientRef;
  private static endpoints = ClientApi._endpoints.ordersEndpoints.sales.groups;
  public static createByWarehouse = (data?: SaleOrdersGroupDto, params?: undefined): Promise<any> => {
    return this.api.post(this.endpoints.createByWarehouse(), { slots: data?.slots, ...data?.info }, { params: params });
  };
}
type DataPath = Exclude<OrdersSortParam['dataPath'], undefined | number>;

export interface GetAllOrdersQuery
  extends ApiQuerySortParams<SaleOrdersSearchParam['dataPath']>,
    ApiQuerySearchParams<DataPath> {
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

export default class OrdersApi {
  public static readonly groups = SaleOrderGroupsApi;
  public static readonly slots = OrderSlotsApi;
  private static api = ClientApi.clientRef;
  private static endpoints = ClientApi._endpoints.ordersEndpoints;

  public static getAll = (_?: any, params?: GetAllOrdersQuery): Promise<ApiAxiosResponse<OrderEntity[]>> => {
    return this.api.get(this.endpoints.getAll(), { params });
  };
  public static getOne = (_?: unknown, params?: GetSaleOrderQuery): Promise<ApiAxiosResponse<OrderEntity>> => {
    return this.api.get(this.endpoints.getOne(), {
      params,
    });
  };
  public static create = (_input?: ICreateOrderInfoDto): Promise<ApiAxiosResponse<OrderEntity>> => {
    return this.api.post(this.endpoints.create());
  };
}
