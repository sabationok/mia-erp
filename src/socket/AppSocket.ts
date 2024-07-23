import { io, Socket } from 'socket.io-client';
import { PartialRecord } from '../types/utils.types';

export type WsEvListenerType = (...args: any[]) => void;

export interface WsEventListenersMap extends Record<string, WsEvListenerType> {}

export interface WsClientEventsMap extends Record<string, WsClientEventPayload> {}

export type WsClientEventPayload<Data = any, Params = any, Query = any, Headers = any> = {
  data?: Data;
  params?: Params;
  query?: Query;
  headers?: Headers;
};

export class AppSocket<ListenersMap extends WsEventListenersMap, ClientEventsMap extends WsClientEventsMap> {
  public isAuthorized: boolean = false;
  private readonly _socket: Socket;
  private _headers: PartialRecord<string, string> = {};

  constructor(...args: Parameters<typeof io>) {
    this._socket = io(...args);
  }

  public get connection() {
    return this._socket;
  }

  setHeader(key: string, value: string): this {
    this._headers[key] = value;
    return this;
  }

  removeHeader(key: string): this {
    delete this._headers[key];
    return this;
  }

  authorize(auth: typeof this._socket.auth): this {
    this.disconnect();
    this.isAuthorized = true;
    this._socket.auth = auth;
    this.connect();
    return this;
  }

  unAuthorize(): this {
    this.disconnect();
    this.isAuthorized = false;
    this._socket.auth = {};
    this.connect();
    return this;
  }

  unsubscribe = (...args: Parameters<typeof this._socket.off>) => {
    const [name, listener] = args;

    this._socket.off(name, listener);
    return this;
  };

  connect({ onConnect, onConnectError }: { onConnect?: () => void; onConnectError?: (error: Error) => void } = {}) {
    this._socket.connect();
    if (onConnect) {
      this.onConnect(onConnect);
    }
    if (onConnectError) {
      this.onConnectError(onConnectError);
    }

    return () => {
      this._socket.disconnect();
    };
  }

  disconnect(onDisconnect?: (...args: Parameters<typeof this._socket.disconnect>) => void) {
    this._socket.disconnect();
    if (onDisconnect) {
      this.onDisconnect(onDisconnect);
    }
    return this;
  }

  onConnect(listener: () => void): () => void {
    this._socket.on('connect', listener);

    return () => {
      this._socket.off('connect', listener);
    };
  }

  onDisconnect(listener: (...args: Parameters<typeof this._socket.disconnect>) => void) {
    this._socket.on('disconnect', listener);
    return () => {
      this._socket.off('disconnect', listener);
    };
  }

  onConnectError(listener: (error: Error) => void) {
    this._socket.on('connect_error', listener);

    return () => {
      this._socket.off('connect_error', listener);
    };
  }

  onReConnectError(listener: (error: Error) => void) {
    this._socket.on('reconnect_error', listener);

    return () => {
      this._socket.off('reconnect_error', listener);
    };
  }

  buildSubscriber =
    <Event extends keyof ListenersMap>(name: Event) =>
    (listener: ListenersMap[Event]) => {
      const _event = `${name as string}`.replaceAll('//', '/');
      this._socket.on(_event, listener);
      return () => {
        this._socket.off(_event, listener);
        return this;
      };
    };
  _buildSubscriber = <Event extends keyof ListenersMap>(name: Event) => {
    return {
      onSuccess: (listener: ListenersMap[Event]) => {
        const _event = `${name as string}`.replaceAll('//', '/');
        this._socket.on(_event, listener);
        return () => {
          this._socket.off(_event, listener);
        };
      },
      onError: (listener: <E = Error>(error: E) => void) => {
        const _event = `${name as string}`.replaceAll('//', '/');
        this._socket.on(_event + '_error', listener);
        return () => {
          this._socket.off(_event + '_error', listener);
        };
      },
    };
  };
  buildEmitter =
    <Event extends keyof ClientEventsMap>(name: Event) =>
    (data: ClientEventsMap[Event]) => {
      console.log(name, data, 'isActive', this._socket.active, this._socket.id);
      return this._socket.emit(`${name as string}`.replaceAll('//', '/'), data);
    };
}
