import APP_CONFIGS from '../redux/APP_CONFIGS';
import { ApiQueryParams } from './index';
import { ApiResponse } from '../redux/app-redux.types';
import { IInvoicingMethod, IInvoicingMethodReqData } from '../types/integrations.types';
import { CreateInvoiceReqData, IInvoice } from '../types/invoices.types';
import { ClientApi } from './client.api';

export default class InvoicesApi {
  private static api = ClientApi.clientRef;
  private static endpoints = APP_CONFIGS.endpoints.invoices;

  public static createForOrder(req?: CreateInvoiceReqData): Promise<ApiResponse<IInvoice>> {
    return this.api.post(this.endpoints.createForOrder(), req?.data, { params: req?.params });
  }

  public static createForDelivery(req?: CreateInvoiceReqData): Promise<ApiResponse<IInvoice>> {
    return this.api.post(this.endpoints.createForDelivery(), req?.data, { params: req?.params });
  }

  public static getAll = (
    _?: undefined,
    params?: Partial<Pick<ApiQueryParams, 'orderId' | 'deliveryId' | 'groupId' | 'customerId' | 'withDeleted'>>
  ): Promise<ApiResponse<IInvoice[]>> => {
    return this.api.get(this.endpoints.getAll(), { params });
  };
  public static getAllMethods = (): Promise<ApiResponse<IInvoicingMethod[]>> => {
    return this.api.get(this.endpoints.methods.getAll());
  };

  public static updateMethod = (data?: IInvoicingMethodReqData): Promise<ApiResponse<IInvoicingMethod>> => {
    return this.api.patch(this.endpoints.methods.update(data?._id), data?.data, { params: data?.params });
  };
}
