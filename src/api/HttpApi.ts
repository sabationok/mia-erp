import { ApiAxiosResponse, ApiQueryParams } from './api.types';
import { BooleanType, Keys, PartialRecord, Values } from '../types/utils.types';
import * as Emitter from './ApiEventEmitter';
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
  headers,
  refreshParams,
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
  const { onUnauthorized, onRefreshToken, onForbidden } = emitter.eventListeners;
  const refreshRequest = async (
    refreshUrl: string
  ): Promise<ApiAxiosResponse<{ access_token: string; _id: string }>> => {
    const refreshResult = await client.get(refreshUrl);
    if (refreshResult.data.data.access_token) {
      throw new Error('[ access_token ] not received in request');
    }

    client.defaults.headers.Authorization = `Bearer ${refreshResult.data.data.access_token}`;

    onRefreshToken && onRefreshToken(refreshResult.data.data);

    await queue.processQueue();
    return refreshResult;
  };
  type StatusEventType = `on_${HttpStatusCode}`;
  type HttpStatusIs = PartialRecord<StatusEventType, boolean>;
  function emitStatusEvents(statusIs: HttpStatusIs, error: AxiosError) {
    if (statusIs.on_409 && onForbidden) onForbidden(error);
  }

  client.interceptors.request.use(data => {
    return data;
  });

  client.interceptors.response.use(
    async (data: ApiAxiosResponse) => {
      return data;
    },
    async (error: AxiosError) => {
      const listenerKey = (
        error.response?.status ? `on_${error.response?.status as HttpStatusCode}` : 'on_500'
      ) as StatusEventType;
      const statusIs: HttpStatusIs = { [listenerKey]: true };
      if (error.response?.status) {
        emitStatusEvents(statusIs, error);
      }

      if (error.config && statusIs.on_401) {
        const canSkip = refreshParams?.skipPaths?.some(path => {
          return error.config?.url?.startsWith(path);
        });

        console.warn({ statusIs, canSkip });

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

  return _.assign(client, { queue, emitter, headers: headersManager });
}
