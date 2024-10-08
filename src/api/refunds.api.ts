import { ApiAxiosResponse, OnlyUUID } from '../redux/app-redux.types';
import { OfferEntity } from '../types/offers/offers.types';
import { IAllRefundsRes, IRefund, IRefundRes, IRefundSlot } from '../redux/refunds/refunds.types';
import { ClientApi } from './client.api';

export default class RefundsApi {
  private static api = ClientApi.clientRef;
  private static endpoints = ClientApi._endpoints.refunds;

  public static async getAll(...args: any[]): Promise<IAllRefundsRes> {
    return this.api.get(this.endpoints.getAll());
  }

  public static async getById(...args: any[]): Promise<IRefundRes> {
    return this.api.get(this.endpoints.getById());
  }

  public static async createOne(...args: any[]): Promise<IRefundRes> {
    return this.api.post(this.endpoints.create());
  }

  public static async deleteOne(...args: any[]): Promise<ApiAxiosResponse<IRefund & { result: boolean }>> {
    return this.api.delete(this.endpoints.deleteById());
  }

  // public static async updateOne(...args: any[]): Promise<IRefundRes> {
  //   return this.api.patch(this.endpoints.up());
  // }

  public static async getAllSlotsByRefundId(...args: any[]): Promise<ApiAxiosResponse<IRefundSlot[]>> {
    return this.api.get(this.endpoints.getAllRefundSlots());
  }
  public static async addRefundSlot(...args: any[]): Promise<ApiAxiosResponse<IRefundSlot>> {
    return this.api.post(this.endpoints.addSlotToRefund());
  }
  public static async softDeleteRefundSlot(
    ...args: any[]
  ): Promise<ApiAxiosResponse<IRefundSlot & { result: boolean }>> {
    return this.api.get(this.endpoints.softDeleteSlotFromRefund());
  }
  public static async addRefundSlotItem(order: OnlyUUID): Promise<ApiAxiosResponse<IRefundSlot>> {
    return this.api.post(this.endpoints.addItemToRefundSlot(order._id));
  }
  public static async softDeleteRefundSlotItem(
    ...args: any[]
  ): Promise<ApiAxiosResponse<IRefundSlot & { result: boolean }>> {
    return this.api.get(this.endpoints.softDeleteRefundSlotItem());
  }

  public static async getPreparedDataForNewSlot(product?: OnlyUUID): Promise<ApiAxiosResponse<OfferEntity>> {
    return this.api.get(this.endpoints.getDataForNewRefundSlot(product?._id));
  }
}
