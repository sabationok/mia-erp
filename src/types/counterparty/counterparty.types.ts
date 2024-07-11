import { AppQueryParams } from 'api';
import { AddressEntity } from 'types/addresses/addresses.types';
import { OrderEntity } from 'types/orders/orders.types';
import { ProfileEntity } from 'types/profile/profile.type';
import { HasCompany, HasReference } from 'types/utils.types';
import { IFormDataValueWithID, OnlyUUID } from '../../redux/app-redux.types';
import { ContactsDto, IContactsSlot } from '../contacts/contacts.types';

export interface ICounterpartyBase extends ProfileEntity {}
export interface CounterpartyEntity extends ICounterpartyBase, HasCompany, HasReference {
  orders?: OrderEntity[];

  referer?: CounterpartyEntity;
  referrals?: CounterpartyEntity[];

  addresses?: AddressEntity[];
  contacts?: IContactsSlot[];
}

export interface ICounterpartyDto extends Omit<ICounterpartyBase, '_id' | 'createdAt' | 'updatedAt' | 'deletedAt'> {
  referrer?: OnlyUUID;
}

export interface ICounterpartyFormData extends ICounterpartyDto {
  referrer?: IFormDataValueWithID;

  addresses?: AddressEntity[];
  contacts?: ContactsDto[];
}

export interface ICounterpartyReqDta {
  _id?: string;
  data?: ICounterpartyDto;
  params?: Pick<AppQueryParams, 'email' | 'reference' | 'referenceType' | 'phone' | 'ids' | 'ownerId' | 'userId'>;
}
