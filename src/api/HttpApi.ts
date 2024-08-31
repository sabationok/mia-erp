import { ApiHeaders, ApiQueryParams } from './api.types';
import { BooleanType, PartialRecord, Values } from '../types/utils.types';
import { AxiosError, HttpStatusCode } from 'axios';
import { EvEmitter } from 'services';

export namespace HttpApi {
  export enum Header {
    p_token = 'p-token',
    P_Token = 'P-Token',
    p_token_server = 'p-token-server',
    authorization = 'authorization',
    x_token_crm = 'x-token-crm',
    Device_Id = 'Device-Id',
    User_Reference = 'User-Reference',
    Cookies_Permission = 'Cookies-Permission',
  }

  export type BaseHeaders = {
    [Header.p_token]?: string;
    [Header.Cookies_Permission]?: BooleanType;
  };

  export enum ReservedEventName {
    onUnauthorized = 'onUnauthorized',
    onForbidden = 'onForbidden',
    onRefreshToken = 'onRefreshToken',
  }

  export type DefaultEventsMap = {
    [ReservedEventName.onUnauthorized]: AxiosError;
    [ReservedEventName.onForbidden]: AxiosError;
    [ReservedEventName.onRefreshToken]: {
      _id: string;
      access_token: string;
      refresh_token?: string;
    };
  };

  type DefaultEventListenersMap = EvEmitter.ListenersMappedType<DefaultEventsMap>;

  export type EventListenersMap<ListenersMap extends EvEmitter.EventsMap = EvEmitter.EventsMap> = ListenersMap &
    DefaultEventListenersMap;

  type BooleanHeaderType = ApiHeaders.cookies_permission;

  export type BooleanishHeaders = PartialRecord<BooleanHeaderType, boolean>;

  export type StringHeaders = PartialRecord<Values<Omit<typeof ApiHeaders, BooleanHeaderType>>, string>;

  export type Query = ApiQueryParams;

  export type PickQueryParams<Key extends keyof Query = never> = Pick<Query, Key extends keyof Query ? Key : never>;

  export type PickQueryParamsForMany<Key extends keyof Query = never> = Pick<
    Query,
    ('limit' | 'offset') | (Key extends keyof Query ? Key : never)
  >;

  export type ReservedEvents = EvEmitter.Events<{
    onUnauthorized: AxiosError;
    onForbidden: AxiosError;
    onRefreshToken: { _id: string; access_token: string; refresh_token?: string };
  }>;

  export type StatusEvents = PartialRecord<`on_${HttpStatusCode}`, AxiosError>;

  export type HttpStatusEventMap = Record<`on_${HttpStatusCode}`, AxiosError>;
  export type HttpStatusEventListeners = EvEmitter.ListenersMappedType<HttpStatusEventMap>;

  export type CreateOptions = {
    name?: string;
    apiKey?: string | null;
    isRefreshing?: boolean;
    x_server_api_key?: string;
    withAuthInterceptor?: boolean;
    cookies_permission?: boolean;
    refreshUrl?: string;
    baseURL?: string;
    headers?: HttpApi.BaseHeaders;
    withCredentials?: boolean;

    eventListeners?: Partial<EventListenersMap>;
    statusEventListeners?: HttpStatusEventListeners;

    refreshParams?: {
      skipPaths?: string[];
      url: string;
      logOutUrl?: string;
    };
  };
}
