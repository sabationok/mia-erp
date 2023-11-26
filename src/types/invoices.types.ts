import { IBase, IFormDataValueWithID } from '../redux/global.types';
import { IOrder, IOrderSlot } from './orders.types';
import { IInvoicingMethod } from './integrations.types';
import { HasAmount, HasExpireDate, HasMagicLink, HasMethod, MaybeNull } from './utils.types';
import { IDelivery } from './deliveries.types';
import { IPayment } from './payments.types';

export interface IInvoice extends IBase, HasMagicLink, HasAmount, HasMethod<IInvoicingMethod>, HasExpireDate {
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
