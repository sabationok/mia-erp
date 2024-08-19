import { IFormDataValueWithID } from '../../redux/app-redux.types';
import { IUserBase } from '../auth/auth.types';
import { HasEmbeddedLabel, HasEmbeddedName, HasTaxCode, IBase, SuffixKeys, UUID, Values } from '../utils.types';
import { ContactsDto } from '../contacts/contacts.types';
import { AddressEntity } from '../addresses/addresses.types';
import {
  DeliveryPolicy,
  FiscalPolicy,
  InvoicingPolicy,
  PaymentPolicy,
  SupplementPolicy,
  WarehousingPolicy,
} from './policies';

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
    InvoicingPolicy.HasPolicy,
    DeliveryPolicy.HasPolicy,
    FiscalPolicy.HasPolicy,
    PaymentPolicy.HasPolicy,
    WarehousingPolicy.HasPolicy,
    SupplementPolicy.HasPolicy {
  owner?: Pick<IUserBase, '_id' | 'name' | 'email'>;
  // permissions?: Partial<PermissionEntity>[];
  // warehouses?: MaybeNull<WarehouseEntity[]>;
  // externalServices?: MaybeNull<ExtServiceBase[]>;
  //
  // inputs?: MaybeNull<InputIntegrationEntity[]>;
  // outputs?: MaybeNull<OutputIntegrationEntity[]>;
}

export type CompanyPoliciesFormDataMap = {
  delivery: DeliveryPolicy.FormData;
  invoicing: InvoicingPolicy.FormData;
  payment: PaymentPolicy.FormData;
  warehousing: WarehousingPolicy.FormData;
  supplement: SupplementPolicy.FormData;
  fiscal: FiscalPolicy.FormData;
};
export type CompanyPoliciesDtoMap = {
  delivery: DeliveryPolicy.Dto;
  invoicing: InvoicingPolicy.Dto;
  payment: PaymentPolicy.Dto;
  warehousing: WarehousingPolicy.Dto;
  supplement: SupplementPolicy.Dto;
  fiscal: FiscalPolicy.Dto;
};

export interface ICompanyFormData extends ICompanyBase, Partial<SuffixKeys<CompanyPoliciesFormDataMap, 'Policy'>> {
  manager?: IFormDataValueWithID & { user?: IUserBase };
}

export interface CompanyDto
  extends Omit<ICompanyBase, '_id' | 'createdAt' | 'updatedAt' | 'deletedAt'>,
    Partial<SuffixKeys<CompanyPoliciesDtoMap, 'Policy'>> {
  managerId?: UUID;

  _id?: string;
}

export interface ICompanyReqData {
  _id?: string;
  data: CompanyDto;
}
