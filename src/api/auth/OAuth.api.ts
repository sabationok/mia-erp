import { ApiAxiosResponse } from 'api/api.types';
import { OAuth } from 'types/auth/o-auth.namespace';
import { ClientApi } from '../client.api';
import { Auth } from './auth.api';

export class OAuthApi {
  private static _api = ClientApi.clientRef;
  private static _endps = ClientApi._endpoints.auth.o_auth;

  public static getAuthUrl = (input?: {
    params: OAuth.Client.GetAuthUrlQuery;
  }): Promise<ApiAxiosResponse<OAuth.Client.GetAuthUrlResponseData>> => {
    return this._api.post(this._endps.getAuthUrl(), {}, { params: input?.params });
  };
  public static handleCallback = async (input?: {
    params: OAuth.Client.CallbackQuery;
  }): Promise<ApiAxiosResponse<Auth.Session.Entity>> => {
    const res: ApiAxiosResponse<Auth.Session.Entity> = await this._api.post(this._endps.callback(), undefined, {
      params: input?.params,
    });
    ClientApi.setToken(res.data.data.access_token);

    return res;
  };
  public static configs = {
    create: (data?: OAuth.Consumer.CreateDto): Promise<ApiAxiosResponse<OAuth.Consumer.Entity>> => {
      return this._api.post(this._endps.configs.create(), data);
    },
    update: (data?: OAuth.Consumer.CreateDto): Promise<ApiAxiosResponse<OAuth.Consumer.Entity>> => {
      return this._api.patch(this._endps.configs.update(), data);
    },
    getAll: (
      _?: undefined,
      params?: OAuth.Consumer.GetAllQuery
    ): Promise<ApiAxiosResponse<OAuth.Consumer.Entity[]>> => {
      return this._api.get(this._endps.configs.getAll(), { params });
    },
  };
}
