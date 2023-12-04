import baseApi from './baseApi';
import APP_CONFIGS from '../redux/APP_CONFIGS';
import {
  ICreateOrdersWithSlotsAndGroupByWarehousesReqData,
  IOrder,
  IOrderRes,
  IOrderSlot,
} from '../types/orders/orders.types';
import { AppResponse, OnlyUUID } from '../redux/global.types';
import { AppQueryParams } from './index';

export default class OrdersApi {
  private static api = baseApi;
  private static endpoints = APP_CONFIGS.endpoints.ordersEndpoints;

  public static getAll(...args: any[]): Promise<AppResponse<IOrder[]>> {
    return this.api.get(this.endpoints.getAll());
  }

  public static getById(data?: OnlyUUID & { params?: { fullInfo?: boolean } }): Promise<AppResponse<IOrder>> {
    return this.api.get(this.endpoints.getOrderById(data?._id), { params: data?.params });
  }

  public static createOne(...args: any[]): Promise<AppResponse<IOrder>> {
    return this.api.post(this.endpoints.create());
  }

  public static getSlots = (query?: AppQueryParams): Promise<AppResponse<IOrderSlot[]>> => {
    return this.api.get(this.endpoints.getSlots(), { params: query });
  };

  public static createManyOrdersGroupedByWarehouse = (
    data?: ICreateOrdersWithSlotsAndGroupByWarehousesReqData
  ): Promise<IOrderRes> => {
    return this.api.post(
      this.endpoints.createManyOrdersGroupedByWarehouse(),
      { slots: data?.data.slots, ...data?.data.info },
      { params: data?.params }
    );
  };

  // public static  deleteOne(...args: any[]): Promise<AppResponse<IOrder & { result: boolean }>> {
  //   return this.api.delete(this.endpoints.deleteById());
  // }
  //
  // public static  updateOne(...args: any[]): Promise<IOrderRes> {
  //   return this.api.patch(this.endpoints.updateList());
  // }
  //
  // public static  getAllSlotsByOrderId(...args: any[]): Promise<AppResponse<IOrderSlot[]>> {
  //   return this.api.get(this.endpoints.getAllOrderSlots());
  // }
  // private static  addOrderSlot(...args: any[]): Promise<AppResponse<IOrderSlot>> {
  //   return this.api.post(this.endpoints.addSlotToOrder());
  // }
  // private static  softDeleteOrderSlot(...args: any[]): Promise<AppResponse<IOrderSlot & { result: boolean }>> {
  //   return this.api.get(this.endpoints.softDeleteSlotFromOrder());
  // }
  // private static  addOrderSlotItem(order: OnlyUUID): Promise<AppResponse<IOrderSlot>> {
  //   return this.api.post(this.endpoints.addItemToOrderSlot(order._id));
  // }
  // private static  softDeleteOrderSlotItem(...args: any[]): Promise<AppResponse<IOrderSlot & { result: boolean }>> {
  //   return this.api.get(this.endpoints.softDeleteOrderSlotItem());
  // }
}
