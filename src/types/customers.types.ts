import { AppQueryParams } from '../api';
import {
  AddressDto,
  ContactsDto,
  IAddressSlot,
  IBase,
  IContactsSlot,
  IFormDataValueWithID,
  OnlyUUID,
} from '../redux/global.types';
import { IOrder } from './orders/orders.types';
import { BusinessSubjectTypeEnum } from './companies.types';
import {
  AppDate,
  HasCompany,
  HasEmbeddedLabel,
  HasEmbeddedName,
  HasMagicLink,
  HasTaxCode,
  MaybeNull,
} from './utils.types';

export enum CustomerTypeEnum {
  active = 'active',
}

export enum EngagementSource {
  facebook = 'facebook',
  instagram = 'instagram',
  referralSystem = 'referralSystem',
  another = 'another',
}

export interface HasCustomer {
  receiver?: MaybeNull<ICustomer>;
}

export interface HasReceiver {
  receiver?: MaybeNull<ICustomer>;
}

export interface ICustomerBase extends IBase, HasEmbeddedLabel, HasEmbeddedName, HasTaxCode {
  email?: string;
  phone?: string;

  age?: string;
  birthDate?: AppDate;

  avatarURL?: string;
  tags?: string[];

  type?: CustomerTypeEnum;
  businessType?: BusinessSubjectTypeEnum;
  engagementSource?: EngagementSource;
}
export interface ICustomer extends ICustomerBase, HasMagicLink, HasCompany {
  orders?: IOrder[];

  referer?: ICustomer;
  referrals?: ICustomer[];

  addresses?: IContactsSlot[];
  contacts?: IAddressSlot[];
}

export interface ICustomerDto extends Omit<ICustomerBase, '_id' | 'createdAt' | 'updatedAt' | 'deletedAt'> {
  referrer?: OnlyUUID;
}

export interface ICustomerFormData extends ICustomerDto {
  referrer?: IFormDataValueWithID;

  addresses?: ContactsDto[];
  contacts?: AddressDto[];
}

export interface ICustomerReqDta {
  _id?: string;
  data?: ICustomerDto;
  params?: AppQueryParams;
}
