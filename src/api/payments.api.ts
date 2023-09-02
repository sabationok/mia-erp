import baseApi from './baseApi';
import APP_CONFIGS from '../redux/APP_CONFIGS';
import { AppQueryParams } from './index';

export default class PaymentsApi {
  private static api = baseApi;
  private static endpoints = APP_CONFIGS.endpoints.payments;

  public static createForOrder() {
    return this.api.post(this.endpoints.create());
  }
  public static getAllOrder(params?: AppQueryParams) {
    return this.api.get(this.endpoints.create(), { params });
  }
}
