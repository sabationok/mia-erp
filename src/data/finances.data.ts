import { enumToFilterOptions } from '../utils';
import { BankAccountDestinationType } from '../types/finances/bank-accounts.types';
import { LangTextPrefix } from '../i18e/ua';

export const BankAccountTypeFilterOptions = enumToFilterOptions(BankAccountDestinationType, {
  labelPrefix: LangTextPrefix.bank_account,
});
