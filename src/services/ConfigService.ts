export enum ENV_KEYS {
  ERP_API_KEY = 'ERP_API_KEY',

  FRB_apiKey = 'FRB_apiKey',
  FRB_authDomain = 'FRB_authDomain',
  FRB_databaseURL = 'FRB_databaseURL',
  FRB_projectId = 'FRB_projectId',
  FRB_storageBucket = 'FRB_storageBucket',
  FRB_messagingSenderId = 'FRB_messagingSenderId',
  FRB_appId = 'FRB_appId',
  FRB_measurementId = 'FRB_measurementId',
}
export default class ConfigService {
  private static IS_DEV_MODE = process.env.NODE_ENV === 'development';

  public static isDevMode() {
    return this.IS_DEV_MODE;
  }
  public static get(name: keyof typeof ENV_KEYS) {
    return process.env[name];
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
