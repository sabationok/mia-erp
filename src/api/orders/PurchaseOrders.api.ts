import { ClientApi } from '../client.api';
import APP_CONFIGS from '../../redux/APP_CONFIGS';

export class PurchaseOrdersApi {
  public static _api = ClientApi.clientRef;
  private static _endpoints = APP_CONFIGS.endpoints.ordersEndpoints.sales;
}
// const
// today = new Date();
// today.setHours(0, 0, 0, 0);
