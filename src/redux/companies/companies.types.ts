import { IBase } from '../global.types';
import { IPermission } from '../permissions/permissions.types';
import { IUser } from '../auth/auth.types';
import { StateErrorType } from '../reduxTypes.types';

export interface ICompany extends IBase {
  name: string;
  email: string;
  phone?: string;
  fullName: string;
  owner: Partial<IUser>;
  logo?: string;
  permissions?: IPermission[];
  companyToken?: string;
}

export interface ICompaniesState {
  companies: ICompany[];
  isLoading: boolean;
  error: StateErrorType;
}

