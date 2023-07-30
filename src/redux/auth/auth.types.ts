import { AppResponse, IBase } from '../global.types';
import { AuthErrorType } from '../reduxTypes.types';
import { IPermission } from '../permissions/permissions.types';

export interface ISystemRole extends IBase {
  name?: string;
  label?: string;
  actions: string[];
}

export interface IUser extends IBase {
  name?: string;
  email?: string;
  avatarURL?: string;
  sysRole?: ISystemRole;
  permissions?: Partial<IPermission>[];
}

export interface IManager extends Omit<IUser, 'permissions'> {
  code?: string;
  permission?: IPermission;
}

export interface IAuthState {
  user: IUser;
  permission: IPermission;
  access_token?: string;
  refresh_token?: string;
  isLoading: boolean;
  isLoggedIn: boolean;
  error: AuthErrorType;
}

export type ILoggedUserInfo = Pick<IAuthState, 'access_token'> & Pick<IUser, 'email' | '_id'>;

export interface ILoggedUserInfoRes extends AppResponse<ILoggedUserInfo> {}

export interface IRegisteredUserInfoRes extends AppResponse<IRegisteredUser> {}

export interface IRecoveryPasswordRes extends AppResponse<ILoggedUserInfo> {}

export interface ICurrentUserInfoRes extends AppResponse<ICurrentUser> {}

export interface IRegisteredUser {
  email?: string;
}

export interface ILoginUserData {
  email?: string;
  password?: string;
}

export interface IRegistrationData extends ILoginUserData {
  name?: string;
  secondName?: string;
}

export type ICurrentUser = Pick<IUser, 'email'> & Pick<IAuthState, 'access_token' | 'refresh_token'>;
