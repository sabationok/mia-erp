import { AxiosError, HttpStatusCode } from 'axios';
import * as EvEmitter from '../services/EventEmitter';
import { HttpApi } from './HttpApi';

export enum ApiReservedEventName {
  onUnauthorized = 'onUnauthorized',
  onForbidden = 'onForbidden',
  onRefreshToken = 'onRefreshToken',
}

export type ApiEventsMap = {
  [ApiReservedEventName.onUnauthorized]: AxiosError;
  [ApiReservedEventName.onForbidden]: AxiosError;
  [ApiReservedEventName.onRefreshToken]: {
    _id: string;
    access_token: string;
    refresh_token?: string;
  };
};
export type HttpStatusEventType = `on_${HttpStatusCode}`;
export type EventListenersMap = EvEmitter.ListenersMappedType<ApiEventsMap>;
export type StatusEventListenersMap = EvEmitter.ListenersMappedType<
  Record<HttpStatusEventType, { data?: any; error?: AxiosError }>
>;

export class ApiEventEmitter extends EvEmitter.EventEmitter1<ApiEventsMap> {
  constructor(_: { name: string }) {
    super();
  }

  public eventListeners: EventListenersMap = {
    onUnauthorized: error => this.emit(ApiReservedEventName.onUnauthorized, error),
    onRefreshToken: data => this.emit(ApiReservedEventName.onRefreshToken, data),
    onForbidden: data => this.emit(ApiReservedEventName.onForbidden, data),
  };

  public onUnauthorized = (listener: EventListenersMap['onUnauthorized']) => {
    return this.on(ApiReservedEventName.onUnauthorized, listener);
  };
  public onRefreshToken = (listener: EventListenersMap['onRefreshToken']) => {
    return this.on(ApiReservedEventName.onRefreshToken, listener);
  };
  public onForbidden = (listener: EventListenersMap['onForbidden']) => {
    return this.on(ApiReservedEventName.onForbidden, listener);
  };
}

export abstract class ApiEventEmitterManager {
  protected abstract _client: HttpApi.CustomAxiosInstance;

  public get emitterRef(): HttpApi.CustomAxiosInstance['emitter'] | undefined {
    return this._client?.emitter;
  }

  get onForbidden() {
    return this._client.emitter?.onForbidden;
  }
  get onUnauthorized() {
    return this._client.emitter?.onUnauthorized;
  }
  get onRefreshToken() {
    return this._client.emitter?.onRefreshToken;
  }
}
