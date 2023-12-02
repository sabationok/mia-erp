import { AddressDto, AppResponse, ContactsDto, IBase, IFormDataValueWithID, OnlyUUID } from '../redux/global.types';
import { IPermission } from './permissions.types';
import { IUserBase } from './auth.types';
import { StateErrorType } from '../redux/reduxTypes.types';
import { IWarehouse } from './warehouses.types';
import { ExtServiceBase, InputIntegrationBase, OutputIntegrationBase } from './integrations.types';
import { MaybeNull } from './utils.types';
import { ISupplierDirItem } from './dir.types';

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
export interface HasDeliveryPolicy {
  deliveryPolicy?: MaybeNull<{
    sales?: DeliveryPolicyJsonData;
  }>;
}

export interface HasInvoicingPolicy {
  invoicingPolicy?: MaybeNull<{
    sales?: InvoicingPolicyJsonData;
    delivery?: InvoicingPolicyJsonData;
  }>;
}
export interface HasWarehousingPolicy {
  warehousingPolicy?: MaybeNull<{
    warehouse?: MaybeNull<IWarehouse>;
  }>;
}
export interface HasSupplementPolicy {
  supplementPolicy?: MaybeNull<{
    supplier?: MaybeNull<ISupplierDirItem>;
  }>;
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

export interface ICompany
  extends ICompanyBase,
    HasInvoicingPolicy,
    HasDeliveryPolicy,
    HasWarehousingPolicy,
    HasSupplementPolicy {
  owner?: Pick<IUserBase, '_id' | 'name' | 'email'>;
  permissions?: Partial<IPermission>[];
  warehouses?: MaybeNull<IWarehouse[]>;
  externalServices?: MaybeNull<ExtServiceBase[]>;

  inputs?: MaybeNull<InputIntegrationBase[]>;
  outputs?: MaybeNull<OutputIntegrationBase[]>;
}

export interface ICompaniesState {
  companies: ICompany[];
  isLoading: boolean;
  error: StateErrorType;
}

export interface InvoicingPolicyJsonData {
  method?: string;
  selectByClient?: boolean;
  autoCreate?: boolean;
  autoPublish?: boolean;
}
export interface ICompanyInvoicingPolicyFormData {
  sales?: InvoicingPolicyJsonData;
  delivery?: InvoicingPolicyJsonData;
}
export interface DeliveryPolicyJsonData {
  method?: string;
  selectByClient?: boolean;
  autoCreate?: boolean;
  autoPublish?: boolean;
}
export interface ICompanyDeliveryPolicyFormData {
  sales?: DeliveryPolicyJsonData;
  returns?: DeliveryPolicyJsonData;
}
export interface ICompanyWarehousingPolicyFormData {
  warehouse?: IFormDataValueWithID;
}
export interface ICompanySupplementPolicyFormData {
  supplier?: IFormDataValueWithID;
}
export interface ICompanyFormData extends ICompanyBase {
  warehouse?: IFormDataValueWithID;
  suppliers?: IFormDataValueWithID;
  manager?: IFormDataValueWithID & { user?: IUserBase };

  deliveryPolicy?: ICompanyDeliveryPolicyFormData;
  invoicingPolicy?: ICompanyInvoicingPolicyFormData;
  warehousingPolicy?: ICompanyWarehousingPolicyFormData;
  supplementPolicy?: ICompanySupplementPolicyFormData;
}

export interface ICompanyDto extends Omit<ICompanyBase, '_id' | 'createdAt' | 'updatedAt' | 'deletedAt'> {
  warehouse?: OnlyUUID;
  supplier?: OnlyUUID;
  manager?: OnlyUUID;

  deliveryPolicy?: {
    sales?: DeliveryPolicyJsonData;
  };
  invoicingPolicy?: {
    sales?: InvoicingPolicyJsonData;
    delivery?: InvoicingPolicyJsonData;
  };
  warehousingPolicy?: {
    warehouse?: OnlyUUID;
  };
  supplementPolicy?: {
    supplier?: OnlyUUID;
  };
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
  supplier?: IFormDataValueWithID;
  manager?: any;
}
export interface ICompanyWithConfigs extends ICompanyBase, ICompanyConfigs {}
export interface ICompanyConfigsDto {
  warehouse?: OnlyUUID;
  supplier?: OnlyUUID;
  manager?: OnlyUUID;
}
export interface ICompanyConfigsFormData extends ICompanyConfigsDto {
  warehouse?: IFormDataValueWithID;
  supplier?: IFormDataValueWithID;
  manager?: IFormDataValueWithID;
}

export interface IGetAllCompaniesRes extends AppResponse<ICompany[]> {}

export interface ICompanyRes extends AppResponse<ICompany> {}

export interface ICompanyUpdatingRes extends AppResponse<ICompany> {}

export interface ICompanyCreatingRes extends AppResponse<IPermission> {}

export interface ICompanyDeletingRes extends AppResponse<{ _id: string; result: true }> {}
