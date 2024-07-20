import { io, Socket } from 'socket.io-client';

export interface WsEventsMap extends Record<string, (...args: any[]) => void> {}

export type WsClientEventPayload<Data = any, Params = any, Query = any, Headers = any> = {
  data?: Data;
  params?: Params;
  query?: Query;
  headers?: Headers;
};
export interface WsClientEventsMap extends Record<string, WsClientEventPayload> {}

export class AppSocket<ListenersMap extends WsEventsMap, ClientEventsMap extends WsClientEventsMap> {
  private readonly _socket: Socket;

  constructor(...args: Parameters<typeof io>) {
    this._socket = io(...args);
  }

  public get connection() {
    return this._socket;
  }
  // unsubscribe = (...args: Parameters<typeof this._socket.off>) => {
  //   const [name, listener] = args;
  //
  //   this._socket.off(name, listener);
  //   return this;
  // };

  connect() {
    this._socket.connect();

    return () => {
      this._socket.disconnect();
    };
  }

  disconnect() {
    this._socket.disconnect();
  }

  onConnect(listener: () => void) {
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

  buildEmitter =
    <Event extends keyof ClientEventsMap>(name: Event) =>
    (data: ClientEventsMap[Event]) => {
      this._socket.emit(`${name as string}`.replaceAll('//', '/'), data);
    };
}
