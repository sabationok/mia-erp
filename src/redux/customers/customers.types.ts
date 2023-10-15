import { AppQueryParams } from '../../api';
import { IBase, OnlyUUID } from '../global.types';
import { IOrder } from '../orders/orders.types';
import { BusinessSubjectTypeEnum } from '../companies/companies.types';

export enum CustomerTypeEnum {
  active = 'active',
}

export interface IAddress extends IBase {
  city?: string;
  country?: string;
  street?: string;
  reg?: string;
  house?: string;
  room?: string;
}
export interface ICustomerBase extends IBase {
  label?: string;
  name?: string;
  secondName?: string;
  email?: string;
  phone?: string;
  age?: string;
  taxCode?: string;
  personalTaxCode?: string;
  type?: CustomerTypeEnum;
  businessType?: BusinessSubjectTypeEnum;
  birthDate?: string | number | Date;
  avatarURL?: string;
  tags?: string[];
  addresses?: IAddress;
}
export interface ICustomer extends ICustomerBase {
  orders?: IOrder[];

  referer?: ICustomer;
  referrals?: ICustomer[];
}

export interface ICustomerDto extends ICustomerBase {
  referrer?: OnlyUUID;
}

export interface ICustomerFormData extends ICustomerDto {
  referrer?: OnlyUUID;
}

export interface ICustomerReqDta {
  _id?: string;
  data?: ICustomerDto;
  params?: AppQueryParams;
}
