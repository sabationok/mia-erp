import { IBase } from '../global.types';
import { IOrder, IOrderSlot } from '../orders/orders.types';
import { IPayment } from '../payments/payments.types';
import { IInvoice } from '../invoices/invoices.types';
import { LangPack } from '../../lang';
import { AppQueryParams } from '../../api';

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

  method?: IShipmentMethod;
}

export interface IShipmentMethod extends IBase {
  provider?: string;
  label?: string;
  lang?: LangPack;
  isDefault?: boolean;
  disabled?: boolean;
}
export interface IShipmentMethodReqData {
  _id?: string;
  data?: IShipmentMethod;
  params?: Pick<AppQueryParams, 'disabled' | 'isDefault'>;
}
