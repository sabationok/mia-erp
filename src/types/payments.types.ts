import { IBase, OnlyUUID } from '../redux/global.types';
import { AppQueryParams } from '../api';
import {
  ExtPaymentService,
  LiqPayCheckoutMethodEnum,
  MonoCheckoutMethod,
  ServiceMethodBase,
} from './integrations.types';
import { HasMethod, HasStatus, MaybeNull } from './utils.types';

export interface IPayment extends IBase, HasMethod<ICheckoutPaymentMethod>, HasStatus {
  amount?: number;

  invoice?: OnlyUUID;
}

export interface ICheckoutPaymentMethod extends ServiceMethodBase {
  type?: string | MonoCheckoutMethod | LiqPayCheckoutMethodEnum;
  service?: ExtPaymentService | null;
  extService?: ExtPaymentService | null;
}
export interface IPaymentMethodReqData {
  _id?: string;
  data?: Partial<ICheckoutPaymentMethod>;
  params?: Pick<AppQueryParams, 'disabled' | 'isDefault'>;
}

export interface HasPayment {
  payment?: MaybeNull<IPayment>;
}
export interface HasPaymentsList {
  payments?: MaybeNull<IPayment[]>;
}

// TODO refactoring
