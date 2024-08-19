import { Keys, MaybeNull, PartialRecord, UUID } from '../../utils.types';
import { PolicyJsonDataBase, PolicyJsonDataBooleanishKeys } from './policy-base.types';

export enum TypeEnum {
  sales = 'sales',
  purchases = 'purchases',
  delivery = 'delivery',
  returns = 'returns',
}

export interface JsonData extends PolicyJsonDataBase {}

export type JsonDataBoolValues = Pick<JsonData, PolicyJsonDataBooleanishKeys>;

export interface FormData extends PartialRecord<Keys<typeof TypeEnum>, JsonData> {}

export interface HasPolicy {
  paymentPolicy?: MaybeNull<PartialRecord<TypeEnum, JsonData>>;
}
export interface Dto {
  methodId?: UUID;
}
