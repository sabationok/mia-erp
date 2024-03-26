import axios, { AxiosInstance } from 'axios';
import { baseApi } from './index';
import { ConfigService } from '../services';

export class ClientApi {
  private static LOCALHOST_API_PORT = ConfigService.get('LOCALHOST_API_PORT') || 4500;
  private static BASE_URL_LOCALHOST = `http://localhost:${this.LOCALHOST_API_PORT}/api/`;
  private static BASE_URL_RAILWAY = `https://mia-erp-dev.up.railway.app/api/`;

  private static _clientRef = axios.create({
    baseURL: !ConfigService.IS_DEV_MODE ? this.BASE_URL_LOCALHOST : this.BASE_URL_RAILWAY,
  });
  static get clientRef(): AxiosInstance {
    return this._clientRef;
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
