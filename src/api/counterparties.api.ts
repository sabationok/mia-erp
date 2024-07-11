import APP_CONFIGS from '../redux/APP_CONFIGS';
import { AppQueryParams } from './index';
import { ApiResponse, OnlyUUID } from '../redux/app-redux.types';
import { CustomerEntity, ICustomerReqDta } from '../types/customers.types';
import { ClientApi } from './client.api';

export class CounterpartiesConnectionsApi {
  private static api = ClientApi.clientRef;
  private static endpoints = APP_CONFIGS.endpoints.counterparties.connection;

  public static request = (input?: { forId?: string }): Promise<ApiResponse<{ result: boolean }>> => {
    return this.api.post(this.endpoints.request(), input);
  };

  public static accept = (input?: { _id?: string }): Promise<ApiResponse<{ result: boolean }>> => {
    return this.api.post(this.endpoints.request(), input);
  };

  public static reject = (input?: { _id?: string }): Promise<ApiResponse<{ result: boolean }>> => {
    return this.api.post(this.endpoints.request(), input);
  };

  public static getAll = (input?: undefined): Promise<ApiResponse<{ result: boolean }>> => {
    return this.api.post(this.endpoints.request(), input);
  };
}

export class CounterpartiesApi {
  private static api = ClientApi.clientRef;
  private static endpoints = APP_CONFIGS.endpoints.counterparties;
  public static connections = CounterpartiesConnectionsApi;
  public static create = (info?: ICustomerReqDta): Promise<ApiResponse<CustomerEntity>> => {
    return this.api.post(this.endpoints.create(), info);
  };
  public static update = (info?: ICustomerReqDta): Promise<ApiResponse<CustomerEntity>> => {
    return this.api.patch(this.endpoints.update(info?._id), info?.data);
  };
  public static getAllByQueries = (params?: AppQueryParams): Promise<ApiResponse<CustomerEntity[]>> => {
    return this.api.get(this.endpoints.getAll(), { params });
  };
  public static getById = (customer?: OnlyUUID, params?: AppQueryParams): Promise<ApiResponse<CustomerEntity>> => {
    return this.api.get(this.endpoints.getById(customer?._id), { params });
  };
}
