export enum ENV_KEYS {
  ERP_API_KEY = 'ERP_API_KEY',

  PROVIDER = 'PROVIDER',
  LOCALHOST_API_PORT = 'LOCALHOST_API_PORT',

  FRB_apiKey = 'FRB_apiKey',
  FRB_authDomain = 'FRB_authDomain',
  FRB_databaseURL = 'FRB_databaseURL',
  FRB_projectId = 'FRB_projectId',
  FRB_storageBucket = 'FRB_storageBucket',
  FRB_messagingSenderId = 'FRB_messagingSenderId',
  FRB_appId = 'FRB_appId',
  FRB_measurementId = 'FRB_measurementId',
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

  public static _WS_RAILWAY_BASE_URL_STAGE_DEV = this.isDevMode()
    ? 'http://localhost:4500/'
    : 'https://mia-erp-dev.up.railway.app/';
  public static _WS_RAILWAY_BASE_URL_STAGE_PROD = this.isDevMode()
    ? 'http://localhost:4500/'
    : 'https://mia-erp.up.railway.app/';
  public static get(name: keyof typeof ENV_KEYS) {
    if (Object.keys(ENV_KEYS).includes(name)) {
      return process.env['REACT_APP_' + name];
    }
    return process.env[name];
  }
  public static get baseApiProvider() {
    return {
      isRailway: this.get(ENV_KEYS.PROVIDER) === 'railway',
      isLocalhost: this.get(ENV_KEYS.PROVIDER) === 'localhost',
    };
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
}
