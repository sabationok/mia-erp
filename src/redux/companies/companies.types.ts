import { AppResponse, IBase } from '../global.types';
import { IPermission } from '../permissions/permissions.types';
import { IUser } from '../auth/auth.types';
import { StateErrorType } from '../reduxTypes.types';

export interface ICompanyConfigs {}

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

export interface ICompanyForReq extends Partial<Omit<ICompany, '_id' | 'createdAt' | 'updatedAt'>> {}

export interface ICompanyReqData {
  _id?: string;
  id?: string;
  data: ICompanyForReq;
}

export interface IGetAllCompaniesRes extends AppResponse<ICompany[]> {}

export interface ICompanyRes extends AppResponse<ICompany> {}
