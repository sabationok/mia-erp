import { DirItemFormData, IBaseDirItem } from './dir.types';
import { ApiDirType } from '../redux/APP_CONFIGS';
import { IBase, IBaseKeys } from './utils.types';

export interface DefaultDirectoryType extends IBase {
  label: { en: string; ua?: string };
  disabled?: boolean;
}

export interface FinCategoryEntity
  extends Pick<
    IBaseDirItem<FinTransactionType, ApiDirType.CATEGORIES_TR>,
    IBaseKeys | 'parent' | 'childrenList' | 'label' | 'description' | 'code' | 'taxCode' | 'type'
  > {}

export type FinCategoryFormData = DirItemFormData<FinCategoryEntity>;
export enum FinTransactionTypeEnum {
  INCOME = 'INCOME',
  TRANSFER = 'TRANSFER',
  EXPENSE = 'EXPENSE',
}

export enum TagTypeEnum {
  CUSTOMER = 'CUSTOMER',
  SUPPLIER = 'SUPPLIER',
  WORKER = 'WORKER',
  OFFER = 'OFFER',
  COUNTERPARTY = 'COUNTERPARTY',
  CONTRACTOR = 'CONTRACTOR',
  SUB_CONTRACTOR = 'SUB_CONTRACTOR',
  COMMISSION_AGENT = 'COMMISSION_AGENT',
  CONSIGNOR = 'CONSIGNOR',
  TRANSPORTER = 'TRANSPORTER',
}

export type FinTransactionType = keyof typeof FinTransactionTypeEnum;
