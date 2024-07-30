import { ClientApi } from '../client.api';

export class PurchaseOrdersApi {
  public static _api = ClientApi.clientRef;
  private static _endpoints = ClientApi._endpoints.ordersEndpoints.sales;
}
// const
// today = new Date();
// today.setHours(0, 0, 0, 0);
