import { ConfigService } from 'services';
import { io } from 'socket.io-client';
import { ObjectEntries, ObjectKeys, ObjectValues } from 'utils';
import { Keys } from '../types/utils.types';
import { AppSocket, WsClientEventsMap, WsEventListenersMap } from './AppSocket';
import { ApiHeaders } from '../api';

export interface WsConnectionOptions {
  auth?: {
    authorization?: `Bearer ${string}` | string;
    privateKey?: string;
    serverKey?: string;
    publicKey?: string;
    [ApiHeaders.p_token]?: string;
    [ApiHeaders.P_Token]?: string;
  };
}

enum SocketNamespaces {
  chat = 'chat',
  app = 'app',
}

export class WsClient {
  public static readonly BASE_URL = ConfigService._WS_RAILWAY_BASE_URL_STAGE_DEV;
  public static readonly authData: WsConnectionOptions['auth'] = {
    // privateKey: 'API_KEY',
    // access_token: 'Bearer authorization',
  };

  public static isAuthorized: boolean = false;
  public static options: Parameters<typeof io>[1] = {
    transports: ['websocket'],
    withCredentials: true,
    secure: true,
    auth: this.authData,
    retries: 5,

    // hostname: 'everywear.com.ua',
  };
  public static readonly _SOCKET_OPTIONS: Record<Keys<typeof SocketNamespaces> | string, Parameters<typeof io>[1]> = {};

  public static readonly _SOCKETS: Record<Keys<typeof SocketNamespaces> | string, AppSocket<any, any>> = {};
  public static getNsps() {
    return ObjectKeys(this._SOCKETS);
  }
  public static getSockets() {
    return ObjectValues(this._SOCKETS);
  }
  public static entries() {
    return ObjectEntries(this._SOCKETS);
  }
  static getSocket(name: Keys<typeof this._SOCKETS>) {
    return this._SOCKETS?.[name];
  }
  static addSocket<ListenersMap extends WsEventListenersMap, ClientEventsMap extends WsClientEventsMap>(
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
    EventListenersMap extends WsEventListenersMap,
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
        ...this.options?.auth,
        ...auth,
        authorization: auth?.authorization ? 'Bearer ' + auth.authorization : undefined,
      },
    };
    this.isAuthorized = true;
    const _auth = this.options.auth;
    if (_auth) {
      this.getSockets().forEach(st => st.authorize(_auth));
    }
  }
  public static unAuthorize() {
    this.options = {
      ...this.options,
      auth: {},
    };
    this.isAuthorized = false;

    this.getSockets().forEach(st => st.unAuthorize());
  }
}
