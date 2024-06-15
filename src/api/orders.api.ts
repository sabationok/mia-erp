import APP_CONFIGS from '../redux/APP_CONFIGS';
import { ICreateOrdersGroupDto, IOrderRes, OrderEntity } from '../types/orders/orders.types';
import { AppResponse, OnlyUUID } from '../redux/app-redux.types';
import { AppQueryParams } from './index';
import { ClientApi } from './client.api';
import { OrderSlotEntity } from '../types/orders/order-slot.types';

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
export default class OrdersApi {
  private static api = ClientApi.clientRef;
  private static endpoints = APP_CONFIGS.endpoints.ordersEndpoints;
  public static readonly groups = OrderGroupsApi;
  public static readonly slots = OrderSlotsApi;
  public static getAll(...args: any[]): Promise<AppResponse<OrderEntity[]>> {
    return this.api.get(this.endpoints.getAll());
  }

  public static getById(data?: OnlyUUID & { params?: { fullInfo?: boolean } }): Promise<AppResponse<OrderEntity>> {
    return this.api.get(this.endpoints.getOrderById(data?._id), { params: data?.params });
  }

  public static createOne(...args: any[]): Promise<AppResponse<OrderEntity>> {
    return this.api.post(this.endpoints.create());
  }
}
