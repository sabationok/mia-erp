import { IBase, IFormDataValueWithID, OnlyUUID } from '../redux/app-redux.types';
import { OrderEntity, IOrderSlot } from './orders/orders.types';
import { IInvoicingMethod } from './integrations.types';
import {
  AppDate,
  HasAmount,
  HasEmbeddedError,
  HasEmbeddedReferences,
  HasEmbeddedStatus,
  HasExpireDate,
  HasIsValidFlag,
  HasMagicLink,
  HasMethod,
  MaybeNull,
} from './utils.types';
import { IDelivery } from './deliveries.types';
import { IPayment } from './payments.types';
import { CurrencyCode } from './finances/transactions.types';
import { AppQueryParams } from '../api';

export interface InvoiceAmount {
  amountStart?: MaybeNull<number>;
  amountEnd?: MaybeNull<number>;
}

export interface HasInvoiceSummary {
  totals?: MaybeNull<
    {
      bonusUsed?: MaybeNull<number>;
      bonusAccrued?: MaybeNull<number>;
      taxes?: MaybeNull<string[]>;
      vatAmount?: MaybeNull<number>;
      vatPercentage?: MaybeNull<number>;
      currency?: MaybeNull<string>;
    } & InvoiceAmount
  >;
}

export interface HasInvoiceDateInfo {
  date?: MaybeNull<{
    due?: MaybeNull<AppDate>;
    expected?: MaybeNull<AppDate>;
  }>;
}
export interface HasInvoiceStatusInfo {
  status?: MaybeNull<{
    internal?: MaybeNull<string>;
    external?: MaybeNull<string>;
  }>;
}

export interface InvoiceStatusInfo {
  internal?: MaybeNull<string>;
  external?: MaybeNull<string>;
}

export interface InvoiceErrorInfo {
  internal?: MaybeNull<string>;
  external?: MaybeNull<string>;
}

export interface IInvoiceTotals {
  currency: MaybeNull<CurrencyCode>;
  amountStart: MaybeNull<number>;
  amountEnd: MaybeNull<number>;
  bonusUsed: MaybeNull<number>;
  bonusAccrued: MaybeNull<number>;

  taxes?: MaybeNull<any[]>;
  vatAmount?: MaybeNull<number>;
  vatPercentage?: MaybeNull<number>;
}

export interface InvoiceReqData {}
export interface IInvoice
  extends IBase,
    HasMagicLink,
    HasAmount,
    HasMethod<IInvoicingMethod>,
    HasExpireDate,
    HasEmbeddedReferences,
    HasInvoiceSummary,
    HasInvoiceDateInfo,
    HasIsValidFlag,
    HasEmbeddedStatus<InvoiceStatusInfo>,
    HasEmbeddedError<InvoiceErrorInfo> {
  order?: OrderEntity;
  delivery?: IDelivery;
  slots?: IOrderSlot[];
  payments?: IPayment[];
  validity?: number;

  totals?: MaybeNull<IInvoiceTotals>;

  date: {
    validity: MaybeNull<number>;
    due: MaybeNull<AppDate>;
    expected: MaybeNull<AppDate>;
  };
}
export interface HasInvoice {
  invoice?: MaybeNull<IInvoice>;
}
export interface HasInvoicesList {
  invoices?: MaybeNull<IInvoice[]>;
}
export interface IInvoiceBaseFormData extends HasExpireDate {
  method?: IFormDataValueWithID;
  amount?: number;

  validity?: number;

  order?: IFormDataValueWithID;
  slots?: IFormDataValueWithID[];

  delivery?: IFormDataValueWithID;
}

export interface InvoiceBaseDto {
  method?: OnlyUUID;

  order?: OnlyUUID;
  delivery?: OnlyUUID;
}
export interface CreateInvoiceReqData {
  _id?: string;
  data?: InvoiceBaseDto;
  params?: AppQueryParams;
}

export interface FinalizeInvoiceReqData {
  _id: string;
  data: { amount: number };
  params?: AppQueryParams;
}
