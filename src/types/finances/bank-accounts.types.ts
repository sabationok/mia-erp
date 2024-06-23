import { IBase, OnlyUUID } from '../../redux/app-redux.types';
import { HasCompany, HasLabel, HasType, MaybeNull, UUID } from '../utils.types';
import { IPaymentMethod } from '../integrations.types';

export interface BankDetailsBase {
  label?: MaybeNull<string>;
  country?: MaybeNull<string>;
  taxCode?: MaybeNull<string>;
}
export interface IBankAccountBase extends HasLabel, HasType<BankAccountDestinationType> {
  iban?: MaybeNull<string>;
  card?: MaybeNull<string>;
  taxCode?: MaybeNull<string>;
  holder?: MaybeNull<string>;
  bank?: MaybeNull<BankDetailsBase>;
}
export interface IBankAccount extends IBase, HasCompany, IBankAccountBase {
  finAccount?: MaybeNull<OnlyUUID>;
  integration?: MaybeNull<OnlyUUID>;
  method?: MaybeNull<IPaymentMethod>;
}

export interface BankAccountFormData extends BankAccountDto {
  withMethod?: boolean;
}
export interface BankAccountDto extends Partial<OnlyUUID>, IBankAccountBase {
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
