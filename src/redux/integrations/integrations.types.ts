import { IBase } from '../global.types';
import { LangPack } from '../../lang';
import { ICompany } from '../companies/companies.types';

export enum ExternalServiceProviderTypeEnum {
  payments = 'payments',
  shipments = 'shipments',
  invoices = 'invoices',
  email = 'email',
  phone = 'phone',
  sms = 'sms',
}
export interface ExtServProviderBase extends IBase {
  type?: ExternalServiceProviderTypeEnum;
  label: string;
  lang?: LangPack;
}

export interface IntegrationBase extends IBase {
  owner?: ICompany;

  type?: ExternalServiceProviderTypeEnum;
  label: string;
  description?: string;
}
