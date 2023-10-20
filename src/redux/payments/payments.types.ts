import { IBase } from '../global.types';
import { IOrder, IOrderSlot } from '../orders/orders.types';
import { IInvoice } from '../invoices/invoices.types';
import { IShipment } from '../shipments/shipments.types';
import { AppQueryParams } from '../../api';
import { LangPack } from '../../lang';

export enum PaymentProviderEnum {
  privat24 = 'privat24',
  mono = 'mono',
}

export enum PaymentTypesEnum {
  hold = 'hold',
  debit = 'debit',
  pay = 'pay',

  bankTransfer = 'bankTransfer',
  afterPay = 'afterPay',
  courier = 'courier',
}
export enum PaymentCheckoutEnum {
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
}
export interface IPayment extends IBase {
  invoice?: IInvoice;
  provider?: PaymentServProvider;
  method?: IPaymentMethod;
  checkout?: PaymentCheckoutEnum;

  order?: IOrder;
  slots?: IOrderSlot[];

  shipment?: IShipment;

  amount?: number;
}

export interface IPaymentMethod extends IBase {
  label?: string;
  disabled?: boolean;
  isDefault?: boolean;
  lang?: LangPack;
  type?: string;
  provider?: PaymentServProvider | null;
}
export interface IPaymentMethodReqData {
  _id?: string;
  data?: IPaymentMethod;
  params?: Pick<AppQueryParams, 'disabled' | 'isDefault'>;
}
export interface PaymentServProvider extends ExtServProviderBase {
  paymentServices?: PaymentTypesEnum[];
  checkoutServices?: PaymentCheckoutEnum[];
  methods?: IPaymentMethod[];
}

// TODO refactoring

export enum ExternalServiceProviderTypeEnum {
  payments = 'payments',
  shipments = 'shipments',
  invoices = 'invoices',
  emailService = 'emailService',
  phoneService = 'phoneService',
  smsService = 'smsService',
}
export interface ExtServProviderBase extends IBase {
  type?: ExternalServiceProviderTypeEnum;
  label: string;
  lang?: LangPack;
}
