import { Keys, PartialRecord } from '../types/utils.types';

export enum EnvKeyEnum {
  ERP_API_KEY = 'ERP_API_KEY',
  PROVIDER = 'PROVIDER',
  STAGE = 'STAGE',
}
const REACT_APP_PREFIX = 'REACT_APP_';
export namespace Configs {
  export enum ApiStageType {
    development = 'development',
    production = 'production',
    test = 'test',
  }

  export enum BaseApiProvider {
    // RAILWAY = 'RAILWAY',
    // LOCALHOST = 'LOCALHOST',
    railway = 'railway',
    localhost = 'localhost',
  }

  export enum ReactEnvKeys {
    FRB_apiKey = 'FRB_apiKey',
    FRB_authDomain = 'FRB_authDomain',
    FRB_databaseURL = 'FRB_databaseURL',
    FRB_projectId = 'FRB_projectId',
    FRB_storageBucket = 'FRB_storageBucket',
    FRB_messagingSenderId = 'FRB_messagingSenderId',
    FRB_appId = 'FRB_appId',
    FRB_measurementId = 'FRB_measurementId',

    LOCALHOST_API_PORT = 'LOCALHOST_API_PORT',
    PROVIDER = 'PROVIDER',
    STAGE = 'STAGE',
  }

  export type ApiProviderUrlsMap = PartialRecord<Configs.ApiStageType.test | Configs.ApiStageType.production, string> &
    Record<Configs.ApiStageType.development, string>;

  export type ApiUrlsMap = Record<BaseApiProvider, ApiProviderUrlsMap>;
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

  public static get isDevMode() {
    return this.IS_DEV_MODE;
  }
  public static _react_env_keys = Object.fromEntries(Object.entries(Configs.ReactEnvKeys));
  public static get<Value extends string = string>(
    name: Keys<typeof EnvKeyEnum | typeof Configs.ReactEnvKeys> | string
  ): Value | undefined {
    if (this._react_env_keys[name]) {
      return process.env[REACT_APP_PREFIX + name] as Value;
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

  public static _api_urls: Configs.ApiUrlsMap = {
    railway: {
      [Configs.ApiStageType.production]: 'https://mia-erp.up.railway.app/api/',
      [Configs.ApiStageType.development]: 'https://mia-erp-dev.up.railway.app/api/',
    },
    localhost: {
      [Configs.ApiStageType.development]: 'http://localhost:4500/api/',
    },
  };

  public static _WS_BASE_URL = this.baseApiProviderIs.localhost
    ? 'http://localhost:4500/'
    : 'https://mia-erp-dev.up.railway.app/';

  static getProvider() {
    return this.get<Configs.BaseApiProvider>(EnvKeyEnum.PROVIDER) ?? Configs.BaseApiProvider.localhost;
  }
  static getStage() {
    return this.get<Configs.ApiStageType>(EnvKeyEnum.STAGE) ?? Configs.ApiStageType.development;
  }

  static getApiUrlsKey(pr: Configs.BaseApiProvider) {
    return `_${pr}_api_urls` as const;
  }
  static getBaseApiUrl() {
    const provider = this.getProvider();
    const stage = this.getStage();

    const urls = this._api_urls[provider];

    return stage ? urls[stage] ?? urls.development : urls.development;
  }
}
