import APP_CONFIGS from '../redux/APP_CONFIGS';
import { AppQueryParams } from './index';
import baseApi from './baseApi';
import { AppResponse } from '../redux/global.types';
import { IInvoicingMethod, IInvoicingMethodReqData } from '../types/integrations.types';
import { CreateInvoiceReqData, IInvoice } from '../types/invoices.types';

export default class InvoicesApi {
  private static api = baseApi;
  private static endpoints = APP_CONFIGS.endpoints.invoices;

  public static createForOrder(req?: CreateInvoiceReqData): Promise<AppResponse<IInvoice>> {
    return this.api.post(this.endpoints.createForOrder(), req?.data, { params: req?.params });
  }

  public static createForDelivery(req?: CreateInvoiceReqData): Promise<AppResponse<IInvoice>> {
    return this.api.post(this.endpoints.createForDelivery(), req?.data, { params: req?.params });
  }

  public static getAllByQueries(params?: AppQueryParams): Promise<AppResponse<IInvoice[]>> {
    return this.api.get(this.endpoints.getAll(), { params });
  }

  public static getAllMethods = (): Promise<AppResponse<IInvoicingMethod[]>> => {
    return this.api.get(this.endpoints.methods.getAll());
  };

  public static updateMethod = (data?: IInvoicingMethodReqData): Promise<AppResponse<IInvoicingMethod>> => {
    return this.api.patch(this.endpoints.methods.update(data?._id), data?.data, { params: data?.params });
  };
}
