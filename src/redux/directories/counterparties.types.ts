import { ApiDirType } from '../APP_CONFIGS';
import { IDirItemBase } from '../../types/dir.types';
import { BusinessSubjectTypeEnum, OwnershipTypeEnum } from '../../types/companies.types';
import { HasLabel, HasName } from '../../types/utils.types';

export interface ICounterpartyBase extends HasLabel, HasName {
  fullName?: string;
  secondName?: string;
  businessSubjectType?: BusinessSubjectTypeEnum;
  email?: string;
  phone?: string;
  ownershipType?: OwnershipTypeEnum;
  description?: string;
  tags?: string[];
}
export interface ICounterparty<T extends CounterpartyTypesEnum = any>
  extends ICounterpartyBase,
    IDirItemBase<ApiDirType> {
  type: T;
  attractionSource?: IDirItemBase<ApiDirType.SOURCE_ATTRACTION>;
}

export interface ICounterpartyFormData extends Omit<ICounterparty, '_id' | 'createdAt' | 'updatedAt'> {}

export enum CounterpartyTypesEnum {
  CUSTOMER = 'CUSTOMER',
  SUPPLIER = 'SUPPLIER',
  EMPLOYEE = 'EMPLOYEE',
  CONTRACTOR = 'CONTRACTOR',
  SUB_CONTRACTOR = 'SUB_CONTRACTOR',
  COMMISSION_AGENT = 'COMMISSION_AGENT',
  CONSIGNOR = 'CONSIGNOR',
  TRANSPORTER = 'TRANSPORTER',
  DELIVER = 'DELIVER',
}

export type SupplierType = ICounterparty<CounterpartyTypesEnum.SUPPLIER>;
