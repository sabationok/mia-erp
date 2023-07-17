import { ApiDirType } from '../APP_CONFIGS';
import { IBaseDirItem } from '../../components/Directories/dir.types';

export interface IContractor extends IBaseDirItem<ContractorsTypesEnum, ApiDirType.CONTRACTORS> {
  name?: string;
  label?: string;
  email?: string;
  phone?: string;
  descr?: string;
  tags?: string[];
}

export interface IContractorFormData extends Omit<IContractor, '_id' | 'createdAt' | 'updatedAt'> {}

export enum ContractorsTypesEnum {
  COUNTER = 'COUNTER',
  AUDITOR = 'AUDITOR',
  SUPPLIER = 'SUPPLIER',
  CUSTOMER = 'CUSTOMER',
  MANAGER = 'MANAGER',
  WORKER = 'WORKER',
  FIN_MANAGER = 'FIN_MANAGER',
  COUNT_MANAGER = 'COUNT_MANAGER',
  SUPPLY_MANAGER = 'SUPPLY_MANAGER',
  SALES_MANAGER = 'SALES_MANAGER',
}

export type ContractorsTypes = keyof typeof ContractorsTypesEnum;
