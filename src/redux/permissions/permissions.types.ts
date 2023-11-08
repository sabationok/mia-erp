import { ICustomRole } from '../customRoles/customRoles.types';
import { AppResponse, IBase, OnlyUUID } from '../global.types';
import { ICompanyBase } from '../companies/companies.types';
import { IUserBase } from '../auth/auth.types';
import { StateErrorType } from '../reduxTypes.types';

export enum PermissionStatus {
  PENDING = 'PENDING',
  REJECTED = 'REJECTED',
  ACCEPTED = 'ACCEPTED',
  BANED = 'BANED',
}

export interface IPermission extends IBase {
  company?: Partial<ICompanyBase>;
  user?: Partial<IUserBase>;
  owner?: Partial<IUserBase>;
  role?: Partial<ICustomRole>;
  email?: string;
  status?: PermissionStatus;
  code?: string | number;
  expireAt?: number | Date;
  permission_token?: string;
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
