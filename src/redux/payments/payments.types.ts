import { IBase } from '../global.types';
import { IInvoice } from '../invoices/invoices.types';
import { AppQueryParams } from '../../api';
import { LangPack } from '../../lang';
import { ExtPaymentService } from '../integrations/integrations.types';

export interface IPayment extends IBase {
  invoice?: IInvoice;
  service?: ExtPaymentService;

  method?: IPaymentMethod;

  amount?: number;
}

export interface IPaymentMethod extends IBase {
  label?: string;
  labels?: LangPack;
  disabled?: boolean;
  isDefault?: boolean;
  lang?: LangPack;
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
