import { IBase, IFormDataValueWithUUID, MagicLinkRef } from '../global.types';
import { IOrder, IOrderSlot } from '../orders/orders.types';
import { IPayment } from '../payments/payments.types';
import { IInvoicingMethod } from '../integrations/integrations.types';
import { IDelivery } from '../deliveries/deliveries.types';

export interface IInvoice extends IBase, MagicLinkRef {
  order?: IOrder;
  delivery?: IDelivery;

  amount?: number;
  expiredAt?: Date | string | number;
  validity?: number;

  slots?: IOrderSlot[];

  payments?: IPayment[];

  method?: IInvoicingMethod;
}

export interface IInvoiceBaseFormData {
  method?: IFormDataValueWithUUID;
  amount?: number;

  expiredAt?: Date | string | number;
  validity?: number;

  order?: IFormDataValueWithUUID;
  slots?: IFormDataValueWithUUID[];

  delivery?: IFormDataValueWithUUID;
}
