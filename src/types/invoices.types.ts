import { IBase, IFormDataValueWithID } from '../redux/global.types';
import { IOrder, IOrderSlot } from './orders/orders.types';
import { IInvoicingMethod } from './integrations.types';
import { AppDate, HasAmount, HasExpireDate, HasIsValidFlag, HasMagicLink, HasMethod, MaybeNull } from './utils.types';
import { IDelivery } from './deliveries.types';
import { IPayment } from './payments.types';

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

export interface IInvoice
  extends IBase,
    HasMagicLink,
    HasAmount,
    HasMethod<IInvoicingMethod>,
    HasExpireDate,
    HasInvoiceSummary,
    HasInvoiceDateInfo,
    HasInvoiceStatusInfo,
    HasIsValidFlag {
  order?: IOrder;
  delivery?: IDelivery;
  slots?: IOrderSlot[];
  payments?: IPayment[];
  validity?: number;
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
