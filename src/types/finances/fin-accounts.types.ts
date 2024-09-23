import { HasCurrencyCode, HasLabel, HasOwnerAsCompany, HasStatus, HasType, IBase } from '../utils.types';

export enum FinAccountsTypeEnum {
  PASSIVE = 'PASSIVE',
  ACTIVE = 'ACTIVE',
}

export type CountType = keyof typeof FinAccountsTypeEnum | FinAccountsTypeEnum;

export interface FinAccountBase extends HasType<FinAccountsTypeEnum>, HasStatus, HasLabel, HasCurrencyCode {
  balance?: string;
  code?: string;
}
export interface FinAccountEntity extends IBase, FinAccountBase, HasOwnerAsCompany {}

export interface FinAccountFormData extends Partial<FinAccountBase> {
  parentId?: string;
}
