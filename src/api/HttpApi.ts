import { ApiAxiosResponse, ApiQueryParams } from './api.types';
import { BooleanType, Keys, PartialRecord, Values } from '../types/utils.types';
import * as Emitter from './ApiEventEmitter';
import { ApiEventEmitter } from './ApiEventEmitter';
import axios, {
  AxiosDefaults,
  AxiosError,
  AxiosHeaderValue,
  AxiosInstance,
  HeadersDefaults,
  HttpStatusCode,
} from 'axios';
import { AxiosQueueService } from '../services';
import _ from 'lodash';

export namespace HttpApi {
  export enum Header {
    p_token = 'p-token',
    P_Token = 'P-Token',
    p_token_server = 'p-token-server',
    Authorization = 'Authorization',
    authorization = 'authorization',
    Device_Id = 'Device-Id',
    User_Reference = 'User-Reference',
    Cookies_Permission = 'Cookies-Permission',
    cookies_permission = 'cookies-permission',
  }

  export type BaseHeaders = {
    [Header.p_token]?: string;
    [Header.Cookies_Permission]?: BooleanType;
  };

  type BooleanHeaders = PartialRecord<Header.Cookies_Permission, boolean>;

  export type StringHeaders = PartialRecord<Values<Omit<typeof Header, keyof BooleanHeaders>>, string>;

  export type Query = ApiQueryParams;

  export type PickQueryParams<Key extends keyof Query = never> = Pick<Query, Key extends keyof Query ? Key : never>;

  export type PickQueryParamsForMany<Key extends keyof Query = never> = Pick<
    Query,
    ('limit' | 'offset') | (Key extends keyof Query ? Key : never)
  >;

  export type Cookies = {
    device_id?: string;
    refresh_token?: string;
    [key: string]: string | undefined;
  };

  export type Headers = Record<Values<typeof Header> | string, AxiosHeaderValue>;
  export interface TypedAxiosInstance extends AxiosInstance {
    defaults: Omit<AxiosDefaults, 'headers'> & {
      headers: HeadersDefaults & Headers;
    };
  }

  export interface CustomAxiosInstance extends TypedAxiosInstance {
    queue: AxiosQueueService;
    emitter: Emitter.ApiEventEmitter;
    headers: ClientHeadersManager;
  }
  export type CreateOptions = {
    name?: string;
    apiKey?: string | null;
    isRefreshing?: boolean;
    x_server_api_key?: string;
    withAuthInterceptor?: boolean;
    cookies_permission?: boolean;
    refreshUrl?: string;
    baseURL?: string;
    headers?: StringHeaders | BooleanHeaders;
    withCredentials?: boolean;
    cookiesPermission?: boolean;

    eventListeners?: Partial<ApiEventEmitter['eventListeners']> & Partial<Emitter.StatusEventListenersMap>;

    refreshParams?: {
      skipPaths?: string[];
      url: string;
      logOutUrl?: string;
      endpointUrl?: string;
    };
  };
}
export class ClientHeadersManager {
  protected readonly client: HttpApi.TypedAxiosInstance;
  protected _headers: HttpApi.TypedAxiosInstance['defaults']['headers'];

  constructor(client: HttpApi.TypedAxiosInstance, _meta: { name: string }) {
    this.client = client;
    this._headers = client.defaults.headers;
  }

  set = <Key extends Keys<HttpApi.Headers>>(key: Key, value: HttpApi.Headers[Key]) => {
    if (value) {
      this.client.defaults.headers[key] = value;
    }

    return this;
  };
  get = <Key extends Keys<HttpApi.Headers>>(key: Key): HttpApi.Headers[Key] => {
    return this.client.defaults.headers[key];
  };

  remove = (key: Keys<HttpApi.Headers> | string) => {
    delete this.client.defaults.headers[key];
    return this;
  };
  concat = (raw: HttpApi.Headers) => {
    this.client.defaults.headers = Object.assign(this.client.defaults.headers, raw);
    return this;
  };
}
export function createApiClient2({
  name = 'default',
  baseURL,
  withCredentials = true,
  headers, // _logger,
  // useRefreshInterceptor = false, // isRefreshing = false,
}: HttpApi.CreateOptions): HttpApi.CustomAxiosInstance {
  const client = axios.create({
    baseURL,
    headers,
    withCredentials,
  });
  const headersManager = new ClientHeadersManager(client, { name });
  const queue = new AxiosQueueService(client, { name });
  const emitter = new Emitter.ApiEventEmitter({ name });

  return _.assign(client, { queue, emitter, headers: headersManager });
}
export function createApiClient({
  baseURL,
  headers,
  eventListeners: { onForbidden, onUnauthorized, onRefreshToken, ...eventListeners } = {},
  refreshParams,
  ...rest
}: HttpApi.CreateOptions): AxiosInstance {
  const _client = createApiClient2({
    baseURL,
    headers,
    refreshParams,
    ...rest,
  });
  const queue = _client.queue;

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
    if (eventListeners) {
      const listenerKey = error.response?.status
        ? (`on_${error.response?.status as HttpStatusCode}` as const)
        : undefined;
      if (listenerKey) {
        const ls = eventListeners[listenerKey];
        ls && ls({ data: error });
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
