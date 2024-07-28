import axios, { AxiosError, AxiosInstance, HttpStatusCode } from 'axios';
import { AppEventEmitter, ConfigService } from '../services';
import { ApiHeaders, ApiResponse } from './api.types';
import APP_CONFIGS from '../redux/APP_CONFIGS';
import { BooleanType, PartialRecord } from '../types/utils.types';
import { AxiosQueue } from './axios-queue';

type ClientApiHeaders = {
  [ApiHeaders.p_token]?: string;
  [ApiHeaders.cookiesPermission]?: BooleanType;
  [ApiHeaders.dnt]?: 1 | 0;
};

type ClientApiEvents = {
  onUnauthorized?: (error: AxiosError) => void;
  onForbidden?: (error: AxiosError) => void;

  onRefreshToken?: (data: { _id: string; access_token: string }) => void;
};
type HttpStatusEvents = PartialRecord<`${HttpStatusCode}`, (...args: any[]) => void>;
function createApiClient({
  baseURL,
  headers,
  onForbidden,
  onUnauthorized,
  onRefreshToken,
  statusEvents,
}: {
  baseURL?: string;
  headers?: ClientApiHeaders;
} & ClientApiEvents & {
    statusEvents?: HttpStatusEvents;
  }): AxiosInstance {
  const _client = axios.create({
    withCredentials: true,
    headers,
    baseURL,
  });
  const queue = new AxiosQueue(_client);
  const refreshRequest = async (): Promise<ApiResponse<{ access_token: string; _id: string }>> => {
    const refreshResult = await _client.get('auth/refresh-token');
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
      if (statusEvents) {
        const emit = statusEvents[`${data.status as HttpStatusCode}`];
        if (emit) {
          emit({ data });
        }
      }
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
  public static apiEventEmitter = new AppEventEmitter<ClientApiEvents>();
  private static _onUnauthorized: ((error: AxiosError) => void) | undefined = undefined;
  private static readonly _clientRef = createApiClient({
    onUnauthorized: e => this.apiEventEmitter.emit('onUnauthorized', e),
    onForbidden: e => this.apiEventEmitter.emit('onForbidden', e),
    onRefreshToken: e => this.apiEventEmitter.emit('onRefreshToken', e),
    headers: {
      [ApiHeaders.cookiesPermission]: true,
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

  public static onUnauthorized = (listener: ClientApiEvents['onUnauthorized']) => {
    return this.apiEventEmitter.onWith('onUnauthorized', listener?.name ?? 'onUnauthorized', listener);
  };
  public static onForbidden = (listener: ClientApiEvents['onForbidden']) =>
    this.apiEventEmitter.onWith('onForbidden', listener?.name ?? 'onForbidden', listener);
  public static onRefreshToken = (listener: ClientApiEvents['onRefreshToken']) =>
    this.apiEventEmitter.onWith('onRefreshToken', listener?.name ?? 'onRefreshToken', listener);

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

  public static setAuthInterceptor({ onUnauthorized }: { onUnauthorized?: (error: AxiosError) => void }) {
    this._onUnauthorized = onUnauthorized;

    console.log('setAuthInterceptor |||| onUnauthorized');
  }
}
