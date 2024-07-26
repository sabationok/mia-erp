import { Keys, PartialRecord } from '../types/utils.types';

export enum ENV_KEYS {
  ERP_API_KEY = 'ERP_API_KEY',
  PROVIDER = 'PROVIDER',
  STAGE = 'STAGE',
}

export namespace Configs {
  export enum ApiStageType {
    development = 'development',
    production = 'production',
    test = 'test',
  }

  export enum React_Env_Keys {
    FRB_apiKey = 'FRB_apiKey',
    FRB_authDomain = 'FRB_authDomain',
    FRB_databaseURL = 'FRB_databaseURL',
    FRB_projectId = 'FRB_projectId',
    FRB_storageBucket = 'FRB_storageBucket',
    FRB_messagingSenderId = 'FRB_messagingSenderId',
    FRB_appId = 'FRB_appId',
    FRB_measurementId = 'FRB_measurementId',
    LOCALHOST_API_PORT = 'LOCALHOST_API_PORT',
  }

  export enum BaseApiProvider {
    railway = 'railway',
    localhost = 'localhost',
  }

  export type ApiUrlsMap = PartialRecord<Configs.ApiStageType.test | Configs.ApiStageType.production, string> &
    Record<Configs.ApiStageType.development, string>;
}

export const firebaseConfig = {
  apiKey: 'AIzaSyAjEoVyohiTfAKpW-5AdvVdik1Uy656iJk',
  authDomain: 'react-native-homework-1.firebaseapp.com',
  projectId: 'react-native-homework-1',
  storageBucket: 'react-native-homework-1.appspot.com',
  messagingSenderId: '304210435678',
  appId: '1:304210435678:web:1e1cfad321443f40101ecf',
};
export default class ConfigService {
  public static IS_DEV_MODE = process.env.NODE_ENV === 'development';

  public static isDevMode() {
    return this.IS_DEV_MODE;
  }
  public static _react_env_keys = Object.fromEntries(Object.entries(Configs.React_Env_Keys));
  public static get<Value extends string = string>(
    name: Keys<typeof ENV_KEYS | typeof Configs.React_Env_Keys> | string
  ): Value | undefined {
    if (this._react_env_keys[name]) {
      return process.env['REACT_APP_' + name] as Value;
    }
    return process.env[name] as Value;
  }
  public static get baseApiProviderIs(): PartialRecord<Configs.BaseApiProvider, boolean> {
    const provider = this.getProvider();
    return { [provider]: true };
  }
  public static get apiStageIs(): PartialRecord<Configs.ApiStageType, boolean> {
    const stage = this.getStage();
    return { [stage]: true };
  }

  public static getFireBaseConfig() {
    return {
      apiKey: this.get('FRB_apiKey'),
      authDomain: this.get('FRB_authDomain'),
      databaseURL: this.get('FRB_databaseURL'),
      projectId: this.get('FRB_projectId'),
      storageBucket: this.get('FRB_storageBucket'),
      messagingSenderId: this.get('FRB_messagingSenderId'),
      appId: this.get('FRB_appId'),
      measurementId: this.get('FRB_measurementId'),
    };
  }

  public static _railway_api_urls: Configs.ApiUrlsMap = {
    [Configs.ApiStageType.production]: 'https://mia-erp.up.railway.app/',
    [Configs.ApiStageType.development]: 'https://mia-erp-dev.up.railway.app/',
  };
  public static _localhost_api_urls: Configs.ApiUrlsMap = {
    [Configs.ApiStageType.development]: 'http://localhost:4500/',
  };

  public static _WS_BASE_URL = this.baseApiProviderIs.localhost
    ? 'http://localhost:4500/'
    : 'https://mia-erp-dev.up.railway.app/';

  public static _WS_BASE_URL_STAGE_DEV = this.baseApiProviderIs.localhost
    ? 'http://localhost:4500/'
    : 'https://mia-erp-dev.up.railway.app/';
  public static _WS_BASE_URL_STAGE_PROD = this.baseApiProviderIs.localhost
    ? 'http://localhost:4500/'
    : 'https://mia-erp.up.railway.app/';

  static getProvider() {
    return this.get<Configs.BaseApiProvider>(ENV_KEYS.PROVIDER) ?? Configs.BaseApiProvider.localhost;
  }
  static getStage() {
    return this.get<Configs.ApiStageType>(ENV_KEYS.STAGE) ?? Configs.ApiStageType.development;
  }

  static getApiUrlsKey(pr: Configs.BaseApiProvider) {
    return `_${pr}_api_urls` as const;
  }
  static getBaseApiUrl() {
    const provider = this.getProvider();
    const stage = this.getStage();
    const key = this.getApiUrlsKey(provider);
    const urls = this[key];

    return stage ? urls[stage] ?? urls.development : urls.development;
  }
}
