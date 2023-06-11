import baseApi, { baseURL } from './baseApi';
import { IAllTransactionsRes } from 'redux/transactions/transactions.types';
import { FilterReturnDataType } from '../components/Filter/AppFilter';
import APP_CONFIGS, { EndpointNames } from '../redux/APP_CONFIGS';

export default class AuthApi {
  private static api = baseApi;
  private static endpoints = APP_CONFIGS.endpoints.auth;
  public static baseUrl = baseURL;

  public static async registerUser(filterData?: FilterReturnDataType, sortData?: any): Promise<IAllTransactionsRes> {
    return this.api.get(this.endpoints[EndpointNames.register]());
  }

  public static async logInUser(filterData?: FilterReturnDataType, sortData?: any): Promise<IAllTransactionsRes> {
    return this.api.get(this.endpoints[EndpointNames.logIn]());
  }

  public static async logOutUser(filterData?: FilterReturnDataType, sortData?: any): Promise<IAllTransactionsRes> {
    return this.api.get(this.endpoints[EndpointNames.logOut]());
  }
}
