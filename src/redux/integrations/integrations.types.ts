import { IBase } from '../global.types';
import { LangPack } from '../../lang';
import { ICompany } from '../companies/companies.types';

export enum IntegrationProviderTypeEnum {
  payments = 'payments',
  shipments = 'shipments',
  invoices = 'invoices',
  email = 'email',
  phone = 'phone',
  sms = 'sms',
}
export interface ExtServProviderBase extends IBase {
  type?: IntegrationProviderTypeEnum;
  label: string;
  lang?: LangPack;
}

export interface IntegrationBase extends IBase {
  owner?: ICompany;

  type?: IntegrationProviderTypeEnum;
  label: string;
  description?: string;
}
