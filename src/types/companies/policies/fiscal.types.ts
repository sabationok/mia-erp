import { Keys, MaybeNull, PartialRecord } from '../../utils.types';

export enum TypeEnum {
  sales = 'sales',
  delivery = 'delivery',
  refunds = 'refunds',
}
export interface JsonData {
  autoCreate: boolean;
  selectByRoles: string[];
  autoPublish: {
    integrations: boolean;
  };
  methodId: null | string;
}

export interface FormData extends PartialRecord<Keys<typeof TypeEnum>, JsonData> {}

export type Dto = FormData;

export interface HasPolicy {
  fiscalPolicy?: MaybeNull<PartialRecord<TypeEnum, JsonData>>;
}
