import { IBase, IBaseKeys, IFormDataValueWithID, OnlyUUID } from '../redux/app-redux.types';
import { LangPack } from '../lang';
import { CompanyEntity } from './companies.types';
import { AppQueryParams } from '../api';
import { HasBaseCmsConfigs } from './cms.types';
import { HasCompany, HasDisabledAttributes, HasEmbeddedType, HasLabel, HasType, MaybeNull, UUID } from './utils.types';

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
  fiscalization = 'fiscalization',
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

export enum MonoInvoicingTypeEnum {
  debit = 'debit',
  hold = 'hold',
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

export enum LiqPayInvoicingTypeEnum {
  pay = 'pay',
  hold = 'hold',
}

export interface ExtServiceBase extends IBase {
  owner: CompanyEntity;
  label: string;
  provider: ExternalServiceProvidersEnum;
  lang?: LangPack;
  defIntegration?: InputIntegrationBase;
  disabled?: boolean;
  // originServices?: ExtSubServicesEntity;
  services?: ExternalServiceTypeEnum[];
}

export interface ExtSubServicesEntity extends Record<ExternalServiceTypeEnum | string, string[]> {}

export interface ChatIds {
  telegram?: (string | number)[];
}
export interface InputIntegrationBase extends IBase, HasLabel, HasCompany, HasType<ExternalServiceTypeEnum> {
  service: ExtServiceBase;

  apiKey?: string; // !
  secret?: string; // !

  publicKey?: string; // !
  privateKey?: string; // !

  publicKeyMask?: string; // !
  privateKeyMask?: string; // !

  // hasSecret?: boolean;
  expireAt?: string | Date;

  login?: string;
  password?: string;

  description?: string;
}
export interface OutputIntegrationBase extends InputIntegrationBase {
  redirectBaseUrl?: string;
  chatIds?: ChatIds;
}

export interface IntegrationBaseDto {
  expireAt?: string;
  label?: string;
  description?: string;
  redirectBaseUrl?: string;
}

export interface IntegrationFormData extends Partial<Omit<IntegrationBaseDto, 'service'>>, Partial<OnlyUUID> {
  apiKey?: string;
  secret?: string;

  publicKey?: string;
  privateKey?: string;

  login?: string;
  password?: string;

  serviceId?: UUID;
  warehouseId?: UUID;
  finAccountId?: UUID;

  setAsDefault?: boolean;

  service?: IFormDataValueWithID;
  warehouse?: IFormDataValueWithID;
  finCount?: IFormDataValueWithID;
}

export interface InputIntegrationDto extends IntegrationBaseDto {
  apiKey?: string;
  secret?: string;

  login?: string;
  password?: string;

  publicKey?: string;
  privateKey?: string;

  serviceId?: UUID;
  warehouseId?: UUID;
  finAccountId?: UUID;
}

export interface CreateOutputIntegrationFormData
  extends Partial<Pick<IntegrationBaseDto, 'description' | 'expireAt' | 'label'>> {
  role?: IFormDataValueWithID;
  redirectBaseUrl?: string;
  chatIds?: ChatIds;
}
export interface OutputIntegrationDto extends IntegrationBaseDto {
  role?: OnlyUUID;
  service?: OnlyUUID;

  roleId?: UUID;
  serviceId?: UUID;

  setAsDefault?: boolean;

  chatIds?: ChatIds;
}

export interface ExtPaymentService extends ExtServiceBase {
  methods?: IPaymentMethod[];
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
  InternalType extends string = any,
  ExternalType extends string = any,
  Service extends ExtServiceBase = any,
> extends IBase,
    HasLabel,
    HasEmbeddedType<InternalType, ExternalType>,
    HasDisabledAttributes,
    HasBaseCmsConfigs {
  isDefault?: boolean;
  group?: string;

  service?: MaybeNull<Service>;
  extService?: MaybeNull<Service>;
}
export interface IMethodReqData<DtoLike = any> {
  _id?: string;
  data?: Partial<OnlyUUID> & Omit<DtoLike, IBaseKeys | 'isDefault' | 'service' | 'extService'>;
  params?: Pick<AppQueryParams, 'disabled' | 'withDeleted' | 'withDefault'>;
}
export enum PaymentInternalTypeEnum {
  postTransfer = 'postTransfer',

  bankTransfer = 'bankTransfer',
  externalService = 'externalService',
  paymentService = 'paymentService',
  cashbackService = 'cashbackService',
  bonusesService = 'bonusesService',
  imposedPayment = 'imposedPayment',

  afterPay = 'afterPay',
  cash = 'cash',

  bonuses_imposedPayment = 'bonuses_imposedPayment',
  bonuses_cash = 'bonuses_cash',
  bonuses_afterPay = 'bonuses_afterPay',
  bonuses_bankTransfer = 'bonuses_bankTransfer',
  bonuses_postTransfer = 'bonuses_postTransfer',
}

export enum DeliveryMethodCategoryEnum {
  external = 'external',
  internal = 'internal',
}

// * COMMUNICATION
export interface ICommunicationMethod extends ServiceMethodBase<string, string, ExtCommunicationService> {}
export interface ICommunicationMethodReqData extends IMethodReqData<ICommunicationMethod> {}

// * INVOICING
export interface IInvoicingMethod
  extends ServiceMethodBase<
    PaymentInternalTypeEnum,
    MonoInvoicingTypeEnum | LiqPayInvoicingTypeEnum,
    ExtInvoicingService
  > {}
export interface IInvoicingMethodReqData extends IMethodReqData<IInvoicingMethod> {}

// * DELIVERY
export interface IDeliveryMethodMinCostFields {
  minCost?: { delivery?: number; return?: number };
}
export interface IDeliveryMethod extends ServiceMethodBase<string, string, ExtDeliveryService> {
  configs?: {
    duration?: MaybeNull<number>;
  };
  invoicingPolicy?: { configs?: IDeliveryMethodMinCostFields };
  paymentPolicy?: {
    configs?: IDeliveryMethodMinCostFields & {
      commissionSender?: MaybeNull<number>;
      commissionReceiver?: MaybeNull<number>;
    };
    methodsIds?: UUID[];
  };
}

export interface IDeliveryMethodDto
  extends Partial<
    Omit<IDeliveryMethod, 'createdAt' | 'deletedAt' | 'updatedAt' | 'isDefault' | 'service' | 'extService'>
  > {}

export interface IDeliveryMethodReqData extends IMethodReqData<IDeliveryMethodDto> {}

// * PAYMENT CHECKOUT
export interface IPaymentMethod
  extends ServiceMethodBase<
    PaymentInternalTypeEnum,
    string | MonoCheckoutMethod | LiqPayCheckoutMethodEnum
    // ExtDeliveryService
  > {
  // bankAccount?: MaybeNull<IBankAccount>;
  // card?: MaybeNull<{ holder?: string; mask?: string }>;
  configs?: {
    commissionSender?: number;
    commissionReceiver?: number;
  };
}
export interface IPaymentMethodReqData extends IMethodReqData<IPaymentMethod> {}

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
