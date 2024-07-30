import { Endpoints } from '../redux/APP_CONFIGS';
import { ILoggedUserInfoRes, IRegisteredUserInfoRes, LoginUserDto, RegisterDto, UserEntity } from '../types/auth.types';
import { ClientApi } from './client.api';
import { ApiResponse } from '../redux/app-redux.types';

type LogoutResponse = Pick<LoginUserDto, 'email'> & { result: boolean };
export default class AuthApi {
  private static api = ClientApi.clientRef;
  private static endpoints = ClientApi._endpoints.auth;

  public static register = (data?: RegisterDto): Promise<IRegisteredUserInfoRes> => {
    return this.api.post(this.endpoints[Endpoints.register](), data);
  };

  public static logInUser = async (data: LoginUserDto): Promise<ILoggedUserInfoRes> => {
    const res: ILoggedUserInfoRes = await this.api.post(this.endpoints[Endpoints.logIn](), data);
    if (res.data.data.access_token) {
      ClientApi.setToken(res.data.data.access_token);
    }
    return res;
  };

  public static logOutUser = async (): Promise<LogoutResponse> => {
    const res: LogoutResponse = await this.api.post(this.endpoints[Endpoints.logOut]());
    ClientApi.unsetToken();

    return res;
  };

  public static getCurrentUser = (): Promise<ApiResponse<UserEntity>> => {
    return this.api.get(this.endpoints.getCurrent());
  };
}
