import { HasCompany, HasCurrencyCode, IBase, IFormDataValueWithID, OnlyUUID } from '../redux/app-redux.types';
import { OrderEntity } from './orders/orders.types';
import { IInvoicingMethod } from './integrations.types';
import {
  HasEmbeddedError,
  HasEmbeddedReferences,
  HasEmbeddedStatus,
  HasExpireDate,
  HasIsValidFlag,
  HasMethod,
  MaybeNull,
} from './utils.types';
import { HasDeliveriesList, HasDelivery } from './deliveries.types';
import { HasPaymentsList } from './payments.types';
import { ApiQueryParams } from '../api';
import { OrderSlotEntity } from './orders/order-slot.types';
import { HasRefundRequests } from './refunds';
import { OrderSummary } from './orders';
import { AmountAndPercentageFields } from './price-management';

export interface InvoiceAmount {
  amountStart?: string;
  amountEnd?: string;
}

export interface IInvoiceSummary extends HasCurrencyCode, InvoiceAmount, OrderSummary {
  tax?: AmountAndPercentageFields;
}
export interface HasInvoiceSummary {
  summary?: IInvoiceSummary;
}

export interface HasInvoiceSchedule extends Pick<OrderEntity, 'schedule'> {}

export interface InvoiceStatusInfo {
  internal?: MaybeNull<string>;
  external?: MaybeNull<string>;
}

export interface InvoiceErrorInfo {
  internal?: MaybeNull<string>;
  external?: MaybeNull<string>;
}

export interface InvoiceBaseEntity
  extends HasEmbeddedReferences,
    HasInvoiceSummary,
    HasInvoiceSchedule,
    HasIsValidFlag,
    HasEmbeddedStatus<InvoiceStatusInfo>,
    HasEmbeddedError<InvoiceErrorInfo> {}

export interface InvoiceEntity
  extends IBase,
    InvoiceBaseEntity,
    HasMethod<IInvoicingMethod>,
    HasPaymentsList,
    HasRefundRequests,
    HasCompany,
    HasDeliveriesList,
    HasDelivery {
  order?: OrderEntity;

  slots?: OrderSlotEntity[];
}
export interface HasInvoice {
  invoice?: MaybeNull<InvoiceEntity>;
}
export interface HasInvoicesList {
  invoices?: MaybeNull<InvoiceEntity[]>;
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
  params?: ApiQueryParams;
}

export interface FinalizeInvoiceReqData {
  _id: string;
  data: { amount: number };
  params?: ApiQueryParams;
}
