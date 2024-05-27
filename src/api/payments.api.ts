import APP_CONFIGS from '../redux/APP_CONFIGS';
import { AppQueryParams } from './index';
import { AppResponse } from '../redux/app-redux.types';
import { IPayment } from '../types/payments.types';
import { IPaymentMethod, IPaymentMethodReqData } from '../types/integrations.types';
import { ClientApi } from './client.api';

export default class PaymentsApi {
  private static api = ClientApi.clientRef;
  private static endpoints = APP_CONFIGS.endpoints.payments;

  public static createForOrder(): Promise<AppResponse<IPayment>> {
    return this.api.post(this.endpoints.create());
  }
  public static getAllByQueries(params?: AppQueryParams) {
    return this.api.get(this.endpoints.create(), { params });
  }
  public static getAllMethods(
    params?: Pick<AppQueryParams, 'disabled' | 'isDefault'>
  ): Promise<AppResponse<IPaymentMethod[]>> {
    return this.api.get(this.endpoints.getAllMethods(), { params });
  }
  public static updateMethod(args?: IPaymentMethodReqData): Promise<AppResponse<IPaymentMethod>> {
    return this.api.patch(this.endpoints.updateMethod(args?._id), args?.data, { params: args?.params });
  }
}
