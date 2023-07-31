import baseApi from './baseApi';
import APP_CONFIGS from '../redux/APP_CONFIGS';
import { IAllOrdersRes, IOrder, IOrderRes, IOrderSlot } from '../redux/orders/orders.types';
import { AppResponse } from '../redux/global.types';

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

  public static async deleteOne(...args: any[]): Promise<AppResponse<IOrder & { result: boolean }>> {
    return this.api.delete(this.endpoints.deleteById());
  }

  public static async updateOne(...args: any[]): Promise<IOrderRes> {
    return this.api.patch(this.endpoints.updateList());
  }

  public static async getAllSlotsByOrderId(...args: any[]): Promise<AppResponse<IOrderSlot[]>> {
    return this.api.get(this.endpoints.getAllOrderSlots());
  }
  public static async addOrderSlot(...args: any[]): Promise<AppResponse<IOrderSlot>> {
    return this.api.post(this.endpoints.addSlotToOrder());
  }
  public static async softDeleteOrderSlot(...args: any[]): Promise<AppResponse<IOrderSlot & { result: boolean }>> {
    return this.api.get(this.endpoints.softDeleteSlotFromOrder());
  }
  public static async addOrderSlotItem(...args: any[]): Promise<AppResponse<IOrderSlot>> {
    return this.api.post(this.endpoints.addItemToOrderSlot(), { ...args });
  }
  public static async softDeleteOrderSlotItem(...args: any[]): Promise<AppResponse<IOrderSlot & { result: boolean }>> {
    return this.api.get(this.endpoints.softDeleteOrderSlotItem());
  }
}
