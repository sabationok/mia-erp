import axios, { AxiosInstance } from 'axios';
import { baseApi } from './index';
import { ConfigService } from '../services';

export default class BaseApi {
  private static LOCALHOST_API_PORT = ConfigService.get('LOCALHOST_API_PORT') || 5000;
  private static BASE_URL_LOCALHOST = `http://localhost:${this.LOCALHOST_API_PORT}/api/`;
  private static BASE_URL_RAILWAY = `https://crm-nest-api-production.up.railway.app/api/`;

  private static _client = axios.create({
    baseURL: this.BASE_URL_LOCALHOST,
  });
  static get client(): AxiosInstance {
    return this._client;
  }
  public static token = {
    set(token: string) {
      baseApi.defaults.headers.Authorization = `Bearer ${token}`;
      return this;
    },
    unset() {
      baseApi.defaults.headers.Authorization = ``;
      return this;
    },
  };

  public static permissionToken = {
    set(token: string) {
      baseApi.defaults.headers.Permission = `${token}`;
      return this;
    },
    unset() {
      baseApi.defaults.headers.Permission = ``;
      return this;
    },
  };

  public static setLocalhostProvider(permissionId?: string) {
    baseApi.defaults.baseURL = this.BASE_URL_LOCALHOST;
    baseApi.defaults.headers.Permission = permissionId || '';
    return this;
  }
  public static setRailWayProvider(permissionId?: string) {
    baseApi.defaults.baseURL = this.BASE_URL_RAILWAY;
    baseApi.defaults.headers.Permission = permissionId || '';
    return this;
  }
}
