import { IBase } from '../global.types';
import { LangPack } from '../../lang';
import { ICompany } from '../companies/companies.types';
import { IPaymentMethod } from '../payments/payments.types';
import { IInvoicingMethod } from '../invoices/invoices.types';

export enum ExtIntegrationServiceTypeEnum {
  payments = 'payments',
  shipments = 'shipments',
  invoices = 'invoices',
}
export interface ExtServiceBase extends IBase {
  owner: ICompany;
  label: string;
  lang?: LangPack;
  integration?: ExtIntegrationBase;
  disabled?: boolean;
  services?: ExtSubServicesEntity;
}

export interface ExtSubServicesEntity {
  invoicing?: string[];
  payment?: string[];
  checkout?: string[];
  shipment?: string[];
}

export interface ExtIntegrationBase extends IBase {
  owner?: ICompany;
  service: ExtServiceBase;

  apiKey?: string; // !
  secret?: string; // !

  type?: ExtIntegrationServiceTypeEnum;
  label: string;
  description?: string;
}

export enum PaymentCheckoutEnum {
  // * liqpay
  qr = 'qr',
  card = 'card',
  cash = 'cash',
  gpay = 'gpay',
  apay = 'apay',
  subscribe = 'subscribe',
  paydonate = 'paydonate',
  paysplit = 'paysplit',
  regular = 'regular ',
  auth = 'auth ',

  //* mono
  apple = 'apple',
  google = 'google',
  monobank = 'monobank',
}
export interface ExtPaymentService extends ExtServiceBase {
  methods?: IPaymentMethod[];
}
export interface ExtInvoicingService extends ExtServiceBase {
  methods?: IInvoicingMethod[];
}
