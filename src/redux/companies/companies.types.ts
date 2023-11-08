import { AddressDto, AppResponse, ContactsDto, IBase, IFormDataValueWithUUID, OnlyUUID } from '../global.types';
import { IPermission } from '../permissions/permissions.types';
import { IUserBase } from '../auth/auth.types';
import { StateErrorType } from '../reduxTypes.types';
import { IWarehouse } from '../warehouses/warehouses.types';

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

export enum BusinessSubjectTypeEnum {
  company = 'company',
  entrepreneur = 'entrepreneur',
  person = 'person',
}
export interface TaxCodeDto {
  personal?: string;
  corp?: string;
}

export interface ICompanyBase extends IBase {
  name?: string;
  secondName?: string;
  email?: string;
  fullName?: string;
  label?: string;
  fullLabel?: string;
  ownershipType?: OwnershipTypeEnum;
  businessSubjectType?: BusinessSubjectTypeEnum;
  phone?: string;
  taxCode?: string;
  personalTaxCode?: string;
  type?: string;
  holders?: string[];
  avatarUrl?: string;
  avatarPreviewUrl?: string;
  contacts?: ContactsDto[];
  locations?: AddressDto;
}

export interface ICompany extends ICompanyBase {
  owner?: Pick<IUserBase, '_id' | 'name' | 'email'>;
  permissions?: Partial<IPermission>[];
}

export interface ICompaniesState {
  companies: ICompany[];
  isLoading: boolean;
  error: StateErrorType;
}

export interface ICompanyFormData extends ICompanyBase {
  warehouse?: IFormDataValueWithUUID;
  suppliers?: IFormDataValueWithUUID;
  manager?: IFormDataValueWithUUID & { user?: IUserBase };
}

export interface ICompanyDto extends Omit<ICompanyBase, '_id' | 'createdAt' | 'updatedAt' | 'deletedAt'> {
  warehouse?: OnlyUUID;
  supplier?: OnlyUUID;
  manager?: OnlyUUID;
}
export interface ICompanyForReq extends ICompanyDto {}

export interface ICompanyReqData {
  _id?: string;
  id?: string;
  data: ICompanyDto;
}

// export interface ICompanyConfigs {
//   warehouse?: IWarehouse;
//   supplier?: ISupplierDirItem;
//   manager?: Pick<IPermission, '_id' | 'createdAt' | 'deletedAt' | 'updatedAt' | 'user'>;
// }
export interface ICompanyConfigs {
  warehouse?: IWarehouse;
  supplier?: IFormDataValueWithUUID;
  manager?: any;
}
export interface ICompanyWithConfigs extends ICompanyBase, ICompanyConfigs {}
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

export interface ICompanyUpdatingRes extends AppResponse<ICompany> {}

export interface ICompanyCreatingRes extends AppResponse<IPermission> {}

export interface ICompanyDeletingRes extends AppResponse<{ _id: string; result: true }> {}
