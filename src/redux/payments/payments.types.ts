import { IBase } from '../global.types';
import { IInvoice } from '../invoices/invoices.types';
import { AppQueryParams } from '../../api';
import { ExtPaymentService, ExtServiceMethodBase } from '../integrations/integrations.types';

export interface IPayment extends IBase {
  invoice?: IInvoice;
  method?: IPaymentMethod;
  amount?: number;
  status?: string;
}

export interface IPaymentMethod extends ExtServiceMethodBase {
  type?: string;
  service?: ExtPaymentService | null;
  extService?: ExtPaymentService | null;
}
export interface IPaymentMethodReqData {
  _id?: string;
  data?: IPaymentMethod;
  params?: Pick<AppQueryParams, 'disabled' | 'isDefault'>;
}

// TODO refactoring
