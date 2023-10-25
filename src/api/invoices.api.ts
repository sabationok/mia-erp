import APP_CONFIGS from '../redux/APP_CONFIGS';
import { AppQueryParams } from './index';
import baseApi from './baseApi';

export default class InvoicesApi {
  private static api = baseApi;
  private static endpoints = APP_CONFIGS.endpoints.invoices;

  public static createForOrder() {
    return this.api.post(this.endpoints.create());
  }
  public static getAllByQueries(params?: AppQueryParams) {
    return this.api.get(this.endpoints.create(), { params });
  }

  public static getAllInvoicingMethods(params?: AppQueryParams) {
    return this.api.get(this.endpoints.create(), { params });
  }
}
