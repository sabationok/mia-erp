import APP_CONFIGS from '../redux/APP_CONFIGS';
import { AppQueryParams } from './index';
import { AppResponse, OnlyUUID } from '../redux/global.types';
import { ICustomer, ICustomerReqDta } from '../types/customers.types';
import { ClientApi } from './client.api';

export default class CustomersApi {
  private static api = ClientApi.clientRef;
  private static endpoints = APP_CONFIGS.endpoints.customers;

  public static create(info?: ICustomerReqDta): Promise<AppResponse<ICustomer>> {
    console.table(info);
    return this.api.post(this.endpoints.create(), info);
  }
  public static update(info?: ICustomerReqDta): Promise<AppResponse<ICustomer>> {
    return this.api.patch(this.endpoints.update(info?._id), info?.data);
  }
  public static getAllByQueries(params?: AppQueryParams): Promise<AppResponse<ICustomer[]>> {
    return this.api.get(this.endpoints.getAll(), { params });
  }
  public static getById(customer?: OnlyUUID, params?: AppQueryParams): Promise<AppResponse<ICustomer>> {
    return this.api.get(this.endpoints.getById(customer?._id), { params });
  }
}
