import { AppResponse, ContactsDto, IBase, IFormDataValueWithUUID, LocationDto, OnlyUUID } from '../global.types';
import { IPermission } from '../permissions/permissions.types';
import { IUser } from '../auth/auth.types';
import { StateErrorType } from '../reduxTypes.types';
import { FilterOpt } from '../../components/ModalForm/ModalFilter';
import { IWarehouse } from '../warehouses/warehouses.types';
import { ISupplierDirItem } from '../../components/Directories/dir.types';

export enum OwnershipTypeEnum {
  UA_TOV = 'ua_tov',
  UA_CLOSED_JOINT_STOCK_COMPANY = 'ua_closed_jsc',
  UA_PUBLIC_JOINT_STOCK_COMPANY = 'ua_public_jsc',
  UA_COOPERATIVE = 'ua_cooperative',
  UA_SOLE_PROPRIETORSHIP = 'ua_sole_proprietorship',
  UA_STATE_COMPANY = 'ua_state_company',
  UA_JOINT_VENTURE = 'ua_joint_venture',
  UA_BRANCH = 'ua_branch',
  UA_FRANCHISING_COMPANY = 'ua_franchising_company',
  UA_COLLECTIVE_ENTERPRISE = 'ua_collective_enterprise',
}
export type OwnershipTypeFilterOption = FilterOpt<OwnershipTypeEnum>;
export enum BusinessSubjectTypeEnum {
  company = 'company',
  entrepreneur = 'entrepreneur',
  person = 'person',
}
export type BusinessSubjectFilterOption = FilterOpt<BusinessSubjectTypeEnum>;

export interface ICompanyConfigs {}

export interface ICompany extends IBase {
  name?: string;
  secondName?: string;
  email?: string;
  fullName?: string;
  label?: string;
  fullLabel?: string;
  ownershipType?: string;
  businessSubjectType?: BusinessSubjectTypeEnum;
  phone?: string;
  taxCode?: string;
  personalTaxCode?: string;
  owner?: Pick<IUser, '_id' | 'name' | 'email'>;
  permissions?: Partial<IPermission>[];
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

export interface ICompanyConfigs {
  warehouse?: IWarehouse;
  supplier?: ISupplierDirItem;
  manager?: IPermission;
}
export interface ICompanyConfigsDto {
  warehouse?: OnlyUUID;
  supplier?: OnlyUUID;
  manager?: OnlyUUID;
}
export interface ICompanyConfigsFormData extends ICompanyConfigsDto {
  warehouse?: IFormDataValueWithUUID;
  supplier?: IFormDataValueWithUUID;
  manager?: IFormDataValueWithUUID;
}

export interface IGetAllCompaniesRes extends AppResponse<ICompany[]> {}

export interface ICompanyRes extends AppResponse<ICompany> {}

export interface ICompanyUpdatingRes extends AppResponse<IPermission> {}

export interface ICompanyCreatingRes extends AppResponse<IPermission> {}

export interface ICompanyDeletingRes extends AppResponse<{ _id: string; result: true }> {}
