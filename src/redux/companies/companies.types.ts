import { IBase } from '../global.types';
import { IPermission } from '../permissions/permissions.types';
import { IUser } from '../auth/auth.types';
import { StateErrorType } from '../reduxTypes.types';

export interface ICompanyConfigs {
}

export interface ICompany extends IBase {
  name: string;
  email: string;
  phone?: string;
  fullName: string;
  taxCode?: string;
  owner: Partial<IUser>;
  logo?: string;
  permissions?: Partial<IPermission>[];
  companyToken?: string;
  configs?: ICompanyConfigs;
}

export interface ICompaniesState {
  companies: ICompany[];
  isLoading: boolean;
  error: StateErrorType;
}
