import { IBase, IFormDataValueWithID, OnlyUUID } from '../../redux/global.types';
import { HasCompany, HasLabel, HasType, MaybeNull } from '../utils.types';
import { IInvoicingMethod } from '../integrations.types';

export interface IBankAccount extends IBase, HasCompany, HasLabel, HasType<BankAccountDestinationType> {
  iban?: MaybeNull<string>;
  card?: MaybeNull<string>;
  taxId?: MaybeNull<string>;
  holder?: MaybeNull<string>;
  bank?: MaybeNull<{
    label?: MaybeNull<string>;
    country?: MaybeNull<string>;
    taxId?: MaybeNull<string>;
  }>;
  finCount?: MaybeNull<OnlyUUID>;
  integration?: MaybeNull<OnlyUUID>;
  method?: MaybeNull<IInvoicingMethod>;
}
export interface BankAccountFormData extends BankAccountDto {}
export interface BankAccountDto {
  label?: string;
  iban?: string;
  card?: string;
  type?: IFormDataValueWithID;

  taxId?: string;
  holder?: string;
  bank?: {
    label?: string;
    country?: string;
    taxId?: string;
  };
  finCount?: OnlyUUID;
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
