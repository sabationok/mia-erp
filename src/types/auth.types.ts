import { ApiResponse, IBase } from '../redux/app-redux.types';
import { AuthErrorType } from '../redux/reduxTypes.types';
import { PermissionEntity } from './permissions.types';
import { HasEmbeddedLabel, HasEmbeddedName, HasEmbeddedReference } from './utils.types';
import { BusinessSubjectTypeEnum } from './companies.types';

export interface ISystemRole extends IBase {
  name?: string;
  label?: string;
  actions: string[];
}

export interface IUserBase extends IBase, HasEmbeddedName, HasEmbeddedLabel, HasEmbeddedReference {
  email?: string;
  phone?: string;
  avatarURL?: string;
  sysRole?: ISystemRole;
  ref?: string;
}

export interface UserEntity extends IUserBase {
  permissions?: Partial<PermissionEntity>[];
}

export interface IManager extends PermissionEntity {}

export interface IAuthState {
  user: UserEntity;
  permission: PermissionEntity;
  access_token?: string;
  refresh_token?: string;
  isLoading: boolean;
  isLoggedIn: boolean;
  error: AuthErrorType;
}

export type ILoggedUserInfo = Pick<IAuthState, 'access_token'> & Pick<UserEntity, 'email' | '_id'>;

export interface ILoggedUserInfoRes extends ApiResponse<ILoggedUserInfo> {}

export interface IRegisteredUserInfoRes extends ApiResponse<IRegisteredUser> {}

export interface IRecoveryPasswordRes extends ApiResponse<ILoggedUserInfo> {}

export interface ICurrentUserInfoRes extends ApiResponse<ICurrentUser> {}

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

export interface HasRegisterUserDtoFields {
  name?: {
    first?: string;
    second?: string;
  };
}
export interface HasRegisterCompanyDtoFields {
  label?: {
    base?: string;
    full?: string;
    print?: string;
  };
}
export type RegisterDto = {
  email?: string;
  password?: string;
  businessType?: BusinessSubjectTypeEnum;
} & (HasRegisterUserDtoFields | HasRegisterCompanyDtoFields);

export type ICurrentUser = Pick<UserEntity, 'email'> & Pick<IAuthState, 'access_token' | 'refresh_token'>;
