import { IBaseDirItem } from './dir.types';
import { ApiDirType } from '../redux/APP_CONFIGS';
import { IBase } from '../redux/app-redux.types';

export interface DefaultDirectoryType extends IBase {
  _id: string;
  label: { en: string; ua?: string };
  disabled?: boolean;
}

export interface ITrCategory extends IBaseDirItem<FinTransactionType, ApiDirType.CATEGORIES_TR> {}

export interface ITrCategoryFormData
  extends Omit<ITrCategory, '_id' | 'createdAt' | 'updatedAt' | 'childrenList' | 'parent'> {
  parent?: Omit<ITrCategory, '_id' | 'createdAt' | 'updatedAt' | 'childrenList' | 'parent'>;
}

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
