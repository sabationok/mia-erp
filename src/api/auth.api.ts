import APP_CONFIGS, { Endpoints } from '../redux/APP_CONFIGS';
import { ILoggedUserInfoRes, ILoginUserData, IRegisteredUserInfoRes } from '../types/auth.types';
import { ClientApi } from './client.api';

export default class AuthApi {
  private static api = ClientApi.clientRef;
  private static endpoints = APP_CONFIGS.endpoints.auth;

  public static async registerUser(data: IRegisteredUserInfoRes): Promise<IRegisteredUserInfoRes> {
    return this.api.post(this.endpoints[Endpoints.register]());
  }

  public static async logInUser(data: ILoginUserData): Promise<ILoggedUserInfoRes> {
    return this.api.post(this.endpoints[Endpoints.logIn](), data);
  }

  public static async logOutUser(): Promise<Pick<ILoginUserData, 'email'> & { result: boolean }> {
    return this.api.post(this.endpoints[Endpoints.logOut]());
  }
}
