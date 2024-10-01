import { ApiQueryParams } from './index';
import { ApiAxiosResponse, OnlyUUID } from '../redux/app-redux.types';
import { CustomerEntity, ICustomerReqDta } from '../types/customers.types';
import { ClientApi } from './client.api';

export default class CustomersApi {
  private static _client = ClientApi.clientRef;
  private static endpoints = ClientApi._endpoints.customers;

  public static create = (info?: ICustomerReqDta): Promise<ApiAxiosResponse<CustomerEntity>> => {
    return this._client.post(this.endpoints.create(), info);
  };

  public static update = (info?: ICustomerReqDta): Promise<ApiAxiosResponse<CustomerEntity>> => {
    return this._client.patch(this.endpoints.update(info?._id), info?.data);
  };

  public static getAllByQueries = (params?: ApiQueryParams): Promise<ApiAxiosResponse<CustomerEntity[]>> => {
    return this._client.get(this.endpoints.getAll(), { params });
  };

  public static getById(customer?: OnlyUUID, params?: ApiQueryParams): Promise<ApiAxiosResponse<CustomerEntity>> {
    return this._client.get(this.endpoints.getById(customer?._id), { params });
  }
}
