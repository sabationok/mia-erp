import { ICustomRole } from '../customRoles/customRoles.types';
import { IBase } from '../global.types';
import { ICompany } from '../companies/companies.types';
import { IUser } from '../auth/auth.types';
import { StateErrorType } from '../reduxTypes.types';

export type PermissionStatusType = 'active' | 'rejected' | 'pending' | 'baned';

export interface IPermission extends IBase {
  status: PermissionStatusType;
  company: Partial<ICompany>;
  user: Partial<IUser>;
  owner?: Partial<IUser>;
  role: Partial<ICustomRole>;
  permissionToken: string;
  expireAt?: number | Date;
}

export interface IPermissionForReq {
  company: string;
  user: string;
  role: string;
  actions: string[];
}

export interface IPermissionResData {
  meta: {};
  data: IPermission | Partial<IPermission>;
}

export interface IPermissionsResData {
  meta: {};
  data: Partial<IPermission>[] | IPermission[];
}

export interface IPermissionReqData<D = IPermissionForReq | Partial<IPermissionForReq>> {
  id: string;
  data: D;
}

export interface IPermissionsState {
  permission: IPermission;
  permissions?: IPermission[];
  isLoading: boolean;
  error: StateErrorType;
}
