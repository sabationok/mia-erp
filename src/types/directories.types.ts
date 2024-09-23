import { IBaseDirItem } from './dir.types';
import { ApiDirType } from '../redux/APP_CONFIGS';
import { IBase, IBaseKeys, OnlyUUID, UUID } from '../redux/app-redux.types';

export interface DefaultDirectoryType extends IBase {
  _id: string;
  label: { en: string; ua?: string };
  disabled?: boolean;
}

export interface FinCategoryEntity
  extends Pick<
    IBaseDirItem<FinTransactionType, ApiDirType.CATEGORIES_TR>,
    IBaseKeys | 'parent' | 'childrenList' | 'createdAt' | 'label' | 'description' | 'code' | 'taxCode' | 'type'
  > {}

export interface FinCategoryFormData
  extends Partial<OnlyUUID>,
    Omit<FinCategoryEntity, IBaseKeys | 'childrenList' | 'parent'> {
  parent?: Pick<FinCategoryEntity, 'label'> & Partial<OnlyUUID>;
  parentId?: UUID;
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
