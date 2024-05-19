import APP_CONFIGS, { Endpoints } from '../redux/APP_CONFIGS';
import {
  ILoggedUserInfoRes,
  ILoginUserData,
  IRegisteredUserInfoRes,
  IRegistrationData,
  UserEntity,
} from '../types/auth.types';
import { ClientApi } from './client.api';
import { AppResponse } from '../redux/global.types';

export default class AuthApi {
  private static api = ClientApi.clientRef;
  private static endpoints = APP_CONFIGS.endpoints.auth;

  public static async registerUser(data?: IRegistrationData): Promise<IRegisteredUserInfoRes> {
    return this.api.post(this.endpoints[Endpoints.register](), data);
  }

  public static async logInUser(data: ILoginUserData): Promise<ILoggedUserInfoRes> {
    return this.api.post(this.endpoints[Endpoints.logIn](), data);
  }

  public static async logOutUser(): Promise<Pick<ILoginUserData, 'email'> & { result: boolean }> {
    return this.api.post(this.endpoints[Endpoints.logOut]());
  }

  public static getCurrentUser = (): Promise<AppResponse<UserEntity>> => {
    return this.api.get(this.endpoints.getCurrent());
  };
}
