import { AppQueryParams } from '../../api';
import {
  AddressDto,
  ContactsDto,
  IAddressSlot,
  IBase,
  IContactsSlot,
  IFormDataValueWithUUID,
  OnlyUUID,
} from '../global.types';
import { IOrder } from '../orders/orders.types';
import { BusinessSubjectTypeEnum } from '../companies/companies.types';

export enum CustomerTypeEnum {
  active = 'active',
}

export enum EngagementSource {
  facebook = 'facebook',
  instagram = 'instagram',
  referralSystem = 'referralSystem',
  another = 'another',
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

  engagementSource?: EngagementSource;
}
export interface ICustomer extends ICustomerBase {
  orders?: IOrder[];

  referer?: ICustomer;
  referrals?: ICustomer[];

  addresses?: IContactsSlot[];
  contacts?: IAddressSlot[];
}

export interface ICustomerDto extends ICustomerBase {
  referrer?: OnlyUUID;
}

export interface ICustomerFormData extends ICustomerDto {
  referrer?: IFormDataValueWithUUID;

  addresses?: ContactsDto[];
  contacts?: AddressDto[];
}

export interface ICustomerReqDta {
  _id?: string;
  data?: ICustomerDto;
  params?: AppQueryParams;
}
