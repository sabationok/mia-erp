import { ConfigService } from 'services';
import { io } from 'socket.io-client';
import { ObjectKeys } from 'utils';
import { Keys } from '../types/utils.types';
import { AppSocket, WsClientEventsMap, WsEventsMap } from './AppSocket';

export interface WsConnectionOptions {
  auth?: {
    access_token?: `Bearer ${string}` | string;
    privateKey?: string;
    serverKey?: string;
    publicKey?: string;
    pToken?: string;
  };
}

enum SocketNamespaces {
  chat = 'chat',
}

export class WsClient {
  public static readonly BASE_URL = ConfigService._WS_RAILWAY_BASE_URL_STAGE_DEV;
  public static readonly authData: WsConnectionOptions['auth'] = {
    // privateKey: 'API_KEY',
    // access_token: 'Bearer authorization',
  };
  public static options: Parameters<typeof io>[1] = {
    transports: ['websocket'],
    withCredentials: true,
    auth: this.authData,
    retries: 1,

    // hostname: 'everywear.com.ua',
  };
  public static readonly _SOCKET_OPTIONS: Record<Keys<typeof SocketNamespaces> | string, Parameters<typeof io>[1]> = {};

  public static readonly _SOCKETS: Record<Keys<typeof SocketNamespaces> | string, AppSocket<any, any>> = {};

  static getSocket(name: Keys<typeof this._SOCKETS>) {
    return this._SOCKETS?.[name];
  }
  static addSocket<ListenersMap extends WsEventsMap, ClientEventsMap extends WsClientEventsMap>(
    name: Keys<typeof this._SOCKETS>,
    options?: Parameters<typeof io>[1]
  ): AppSocket<ListenersMap, ClientEventsMap> {
    // const ws = new AppSocket<ListenersMap, ClientEventsMap>(
    //   this.BASE_URL + name,
    //   {
    //     ...this.options,
    //     autoConnect: false,
    //     ...options,
    //   }
    // );

    // console.log(this.BASE_URL + name, ws);
    this._SOCKET_OPTIONS[name] = {
      ...this.options,
      autoConnect: false,
      // hostname: window.location.hostname,
      ...options,
    };

    this._SOCKETS[name] = new AppSocket<ListenersMap, ClientEventsMap>(
      this.BASE_URL + name,
      this._SOCKET_OPTIONS[name]
    );

    return this._SOCKETS[name];
  }

  static createNamespace<
    EventListenersMap extends WsEventsMap,
    ClientEvMap extends WsClientEventsMap = WsClientEventsMap,
    Namespace extends Keys<typeof this._SOCKETS> = Keys<typeof this._SOCKETS>,
  >(namespace: Namespace): AppSocket<EventListenersMap, ClientEvMap> {
    let _current = this._SOCKETS?.[namespace];

    if (!_current) {
      _current = this.addSocket<EventListenersMap, ClientEvMap>(this.BASE_URL + namespace, {
        ...this.options,
      });
    }

    return _current;
  }

  public static authorize(auth: WsConnectionOptions['auth']) {
    this.options = {
      ...this.options,
      auth: {
        // ...this.options.auth,
        ...auth,
        access_token: auth?.access_token ? 'Bearer ' + auth.access_token : undefined,
      },
    };

    const keys = ObjectKeys(this._SOCKETS);

    for (const key of keys) {
      this._SOCKETS[key].disconnect();

      let options = this._SOCKET_OPTIONS[key];
      options = {
        ...options,
        auth: { ...options?.auth, ...this.options.auth },
      };
      this._SOCKET_OPTIONS[key] = options;

      if (options.auth) {
        this._SOCKETS[key].connection.auth = options.auth;

        this._SOCKETS[key].connect();
      }
    }

    return;
  }
  public static unAuthorize() {
    this.options = { ...this.options, auth: {} };

    const keys = ObjectKeys(this._SOCKETS);

    for (const key of keys) {
      this._SOCKETS[key].disconnect();

      let options = this._SOCKET_OPTIONS[key];

      options = {
        ...options,
        auth: {},
      };

      this._SOCKETS[key].connection.auth = {};

      this._SOCKETS[key].connect();
    }
  }
}
