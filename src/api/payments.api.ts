import APP_CONFIGS from '../redux/APP_CONFIGS';
import { AppQueryParams } from './index';
import { AppResponse } from '../redux/app-redux.types';
import { IPayment } from '../types/payments.types';
import { ClientApi } from './client.api';
import { IPaymentMethod, IPaymentMethodReqData } from '../types/integrations.types';

export class PaymentMethodsApi {
  private static api = ClientApi.clientRef;
  private static endpoints = APP_CONFIGS.endpoints.payments.methods;

  public static getAll = (
    params?: Pick<AppQueryParams, 'disabled' | 'isDefault'>
  ): Promise<AppResponse<IPaymentMethod[]>> => {
    return this.api.get(this.endpoints.getAll(), { params });
  };
  public static update = (args?: IPaymentMethodReqData): Promise<AppResponse<IPaymentMethod>> => {
    return this.api.patch(this.endpoints.update(), args?.data, { params: args?.params });
  };
}
export class PaymentsApi {
  private static api = ClientApi.clientRef;
  private static endpoints = APP_CONFIGS.endpoints.payments;
  public static methods = PaymentMethodsApi;
  public static createForOrder(): Promise<AppResponse<IPayment>> {
    return this.api.post(this.endpoints.create());
  }

  public static getAll = (
    _?: undefined,
    params?: Partial<
      Pick<
        AppQueryParams,
        'customer' | 'manager' | 'group' | 'status' | 'order' | 'orderId' | 'invoiceId' | 'withDeleted'
      >
    >
  ): Promise<AppResponse<IPayment[]>> => {
    return this.api.get(this.endpoints.getAll(), { params });
  };
}

export default PaymentsApi;
