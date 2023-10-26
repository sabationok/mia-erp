import APP_CONFIGS from '../redux/APP_CONFIGS';
import { AppQueryParams } from './index';
import baseApi from './baseApi';
import { IInvoicingMethod, IInvoicingMethodReqData } from '../redux/invoices/invoices.types';
import { AppResponse } from '../redux/global.types';

export default class InvoicesApi {
  private static api = baseApi;
  private static endpoints = APP_CONFIGS.endpoints.invoices;

  public static createForOrder() {
    return this.api.post(this.endpoints.create());
  }

  public static getAllByQueries(params?: AppQueryParams) {
    return this.api.get(this.endpoints.create(), { params });
  }

  public static getAllInvoicingMethods(params?: AppQueryParams): Promise<AppResponse<IInvoicingMethod[]>> {
    return this.api.get(this.endpoints.create(), { params });
  }

  public static getAllMethods(): Promise<AppResponse<IInvoicingMethod[]>> {
    return this.api.get(this.endpoints.getAllMethods());
  }

  public static updateMethod(data?: IInvoicingMethodReqData) {
    return this.api.patch(this.endpoints.updateMethod(data?._id), data?.data, { params: data?.params });
  }
}
