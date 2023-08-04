import { ApiDirType } from '../APP_CONFIGS';
import { IDirItemBase } from '../../components/Directories/dir.types';

export interface IContractor<T extends ContractorsTypesEnum = any>
  extends IDirItemBase<ApiDirType.CONTRACTORS, ContractorsTypesEnum> {
  type: T;
  name?: string;
  fullName?: string;
  secondName?: string;
  label?: string;
  email?: string;
  phone?: string;
  personalTaxCode?: string;
  attractionSource?: IDirItemBase<ApiDirType.SOURCE_ATTRACTION>;
  ownershipType?: string;
  description?: string;
  tags?: string[];
}

export interface IContractorFormData extends Omit<IContractor, '_id' | 'createdAt' | 'updatedAt'> {}

export enum ContractorsTypesEnum {
  COUNTER = 'COUNTER',
  AUDITOR = 'AUDITOR',
  SUPPLIER = 'SUPPLIER',
  CUSTOMER = 'CUSTOMER',
  CONTRACTOR = 'CONTRACTOR',
  SUB_CONTRACTOR = 'SUB_CONTRACTOR',
  WORKER = 'WORKER',
  COMMISSION_AGENT = 'COMMISSION_AGENT',
  CONSIGNOR = 'CONSIGNOR',
  TRANSPORTER = 'TRANSPORTER',
}

export type ContractorsTypes = keyof typeof ContractorsTypesEnum;
