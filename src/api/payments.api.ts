import APP_CONFIGS from '../redux/APP_CONFIGS';
import { ApiQueryParams } from './index';
import { ApiResponse } from '../redux/app-redux.types';
import { IPayment } from '../types/payments.types';
import { ClientApi } from './client.api';
import { IPaymentMethod, IPaymentMethodReqData } from '../types/integrations.types';

export class PaymentMethodsApi {
  private static api = ClientApi.clientRef;
  private static endpoints = APP_CONFIGS.endpoints.payments.methods;

  public static getAll = (
    params?: Pick<ApiQueryParams, 'disabled' | 'isDefault'>
  ): Promise<ApiResponse<IPaymentMethod[]>> => {
    return this.api.get(this.endpoints.getAll(), { params });
  };
  public static update = (args?: IPaymentMethodReqData): Promise<ApiResponse<IPaymentMethod>> => {
    return this.api.patch(this.endpoints.update(), args?.data, { params: args?.params });
  };
}
export class PaymentsApi {
  private static api = ClientApi.clientRef;
  private static endpoints = APP_CONFIGS.endpoints.payments;
  public static methods = PaymentMethodsApi;
  public static createForOrder(): Promise<ApiResponse<IPayment>> {
    return this.api.post(this.endpoints.create());
  }

  public static getAll = (
    _?: undefined,
    params?: Partial<
      Pick<
        ApiQueryParams,
        'customer' | 'manager' | 'group' | 'status' | 'order' | 'orderId' | 'invoiceId' | 'withDeleted'
      >
    >
  ): Promise<ApiResponse<IPayment[]>> => {
    return this.api.get(this.endpoints.getAll(), { params });
  };
}

export default PaymentsApi;
