import { HasCompany, HasLabel, HasTaxCode, HasType, MaybeNull, OnlyUUID, UUID } from '../utils.types';
import { IPaymentMethod } from '../integrations.types';

export interface BankDetailsBase extends HasLabel, HasTaxCode {
  country?: MaybeNull<string>;
}
export interface BankAccountBase extends HasLabel, HasTaxCode, HasType<BankAccountDestinationType> {
  iban?: MaybeNull<string>;
  card?: MaybeNull<string>;
  holder?: MaybeNull<string>;
  bank?: MaybeNull<BankDetailsBase>;
}
export interface BankAccountEntity extends HasCompany, BankAccountBase {
  finAccount?: MaybeNull<OnlyUUID>;
  integration?: MaybeNull<OnlyUUID>;
  method?: MaybeNull<IPaymentMethod>;
}

export interface BankAccountFormData extends BankAccountDto {
  withMethod?: boolean;
}
export interface BankAccountDto extends Partial<OnlyUUID>, BankAccountBase {
  finAccountsId?: UUID;
  integrationId?: UUID;
}

export interface BankAccountReqData {
  _id?: string;
  data?: BankAccountDto;
  params?: { withMethod?: boolean };
}
export enum BankAccountDestinationType {
  personal = 'personal',
  business = 'business',
  salary = 'salary',
  deposit = 'deposit',
  investment = 'investment',
  currency = 'currency',
  travel = 'travel',
  ira = 'ira',
  payroll = 'payroll',
  escrow = 'escrow',
}
