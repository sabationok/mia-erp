import APP_CONFIGS from '../redux/APP_CONFIGS';
import { AppQueryParams } from './index';
import baseApi from './baseApi';
import { AppResponse } from '../redux/global.types';
import { IInvoicingMethod, IInvoicingMethodReqData } from '../types/integrations.types';
import { IInvoice } from '../types/invoices.types';

export default class InvoicesApi {
  private static api = baseApi;
  private static endpoints = APP_CONFIGS.endpoints.invoices;

  public static createForOrder(): Promise<AppResponse<IInvoice>> {
    return this.api.post(this.endpoints.create());
  }

  public static getAllByQueries(params?: AppQueryParams): Promise<AppResponse<IInvoice[]>> {
    return this.api.get(this.endpoints.create(), { params });
  }

  public static getAllInvoicingMethods(params?: AppQueryParams): Promise<AppResponse<IInvoicingMethod[]>> {
    return this.api.get(this.endpoints.create(), { params });
  }

  public static getAllMethods = (): Promise<AppResponse<IInvoicingMethod[]>> => {
    return this.api.get(this.endpoints.getAllMethods());
  };

  public static updateMethod = (data?: IInvoicingMethodReqData): Promise<AppResponse<IInvoicingMethod>> => {
    return this.api.patch(this.endpoints.updateMethod(data?._id), data?.data, { params: data?.params });
  };
}
