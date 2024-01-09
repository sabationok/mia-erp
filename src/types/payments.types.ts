import { IBase, OnlyUUID } from '../redux/global.types';
import { IPaymentMethod } from './integrations.types';
import {
  HasEmbeddedError,
  HasEmbeddedReferences,
  HasEmbeddedStatus,
  HasExpireDate,
  HasMethod,
  MaybeNull,
} from './utils.types';
import { CurrencyCode } from './finances/transactions.types';

export enum PaymentInternalStatusEnum {
  created = 'created',
  confirmed = 'confirmed',
  in_hold = 'in_hold',
  awaiting_manager_confirmation = 'awaiting_manager_confirmation',
  awaiting_bank_confirmation = 'awaiting_bank_confirmation',
}
export interface PaymentStatusInfo {
  internal?: MaybeNull<PaymentInternalStatusEnum>;
  external?: MaybeNull<string>;
}

export interface PaymentErrorInfo {
  internal?: MaybeNull<string>;
  external?: MaybeNull<string>;
}

export interface PaymentCommissionInfo {
  agent?: MaybeNull<number>;
  recipient?: MaybeNull<number>;
}

export interface IPayment
  extends IBase,
    HasMethod<IPaymentMethod>,
    HasExpireDate,
    HasEmbeddedReferences,
    HasEmbeddedStatus<PaymentStatusInfo>,
    HasEmbeddedError<PaymentErrorInfo> {
  amountStart?: MaybeNull<number>;
  amountEnd?: MaybeNull<number>;

  commission?: MaybeNull<PaymentCommissionInfo>;
  card?: MaybeNull<any>;
  currency?: MaybeNull<CurrencyCode>;

  invoice?: OnlyUUID;

  x_url?: MaybeNull<{
    payment?: MaybeNull<string>;
    redirect?: MaybeNull<string>;
    webHook?: MaybeNull<string>;
    taxRecipe?: MaybeNull<string>;
  }>;
}

export interface HasPayment {
  payment?: MaybeNull<IPayment>;
}
export interface HasPaymentsList {
  payments?: MaybeNull<IPayment[]>;
}

// TODO refactoring
