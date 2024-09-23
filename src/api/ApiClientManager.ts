import { InternalAxiosRequestConfig } from 'axios';
import _ from 'lodash';
import { ApiAxiosResponse } from './api.types';
import { HttpApi } from './HttpApi';
import { ApiEventEmitterManager } from './ApiEventEmitter';
import APP_CONFIGS from 'redux/APP_CONFIGS';
import { Keys } from '../types/utils.types';

export type ServerlessRequestInterceptor = (response: InternalAxiosRequestConfig) => InternalAxiosRequestConfig;

export type ServerlessResponseInterceptor = (
  response: ApiAxiosResponse
) => ApiAxiosResponse | Promise<ApiAxiosResponse>;

export type ApiClientManagerOptions = {
  globalPrefix?: string;
  serverlessParams?: {
    headers?: HttpApi.Headers;
  };
};

export class ApiClientManager extends ApiEventEmitterManager {
  protected _client: HttpApi.CustomAxiosInstance;

  // public API_KEY_SERVERLESS = ConfigService.getEnv('X_TOKEN_SERVERLESS');
  // public PUBLIC_URL = ConfigService.getProxyApiUrl();
  public _endpoints = APP_CONFIGS.endpoints;

  constructor(
    client: HttpApi.CustomAxiosInstance,
    private readonly options?: ApiClientManagerOptions
  ) {
    super();
    this._client = client;
  }

  public get clientRef(): HttpApi.CustomAxiosInstance {
    return this._client;
  }

  public get setHeader() {
    return this.clientRef?.headers.set;
  }
  setCookiesPermission(input: { available: boolean }) {
    if (this.setHeader) this.setHeader(HttpApi.Header.Cookies_Permission, input.available);
  }

  public get cookiesControl() {
    return {
      on: () => {
        this._client.defaults.withCredentials = true;
        Object.assign(this._client.defaults.headers, {
          [HttpApi.Header.Cookies_Permission]: true,
        });
      },
      off: () => {
        this._client.defaults.withCredentials = false;
        Object.assign(this._client.defaults.headers, {
          [HttpApi.Header.Cookies_Permission]: false,
        });
      },
    };
  }
  onDownloadProgress = this.clientRef?.defaults.onDownloadProgress;
  onUploadProgress = this.clientRef?.defaults.onUploadProgress;

  private _omitHeadersList: Keys<HttpApi.Headers>[] = [
    'x-forwarded-port',
    'x-forwarded-proto',
    'x-forwarded-host',
    'x-invoke-query',
    'x-invoke-path',
    'x-invoke-output',
    'host',
  ];
  public switchToServerless(
    headers?: HttpApi.Headers,
    responseInterceptor?: ServerlessResponseInterceptor,
    requestInterceptor?: ServerlessRequestInterceptor
  ) {
    if (this.options?.serverlessParams) {
      const { headers } = this.options?.serverlessParams;
      if (headers) {
        this.clientRef.headers.concat(_.omit(headers, this._omitHeadersList));
      }
    }
    const tryCatch = <Fn extends (...args: any[]) => any>(
      cb: Fn,
      ...args: Parameters<Fn>
    ): ReturnType<Fn> | undefined => {
      try {
        return cb(...args);
      } catch (e) {
        console.error(`[Switch To Serverless] [${cb.name}] Error: `, e);
      }
      return;
    };
    const reqId = this._client.interceptors.request.use(config => {
      if (headers) {
        Object.assign(config.headers, _.omit(headers, this._omitHeadersList));
      }
      if (requestInterceptor) tryCatch(requestInterceptor, config);
      return config;
    });

    const respId = this._client.interceptors.response.use(r => {
      if (responseInterceptor) tryCatch(responseInterceptor, r);
      return r;
    });

    return {
      eject: () => {
        this._client.interceptors.response.eject(respId);
        this._client.interceptors.request.eject(reqId);
      },
    };
  }

  public setToken(token?: string) {
    this.clientRef.headers.set(HttpApi.Header.Authorization, `Bearer ${token}`);
  }

  public unsetToken() {
    this.clientRef.headers.remove(HttpApi.Header.Authorization);
  }
  public setPToken(token: string) {
    this.clientRef.headers.set(HttpApi.Header.p_token, token);
  }
  public removePToken() {
    this.clientRef.headers.remove(HttpApi.Header.p_token);
  }
  public getTokens() {
    return {
      p_token: this.clientRef.headers.get(HttpApi.Header.p_token),
    };
  }
  public setBaseUrl(baseUrl: string) {
    const globalPrefix = this.options?.globalPrefix;

    const [protocol, urlString] = baseUrl.split('://');

    if (globalPrefix?.startsWith('/')) {
      globalPrefix.replace('/', '');
    }

    const base = protocol + '://' + urlString.replaceAll('//', '/') + globalPrefix;

    return (this._client.defaults.baseURL = base);
  }
}
