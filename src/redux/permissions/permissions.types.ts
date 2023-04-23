import { ICustomRole } from '../../data/customRoles.types';
import { IBase } from '../global.types';
import { ICompany } from '../companies/companies.types';
import { IUser } from '../auth/auth.types';
import { StateErrorType } from '../reduxTypes.types';

export type PermissionStatusType = 'active' | 'rejected' | 'pending' | 'baned'

export interface IPermission extends IBase {
  status: PermissionStatusType;
  company: Partial<ICompany>;
  user: Partial<IUser>;
  role: Partial<ICustomRole>;
  permissionToken: string;
}

export interface IPermissionsState {
  permission: IPermission;
  permissions?: IPermission[];
  isLoading: boolean;
  error: StateErrorType;
}

