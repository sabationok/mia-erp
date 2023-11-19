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

  public static getAll(...args: any[]): Promise<IAllOrdersRes> {
    return this.api.get(this.endpoints.getAll());
  }

  public static getById(...args: any[]): Promise<IOrderRes> {
    return this.api.get(this.endpoints.getById());
  }

  public static createOne(...args: any[]): Promise<IOrderRes> {
    return this.api.post(this.endpoints.create());
  }

  public static createManyOrdersGroupedByWarehouse = (
    data?: ICreateOrdersWithSlotsAndGroupByWarehousesReqData
  ): Promise<IOrderRes> => {
    return this.api.post(
      this.endpoints.createManyOrdersGroupedByWarehouse(),
      { slots: data?.data.slots, ...data?.data.info },
      { params: data?.params }
    );
  };

  public static createGroupWithSlots = (
    data?: ICreateOrdersWithSlotsAndGroupByWarehousesReqData,
    params?: AppQueryParams
  ): Promise<IOrderRes> => {
    return this.api.post(this.endpoints.create(), data, { params });
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
