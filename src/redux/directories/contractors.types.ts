import { ApiDirType } from '../APP_CONFIGS';
import { IDirItemBase } from '../../types/dir.types';
import { BusinessSubjectTypeEnum, OwnershipTypeEnum } from '../../types/companies/companies.types';

export interface IContractor<T extends ContractorsTypesEnum = any> extends IDirItemBase<ApiDirType.CONTRACTORS> {
  type: T;
  name?: string;
  fullName?: string;
  secondName?: string;
  businessSubjectType?: BusinessSubjectTypeEnum;
  label?: string;
  email?: string;
  phone?: string;
  personalTaxCode?: string;
  attractionSource?: IDirItemBase<ApiDirType.SOURCE_ATTRACTION>;
  ownershipType?: OwnershipTypeEnum;
  description?: string;
  tags?: string[];
}

export interface IContractorFormData extends Omit<IContractor, '_id' | 'createdAt' | 'updatedAt'> {}

export enum ContractorsTypesEnum {
  // COUNTER = 'COUNTER',
  // AUDITOR = 'AUDITOR',
  CUSTOMER = 'CUSTOMER',
  SUPPLIER = 'SUPPLIER',
  WORKER = 'WORKER',
  CONTRACTOR = 'CONTRACTOR',
  SUB_CONTRACTOR = 'SUB_CONTRACTOR',
  COMMISSION_AGENT = 'COMMISSION_AGENT',
  CONSIGNOR = 'CONSIGNOR',
  TRANSPORTER = 'TRANSPORTER',
}
