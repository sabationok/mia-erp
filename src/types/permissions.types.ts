import { ICustomRole } from '../redux/customRoles/customRoles.types';
import { AppResponse, IBase, OnlyUUID } from '../redux/global.types';
import { ICompanyBase } from './companies.types';
import { IUserBase } from './auth.types';
import { StateErrorType } from '../redux/reduxTypes.types';
import { OutputIntegrationBase } from './integrations.types';
import { HasExpireDate, HasStatus } from './utils.types';

export enum PermissionStatus {
  PENDING = 'PENDING',
  REJECTED = 'REJECTED',
  ACCEPTED = 'ACCEPTED',
  BANED = 'BANED',
}

export interface IPermission extends IBase, HasStatus<PermissionStatus>, HasExpireDate {
  company?: Partial<ICompanyBase>;

  user?: Partial<IUserBase>;
  integration?: Partial<OutputIntegrationBase>;

  owner?: Partial<IUserBase>;

  role?: Partial<ICustomRole>;

  email?: string;
  code?: string | number;
  permission_token?: string;
  access_token?: string;
}

export interface IPermissionForReq {
  role?: OnlyUUID;
  email?: string;
  expireAt?: string | number | Date;
  actions?: any[];
}

export interface IPermissionResData extends AppResponse<IPermission> {}

export interface IPermissionsResData extends AppResponse<IPermission[]> {}

export interface IPermissionReqData<D = IPermissionForReq | Partial<IPermissionForReq>> {
  id: string;
  _id?: string;
  data: D;
}

export interface IPermissionsState {
  permission: Partial<IPermission>;
  permissions: IPermission[];
  users: IPermission[];
  permission_token?: string;
  isLoading: boolean;
  error: StateErrorType;
}
