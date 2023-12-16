import { IBase, IBaseKeys, IFormDataValueWithID, OnlyUUID } from '../redux/global.types';
import { LangPack } from '../lang';
import { ICompany } from './companies.types';
import { AppQueryParams } from '../api';
import { HasBaseCmsConfigs } from './cms.types';
import { HasCategory, HasDisabledAttributes, HasLabel, HasType, MaybeNull } from './utils.types';
import { IBankAccount } from './finances/bank-accounts.types';

export enum IntegrationTypeEnum {
  input = 'input',
  output = 'output',
}
export enum ExternalServiceTypeEnum {
  payment = 'payment',
  shipment = 'shipment',
  delivery = 'delivery',
  invoicing = 'invoicing',
  communication = 'communication',
  payments = 'payments',
  shipments = 'shipments',
  checkout = 'checkout',
  invoices = 'invoices',
  banking = 'banking',
}

export enum ExternalServiceProvidersEnum {
  monobank = 'monobank',
  liqPay = 'liqPay',
  wayForPay = 'wayForPay',
  novapay = 'novapay',
  privat24 = 'privat24',
  ukrpost = 'ukrpost',
  novapost = 'novapost',
  telegram = 'telegram',
  google = 'google',
  ukrnet = 'ukrnet',
  viber = 'viber',
  instagram = 'instagram',
  facebook = 'facebook',
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
  defIntegration?: InputIntegrationBase;
  disabled?: boolean;
  originServices?: ExtSubServicesEntity;
}

export interface ExtSubServicesEntity extends Record<ExternalServiceTypeEnum | string, string[]> {}

export interface ChatIds {
  telegram?: (string | number)[];
}
export interface InputIntegrationBase extends IBase {
  owner?: ICompany;
  service: ExtServiceBase;

  apiKey?: string; // !
  secret?: string; // !
  hasSecret?: boolean;
  expiredAt?: string | Date;
  login?: string;

  type?: ExternalServiceTypeEnum;
  label?: string;
  description?: string;
}
export interface OutputIntegrationBase extends InputIntegrationBase {
  redirectBaseUrl?: string;
  chatIds?: ChatIds;
}

export interface IntegrationBaseDto {
  expiredAt?: string | Date | number;
  label?: string;
  description?: string;
}

export interface CreateIntegrationFormData extends Partial<Omit<IntegrationBaseDto, 'service'>> {
  apiKey?: string;
  secret?: string;
  login?: string;

  service?: IFormDataValueWithID;
  warehouse?: IFormDataValueWithID;
  finCount?: IFormDataValueWithID;
}

export interface InputIntegrationDto extends IntegrationBaseDto {
  apiKey?: string;
  secret?: string;
  login?: string;

  service?: OnlyUUID;
  warehouse?: OnlyUUID;
  finCount?: OnlyUUID;
}

export interface CreateOutputIntegrationFormData
  extends Partial<Pick<IntegrationBaseDto, 'description' | 'expiredAt' | 'label'>> {
  role?: IFormDataValueWithID;
  redirectBaseUrl?: string;
  chatIds?: ChatIds;
}
export interface OutputIntegrationDto extends IntegrationBaseDto {
  role?: OnlyUUID;
  service?: OnlyUUID;
  chatIds?: ChatIds;
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
export interface ServiceMethodBase<
  Type extends string | number = any,
  Category extends string | number = any,
  Service = any
> extends IBase,
    HasBaseCmsConfigs,
    HasLabel,
    HasType<Type>,
    HasCategory<Category>,
    HasDisabledAttributes {
  labels?: LangPack;
  isDefault?: boolean;
  disabled?: boolean;
  disabledForClient?: boolean;

  service?: MaybeNull<Service>;
  extService?: MaybeNull<Service>;
}
export interface IMethodReqData<DtoLike = any> {
  _id?: string;
  data?: Omit<DtoLike, IBaseKeys | 'isDefault' | 'service' | 'extService'>;
  params?: Pick<AppQueryParams, 'disabled' | 'isDefault' | 'disabledForClient'>;
}
export enum InvoicingMethodTypeEnum {
  hold = 'hold',
  debit = 'debit',
  pay = 'pay',

  bankTransfer = 'bankTransfer',
  afterPay = 'afterPay',
  cash = 'cash',

  bonuses_cash = 'bonuses_cash',
  bonuses_afterPay = 'bonuses_afterPay',
  bonuses_bankTransfer = 'bonuses_bankTransfer',
}

export enum InvoicingMethodCategoryEnum {
  paymentService = 'paymentService',
  bankTransfer = 'bankTransfer',
  postTransfer = 'postTransfer',
}
export enum DeliveryMethodCategoryEnum {
  external = 'external',
  internal = 'internal',
}
export interface ICommunicationMethod extends ServiceMethodBase<string, never, ExtCommunicationService> {}
export interface ICommunicationMethodReqData extends IMethodReqData<ICommunicationMethod> {}
export interface IInvoicingMethod
  extends ServiceMethodBase<InvoicingMethodTypeEnum, InvoicingMethodCategoryEnum, ExtInvoicingService> {
  bankAccount?: MaybeNull<IBankAccount>;
}
export interface IInvoicingMethodReqData extends IMethodReqData<IInvoicingMethod> {}

export interface IDeliveryMethodInvoicingPolicy {
  method?: IInvoicingMethod;
  minCost?: { delivery?: number; return?: number };
}
export interface IDeliveryMethod extends ServiceMethodBase<string, never, ExtDeliveryService> {
  invoicing?: IDeliveryMethodInvoicingPolicy;
}

export interface IDeliveryMethodDto
  extends Partial<Omit<IDeliveryMethod, IBaseKeys | 'isDefault' | 'invoicing' | 'service' | 'extService'>> {
  invoicing?: Pick<IDeliveryMethodInvoicingPolicy, 'minCost'> & { method?: OnlyUUID };
}

export interface IDeliveryMethodReqData extends IMethodReqData<IDeliveryMethodDto> {}
export interface ICheckoutPaymentMethod
  extends ServiceMethodBase<string | MonoCheckoutMethod | LiqPayCheckoutMethodEnum, never, ExtDeliveryService> {}
export interface IPaymentMethodReqData extends IMethodReqData<ICheckoutPaymentMethod> {}

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
