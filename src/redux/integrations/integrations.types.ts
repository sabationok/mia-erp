import { IBase, IFormDataValueWithUUID, OnlyUUID } from '../global.types';
import { LangPack } from '../../lang';
import { ICompany } from '../companies/companies.types';
import { ICheckoutPaymentMethod } from '../payments/payments.types';
import { IInvoicingMethod } from '../invoices/invoices.types';
import { AppQueryParams } from '../../api';

export enum IntegrationTypeEnum {
  input = 'input',
  output = 'output',
}
export enum ExtIntegrationServiceTypeEnum {
  payment = 'payment',
  shipment = 'shipment',
  delivery = 'delivery',
  invoicing = 'invoicing',
  communication = 'communication',
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

export enum LiqPayCheckoutMethodEnum {
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
  defIntegration?: ExtIntegrationBase;
  disabled?: boolean;
  originServices?: ExtSubServicesEntity;
}

export interface ExtSubServicesEntity extends Record<ExtIntegrationServiceTypeEnum | string, string[]> {}

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
  methods?: ICheckoutPaymentMethod[];
}
export interface ExtInvoicingService extends ExtServiceBase {
  methods?: IInvoicingMethod[];
}
export interface ExtCommunicationService extends ExtServiceBase {
  methods?: ICommunicationMethod[];
}
export interface ExtDeliveryService extends ExtServiceBase {
  methods?: IDeliveryMethod[];
}
export interface ExtServiceMethodBase<Type = any, Service = any> extends IBase {
  label?: string;
  labels?: LangPack;
  isDefault?: boolean;
  disabled?: boolean;
  disabledForClient?: boolean;

  type?: Type;
  service?: Service | null;
  extService?: Service | null;
}

export interface ICommunicationMethod extends ExtServiceMethodBase {
  type?: string;
  service?: ExtCommunicationService | null;
  extService?: ExtCommunicationService | null;
}
export interface ICommunicationMethodReqData {
  _id?: string;
  data?: Omit<ICommunicationMethod, '_id' | 'createdAt' | 'updatedAt' | 'deletedAt' | 'isDefault'>;
  params?: Pick<AppQueryParams, 'disabled' | 'isDefault'>;
}

export interface IDeliveryMethod extends ExtServiceMethodBase<string, ExtDeliveryService> {}
