import { IBase } from '../global.types';
import { IOrder, IOrderSlot } from '../orders/orders.types';
import { IPayment } from '../payments/payments.types';
import { IInvoice } from '../invoices/invoices.types';

export enum ShipmentProviderEnum {
  ukrposhta = 'ukrposhta',
  novaposhta = 'novaposhta',
}

export interface IShipment extends IBase {
  order?: IOrder;
  slots?: IOrderSlot[];

  payment?: IPayment;
  invoice?: IInvoice;

  provider?: ShipmentProviderEnum;

  status?: string;
  description?: string;
}
