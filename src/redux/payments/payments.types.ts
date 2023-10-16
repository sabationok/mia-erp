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
export interface IPayment extends IBase {
  invoice?: IInvoice;
  provider?: PaymentProviderEnum;

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
}
export interface IPaymentMethodReqData {
  _id?: string;
  data?: IPaymentMethod;
  params?: Pick<AppQueryParams, 'disabled' | 'isDefault'>;
}
