import { ApiResponse, IBase } from '../../redux/app-redux.types';
import { PermissionEntity } from '../permissions.types';
import { AppDate, HasEmbeddedLabel, HasEmbeddedName, HasEmbeddedReference } from '../utils.types';
import { BusinessSubjectTypeEnum } from '../companies/companies.types';
import { AuthState } from '../../redux/auth/auth.slice';

export type IAuthState = AuthState;

export interface ISystemRole extends IBase {
  name?: string;
  label?: string;
  actions: string[];
}

export namespace User {
  export enum BaseRole {
    GUEST = 'GUEST',
    ADMIN = 'ADMIN',
  }

  export interface BaseEntity extends IBase, HasEmbeddedName, HasEmbeddedLabel, HasEmbeddedReference {
    email?: string;
    phone?: string;
    avatarURL?: string;
    sysRole?: ISystemRole;

    verification_token?: string;
    verification_code?: string;
    verifiedAt?: AppDate;
  }

  export interface Entity extends BaseEntity {
    permissions?: Partial<PermissionEntity>[];
  }
}

export interface IUserBase extends User.BaseEntity {}

export interface UserEntity extends User.Entity {}

export interface IManager extends PermissionEntity {}

export type ILoggedUserInfo = Pick<IAuthState, 'access_token'> & Pick<UserEntity, 'email' | '_id'>;

export interface ILoggedUserInfoRes extends ApiResponse<ILoggedUserInfo> {}

export interface IRegisteredUserInfoRes extends ApiResponse<IRegisteredUser> {}

export interface ICurrentUserInfoRes extends ApiResponse<ICurrentUser> {}

export interface IRegisteredUser {
  _id: string;
  email?: string;
  reference?: string;
}

export interface LoginUserDto {
  email?: string;
  password?: string;
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
