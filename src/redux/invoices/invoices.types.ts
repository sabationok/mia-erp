import { IBase, IFormDataValueWithUUID } from '../global.types';
import { IOrder, IOrderSlot } from '../orders/orders.types';
import { IPayment, IPaymentMethod } from '../payments/payments.types';
import { IShipment } from '../shipments/shipments.types';

export interface IInvoice extends IBase {
  order?: IOrder;
  slots?: IOrderSlot[];

  shipment?: IShipment;

  payments?: IPayment[];

  amount?: number;

  method?: IPaymentMethod;
}

export interface IInvoiceBaseFormData {
  method?: IFormDataValueWithUUID;
  amount?: number;

  expiredAt?: Date | string | number;

  order?: IFormDataValueWithUUID;
  slots?: IFormDataValueWithUUID[];

  shipment?: IFormDataValueWithUUID;
}
