import { Endpoints } from '../../redux/APP_CONFIGS';
import {
  ILoggedUserInfoRes,
  IRegisteredUserInfoRes,
  LoginUserDto,
  RegisterDto,
  UserEntity,
} from '../../types/auth/auth.types';
import { ClientApi } from '../client.api';
import { ApiResponse } from '../api.types';
import { Device } from './Devices.api';
import { OAuthApi } from './OAuth.api';
import { IBase } from '../../types/utils.types';

type LogoutResponse = Pick<LoginUserDto, 'email'> & { result: boolean };
export default class AuthApi {
  private static api = ClientApi.clientRef;
  private static endpoints = ClientApi._endpoints.auth;
  public static devices = Device.Api;
  public static oAuth = OAuthApi;
  public static register = (data?: RegisterDto): Promise<IRegisteredUserInfoRes> => {
    return this.api.post(this.endpoints[Endpoints.register](), data);
  };

  public static logInUser = async (data?: LoginUserDto): Promise<ILoggedUserInfoRes> => {
    const res: ILoggedUserInfoRes = await this.api.post(this.endpoints.logIn(), data);
    if (res.data.data.access_token) {
      ClientApi.setToken(res.data.data.access_token);
    }
    return res;
  };

  public static logOutUser = async (): Promise<ApiResponse<LogoutResponse>> => {
    const res: ApiResponse<LogoutResponse> = await this.api.post(this.endpoints.logOut());
    ClientApi.unsetToken();

    return res;
  };

  public static getCurrentUser = (): Promise<ApiResponse<UserEntity>> => {
    return this.api.get(this.endpoints.getCurrent());
  };
}

export namespace Auth {
  export namespace Session {
    export interface Entity extends IBase {
      access_token: string;
      refresh_token?: string;
      user?: UserEntity;
      permission?: IBase;
      device?: Device.Entity;
    }
  }

  export class Api extends AuthApi {}
}
