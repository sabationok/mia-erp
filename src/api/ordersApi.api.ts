import baseApi from './baseApi';
import APP_CONFIGS from '../redux/APP_CONFIGS';
import { IOrderRes } from '../redux/orders/orders.types';

export default class OrdersApi {
  private static api = baseApi;
  private static endpoints = APP_CONFIGS.endpoints;

  public static async getAll(...args: any[]): Promise<any> {
    return this.api.get('');
  }

  public static async getById(...args: any[]): Promise<any> {
    return this.api.get('');
  }

  public static async getAllSlotsByOrderId(...args: any[]): Promise<any> {
    return this.api.get('');
  }

  public static async createOne(...args: any[]): Promise<IOrderRes> {
    return this.api.post('');
  }

  public static async deleteOne(...args: any[]): Promise<any> {
    return this.api.delete('');
  }

  public static async updateOne(...args: any[]): Promise<any> {
    return this.api.patch('');
  }
}
