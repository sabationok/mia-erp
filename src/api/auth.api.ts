import APP_CONFIGS, { Endpoints } from '../redux/APP_CONFIGS';
import {
  ILoggedUserInfoRes,
  ILoginUserData,
  IRegisteredUserInfoRes,
  RegisterDto,
  UserEntity,
} from '../types/auth.types';
import { ClientApi } from './client.api';
import { ApiResponse } from '../redux/app-redux.types';

export default class AuthApi {
  private static api = ClientApi.clientRef;
  private static endpoints = APP_CONFIGS.endpoints.auth;

  public static register = (data?: RegisterDto): Promise<IRegisteredUserInfoRes> => {
    return this.api.post(this.endpoints[Endpoints.register](), data);
  };

  public static async logInUser(data: ILoginUserData): Promise<ILoggedUserInfoRes> {
    return this.api.post(this.endpoints[Endpoints.logIn](), data);
  }

  public static async logOutUser(): Promise<Pick<ILoginUserData, 'email'> & { result: boolean }> {
    return this.api.post(this.endpoints[Endpoints.logOut]());
  }

  public static getCurrentUser = (): Promise<ApiResponse<UserEntity>> => {
    return this.api.get(this.endpoints.getCurrent());
  };
}
