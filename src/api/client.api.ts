import { ConfigService } from '../services';
import APP_CONFIGS from '../redux/APP_CONFIGS';
import { createApiClient2, HttpApi } from './HttpApi';
import { ApiClientManager } from './ApiClientManager';

class Client {
  public static _endpoints = APP_CONFIGS.endpoints;
  private static LOCALHOST_API_PORT = ConfigService.get('LOCALHOST_API_PORT') || 4500;
  private static BASE_URL_LOCALHOST = `http://localhost:${this.LOCALHOST_API_PORT}/api/`;
  private static BASE_URL_RAILWAY = `https://mia-erp-dev.up.railway.app/api/`;

  static get createOptions() {
    return {
      headers: {
        [HttpApi.Header.Cookies_Permission]: true,
      },
      refreshParams: {
        url: this._endpoints.auth.refreshTokens(),
        logOutUrl: this._endpoints.auth.logOut(),
      },
      baseURL:
        ConfigService.getBaseApiUrl() ||
        (ConfigService.baseApiProviderIs.localhost
          ? this.BASE_URL_LOCALHOST
          : ConfigService.baseApiProviderIs.railway
            ? this.BASE_URL_RAILWAY
            : ConfigService.IS_DEV_MODE
              ? this.BASE_URL_LOCALHOST
              : this.BASE_URL_RAILWAY),
    };
  }
}

export const ClientApi = new ApiClientManager(
  createApiClient2({
    name: 'DefaultClient',
    baseURL: Client.createOptions.baseURL,
    withCredentials: true,
    refreshParams: {
      skipPaths: [
        APP_CONFIGS.endpoints.auth.logOut(),
        APP_CONFIGS.endpoints.auth.logIn(),
        '/auth/logOut',
        '/auth/logIn',
      ],
      url: APP_CONFIGS.endpoints.auth.refreshTokens(),
    },
    headers: Client.createOptions.headers,
  }),
  {
    globalPrefix: '/api',
  }
);
