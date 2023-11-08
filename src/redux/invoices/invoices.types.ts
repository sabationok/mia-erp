import { IBase, IFormDataValueWithUUID } from '../global.types';
import { IOrder, IOrderSlot } from '../orders/orders.types';
import { IPayment } from '../payments/payments.types';
import { IShipment } from '../shipments/shipments.types';
import { IInvoicingMethod } from '../integrations/integrations.types';
import { AppQueryParams } from '../../api';

export enum InvoicingTypeEnum {
  hold = 'hold',
  debit = 'debit',
  pay = 'pay',

  bankTransfer = 'bankTransfer',
  afterPay = 'afterPay',
  courier = 'courier',
}

export interface IInvoice extends IBase {
  order?: IOrder;
  slots?: IOrderSlot[];

  shipment?: IShipment;

  type: InvoicingTypeEnum;

  payments?: IPayment[];

  amount?: number;

  method?: IInvoicingMethod;
}

export interface IInvoiceBaseFormData {
  method?: IFormDataValueWithUUID;
  amount?: number;

  expiredAt?: Date | string | number;
  validity?: number;

  order?: IFormDataValueWithUUID;
  slots?: IFormDataValueWithUUID[];

  shipment?: IFormDataValueWithUUID;
}

// export interface IInvoicingMethod extends IBase {
//   label?: string;
//   labels?: LangPack;
//   disabled?: boolean;
//   isDefault?: boolean;
//   lang?: LangPack;
//   type?: string;
//   service?: ExtInvoicingService | null;
//   extService?: ExtInvoicingService | null;
// }
export interface IInvoicingMethodReqData {
  _id?: string;
  data?: Partial<IInvoicingMethod>;
  params?: Pick<AppQueryParams, 'disabled' | 'isDefault'>;
}
