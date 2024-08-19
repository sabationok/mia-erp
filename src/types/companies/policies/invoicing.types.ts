import { Keys, MaybeNull, PartialRecord } from '../../utils.types';
import { PolicyJsonDataBase } from './policy-base.types';

export enum TypeEnum {
  sales = 'sales',
  purchases = 'purchases',
  delivery = 'delivery',
  returns = 'returns',
}
export interface JsonData extends PolicyJsonDataBase {}

export type FormData = PartialRecord<Keys<typeof TypeEnum>, JsonData>;

export type Dto = FormData;
export interface HasPolicy {
  invoicingPolicy?: MaybeNull<PartialRecord<TypeEnum, JsonData>>;
}
