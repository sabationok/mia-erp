import { ApiDirType } from '../APP_CONFIGS';
import { IBaseDirItem } from '../../components/Directories/dir.types';

export interface IContractor extends IBaseDirItem<ContractorsTypesEnum, ApiDirType.CONTRACTORS> {
  type: ContractorsTypesEnum;
  name?: string;
  fullName?: string;
  secondName?: string;
  label?: string;
  email?: string;
  phone?: string;
  ownershipType?: string;
  description?: string;
  tags?: string[];
}

export interface IContractorFormData extends Omit<IContractor, '_id' | 'createdAt' | 'updatedAt' | 'type'> {
  type: { label?: string; value: ContractorsTypesEnum };
}

export interface ITagFormData
  extends Omit<IBaseDirItem<ContractorsTypesEnum, ApiDirType.TAGS>, '_id' | 'createdAt' | 'updatedAt' | 'type'> {
  type: { label?: string; value: ContractorsTypesEnum };
}

export enum ContractorsTypesEnum {
  COUNTER = 'COUNTER',
  AUDITOR = 'AUDITOR',
  SUPPLIER = 'SUPPLIER',
  CUSTOMER = 'CUSTOMER',
  MANAGER = 'MANAGER',
  FIN_MANAGER = 'FIN_MANAGER',
  BRAND_MANAGER = 'BRAND_MANAGER',
  SUPPLY_MANAGER = 'SUPPLY_MANAGER',
  SALES_MANAGER = 'SALES_MANAGER',
  WORKER = 'WORKER',
  COMMISSION_AGENT = 'COMMISSION_AGENT',
  CONSIGNOR = 'CONSIGNOR',
  TRANSPORTER = 'TRANSPORTER',
}

export type ContractorsTypes = keyof typeof ContractorsTypesEnum;
