import { IBase } from '../global.types';
import { IOrder, IOrderSlot } from '../orders/orders.types';
import { IPayment, PaymentProviderEnum } from '../payments/payments.types';
import { IShipment } from '../shipments/shipments.types';

export interface IInvoice extends IBase {
  order?: IOrder;
  slots?: IOrderSlot[];

  shipment?: IShipment;

  payments?: IPayment;

  amount?: number;

  provider?: PaymentProviderEnum;
}
