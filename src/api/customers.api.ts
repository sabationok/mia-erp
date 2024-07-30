import { ApiQueryParams } from './index';
import { ApiResponse, OnlyUUID } from '../redux/app-redux.types';
import { CustomerEntity, ICustomerReqDta } from '../types/customers.types';
import { ClientApi } from './client.api';

export default class CustomersApi {
  private static api = ClientApi.clientRef;
  private static endpoints = ClientApi._endpoints.customers;

  public static create(info?: ICustomerReqDta): Promise<ApiResponse<CustomerEntity>> {
    console.table(info);
    return this.api.post(this.endpoints.create(), info);
  }

  public static update(info?: ICustomerReqDta): Promise<ApiResponse<CustomerEntity>> {
    return this.api.patch(this.endpoints.update(info?._id), info?.data);
  }

  public static getAllByQueries(params?: ApiQueryParams): Promise<ApiResponse<CustomerEntity[]>> {
    return this.api.get(this.endpoints.getAll(), { params });
  }

  public static getById(customer?: OnlyUUID, params?: ApiQueryParams): Promise<ApiResponse<CustomerEntity>> {
    return this.api.get(this.endpoints.getById(customer?._id), { params });
  }
}
