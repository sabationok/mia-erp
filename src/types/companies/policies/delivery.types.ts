import { Keys, MaybeNull, PartialRecord } from '../../utils.types';
import { PolicyJsonDataBase, PolicyJsonDataBooleanishKeys } from './policy-base.types';

export type { PolicyJsonDataBase, PolicyJsonDataBooleanishKeys } from './policy-base.types';
export enum TypeEnum {
  sales = 'sales',
  purchases = 'purchases',
  returns = 'returns',
}

export interface HasPolicy {
  deliveryPolicy?: MaybeNull<PartialRecord<TypeEnum, JsonData>>;
}

export interface JsonData extends PolicyJsonDataBase {
  allowImposedPayment?: boolean;

  insurance?: {
    allowed?: boolean;
    percentage?: number | string;
    amount?: number | string;
  };
}
export type JsonDataBoolValues = Pick<JsonData, PolicyJsonDataBooleanishKeys>;
export interface FormData extends PartialRecord<Keys<typeof TypeEnum>, JsonData> {}
export type Dto = FormData;
