import axios, { AxiosError, AxiosInstance, HttpStatusCode } from 'axios';
import { ConfigService, EvEmitter, EventEmitter1 } from '../services';
import { ApiResponse } from './api.types';
import APP_CONFIGS from '../redux/APP_CONFIGS';
import { BooleanType, PartialRecord } from '../types/utils.types';
import { AxiosQueue } from './axios-queue';

export namespace Api {
  export enum Header {
    p_token = 'p-token',
    P_Token = 'P-Token',
    p_token_server = 'p-token-server',
    authorization = 'authorization',
    x_token_crm = 'x-token-crm',
    Device_Id = 'Device-Id',
    User_Reference = 'User-Reference',
    cookiesPermission = 'Cookies-Permission',
    dnt = 'dnt',
  }

  export type BaseHeaders = {
    [Header.p_token]?: string;
    [Header.cookiesPermission]?: BooleanType;
    [Header.dnt]?: 1 | 0;
  };

  export type EventListeners = {
    onUnauthorized: (error: AxiosError) => void;
    onForbidden: (error: AxiosError) => void;

    onRefreshToken: (data: { _id: string; access_token: string }) => void;
  };
  export type EmitEvent = EvEmitter.Events<{
    onUnauthorized: AxiosError;
    onForbidden: AxiosError;
    onRefreshToken: { _id: string; access_token: string };
  }>;
  export type HttpStatusEventListeners = PartialRecord<`on_${HttpStatusCode}`, (...args: any[]) => void>;
}

function createApiClient({
  baseURL,
  headers,
  onForbidden,
  onUnauthorized,
  onRefreshToken,
  refreshUrl = 'auth/refresh-token',
}: {
  refreshUrl?: string;
  baseURL?: string;
  headers?: Api.BaseHeaders;
} & Api.EventListeners): AxiosInstance {
  const _client = axios.create({
    withCredentials: true,
    headers,
    baseURL,
  });
  const queue = new AxiosQueue(_client);
  const refreshRequest = async (): Promise<ApiResponse<{ access_token: string; _id: string }>> => {
    const refreshResult = await _client.get(refreshUrl);
    if (refreshResult.data.data.access_token) {
      throw new Error('[ access_token ] not received in request');
    }

    _client.defaults.headers.Authorization = `Bearer ${refreshResult.data.data.access_token}`;

    onRefreshToken && onRefreshToken(refreshResult.data.data);

    queue.processQueue().catch();
    return refreshResult;
  };

  _client.interceptors.request.use(data => {
    // if (onUnauthorized) {
    return data;
  });

  _client.interceptors.response.use(
    async (data: ApiResponse) => {
      return data;
    },
    async (error: AxiosError) => {
      if (error.response?.status === HttpStatusCode.Unauthorized && error.config) {
        if (queue.isProcessing) {
          return queue.addToQueue(error.config);
        } else {
          try {
            await refreshRequest();

            return axios(error.config);
          } catch (err) {
            if (onUnauthorized) onUnauthorized(error);

            queue.clear();

            return Promise.reject(error);
          }
        }
      }

      throw error;
    }
  );

  return _client;
}

export class ClientApi {
  public static _endpoints = APP_CONFIGS.endpoints;
  private static LOCALHOST_API_PORT = ConfigService.get('LOCALHOST_API_PORT') || 4500;
  private static BASE_URL_LOCALHOST = `http://localhost:${this.LOCALHOST_API_PORT}/api/`;
  private static BASE_URL_RAILWAY = `https://mia-erp-dev.up.railway.app/api/`;
  public static _emitter = new EventEmitter1<Api.EmitEvent>();
  private static readonly _clientRef = createApiClient({
    onUnauthorized: e => this._emitter.emit('onUnauthorized', e),
    onForbidden: e => this._emitter.emit('onForbidden', e),
    onRefreshToken: e => this._emitter.emit('onRefreshToken', e),
    headers: {
      [Api.Header.cookiesPermission]: true,
      [Api.Header.dnt]: 1,
    },
    baseURL:
      ConfigService.getBaseApiUrl() || ConfigService.baseApiProviderIs.localhost
        ? this.BASE_URL_LOCALHOST
        : ConfigService.baseApiProviderIs.railway
          ? this.BASE_URL_RAILWAY
          : ConfigService.IS_DEV_MODE
            ? this.BASE_URL_LOCALHOST
            : this.BASE_URL_RAILWAY,
  });

  static get clientRef(): AxiosInstance {
    return this._clientRef;
  }

  public static onUnauthorized = (listener: Api.EventListeners['onUnauthorized']) => {
    return this._emitter.onWith('onUnauthorized', listener?.name || 'onUnauthorized', listener);
  };
  public static onForbidden = (listener: Api.EventListeners['onForbidden']) =>
    this._emitter.onWith('onForbidden', listener?.name || 'onForbidden', listener);
  public static onRefreshToken = (listener: Api.EventListeners['onRefreshToken']) =>
    this._emitter.onWith('onRefreshToken', listener?.name || 'onRefreshToken', listener);

  public static getTokens() {
    return {
      access: this._clientRef.defaults.headers.Authorization,
      p_token: this._clientRef.defaults.headers?.[Api.Header.P_Token],
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
    this._clientRef.defaults.headers[Api.Header.P_Token] = token;
  }

  public static unSetP_Token() {
    this._clientRef.defaults.headers[Api.Header.P_Token] = '';
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

  static getHeader(name: string) {
    return this._clientRef.defaults.headers?.[name];
  }
  static setHeader(name: string, value: string) {
    return (this._clientRef.defaults.headers[name] = value);
  }
}
