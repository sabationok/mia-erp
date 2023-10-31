import { IBase } from '../global.types';
import { IInvoice } from '../invoices/invoices.types';
import { AppQueryParams } from '../../api';
import {
  ExtPaymentService,
  ExtServiceMethodBase,
  LiqPayCheckoutMethodEnum,
  MonoCheckoutMethod,
} from '../integrations/integrations.types';

export interface IPayment extends IBase {
  invoice?: IInvoice;
  method?: ICheckoutPaymentMethod;
  amount?: number;
  status?: string;
}

export interface ICheckoutPaymentMethod extends ExtServiceMethodBase {
  type?: string | MonoCheckoutMethod | LiqPayCheckoutMethodEnum;
  service?: ExtPaymentService | null;
  extService?: ExtPaymentService | null;
}
export interface IPaymentMethodReqData {
  _id?: string;
  data?: ICheckoutPaymentMethod;
  params?: Pick<AppQueryParams, 'disabled' | 'isDefault'>;
}

// TODO refactoring
