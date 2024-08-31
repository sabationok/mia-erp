import axios, { AxiosError, AxiosInstance, HttpStatusCode } from 'axios';
import { ConfigService } from '../services';
import { ApiAxiosResponse } from './api.types';
import APP_CONFIGS from '../redux/APP_CONFIGS';
import { AxiosQueue } from './axios-queue';
import { HttpApi } from './HttpApi';
import { ApiEventEmitterService } from './ApiEventEmitter';

function createApiClient({
  baseURL,
  headers,
  eventListeners: { onForbidden, onUnauthorized, onRefreshToken } = {},
  refreshParams,
  statusEventListeners,
}: HttpApi.CreateOptions): AxiosInstance {
  const _client = axios.create({
    withCredentials: true,
    headers,
    baseURL,
  });
  const queue = new AxiosQueue(_client);
  const refreshRequest = async (
    refreshUrl: string
  ): Promise<ApiAxiosResponse<{ access_token: string; _id: string }>> => {
    const refreshResult = await _client.get(refreshUrl);
    if (refreshResult.data.data.access_token) {
      throw new Error('[ access_token ] not received in request');
    }

    _client.defaults.headers.Authorization = `Bearer ${refreshResult.data.data.access_token}`;

    onRefreshToken && onRefreshToken(refreshResult.data.data);

    await queue.processQueue();
    return refreshResult;
  };

  function emitStatusEvents(error: AxiosError) {
    if (statusEventListeners) {
      const listenerKey = error.response?.status
        ? (`on_${error.response?.status as HttpStatusCode}` as const)
        : undefined;
      if (listenerKey) {
        const ls = statusEventListeners[listenerKey];
        ls && ls(error);
      }
    }
  }

  _client.interceptors.request.use(data => {
    return data;
  });

  _client.interceptors.response.use(
    async (data: ApiAxiosResponse) => {
      return data;
    },
    async (error: AxiosError) => {
      if (error.response?.status) {
        emitStatusEvents(error);
      }

      if (error.response?.status === HttpStatusCode.Unauthorized && error.config) {
        if (refreshParams?.logOutUrl && error.config.url?.startsWith(refreshParams?.logOutUrl)) {
          queue.clear();
          return Promise.reject(error);
        }
        if (!refreshParams?.url) {
          return Promise.reject(error);
        }
        if (queue.isProcessing) {
          return queue.addToQueue(error.config);
        } else {
          try {
            await refreshRequest(refreshParams?.url);

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

export class ClientApi extends ApiEventEmitterService {
  public static _endpoints = APP_CONFIGS.endpoints;
  private static LOCALHOST_API_PORT = ConfigService.get('LOCALHOST_API_PORT') || 4500;
  private static BASE_URL_LOCALHOST = `http://localhost:${this.LOCALHOST_API_PORT}/api/`;
  private static BASE_URL_RAILWAY = `https://mia-erp-dev.up.railway.app/api/`;
  private static readonly _clientRef = createApiClient({
    headers: {
      [HttpApi.Header.Cookies_Permission]: true,
    },
    refreshParams: {
      url: this._endpoints.auth.refreshTokens(),
      logOutUrl: this._endpoints.auth.logOut(),
    },
    baseURL:
      ConfigService.getBaseApiUrl() ||
      (ConfigService.baseApiProviderIs.localhost
        ? this.BASE_URL_LOCALHOST
        : ConfigService.baseApiProviderIs.railway
          ? this.BASE_URL_RAILWAY
          : ConfigService.IS_DEV_MODE
            ? this.BASE_URL_LOCALHOST
            : this.BASE_URL_RAILWAY),
  });

  static get clientRef(): AxiosInstance {
    return this._clientRef;
  }

  public static getTokens() {
    return {
      access: this._clientRef.defaults.headers.Authorization,
      p_token: this._clientRef.defaults.headers?.[HttpApi.Header.P_Token],
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
    this._clientRef.defaults.headers[HttpApi.Header.P_Token] = token;
  }

  public static unSetP_Token() {
    this._clientRef.defaults.headers[HttpApi.Header.P_Token] = '';
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
