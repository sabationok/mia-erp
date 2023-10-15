import { IBase } from '../global.types';
import { IOrder, IOrderSlot } from '../orders/orders.types';
import { IInvoice } from '../invoices/invoices.types';
import { IShipment } from '../shipments/shipments.types';

export enum PaymentProviderEnum {
  privat24 = 'privat24',
  mono = 'mono',
}
export interface IPayment extends IBase {
  invoice?: IInvoice;
  provider?: PaymentProviderEnum;

  order?: IOrder;
  slots?: IOrderSlot[];

  shipment?: IShipment;

  amount?: number;
}
