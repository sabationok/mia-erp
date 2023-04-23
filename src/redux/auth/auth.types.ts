import { IBase } from '../global.types';
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

export interface IAuthState {
  user: IUser;
  permission: IPermission;
  accessToken?: string;
  isLoading: boolean;
  isLoggedIn: boolean;
  error: AuthErrorType;
}
