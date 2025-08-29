import { ApiAxiosResponse, ApiQueryParams, ApiRequestConfig } from './api.types';
import { IInvoicingMethod, IInvoicingMethodReqData } from '../types/integrations.types';
import { CreateInvoiceReqData, InvoiceEntity } from '../types/invoices.types';
import { ClientApi } from './client.api';

class InvoicesMethodsApi {
  private static _client = ClientApi.clientRef;
  private static endpoints = ClientApi._endpoints.invoices;

  public static getAll = (): Promise<ApiAxiosResponse<IInvoicingMethod[]>> => {
    return this._client.get(this.endpoints.methods.getAll());
  };

  public static update = (
    config: ApiRequestConfig<IInvoicingMethodReqData>
  ): Promise<ApiAxiosResponse<IInvoicingMethod>> => {
    return this._client.patch(this.endpoints.methods.update(), config?.data, config);
  };
}

export default class InvoicesApi {
  private static _client = ClientApi.clientRef;
  private static endpoints = ClientApi._endpoints.invoices;
  static methods = InvoicesMethodsApi;
  public static createForOrder(req?: CreateInvoiceReqData): Promise<ApiAxiosResponse<InvoiceEntity>> {
    return this._client.post(this.endpoints.createForOrder(), req?.data, { params: req?.params });
  }

  public static createForDelivery(req?: CreateInvoiceReqData): Promise<ApiAxiosResponse<InvoiceEntity>> {
    return this._client.post(this.endpoints.createForDelivery(), req?.data, { params: req?.params });
  }

  public static getAll = (
    config: ApiRequestConfig<
      unknown,
      Partial<
        Pick<ApiQueryParams, 'orderId' | 'deliveryId' | 'groupId' | 'customerId' | 'withDeleted' | 'limit' | 'offset'>
      >
    >
  ): Promise<ApiAxiosResponse<InvoiceEntity[]>> => {
    return this._client.get(this.endpoints.getAll(), config);
  };
}
