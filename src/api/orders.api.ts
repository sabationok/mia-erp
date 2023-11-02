import baseApi from './baseApi';
import APP_CONFIGS from '../redux/APP_CONFIGS';
import {
  IAllOrdersRes,
  ICreateOrdersWithSlotsAndGroupByWarehousesReqData,
  IOrderRes,
} from '../redux/orders/orders.types';
import { AppQueryParams } from './index';

export default class OrdersApi {
  private static api = baseApi;
  private static endpoints = APP_CONFIGS.endpoints.ordersEndpoints;

  public static async getAll(...args: any[]): Promise<IAllOrdersRes> {
    return this.api.get(this.endpoints.getAll());
  }

  public static async getById(...args: any[]): Promise<IOrderRes> {
    return this.api.get(this.endpoints.getById());
  }

  public static async createOne(...args: any[]): Promise<IOrderRes> {
    return this.api.post(this.endpoints.create());
  }

  public static async createManyOrdersGroupedByWarehouse(
    data?: ICreateOrdersWithSlotsAndGroupByWarehousesReqData
  ): Promise<IOrderRes> {
    return this.api.post(this.endpoints.createManyOrdersGroupedByWarehouse(), data?.data, { params: data?.params });
  }

  public static async createGroupWithSlots(
    data?: ICreateOrdersWithSlotsAndGroupByWarehousesReqData,
    params?: AppQueryParams
  ): Promise<IOrderRes> {
    return this.api.post(this.endpoints.create(), data, { params });
  }

  // public static async deleteOne(...args: any[]): Promise<AppResponse<IOrder & { result: boolean }>> {
  //   return this.api.delete(this.endpoints.deleteById());
  // }
  //
  // public static async updateOne(...args: any[]): Promise<IOrderRes> {
  //   return this.api.patch(this.endpoints.updateList());
  // }
  //
  // public static async getAllSlotsByOrderId(...args: any[]): Promise<AppResponse<IOrderSlot[]>> {
  //   return this.api.get(this.endpoints.getAllOrderSlots());
  // }
  // private static async addOrderSlot(...args: any[]): Promise<AppResponse<IOrderSlot>> {
  //   return this.api.post(this.endpoints.addSlotToOrder());
  // }
  // private static async softDeleteOrderSlot(...args: any[]): Promise<AppResponse<IOrderSlot & { result: boolean }>> {
  //   return this.api.get(this.endpoints.softDeleteSlotFromOrder());
  // }
  // private static async addOrderSlotItem(order: OnlyUUID): Promise<AppResponse<IOrderSlot>> {
  //   return this.api.post(this.endpoints.addItemToOrderSlot(order._id));
  // }
  // private static async softDeleteOrderSlotItem(...args: any[]): Promise<AppResponse<IOrderSlot & { result: boolean }>> {
  //   return this.api.get(this.endpoints.softDeleteOrderSlotItem());
  // }
}
