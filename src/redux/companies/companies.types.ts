import { AppResponse, ContactsDto, IBase, LocationDto } from '../global.types';
import { IPermission } from '../permissions/permissions.types';
import { IUser } from '../auth/auth.types';
import { StateErrorType } from '../reduxTypes.types';

export interface ICompanyConfigs {}

export interface ICompany extends IBase {
  name: string;
  email: string;
  fullName: string;
  phone?: string;
  taxCode?: string;
  owner: Pick<IUser, '_id' | 'name' | 'email'>;
  permissions?: Partial<IPermission>[];
  company_token?: string;
  configs?: ICompanyConfigs;
  type?: string;
  holders?: string[];
  avatarUrl?: string;
  avatarPreviewUrl?: string;
  contacts?: ContactsDto[];
  locations?: LocationDto[];
}

export interface ICompaniesState {
  companies: ICompany[];
  isLoading: boolean;
  error: StateErrorType;
}

export interface ICompanyForReq
  extends Partial<
    Omit<ICompany, '_id' | 'createdAt' | 'updatedAt' | 'owner' | 'company_token' | 'configs' | 'permissions'>
  > {}

export interface ICompanyReqData {
  _id?: string;
  id?: string;
  data: ICompanyForReq;
}

export interface IGetAllCompaniesRes extends AppResponse<ICompany[]> {}

export interface ICompanyRes extends AppResponse<ICompany> {}

export interface ICompanyUpdatingRes extends AppResponse<IPermission> {}

export interface ICompanyCreatingRes extends AppResponse<IPermission> {}

export interface ICompanyDeletingRes extends AppResponse<{ _id: string; result: true }> {}
