import baseApi, { baseURL } from './baseApi';
import APP_CONFIGS, { Endpoints } from '../redux/APP_CONFIGS';
import { ILoggedUserInfoRes, ILoginUserData, IRegisteredUserInfoRes } from '../redux/auth/auth.types';

export default class AuthApi {
  private static api = baseApi;
  private static endpoints = APP_CONFIGS.endpoints.auth;
  public static baseUrl = baseURL;

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
