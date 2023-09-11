export enum ENV_KEYS {
  ERP_API_KEY = 'ERP_API_KEY',
}
export default class ConfigService {
  private static IS_DEV_MODE = process.env.NODE_ENV === 'development';

  public static isDevMode() {
    return this.IS_DEV_MODE;
  }
  public static get(name: keyof typeof ENV_KEYS) {
    return process.env[name];
  }
}
