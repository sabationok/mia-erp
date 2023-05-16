import { ICustomRole } from '../customRoles/customRoles.types';
import { IBase } from '../global.types';
import { ICompany } from '../companies/companies.types';
import { IUser } from '../auth/auth.types';
import { StateErrorType } from '../reduxTypes.types';
import { PagePathType } from '../../data/pages.data';

export type PermissionStatusType = 'active' | 'rejected' | 'pending' | 'baned'


export interface IPermission extends IBase {
  status: PermissionStatusType;
  company: Partial<ICompany>;
  user: Partial<IUser>;
  role: Partial<ICustomRole>;
  permissionToken: string;
}

export interface IPermissionResData {
  meta: {},
  data: IPermission | Partial<IPermission>
}

export interface IPermissionsResData {
  meta: {},
  data: Partial<IPermission>[] | IPermission[]
}

export interface IPermissionReqData {
  id: string;
  data: {
    company: string;
    user: string;
    role: string;
  };
}

export interface IPermissionsState {
  permission: IPermission;
  permissions?: IPermission[];
  isLoading: boolean;
  error: StateErrorType;
}

