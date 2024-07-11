import { AppQueryParams } from '../api';
import { IFormDataValueWithID, OnlyUUID } from '../redux/app-redux.types';
import { OrderEntity } from './orders/orders.types';
import { HasCompany, HasMagicLink, HasReference, MaybeNull, UUID } from './utils.types';
import { ProfileEntity } from './profile/profile.type';
import { AddressDto } from './addresses/addresses.types';
import { ContactsDto } from './contacts/contacts.types';

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
  receiver?: MaybeNull<CustomerEntity>;
}

export interface HasReceiver {
  receiver?: MaybeNull<CustomerEntity>;
}

export interface ICustomerBase extends ProfileEntity {}
export interface CustomerEntity extends ICustomerBase, HasMagicLink, HasCompany, HasReference {
  orders?: OrderEntity[];

  referer?: CustomerEntity;
  referrals?: CustomerEntity[];
}

export interface ICustomerDto
  extends Omit<ICustomerBase, '_id' | 'createdAt' | 'updatedAt' | 'deletedAt' | 'contacts' | 'addresses'> {
  referrer?: OnlyUUID;
  referrerId?: UUID;
}

export interface ICustomerFormData extends ICustomerDto {
  referrer?: IFormDataValueWithID;

  addresses?: AddressDto[];
  contacts?: ContactsDto[];
}

export interface ICustomerReqDta {
  _id?: string;
  data?: ICustomerDto;
  params?: Pick<AppQueryParams, 'email' | 'reference' | 'referenceType' | 'phone' | 'ids' | 'ownerId' | 'userId'>;
}
