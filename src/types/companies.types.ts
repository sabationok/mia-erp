import { IFormDataValueWithID } from '../redux/app-redux.types';
import { PermissionEntity } from './permissions.types';
import { IUserBase } from './auth.types';
import { StateErrorType } from '../redux/reduxTypes.types';
import { WarehouseEntity } from './warehousing/warehouses.types';
import { ExtServiceBase, InputIntegrationEntity, OutputIntegrationEntity } from './integrations.types';
import { HasEmbeddedLabel, HasEmbeddedName, HasTaxCode, IBase, MaybeNull, OnlyUUID, UUID, Values } from './utils.types';
import { SupplierDirEntity } from './dir.types';
import { ContactsDto } from './contacts/contacts.types';
import { AddressEntity } from './addresses/addresses.types';

export enum CompanyQueryTypeEnum {
  own = 'own',
  invited = 'invited',
  invites = 'invites',
  all = 'all',
}

export type CompanyQueryType = Values<CompanyQueryTypeEnum>;

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
    returns?: DeliveryPolicyJsonData;
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
    warehouse?: MaybeNull<WarehouseEntity>;
  }>;
}
export interface HasSupplementPolicy {
  supplementPolicy?: MaybeNull<{
    supplier?: MaybeNull<SupplierDirEntity>;
  }>;
}

export interface ICompanyBase extends IBase, HasEmbeddedLabel, HasEmbeddedName, HasTaxCode {
  email?: string;
  ownershipType?: OwnershipTypeEnum;
  businessSubjectType?: BusinessSubjectTypeEnum;
  phone?: string;
  personalTaxCode?: string;
  type?: string;
  holders?: string[];
  avatarUrl?: string;
  avatarPreviewUrl?: string;
  contacts?: ContactsDto[];
  addresses?: AddressEntity[];
}

export interface CompanyEntity
  extends ICompanyBase,
    HasInvoicingPolicy,
    HasDeliveryPolicy,
    HasWarehousingPolicy,
    HasSupplementPolicy {
  owner?: Pick<IUserBase, '_id' | 'name' | 'email'>;
  permissions?: Partial<PermissionEntity>[];
  warehouses?: MaybeNull<WarehouseEntity[]>;
  externalServices?: MaybeNull<ExtServiceBase[]>;

  inputs?: MaybeNull<InputIntegrationEntity[]>;
  outputs?: MaybeNull<OutputIntegrationEntity[]>;
}

export interface CompaniesState {
  companies: CompanyEntity[];
  current?: CompanyEntity;
  isLoading: boolean;
  error: StateErrorType;
}

export interface InvoicingPolicyJsonData {
  method?: string;
  selectByClient?: boolean;
  autoCreate?: boolean;
  autoPublish?: boolean;
}

export interface FiscalizationPolicyJsonData {
  autoCreate: boolean;
  selectByRoles: string[];
  autoPublish: {
    integrations: boolean;
  };
  method: null | string;
}
export enum FiscalizationPolicyTypeEnum {
  sales = 'sales',
  purchases = 'purchases',
  delivery = 'delivery',
  refunds = 'refunds',
}

export interface ICompanyFiscalizationPolicyFormData {
  sales?: FiscalizationPolicyJsonData;
  delivery?: FiscalizationPolicyJsonData;
  purchases?: FiscalizationPolicyJsonData;
  refunds?: FiscalizationPolicyJsonData;
}

export enum InvoicingPolicyTypeEnum {
  sales = 'sales',
  purchases = 'purchases',
  delivery = 'delivery',
  // returns = 'returns',
}
export interface ICompanyInvoicingPolicyFormData {
  sales?: InvoicingPolicyJsonData;
  delivery?: InvoicingPolicyJsonData;
  purchases?: InvoicingPolicyJsonData;
}
export interface DeliveryPolicyJsonData {
  method?: string;
  methodId?: string;
  selectByClient?: boolean;
  autoCreate?: boolean;
  autoPublish?: boolean;

  hasInsurance?: boolean;
  insurancePercentage?: number;
  minInsuranceAmount?: number;
}
// export interface DeliverySalesPolicyJsonData extends DeliveryPolicyJsonData {
//   hasImposedPayment?: boolean;
//   hasInsurance?: boolean;
//   insurancePercentage?: number;
//   minInsuranceAmount?: number;
// }

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
  fiscalizationPolicy?: ICompanyFiscalizationPolicyFormData;
}

export interface ICompanyDto extends Omit<ICompanyBase, '_id' | 'createdAt' | 'updatedAt' | 'deletedAt'> {
  warehouse?: OnlyUUID;
  supplier?: OnlyUUID;
  manager?: OnlyUUID;

  warehouseId?: UUID;
  supplierId?: UUID;
  managerId?: UUID;

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
  data: ICompanyDto;
}

// export interface ICompanyConfigs {
//   warehouse?: IWarehouse;
//   supplier?: ISupplierDirItem;
//   manager?: Pick<IPermission, '_id' | 'createdAt' | 'deletedAt' | 'updatedAt' | 'user'>;
// }
export interface ICompanyConfigs {
  warehouse?: WarehouseEntity;
  supplier?: IFormDataValueWithID;
  manager?: any;
}
export interface ICompanyWithConfigs extends ICompanyBase, ICompanyConfigs {}
export interface ICompanyConfigsDto {
  warehouseId?: UUID;
  supplierId?: UUID;
  managerId?: UUID;
}
export interface ICompanyConfigsFormData extends ICompanyConfigsDto {
  warehouse?: IFormDataValueWithID;
  supplier?: IFormDataValueWithID;
  manager?: IFormDataValueWithID;
}
