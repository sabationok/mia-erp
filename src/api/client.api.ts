import axios, { AxiosError, AxiosInstance, AxiosRequestHeaders } from 'axios';
import { ConfigService } from '../services';
import { ApiHeaders } from './api.types';
import APP_CONFIGS from '../redux/APP_CONFIGS';

function createApiClient({
  baseURL,
  headers,
  onUnauthorized,
}: {
  baseURL?: string;
  onUnauthorized?: (error: AxiosError) => void;
  headers?: AxiosRequestHeaders & {
    [ApiHeaders.p_token]?: string;
  };
}) {
  const _client = axios.create({
    withCredentials: true,
    headers,
    baseURL,
  });

  return _client;
}

export class ClientApi {
  private static LOCALHOST_API_PORT = ConfigService.get('LOCALHOST_API_PORT') || 4500;
  private static BASE_URL_LOCALHOST = `http://localhost:${this.LOCALHOST_API_PORT}/api/`;
  private static BASE_URL_RAILWAY = `https://mia-erp-dev.up.railway.app/api/`;
  private static _onUnauthorized: (() => void) | undefined = undefined;
  public static _endpoints = APP_CONFIGS.endpoints;

  private static readonly _clientRef = createApiClient({
    onUnauthorized: this._onUnauthorized,
    baseURL: ConfigService.baseApiProvider.isLocalhost
      ? this.BASE_URL_LOCALHOST
      : ConfigService.baseApiProvider.isRailway
        ? this.BASE_URL_RAILWAY
        : ConfigService.IS_DEV_MODE
          ? this.BASE_URL_LOCALHOST
          : this.BASE_URL_RAILWAY,
  });
  static get clientRef(): AxiosInstance {
    return this._clientRef;
  }

  public static getTokens() {
    return {
      access: this._clientRef.defaults.headers.Authorization,
      permission: this._clientRef.defaults.headers.Permission,
      p_token: this._clientRef.defaults.headers?.['P-Token'],
    };
  }

  public static setToken(token: string) {
    this._clientRef.defaults.headers.Authorization = `Bearer ${token}`;
    return this;
  }

  public static unsetToken() {
    this._clientRef.defaults.headers.Authorization = ``;
    return this;
  }

  public static setP_Token(token: string) {
    this._clientRef.defaults.headers.Permission = token;
    this._clientRef.defaults.headers['P-Token'] = token;
  }

  public static unSetP_Token() {
    this._clientRef.defaults.headers.Permission = '';
    this._clientRef.defaults.headers['P-Token'] = '';
  }

  public static setLocalhostProvider(permissionId?: string) {
    this._clientRef.defaults.baseURL = this.BASE_URL_LOCALHOST;
    this._clientRef.defaults.headers.Permission = permissionId || '';
    return this;
  }

  public static setRailWayProvider(permissionId?: string) {
    this._clientRef.defaults.baseURL = this.BASE_URL_RAILWAY;
    this._clientRef.defaults.headers.Permission = permissionId || '';
    return this;
  }

  public static setAuthInterceptor({ onUnauthorized }: { onUnauthorized?: (error?: AxiosError) => void }) {
    this._onUnauthorized = onUnauthorized;
  }
}
