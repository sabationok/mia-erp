import { IBase, IFormDataValueWithUUID, OnlyUUID } from '../global.types';
import { LangPack } from '../../lang';
import { ICompany } from '../companies/companies.types';
import { IPaymentMethod } from '../payments/payments.types';
import { IInvoicingMethod } from '../invoices/invoices.types';

export enum ExtIntegrationServiceTypeEnum {
  payment = 'payment',
  shipment = 'shipment',
  invoicing = 'invoicing',
}
export enum PaymentProviderName {
  mono = 'mono',
  privat24 = 'privat24',
  liqPay = 'liqPay',
  wayForPay = 'wayForPay',
  novapay = 'novapay',
}
export enum MonoCheckoutMethod {
  pan = 'pan',
  apple = 'apple',
  google = 'google',
  monobank = 'monobank',
  wallet = 'wallet',
}

export enum LiqPayCheckoutPayTypesEnum {
  apay = 'apay',
  gpay = 'gpay',
  card = 'card',
  liqpay = 'liqpay',
  privat24 = 'privat24',
  paypart = 'paypart',
  cash = 'cash',
  invoice = 'invoice',
  qr = 'qr',
}

export interface ExtServiceBase extends IBase {
  owner: ICompany;
  label: string;
  value: string;
  lang?: LangPack;
  integration?: ExtIntegrationBase;
  disabled?: boolean;
  originServices?: ExtSubServicesEntity;
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
  hasSecret?: boolean;
  expiredAt?: string | Date;
  login?: string;

  type?: ExtIntegrationServiceTypeEnum;
  label?: string;
  description?: string;
}
export interface IntIntegrationBase extends ExtIntegrationBase {}

export interface ExtIntegrationBaseDto {
  service?: OnlyUUID;
  warehouse?: OnlyUUID;
  finCount?: OnlyUUID;
  apiKey?: string;
  secret?: string;
  expiredAt?: string | Date;
  label?: string;
  description?: string;
  login?: string;
}

export interface CreateIntegrationFormData extends Partial<Omit<ExtIntegrationBaseDto, 'service'>> {
  service?: IFormDataValueWithUUID;
  warehouse?: IFormDataValueWithUUID;
  finCount?: IFormDataValueWithUUID;
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
