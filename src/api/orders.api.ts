import APP_CONFIGS from '../redux/APP_CONFIGS';
import { ICreateOrdersGroupDto, IOrderRes, OrderEntity } from '../types/orders/orders.types';
import { AppResponse, OnlyUUID } from '../redux/app-redux.types';
import { ApiQuerySearchParams, ApiQuerySortParams, AppQueryParams } from './index';
import { ClientApi } from './client.api';
import { OrderSlotEntity } from '../types/orders/order-slot.types';
import { OrdersSearchParam, OrdersSortParam } from '../data';
import { PartialRecord, UUID } from '../types/utils.types';

export interface GetOrderSlotsApiQuery
  extends Partial<Pick<AppQueryParams, 'groupId' | 'orderId' | 'order' | 'group' | 'offerId'>> {}
export class OrderSlotsApi {
  private static api = ClientApi.clientRef;
  private static endpoints = APP_CONFIGS.endpoints.ordersEndpoints;

  public static getAll = (_?: undefined, params?: GetOrderSlotsApiQuery): Promise<AppResponse<OrderSlotEntity[]>> => {
    return this.api.get(this.endpoints.slots.getList(), { params });
  };
}

export class OrderGroupsApi {
  private static api = ClientApi.clientRef;
  private static endpoints = APP_CONFIGS.endpoints.ordersEndpoints;

  // public static getAll= ({ params }: { params?: AppQueryParams } = {}): Promise<AppResponse<IOrderSlot[]>> => {
  //   return this.api.get(this.endpoints.slots.getList(), { params });
  // };

  public static createGroupedByWarehouse = (
    data?: ICreateOrdersGroupDto,
    params?: AppQueryParams
  ): Promise<IOrderRes> => {
    return this.api.post(
      this.endpoints.createGroupedByWarehouse(),
      { slots: data?.slots, ...data?.info },
      { params: params }
    );
  };
}

export interface GetAllOrdersQuery
  extends ApiQuerySortParams<OrdersSearchParam['dataPath']>,
    ApiQuerySearchParams<OrdersSortParam['dataPath']> {
  ranges?: PartialRecord<'total' | '', [number, number]>;

  managersIds?: UUID;
  managerId?: UUID;
  warehouseId?: UUID;
  customerId?: string;
}

export interface GetOrderQuery {
  _id?: string;
  reference?: string;
  getSlots?: boolean;
  getInvoices?: boolean;
  getDeliveries?: boolean;
  getPayments?: boolean;
  fullInfo?: boolean;
}
export default class OrdersApi {
  private static api = ClientApi.clientRef;
  private static endpoints = APP_CONFIGS.endpoints.ordersEndpoints;
  public static readonly groups = OrderGroupsApi;
  public static readonly slots = OrderSlotsApi;
  public static getAll = (_?: any, params?: GetAllOrdersQuery): Promise<AppResponse<OrderEntity[]>> => {
    return this.api.get(this.endpoints.getAll(), { params });
  };
  public static getOne = (_?: unknown, params?: GetOrderQuery): Promise<AppResponse<OrderEntity>> => {
    return this.api.get(this.endpoints.getOne(), {
      params,
    });
  };
  public static getById = (
    data?: OnlyUUID & { params?: { fullInfo?: boolean } }
  ): Promise<AppResponse<OrderEntity>> => {
    return this.api.get(this.endpoints.getOrderById(data?._id), { params: data?.params });
  };

  public static createOne = (...args: any[]): Promise<AppResponse<OrderEntity>> => {
    return this.api.post(this.endpoints.create());
  };
}
