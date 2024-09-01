import { IBase, IBaseKeys, IFormDataValueWithID, OnlyUUID } from '../redux/app-redux.types';
import { LangPack } from '../i18e';
import { CompanyEntity } from './companies/companies.types';
import { ApiQueryParams } from '../api';
import { HasBaseCmsConfigs } from './cms.types';
import {
  HasAuthor,
  HasDisabledAttributes,
  HasEditor,
  HasEmbeddedType,
  HasFlags,
  HasLabel,
  HasOwnerAsCompany,
  HasPermission,
  HasType,
  MaybeNull,
  UUID,
} from './utils.types';
import { IBankAccount } from './finances/bank-accounts.types';
import { PermissionRecipientEnum } from './permissions.types';
import { OAuth } from './auth/o-auth.namespace';

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
export namespace ExternalService {
  export interface BaseEntity
    extends IBase,
      HasOwnerAsCompany,
      HasLabel,
      HasBaseCmsConfigs,
      HasFlags<'disabled' | 'isDisabled'> {
    availableFor?: HasFlags<PermissionRecipientEnum>;
  }
}

export interface ExtServiceBase extends IBase {
  owner: CompanyEntity;
  label: string;
  provider: ExternalServiceProvidersEnum;
  lang?: LangPack;
  defIntegration?: InputIntegrationEntity;
  disabled?: boolean;
  // originServices?: ExtSubServicesEntity;
  services?: ExternalServiceTypeEnum[];
}

export interface ChatIds {
  telegram?: string[];
  local?: UUID[];
}

export namespace Integration {
  export enum DirectionType {
    input = 'input',
    output = 'output',
  }
  export interface ByType {
    [DirectionType.input]: Input.Entity;
    [DirectionType.output]: Output.Entity;
  }
  interface BaseEntity extends IBase, HasLabel, HasOwnerAsCompany, HasAuthor, HasEditor, HasType<DirectionType> {
    service: ExtServiceBase;

    publicKey?: string; // !
    privateKey?: string; // !
    login?: string;
    password?: string;

    publicKeyMask?: string; // !
    privateKeyMask?: string; // !

    // hasSecret?: boolean;

    expireAt?: string;
    description?: string;
  }

  interface BaseDto extends Partial<Pick<BaseEntity, 'expireAt' | 'description' | 'label'>> {
    setAsDefault?: boolean;
  }

  interface FromDataBase {
    serviceId?: UUID;
    warehouseId?: UUID;
    finAccountId?: UUID;

    setAsDefault?: boolean;

    // service?: IFormDataValueWithID;
    // warehouse?: IFormDataValueWithID;
    // finAccount?: IFormDataValueWithID;
  }

  export namespace Output {
    export interface Entity extends BaseEntity, HasPermission {
      redirectBaseUrl?: string;
      chatIds?: ChatIds;
      corsPolicy?: {
        origins?: string[];
      };
      oAuth?: OAuth.Consumer.Entity[];
    }
    export interface CreateDto extends BaseDto, Partial<Pick<Entity, 'chatIds' | 'redirectBaseUrl' | 'corsPolicy'>> {
      roleId?: UUID;
    }
    export interface FormData extends CreateDto {
      roleId?: UUID;
      role?: IFormDataValueWithID;
    }
  }

  export namespace Input {
    export interface Entity<Extra = Record<string, any>> extends BaseEntity {
      extra?: Extra;
    }

    export interface CreateDto<Extra = Record<string, any>> extends BaseDto {
      login?: string;
      password?: string;

      publicKey?: string;
      privateKey?: string;

      serviceId?: UUID;
      warehouseId?: UUID;
      finAccountId?: UUID;

      extra?: Extra;
    }
    export interface FormData<Extra = Record<string, any>> extends FromDataBase, CreateDto<Extra> {}
  }
}

export type InputIntegrationEntity = Integration.Input.Entity;

export type OutputIntegrationEntity = Integration.Output.Entity;

export interface IntegrationBaseDto {
  expireAt?: string;
  label?: string;
  description?: string;
  redirectBaseUrl?: string;
}

export interface IntegrationFormData extends Partial<Omit<IntegrationBaseDto, 'service'>>, Partial<OnlyUUID> {
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

export type InputIntegrationDto = Integration.Input.CreateDto;

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

export interface ExtPaymentService extends ExtServiceBase {
  methods?: IPaymentMethod[];
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
  params?: Pick<ApiQueryParams, 'disabled' | 'withDeleted' | 'withDefault'>;
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
    string | MonoCheckoutMethod | LiqPayCheckoutMethodEnum,
    ExtPaymentService
  > {
  bankAccount?: MaybeNull<IBankAccount>;
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
