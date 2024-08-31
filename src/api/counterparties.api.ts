import { ApiQueryParams } from './index';
import { ApiAxiosResponse, OnlyUUID } from '../redux/app-redux.types';
import { CustomerEntity, ICustomerReqDta } from '../types/customers.types';
import { ClientApi } from './client.api';

export class CounterpartiesConnectionsApi {
  private static api = ClientApi.clientRef;
  private static endpoints = ClientApi._endpoints.counterparties.connection;

  public static request = (input?: { forId?: string }): Promise<ApiAxiosResponse<{ result: boolean }>> => {
    return this.api.post(this.endpoints.request(), input);
  };

  public static accept = (input?: { _id?: string }): Promise<ApiAxiosResponse<{ result: boolean }>> => {
    return this.api.post(this.endpoints.request(), input);
  };

  public static reject = (input?: { _id?: string }): Promise<ApiAxiosResponse<{ result: boolean }>> => {
    return this.api.post(this.endpoints.request(), input);
  };

  public static getAll = (input?: undefined): Promise<ApiAxiosResponse<{ result: boolean }>> => {
    return this.api.post(this.endpoints.request(), input);
  };
}

export class CounterpartiesApi {
  private static api = ClientApi.clientRef;
  private static endpoints = ClientApi._endpoints.counterparties;
  public static connections = CounterpartiesConnectionsApi;
  public static create = (info?: ICustomerReqDta): Promise<ApiAxiosResponse<CustomerEntity>> => {
    return this.api.post(this.endpoints.create(), info);
  };
  public static update = (info?: ICustomerReqDta): Promise<ApiAxiosResponse<CustomerEntity>> => {
    return this.api.patch(this.endpoints.update(info?._id), info?.data);
  };
  public static getAllByQueries = (params?: ApiQueryParams): Promise<ApiAxiosResponse<CustomerEntity[]>> => {
    return this.api.get(this.endpoints.getAll(), { params });
  };
  public static getById = (customer?: OnlyUUID, params?: ApiQueryParams): Promise<ApiAxiosResponse<CustomerEntity>> => {
    return this.api.get(this.endpoints.getById(customer?._id), { params });
  };
}
